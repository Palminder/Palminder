import { defineArrayMember, defineField, defineType } from 'sanity';

export const insight = defineType({
  name: 'insight',
  title: 'Insight',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'dek', type: 'text', rows: 2, validation: (rule) => rule.required().max(240) }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['Tenements', 'Consents', 'Listed buildings', 'Masonry repair', 'Retrofit', 'Ventilation'] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'body', type: 'richText', validation: (rule) => rule.required() }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'person' }], description: 'Leave empty to attribute to “Bracken & Roe Studio”.' }),
    defineField({ name: 'publishedAt', type: 'date', validation: (rule) => rule.required() }),
    defineField({ name: 'reviewedAt', type: 'date' }),
    defineField({ name: 'hero', type: 'imageWithMeta', validation: (rule) => rule.required() }),
    defineField({
      name: 'officialSources',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'href', type: 'url', validation: (rule) => rule.required() }),
            defineField({ name: 'publisher', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'note', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({ name: 'relatedServices', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'service' }] })] }),
    defineField({ name: 'relatedProjects', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })] }),
    defineField({ name: 'touchesRegulation', title: 'Touches regulation (needs periodic review)', type: 'boolean', initialValue: true }),
    defineField({
      name: 'disclaimer',
      type: 'text',
      rows: 3,
      initialValue:
        'This article provides general architectural guidance rather than advice for a specific property. Consent and technical requirements depend on the building, location and proposed work.',
    }),
    defineField({
      name: 'verificationStatus',
      type: 'string',
      options: { list: ['draft', 'pending', 'verified'], layout: 'radio' },
      initialValue: 'draft',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  validation: (rule) =>
    rule.custom((doc) => {
      const d = doc as { touchesRegulation?: boolean; reviewedAt?: string; publishedAt?: string; verificationStatus?: string } | undefined;
      if (!d) return true;
      if (d.touchesRegulation && !d.reviewedAt) return 'Guidance touching regulation needs a review date.';
      if (!d.publishedAt) return 'A publication date is required.';
      if (d.verificationStatus !== 'verified') return 'Insights are published only once reviewed and verified.';
      return true;
    }),
  preview: { select: { title: 'title', subtitle: 'category', media: 'hero' } },
});
