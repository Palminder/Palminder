import { defineField, defineType } from 'sanity';

export const studioNote = defineType({
  name: 'studioNote',
  title: 'Studio note',
  type: 'document',
  fields: [
    defineField({ name: 'date', type: 'date', validation: (rule) => rule.required() }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['Site', 'Drawing', 'Detail', 'Material', 'Glasgow'] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortText',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(180),
    }),
    defineField({ name: 'media', type: 'imageWithMeta', validation: (rule) => rule.required() }),
    defineField({ name: 'relatedProject', type: 'reference', to: [{ type: 'project' }] }),
    defineField({ name: 'optionalSocialURL', type: 'url' }),
    defineField({ name: 'published', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'shortText', subtitle: 'category', media: 'media' } },
});
