import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title override', type: 'string', validation: (rule) => rule.max(70) }),
    defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 3, validation: (rule) => rule.max(170) }),
    defineField({ name: 'image', title: 'Social image override', type: 'imageWithMeta' }),
  ],
});
