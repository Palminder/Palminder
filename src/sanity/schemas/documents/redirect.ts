import { defineField, defineType } from 'sanity';

export const redirect = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    defineField({ name: 'sourcePath', type: 'string', validation: (rule) => rule.required().regex(/^\/[^\s]*$/, { name: 'path' }) }),
    defineField({ name: 'destinationPath', type: 'string', validation: (rule) => rule.required().regex(/^\/[^\s]*$/, { name: 'path' }) }),
    defineField({ name: 'permanent', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'sourcePath', subtitle: 'destinationPath' } },
});
