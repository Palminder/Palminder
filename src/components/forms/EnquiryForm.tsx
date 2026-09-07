'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from 'react';
import {
  ENQUIRY_LIMITS,
  FIELD_LABELS,
  PROJECT_STAGES,
  PROJECT_TYPES,
  TIMESCALES,
  enquirySchema,
  fieldErrorsFromZod,
  formDataToEnquiryInput,
  type EnquiryFieldName,
  type FieldErrors,
} from '@/lib/forms/enquiry/schema';
import { site } from '@/lib/site';
import { FormField, inputClass } from './FormField';
import { TurnstileWidget } from './TurnstileWidget';

interface EnquiryFormProps {
  uploadsEnabled: boolean;
  maxUploadMb: number;
  /** Server-side outcome carried on the URL after a non-JavaScript submission. */
  serverOutcome?: 'error' | '429' | '403' | '413' | '415' | 'unavailable';
}

const FIELD_ORDER: EnquiryFieldName[] = ['name', 'email', 'area', 'projectType', 'projectStage', 'timescale', 'description', 'file', 'privacy', 'turnstile'];

/**
 * Semantic form that posts to /api/enquiry. When JavaScript is available it validates
 * inline with the shared schema, submits with fetch and announces the outcome; without it
 * the browser's own validation and a 303 redirect do the work.
 */
