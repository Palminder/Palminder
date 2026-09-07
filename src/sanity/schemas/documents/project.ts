import { defineArrayMember, defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'publishing', title: 'Publishing' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', group: 'content', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'locationDisplay', title: 'Public location', type: 'string', group: 'content', description: 'e.g. “Kelvinside, Glasgow”. Never a full private address.', validation: (rule) => rule.required() }),
    defineField({ name: 'area', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    defineField({
      name: 'sector',
      type: 'string',
      group: 'content',
      options: { list: [
        { title: 'Residential', value: 'residential' },
        { title: 'Conservation', value: 'conservation' },
        { title: 'Housing & Retrofit', value: 'housing-retrofit' },
        { title: 'Commercial & Community', value: 'commercial-community' },
      ] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'sectorLabel', title: 'Sector label override', type: 'string', group: 'content' }),
    defineField({
      name: 'status',
      type: 'string',
      group: 'publishing',
      options: { list: [
        { title: 'Completed', value: 'completed' },
        { title: 'On site', value: 'on-site' },
        { title: 'In design', value: 'in-design' },
        { title: 'Study', value: 'study' },
      ] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'year', type: 'number', group: 'publishing', validation: (rule) => rule.integer().min(2000).max(2100) }),
    defineField({
      name: 'realityType',
      type: 'string',
      group: 'publishing',
      options: { list: [
        { title: 'Real project', value: 'real-project' },
        { title: 'Design study', value: 'design-study' },
        { title: 'Representative study', value: 'representative-study' },
      ], layout: 'radio' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'verificationStatus',
      type: 'string',
      group: 'publishing',
      options: { list: ['draft', 'pending', 'verified'], layout: 'radio' },
      initialValue: 'draft',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'buildingType', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    defineField({ name: 'summary', type: 'text', rows: 2, group: 'content', validation: (rule) => rule.required().max(280) }),
    defineField({ name: 'brief', type: 'richText', group: 'content' }),
    defineField({ name: 'context', title: 'Existing building', type: 'richText', group: 'content' }),
    defineField({ name: 'response', title: 'Architectural response', type: 'richText', group: 'content' }),
    defineField({ name: 'services', type: 'array', of: [{ type: 'string' }], group: 'content' }),
    defineField({ name: 'materials', type: 'array', of: [{ type: 'string' }], group: 'content' }),
    defineField({ name: 'technical', title: 'Technical & materials', type: 'richText', group: 'content' }),
    defineField({ name: 'outcome', type: 'richText', group: 'content' }),
    defineField({ name: 'hero', type: 'imageWithMeta', group: 'media', validation: (rule) => rule.required() }),
    defineField({ name: 'gallery', type: 'array', of: [defineArrayMember({ type: 'imageWithMeta' })], group: 'media' }),
    defineField({ name: 'drawings', type: 'array', of: [defineArrayMember({ type: 'imageWithMeta' })], group: 'media' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false, group: 'publishing' }),
    defineField({ name: 'order', type: 'number', group: 'publishing', validation: (rule) => rule.required().integer() }),
    defineField({
      name: 'relatedService',
      type: 'string',
      group: 'content',
      options: { list: ['residential', 'conservation-listed-buildings', 'housing-retrofit', 'commercial-community'] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'seo', type: 'seo', group: 'seo' }),
    defineField({ name: 'verificationNotes', type: 'text', rows: 3, group: 'publishing', description: 'Internal only; never rendered.' }),
  ],
  validation: (rule) =>
    rule.custom((doc) => {
      const d = doc as { realityType?: string; verificationStatus?: string; status?: string } | undefined;
      if (!d) return true;
      if (d.realityType === 'real-project' && d.verificationStatus !== 'verified') {
        return 'A real project described as completed, on site or commissioned must be verified before it can be published.';
      }
      if (d.realityType !== 'real-project' && d.status !== 'study') {
        return 'A design or representative study must use the “Study” status; it cannot claim completion.';
      }
      if (d.verificationStatus === 'draft') return 'Draft records cannot be published.';
      return true;
    }),
  preview: { select: { title: 'title', subtitle: 'locationDisplay', media: 'hero' } },
});
