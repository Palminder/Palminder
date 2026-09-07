import 'server-only';
import { Resend } from 'resend';
import { site } from '@/lib/site';
import { FIELD_LABELS, type Enquiry } from './schema';

export interface Attachment {
  filename: string;
  content: Uint8Array;
  contentType: string;
}

export interface SendOptions {
  enquiry: Enquiry;
  submissionId: string;
  attachment?: Attachment;
  attachmentOriginalName?: string;
}

export function notificationSubject(enquiry: Pick<Enquiry, 'projectType' | 'area'>): string {
  return `New website enquiry — ${enquiry.projectType} — ${enquiry.area}`;
}

/** Plain, readable notification body reproducing the structured fields without HTML decoration. */
export function notificationText(o: SendOptions): string {
  const e = o.enquiry;
  const lines = [
    'New project enquiry from brackenroe.co.uk',
    '',
    `${FIELD_LABELS.name}: ${e.name}`,
    `${FIELD_LABELS.email}: ${e.email}`,
    `${FIELD_LABELS.area}: ${e.area}`,
    `${FIELD_LABELS.projectType}: ${e.projectType}`,
    `${FIELD_LABELS.projectStage}: ${e.projectStage}`,
    `${FIELD_LABELS.timescale}: ${e.timescale ?? 'Not given'}`,
    '',
    `${FIELD_LABELS.description}:`,
    e.description,
    '',
    o.attachment
      ? `Supporting file: attached (${o.attachment.filename}${o.attachmentOriginalName ? `, originally “${o.attachmentOriginalName}”` : ''})`
      : 'Supporting file: none',
    '',
    `Reference: ${o.submissionId}`,
    'Reply to this email to respond directly to the enquirer.',
  ];
  return lines.join('\n');
}

export function acknowledgementText(): string {
  return [
    'Thank you for getting in touch with Bracken & Roe. We have received your project enquiry and will reply by email.',
    '',
    'Bracken & Roe',
    site.email,
  ].join('\n');
}

export type SendResult = { ok: true; id: string | null } | { ok: false; reason: 'not-configured' | 'provider-error' };

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.ENQUIRY_FROM_EMAIL?.trim());
}

/** Sends the studio notification (and optional acknowledgement) via Resend with idempotency keys. */
export async function sendEnquiryEmails(o: SendOptions): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.ENQUIRY_FROM_EMAIL?.trim();
  const to = process.env.ENQUIRY_TO_EMAIL?.trim() || site.email;
  if (!apiKey || !from) return { ok: false, reason: 'not-configured' };

  const resend = new Resend(apiKey);
  const notification = await resend.emails.send(
    {
      from: `Bracken & Roe website <${from}>`,
      to: [to],
      replyTo: o.enquiry.email,
      subject: notificationSubject(o.enquiry),
      text: notificationText(o),
      attachments: o.attachment
        ? [{ filename: o.attachment.filename, content: Buffer.from(o.attachment.content), contentType: o.attachment.contentType }]
        : undefined,
    },
    { idempotencyKey: `enquiry/${o.submissionId}/notify` },
  );
  if (notification.error) return { ok: false, reason: 'provider-error' };

  if (process.env.ENQUIRY_SEND_ACKNOWLEDGEMENT === 'true') {
    // Acknowledgement failures are not surfaced to the enquirer; the studio has the enquiry.
    await resend.emails
      .send(
        {
          from: `Bracken & Roe <${from}>`,
          to: [o.enquiry.email],
          replyTo: site.email,
          subject: 'Bracken & Roe — project enquiry received',
          text: acknowledgementText(),
        },
        { idempotencyKey: `enquiry/${o.submissionId}/ack` },
      )
      .catch(() => undefined);
  }
  return { ok: true, id: notification.data?.id ?? null };
}
