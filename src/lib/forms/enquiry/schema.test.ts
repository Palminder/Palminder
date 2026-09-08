import { describe, expect, it } from 'vitest';
import { enquirySchema, fieldErrorsFromZod, formDataToEnquiryInput } from './schema';

const valid = {
  name: 'Ann Example',
  email: 'ann@example.com',
  area: 'G12',
  projectType: 'Residential',
  projectStage: 'Exploring feasibility',
  timescale: '',
  description:
    'A ground-floor tenement flat in the West End with a small rear kitchen that we would like to open up.',
  privacy: 'on',
};

describe('enquiry schema', () => {
  it('accepts a valid enquiry and normalises an empty timescale', () => {
    const r = enquirySchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.timescale).toBeUndefined();
  });
  it('rejects a short description and a bad email with one message per field', () => {
    const r = enquirySchema.safeParse({ ...valid, description: 'too short', email: 'nope' });
    expect(r.success).toBe(false);
    if (!r.success) {
      const errors = fieldErrorsFromZod(r.error);
      expect(errors.description).toMatch(/at least 50/);
      expect(errors.email).toMatch(/valid email/);
      expect(Object.keys(errors)).toHaveLength(2);
    }
  });
  it('requires the privacy acknowledgement', () => {
    const r = enquirySchema.safeParse({ ...valid, privacy: '' });
    expect(r.success).toBe(false);
  });
  it('rejects unknown option values', () => {
    expect(enquirySchema.safeParse({ ...valid, projectType: 'Skyscraper' }).success).toBe(false);
  });
  it('reads FormData into the expected shape', () => {
    const fd = new FormData();
    for (const [k, v] of Object.entries(valid)) fd.set(k, v);
    const input = formDataToEnquiryInput(fd);
    expect(enquirySchema.safeParse(input).success).toBe(true);
  });
});
