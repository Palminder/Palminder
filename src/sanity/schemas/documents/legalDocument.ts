import { defineField, defineType } from 'sanity';

export const legalDocument = defineType({
  name: 'legalDocument',
  title: 'Legal document',
  type: 'document',
  fields: [
    defineField({ name: 'type', type: 'string', options: { list: ['privacy', 'cookies', 'accessibility'] }, validation: (rule) => rule.required() }),
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'intro', type: 'text', rows: 3 }),
    defineField({ name: 'effectiveDate', type: 'date', validation: (rule) => rule.required() }),
    defineField({ name: 'reviewedAt', type: 'date', validation: (rule) => rule.required() }),
    defineField({ name: 'body', type: 'richText', validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'type' } },
});
