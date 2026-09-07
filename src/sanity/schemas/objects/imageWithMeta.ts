import { defineField, defineType } from 'sanity';

const MEDIA_TYPES = [
  { title: 'Completed view (real, verified photography only)', value: 'completed-view' },
  { title: 'Existing condition', value: 'existing-condition' },
  { title: 'Construction progress', value: 'construction-progress' },
  { title: 'Visualisation', value: 'visualisation' },
  { title: 'Proposed plan', value: 'proposed-plan' },
  { title: 'Existing plan', value: 'existing-plan' },
  { title: 'Section', value: 'section' },
  { title: 'Elevation', value: 'elevation' },
  { title: 'Axonometric', value: 'axonometric' },
  { title: 'Detail drawing', value: 'detail-drawing' },
  { title: 'Diagram', value: 'diagram' },
  { title: 'Survey drawing', value: 'survey-drawing' },
  { title: 'Material study', value: 'material-study' },
  { title: 'Context (licensed, never practice work)', value: 'context' },
  { title: 'Portrait', value: 'portrait' },
];

/** Image with the alt, caption, media-type and rights metadata that the publication gates need. */
export const imageWithMeta = defineType({
  name: 'imageWithMeta',
  title: 'Image',
  type: 'image',
  options: { hotspot: true, metadata: ['lqip', 'palette'] },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describe the content plainly, e.g. “Rear elevation of a sandstone house with a low timber-lined garden extension.”',
      validation: (rule) => rule.required().min(8).max(300),
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'credit', title: 'Credit', type: 'string' }),
    defineField({
      name: 'mediaType',
      title: 'Media type',
      type: 'string',
      options: { list: MEDIA_TYPES, layout: 'dropdown' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'drawing',
      title: 'Drawing details',
      type: 'object',
      hidden: ({ parent }) =>
        !['proposed-plan', 'existing-plan', 'section', 'elevation', 'axonometric', 'detail-drawing', 'diagram', 'survey-drawing'].includes(
          (parent as { mediaType?: string } | undefined)?.mediaType ?? '',
        ),
      fields: [
        defineField({ name: 'number', title: 'Drawing number', type: 'string', description: 'e.g. Drawing 03' }),
        defineField({ name: 'title', title: 'Drawing title', type: 'string', description: 'e.g. Proposed ground-floor plan' }),
        defineField({ name: 'note', title: 'Legend / note', type: 'string' }),
      ],
    }),
    defineField({
      name: 'rights',
      title: 'Source and rights',
      type: 'object',
      fields: [
        defineField({
          name: 'sourceType',
          title: 'Source type',
          type: 'string',
          options: {
            list: [
              { title: 'Practice photography', value: 'practice' },
              { title: 'Commissioned', value: 'commissioned' },
              { title: 'Licensed (stock / third party)', value: 'licensed' },
              { title: 'Synthetic / generated', value: 'synthetic' },
            ],
          },
          validation: (rule) => rule.required(),
        }),
        defineField({ name: 'creator', title: 'Creator / photographer', type: 'string' }),
        defineField({ name: 'sourcePlatform', title: 'Source platform', type: 'string' }),
        defineField({ name: 'sourceIdentifier', title: 'Source ID / reference', type: 'string' }),
        defineField({ name: 'license', title: 'Licence', type: 'string' }),
        defineField({ name: 'rightsCheckedAt', title: 'Rights checked on', type: 'date' }),
        defineField({
          name: 'contextOnly',
          title: 'Context only — never presented as practice work',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({ name: 'synthetic', title: 'Synthetic imagery', type: 'boolean', initialValue: false }),
      ],
      validation: (rule) =>
        rule.custom((value) => {
          const v = value as { sourceType?: string; creator?: string; sourceIdentifier?: string; license?: string; rightsCheckedAt?: string } | undefined;
          if (v?.sourceType === 'licensed') {
            const missing = ['creator', 'sourceIdentifier', 'license', 'rightsCheckedAt'].filter((k) => !v[k as keyof typeof v]);
            if (missing.length) return `Licensed images need rights metadata: ${missing.join(', ')}.`;
          }
          return true;
        }),
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const v = value as { mediaType?: string; rights?: { synthetic?: boolean; sourceType?: string; contextOnly?: boolean } } | undefined;
      if (!v) return true;
      const synthetic = v.rights?.synthetic || v.rights?.sourceType === 'synthetic';
      if (synthetic && v.mediaType === 'completed-view') return 'Synthetic imagery must be labelled “Visualisation”, never “Completed view”.';
      if (v.rights?.sourceType === 'licensed' && !v.rights?.contextOnly) return 'Licensed imagery must be marked context-only.';
      return true;
    }),
});
