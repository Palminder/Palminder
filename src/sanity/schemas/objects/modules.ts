import { defineArrayMember, defineField, defineType } from 'sanity';

/** Approved page-body modules. There is no free-form page builder. */
export const moduleRichText = defineType({
  name: 'moduleRichText',
  title: 'Rich text',
  type: 'object',
  fields: [defineField({ name: 'body', type: 'richText', validation: (rule) => rule.required() })],
  preview: { prepare: () => ({ title: 'Rich text' }) },
});

export const moduleFullWidthImage = defineType({
  name: 'moduleFullWidthImage',
  title: 'Full-width image',
  type: 'object',
  fields: [defineField({ name: 'image', type: 'imageWithMeta', validation: (rule) => rule.required() })],
  preview: { select: { title: 'image.alt' }, prepare: ({ title }) => ({ title: `Full-width image — ${title ?? ''}` }) },
});

export const moduleImagePair = defineType({
  name: 'moduleImagePair',
  title: 'Image pair',
  type: 'object',
  fields: [
    defineField({ name: 'first', type: 'imageWithMeta', validation: (rule) => rule.required() }),
    defineField({ name: 'second', type: 'imageWithMeta', validation: (rule) => rule.required() }),
  ],
  preview: { prepare: () => ({ title: 'Image pair' }) },
});

export const moduleImageText = defineType({
  name: 'moduleImageText',
  title: 'Image and text',
  type: 'object',
  fields: [
    defineField({ name: 'image', type: 'imageWithMeta', validation: (rule) => rule.required() }),
    defineField({ name: 'heading', type: 'string' }),
    defineField({ name: 'body', type: 'richText' }),
    defineField({
      name: 'imagePosition',
      type: 'string',
      options: { list: ['left', 'right'], layout: 'radio' },
      initialValue: 'left',
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `Image and text — ${title ?? ''}` }) },
});

export const moduleDrawing = defineType({
  name: 'moduleDrawing',
  title: 'Drawing',
  type: 'object',
  fields: [defineField({ name: 'drawing', type: 'imageWithMeta', validation: (rule) => rule.required() })],
  preview: { select: { title: 'drawing.drawing.title' }, prepare: ({ title }) => ({ title: `Drawing — ${title ?? ''}` }) },
});

export const moduleFacts = defineType({
  name: 'moduleFacts',
  title: 'Facts',
  type: 'object',
  fields: [
    defineField({ name: 'caption', type: 'string' }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'term', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'detail', type: 'string', validation: (rule) => rule.required() }),
          ],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: { prepare: () => ({ title: 'Facts' }) },
});

export const moduleCallout = defineType({
  name: 'moduleCallout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'text', type: 'text', rows: 4, validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `Callout — ${title ?? ''}` }) },
});

export const moduleProjectSelection = defineType({
  name: 'moduleProjectSelection',
  title: 'Project selection',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string', initialValue: 'Selected work' }),
    defineField({
      name: 'projects',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })],
      validation: (rule) => rule.max(6),
    }),
  ],
  preview: { prepare: () => ({ title: 'Project selection' }) },
});

export const moduleStudioNotes = defineType({
  name: 'moduleStudioNotes',
  title: 'Studio notes',
  type: 'object',
  fields: [defineField({ name: 'count', type: 'number', initialValue: 4, validation: (rule) => rule.min(1).max(8) })],
  preview: { prepare: () => ({ title: 'Studio notes' }) },
});

export const moduleCTA = defineType({
  name: 'moduleCTA',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Tell us what you are working on.' }),
    defineField({ name: 'copy', type: 'text', rows: 2 }),
  ],
  preview: { select: { title: 'title' }, prepare: ({ title }) => ({ title: `CTA — ${title ?? ''}` }) },
});

export const modularBody = defineType({
  name: 'modularBody',
  title: 'Page body',
  type: 'array',
  of: [
    defineArrayMember({ type: 'moduleRichText' }),
    defineArrayMember({ type: 'moduleFullWidthImage' }),
    defineArrayMember({ type: 'moduleImagePair' }),
    defineArrayMember({ type: 'moduleImageText' }),
    defineArrayMember({ type: 'moduleDrawing' }),
    defineArrayMember({ type: 'moduleFacts' }),
    defineArrayMember({ type: 'moduleCallout' }),
    defineArrayMember({ type: 'moduleProjectSelection' }),
    defineArrayMember({ type: 'moduleStudioNotes' }),
    defineArrayMember({ type: 'moduleCTA' }),
  ],
});
