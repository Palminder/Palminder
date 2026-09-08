import 'server-only';
import {
  fieldErrorsFromZod,
  formDataToEnquiryInput,
  enquirySchema,
  type FieldErrors,
} from './schema';
import { validateUpload } from './files';
import { emailConfigured, sendEnquiryEmails } from './email';
import { clientIp, getRateLimiter } from '@/lib/security/rate-limit';
import { isTrustedOrigin } from '@/lib/security/origin';
import { turnstileRequired, verifyTurnstile } from '@/lib/security/turnstile';
import { scanFile, uploadsEnabled } from '@/lib/security/malware-scan';
import { siteUrl } from '@/lib/site';
import { isProductionDeployment } from '@/lib/env';

export const MAX_REQUEST_BYTES = 9 * 1024 * 1024;
export const HONEYPOT_FIELD = 'company_website';
export const STARTED_AT_FIELD = 'form_started_at';
export const SUBMISSION_ID_FIELD = 'submission_id';
export const TURNSTILE_FIELD = 'cf-turnstile-response';
const MIN_SUBMISSION_INTERVAL_MS = 3000;

export type ProcessResult =
  | { status: 'success'; submissionId: string }
  | { status: 'invalid'; fieldErrors: FieldErrors; message: string }
  | {
      status: 'rejected';
      httpStatus: 403 | 413 | 415 | 429;
      message: string;
      retryAfterSeconds?: number;
    }
  | { status: 'unavailable'; message: string };