export function EnquiryForm({ uploadsEnabled, maxUploadMb, serverOutcome }: EnquiryFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  // True only after hydration; the server-rendered form is a plain semantic form.
  const enhanced = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>(serverOutcome ? 'error' : 'idle');
  const [message, setMessage] = useState<string | null>(serverOutcome ? serverOutcomeMessage(serverOutcome) : null);
  // Client-only values; the hidden inputs carrying them render only once enhanced.
  const [startedAt] = useState(() => (typeof window === 'undefined' ? '' : String(Date.now())));
  const [submissionId, setSubmissionId] = useState(() => (typeof window === 'undefined' ? '' : crypto.randomUUID()));
  const base = useId();
  const id = (name: string) => `${base}-${name}`;

  useEffect(() => {
    if (status === 'error') summaryRef.current?.focus();
  }, [status, errors, message]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (!enhanced) return; // native submission
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = enquirySchema.safeParse(formDataToEnquiryInput(data));
    const clientErrors: FieldErrors = parsed.success ? {} : fieldErrorsFromZod(parsed.error);
    const file = data.get('file');
    if (file instanceof File && file.size > 0) {
      if (!uploadsEnabled) clientErrors.file = 'File uploads are not available at the moment. Please send the enquiry without a file.';
      else if (file.size > maxUploadMb * 1024 * 1024) clientErrors.file = `The file is too large. The maximum size is ${maxUploadMb} MB.`;
      else if (!/\.(pdf|jpe?g|png)$/i.test(file.name)) clientErrors.file = 'Please attach a PDF, JPG or PNG file.';
    }
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setMessage('Some details need attention before the enquiry can be sent.');
      setStatus('error');
      return;
    }
    setErrors({});
    setMessage(null);
    setStatus('submitting');
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; redirectTo?: string; message?: string; fieldErrors?: FieldErrors };
      if (res.ok && body.ok) {
        router.push('/contact/thanks');
        return;
      }
      setErrors(body.fieldErrors ?? {});
      setMessage(body.message ?? 'Your enquiry could not be sent just now. Please email us directly.');
      setStatus('error');
      setSubmissionId(crypto.randomUUID());
    } catch {
      setMessage('Your enquiry could not be sent just now. Please email us directly.');
      setStatus('error');
    }
  }

  const errorList = FIELD_ORDER.filter((f) => errors[f]);

  return (
    <form
      ref={formRef}
      method="post"
      action="/api/enquiry"
      encType="multipart/form-data"
      noValidate={enhanced}
      onSubmit={onSubmit}
      aria-describedby={id('intro')}
      className="flex flex-col gap-6"
    >
      <p id={id('intro')} className="visually-hidden">
        All fields are required unless marked optional.
      </p>

      <div ref={summaryRef} tabIndex={-1} role={status === 'error' ? 'alert' : undefined} className="outline-none">
        {status === 'error' && (message || errorList.length > 0) ? (
          <div className="border-l-2 border-terracotta pl-4">
            <p className="type-body font-medium text-ink">{message ?? 'Some details need attention.'}</p>
            {errorList.length > 0 ? (
              <ul className="type-meta mt-2 list-disc pl-5 text-ink/85">
                {errorList.map((f) => (
                  <li key={f}>
                    <a href={`#${id(f)}`} className="underline underline-offset-[0.2em]">
                      {FIELD_LABELS[f]}: {errors[f]}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            {(message ?? '').includes('email') ? (
              <p className="type-meta mt-2">
                <a href={`mailto:${site.email}`} className="underline underline-offset-[0.2em]">
                  {site.email}
                </a>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField id={id('name')} label="Name" required error={errors.name}>
          {(attrs) => (
            <input {...attrs} name="name" type="text" autoComplete="name" required minLength={ENQUIRY_LIMITS.nameMin} maxLength={ENQUIRY_LIMITS.nameMax} className={inputClass} />
          )}
        </FormField>
        <FormField id={id('email')} label="Email" required error={errors.email}>
          {(attrs) => (
            <input {...attrs} name="email" type="email" autoComplete="email" inputMode="email" required maxLength={ENQUIRY_LIMITS.emailMax} className={inputClass} />
          )}
        </FormField>
      </div>

      <FormField
        id={id('area')}
        label="Project postcode or area"
        helper="A postcode or the name of the area is enough. A street address is not needed at this stage."
        required
        error={errors.area}
      >
        {(attrs) => <input {...attrs} name="area" type="text" autoComplete="off" required maxLength={ENQUIRY_LIMITS.areaMax} className={inputClass} />}
      </FormField>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField id={id('projectType')} label="Project type" required error={errors.projectType}>
          {(attrs) => (
            <select {...attrs} name="projectType" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Select a project type
              </option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}
        </FormField>
        <FormField id={id('projectStage')} label="Project stage" required error={errors.projectStage}>
          {(attrs) => (
            <select {...attrs} name="projectStage" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Select the current stage
              </option>
              {PROJECT_STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}
        </FormField>
      </div>

      <FormField id={id('timescale')} label="Preferred timescale" optional error={errors.timescale} className="md:max-w-[calc(50%-0.75rem)]">
        {(attrs) => (
          <select {...attrs} name="timescale" defaultValue="" className={inputClass}>
            <option value="">No preference yet</option>
            {TIMESCALES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        )}
      </FormField>

      <FormField
        id={id('description')}
        label="Short project description"
        helper={`Tell us about the building, what you are considering and the stage you have reached (${ENQUIRY_LIMITS.descriptionMin}–${ENQUIRY_LIMITS.descriptionMax} characters).`}
        required
        error={errors.description}
      >
        {(attrs) => (
          <textarea {...attrs} name="description" rows={7} required minLength={ENQUIRY_LIMITS.descriptionMin} maxLength={ENQUIRY_LIMITS.descriptionMax} className={inputClass} />
        )}
      </FormField>

      {uploadsEnabled ? (
        <FormField
          id={id('file')}
          label="Supporting file"
          optional
          helper={`One PDF, JPG or PNG up to ${maxUploadMb} MB — a photograph, sketch or existing drawing.`}
          error={errors.file}
        >
          {(attrs) => (
            <input
              {...attrs}
              name="file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              className="block w-full text-[0.9375rem] file:mr-4 file:min-h-11 file:border file:border-ink/40 file:bg-white file:px-4 file:py-2 file:text-[0.9375rem] file:font-medium file:text-ink"
            />
          )}
        </FormField>
      ) : null}

      {/* Honeypot: not visible, not focusable, hidden from assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={id('company_website')}>Company website</label>
        <input id={id('company_website')} name="company_website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      {enhanced ? (
        <>
          <input type="hidden" name="form_started_at" value={startedAt} />
          <input type="hidden" name="submission_id" value={submissionId} />
        </>
      ) : null}

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <input
            id={id('privacy')}
            name="privacy"
            type="checkbox"
            required
            aria-describedby={errors.privacy ? `${id('privacy')}-error` : undefined}
            aria-invalid={errors.privacy ? true : undefined}
            className="mt-1.5 size-5 shrink-0 accent-moss"
          />
          <label htmlFor={id('privacy')} className="type-body text-ink/90">
            I have read the{' '}
            <Link href="/privacy" className="underline decoration-ink/40 underline-offset-[0.2em] hover:decoration-ink">
              Privacy Notice
            </Link>{' '}
            and understand how Bracken & Roe will use my information to respond to this enquiry.
          </label>
        </div>
        {errors.privacy ? (
          <p id={`${id('privacy')}-error`} className="type-meta font-medium text-terracotta">
            <span className="visually-hidden">Error: </span>
            {errors.privacy}
          </p>
        ) : null}
      </div>

      <div id={id('turnstile')}>
        <TurnstileWidget />
        {errors.turnstile ? (
          <p className="type-meta mt-2 font-medium text-terracotta">
            <span className="visually-hidden">Error: </span>
            {errors.turnstile}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex min-h-12 items-center justify-center bg-moss px-7 text-[0.9375rem] font-medium text-paper transition-colors hover:bg-deep-ink disabled:opacity-70"
        >
          {status === 'submitting' ? 'Sending…' : 'Send project enquiry'}
        </button>
        <p className="type-meta text-ink/70">
          We’ll reply by email. Read our{' '}
          <Link href="/privacy" className="underline decoration-ink/40 underline-offset-[0.2em] hover:decoration-ink">
            privacy notice
          </Link>
          .
        </p>
      </div>
      <p role="status" aria-live="polite" className="visually-hidden">
        {status === 'submitting' ? 'Sending your enquiry.' : ''}
      </p>
    </form>
  );
}

const subscribeNoop = () => () => {};

function serverOutcomeMessage(outcome: NonNullable<EnquiryFormProps['serverOutcome']>): string {
  switch (outcome) {
    case '429':
      return 'Too many enquiries have been sent from this connection. Please try again later or email us directly.';
    case '413':
      return 'The attachment was too large. Please send the enquiry without it or with a smaller file.';
    case '403':
      return 'The enquiry could not be verified as coming from this website. Please try again.';
    case 'unavailable':
      return 'The enquiry form is temporarily unavailable. Please email us instead.';
    default:
      return 'Some details need attention before the enquiry can be sent. Please check the form and try again.';
  }
}
