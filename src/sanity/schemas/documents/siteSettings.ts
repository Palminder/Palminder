import { defineField, defineType } from 'sanity';

/** Singleton. Deliberately has no telephone field: none exists and none may be added. */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      type: 'string',
      initialValue: 'Bracken & Roe',
      readOnly: true,
    }),
    defineField({
      name: 'domain',
      type: 'string',
      initialValue: 'brackenroe.co.uk',
      readOnly: true,
    }),
    defineField({
      name: 'publicEmail',
      type: 'string',
      initialValue: 'studio@brackenroe.co.uk',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'address',
      type: 'object',
      fields: [
        defineField({ name: 'line1', type: 'string', initialValue: 'Office 1810' }),
        defineField({
          name: 'line2',
          type: 'string',
          initialValue: '3 Fitzroy Place, 1/1 Sauchiehall Street',
        }),
        defineField({ name: 'locality', type: 'string', initialValue: 'Finnieston' }),
        defineField({ name: 'city', type: 'string', initialValue: 'Glasgow' }),
        defineField({ name: 'postcode', type: 'string', initialValue: 'G3 7RH' }),
        defineField({ name: 'country', type: 'string', initialValue: 'United Kingdom' }),
      ],
    }),
    defineField({
      name: 'appointmentNote',
      type: 'string',
      initialValue: 'Meetings by appointment.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instagramUrl',
      type: 'url',
      description:
        'Hidden site-wide until set (an SOCIAL_INSTAGRAM_URL environment variable takes precedence).',
    }),
    defineField({
      name: 'linkedinUrl',
      type: 'url',
      description:
        'Hidden site-wide until set (an SOCIAL_LINKEDIN_URL environment variable takes precedence).',
    }),
    defineField({ name: 'defaultSeo', type: 'seo' }),
    defineField({
      name: 'legalEntityName',
      type: 'string',
      description: 'Only once confirmed. Never invent.',
    }),
    defineField({
      name: 'companyNumber',
      type: 'string',
      description: 'Only once confirmed. Never invent.',
    }),
    defineField({
      name: 'analyticsMode',
      type: 'string',
      options: {
        list: [
          { title: 'None (default)', value: 'none' },
          { title: 'Consent-gated', value: 'consent' },
        ],
      },
      initialValue: 'none',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
