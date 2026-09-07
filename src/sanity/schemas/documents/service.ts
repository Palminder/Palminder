import { defineArrayMember, defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'number', type: 'string', description: 'e.g. 01', validation: (rule) => rule.required() }),
    defineField({ name: 'navLabel', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'shortIntro', title: 'Summary', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'hero', title: 'Hero headline', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'lead', title: 'Introduction', type: 'richText' }),
    defineField({ name: 'serviceScope', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'body', type: 'richText' }),
          ],
        }),
      ],
    }),
    defineField({ name: 'supportingCopy', type: 'richText' }),
    defineField({ name: 'modularBody', type: 'modularBody' }),
    defineField({ name: 'image', type: 'imageWithMeta', validation: (rule) => rule.required() }),
    defineField({ name: 'relatedProjects', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })] }),
    defineField({ name: 'relatedInsights', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'insight' }] })] }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: { select: { title: 'title', subtitle: 'number' } },
});
