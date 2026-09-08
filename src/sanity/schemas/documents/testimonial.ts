import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', type: 'text', rows: 4, validation: (rule) => rule.required() }),
    defineField({
      name: 'attribution',
      type: 'string',
      description: 'e.g. Client',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descriptor',
      type: 'string',
      description: 'e.g. residential project, West End — must be true and approved.',
    }),
    defineField({ name: 'consentConfirmed', type: 'boolean', initialValue: false }),
    defineField({ name: 'verified', type: 'boolean', initialValue: false }),
    defineField({ name: 'relatedProject', type: 'reference', to: [{ type: 'project' }] }),
  ],
  validation: (rule) =>
    rule.custom((doc) => {
      const d = doc as { consentConfirmed?: boolean; verified?: boolean } | undefined;
      if (d && !(d.consentConfirmed && d.verified))
        return 'Testimonials publish only when the quote, attribution and permission are verified.';
      return true;
    }),
  preview: { select: { title: 'quote', subtitle: 'attribution' } },
});
