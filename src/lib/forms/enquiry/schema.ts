import { z } from 'zod';

/** Field options. The order here is the order presented in the form. */
export const PROJECT_TYPES = [
  'Residential',
  'Conservation & Listed Building',
  'Housing & Retrofit',
  'Commercial & Community',
  'Other',
] as const;

export const PROJECT_STAGES = [
  'Exploring feasibility',
  'Preparing for consent',
  'Consent already in place',
  'Looking for technical or delivery support',
  'Not sure',
] as const;

export const TIMESCALES = [
  'As soon as practical',
  'Within 3 months',
  '3–6 months',
  '6–12 months',
  'Longer term',
  'Not sure',
] as const;

export const ENQUIRY_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  areaMax: 120,
  descriptionMin: 50,
  descriptionMax: 3000,
} as const;

const trimmed = (max: number) => z.string().trim().max(max);

/** Shared client/server validation. Server-side validation is authoritative. */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      ENQUIRY_LIMITS.nameMin,
      `Please enter your name (at least ${ENQUIRY_LIMITS.nameMin} characters).`,
    )
    .max(
      ENQUIRY_LIMITS.nameMax,
      `Your name should be no more than ${ENQUIRY_LIMITS.nameMax} characters.`,
    ),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    .max(ENQUIRY_LIMITS.emailMax, 'That email address is too long.')
    .pipe(z.email({ message: 'Please enter a valid email address, e.g. name@example.com.' })),
  area: trimmed(ENQUIRY_LIMITS.areaMax).min(1, 'Please tell us the project postcode or area.'),
  projectType: z.enum(PROJECT_TYPES, { message: 'Please choose a project type.' }),
  projectStage: z.enum(PROJECT_STAGES, {
    message: 'Please choose the stage the project has reached.',
  }),
  timescale: z
    .union([z.enum(TIMESCALES), z.literal('')])
    .optional()
    .transform((v) => (v ? v : undefined)),
  description: z
    .string()
    .trim()
    .min(
      ENQUIRY_LIMITS.descriptionMin,
      `Please describe the project in at least ${ENQUIRY_LIMITS.descriptionMin} characters.`,
    )
    .max(
      ENQUIRY_LIMITS.descriptionMax,
      `Please keep the description under ${ENQUIRY_LIMITS.descriptionMax} characters.`,
    ),
  privacy: z.literal('on', { message: 'Please confirm you have read the Privacy Notice.' }),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

export type EnquiryFieldName = keyof EnquiryInput | 'file' | 'turnstile';

export type FieldErrors = Partial<Record<EnquiryFieldName, string>>;

/** Flatten Zod issues into one message per field, keeping the first message for each. */
export function fieldErrorsFromZod(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !(key in out)) out[key as EnquiryFieldName] = issue.message;
  }
  return out;
}

/** Field labels used by the error summary and the notification email. */
export const FIELD_LABELS: Record<EnquiryFieldName, string> = {
  name: 'Name',
  email: 'Email',
  area: 'Project postcode or area',
  projectType: 'Project type',
  projectStage: 'Project stage',
  timescale: 'Preferred timescale',
  description: 'Short project description',
  file: 'Supporting file',
  privacy: 'Privacy acknowledgement',
  turnstile: 'Verification',
};

export function formDataToEnquiryInput(data: FormData): Record<string, unknown> {
  const get = (k: string) => {
    const v = data.get(k);
    return typeof v === 'string' ? v : '';
  };
  return {
    name: get('name'),
    email: get('email'),
    area: get('area'),
    projectType: get('projectType'),
    projectStage: get('projectStage'),
    timescale: get('timescale'),
    description: get('description'),
    privacy: data.get('privacy') === 'on' ? 'on' : '',
  };
}
