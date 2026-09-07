import { defineArrayMember, defineField, defineType } from 'sanity';

/** Constrained portable text: paragraphs, two heading levels, lists, quotes, links. */
export const richText = defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraph', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Emphasis', value: 'em' },
          { title: 'Strong', value: 'strong' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (rule) => rule.uri({ scheme: ['http', 'https', 'mailto'], allowRelative: true }),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: 'imageWithMeta' }),
    defineArrayMember({ type: 'moduleCallout' }),
    defineArrayMember({ type: 'moduleFacts' }),
  ],
});