/** Recently accepted submission IDs (idempotency for double submits on a single instance). */
const recent = new Map<string, number>();
function seenRecently(id: string): boolean {
  const now = Date.now();
  for (const [k, t] of recent) if (now - t > 10 * 60 * 1000) recent.delete(k);
  if (recent.has(id)) return true;
  recent.set(id, now);
  return false;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Enquiry processing in the specified order:
 * method (handled by the route) → size → origin → Zod → honeypot → rate limit → Turnstile →
 * file extension/signature/size → malware scan → idempotency → notify → acknowledge → succeed.
 * Nothing here logs the message body or file.
 */
export async function processEnquiry(request: Request): Promise<ProcessResult> {
  // 2. Content type and request size.
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('multipart/form-data')) {
    return { status: 'rejected', httpStatus: 415, message: 'Unsupported content type.' };
  }
  const length = Number(request.headers.get('content-length') ?? '0');
  if (length > MAX_REQUEST_BYTES) {
    return {
      status: 'rejected',
      httpStatus: 413,
      message: 'The request is too large. Attachments are limited to 8 MB.',
    };
  }

  // 3. Origin / CSRF expectations.
  if (!isTrustedOrigin(request.headers, siteUrl())) {
    return {
      status: 'rejected',
      httpStatus: 403,
      message: 'This request did not come from the website.',
    };
  }

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return { status: 'rejected', httpStatus: 415, message: 'The form could not be read.' };
  }

  // 4. Server-side validation of every field.
  const parsed = enquirySchema.safeParse(formDataToEnquiryInput(data));
  const fieldErrors: FieldErrors = parsed.success ? {} : fieldErrorsFromZod(parsed.error);

  // 5. Honeypot and minimum plausible interval (secondary signals only).
  const honey = data.get(HONEYPOT_FIELD);
  const startedAt = Number(data.get(STARTED_AT_FIELD) ?? '');
  const tooFast =
    Number.isFinite(startedAt) &&
    startedAt > 0 &&
    Date.now() - startedAt < MIN_SUBMISSION_INTERVAL_MS;
  if ((typeof honey === 'string' && honey.trim().length > 0) || tooFast) {
    // Respond as if accepted so automated senders learn nothing; nothing is sent.
    return { status: 'success', submissionId: crypto.randomUUID() };
  }

  // 6. Abuse rate limit (counted before Turnstile so failed challenges also consume budget).
  const ip = clientIp(request.headers);
  let decision: { allowed: boolean; retryAfterSeconds?: number };
  try {
    decision = await getRateLimiter().check(ip);
  } catch {
    return {
      status: 'unavailable',
      message: 'The enquiry form is temporarily unavailable. Please email us instead.',
    };
  }
  if (!decision.allowed) {
    return {
      status: 'rejected',
      httpStatus: 429,
      message:
        'Too many enquiries have been sent from this connection. Please try again later or email us directly.',
      retryAfterSeconds: decision.retryAfterSeconds,
    };
  }

  // 7. Turnstile token validated server-side.
  const tokenValue = data.get(TURNSTILE_FIELD);
  const token = typeof tokenValue === 'string' && tokenValue ? tokenValue : null;
  if (turnstileRequired()) {
    const t = await verifyTurnstile(token, ip);
    if (!t.ok) {
      if (t.reason === 'not-configured' || t.reason === 'unavailable') {
        return {
          status: 'unavailable',
          message: 'The enquiry form is temporarily unavailable. Please email us instead.',
        };
      }
      fieldErrors.turnstile = 'Please complete the verification step and try again.';
    }
  }

  // 8–9. File validation and malware scan (only when uploads are enabled).
  let attachment: { filename: string; content: Uint8Array; contentType: string } | undefined;
  let originalName: string | undefined;
  const fileValue = data.get('file');
  const file = fileValue instanceof File && fileValue.size > 0 ? fileValue : null;
  if (file) {
    if (!uploadsEnabled()) {
      fieldErrors.file =
        'File uploads are not available at the moment. Please send the enquiry without a file.';
    } else {
      const check = await validateUpload(file);
      if (!check.ok) {
        fieldErrors.file = check.message;
      } else {
        const scan = await scanFile(check.bytes, check.storedName, check.mime);
        if (!scan.clean) {
          fieldErrors.file =
            scan.reason === 'infected'
              ? 'The file could not be accepted. Please send the enquiry without it.'
              : 'The file could not be checked at the moment. Please send the enquiry without it.';
        } else {
          attachment = {
            filename: check.storedName,
            content: check.bytes,
            contentType: check.mime,
          };
          originalName = check.originalName;
        }
      }
    }
  }

  if (!parsed.success || Object.keys(fieldErrors).length > 0) {
    return {
      status: 'invalid',
      fieldErrors,
      message: 'Some details need attention before the enquiry can be sent.',
    };
  }

  // 10. Idempotency key.
  const supplied = data.get(SUBMISSION_ID_FIELD);
  const submissionId =
    typeof supplied === 'string' && UUID.test(supplied)
      ? supplied.toLowerCase()
      : crypto.randomUUID();
  if (seenRecently(submissionId)) return { status: 'success', submissionId };

  // 11–12. Studio notification and optional acknowledgement.
  if (!emailConfigured()) {
    if (process.env.NODE_ENV === 'production') {
      return {
        status: 'unavailable',
        message: 'The enquiry form is temporarily unavailable. Please email us instead.',
      };
    }
    // 13. Non-production only: log a redacted summary, never the message or file.
    console.info('[enquiry] (dev, email not configured)', {
      submissionId,
      projectType: parsed.data.projectType,
      hasAttachment: Boolean(attachment),
    });
    return { status: 'success', submissionId };
  }
  const sent = await sendEnquiryEmails({
    enquiry: parsed.data,
    submissionId,
    attachment,
    attachmentOriginalName: originalName,
  });
  if (!sent.ok) {
    console.error('[enquiry] send failed', { submissionId, reason: sent.reason });
    return {
      status: 'unavailable',
      message: 'Your enquiry could not be sent just now. Please email us directly.',
    };
  }
  console.info('[enquiry] sent', {
    submissionId,
    projectType: parsed.data.projectType,
    hasAttachment: Boolean(attachment),
  });
  return { status: 'success', submissionId };
}
