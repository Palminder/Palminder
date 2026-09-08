import { defineField, defineType } from 'sanity';

import {
  roleClaimsQualification as claimsQualification,
  roleUsesProtectedTitle as usesProtectedTitle,
} from '../../../lib/content/protected-titles';

export const person = defineType({
  name: 'person',
  title: 'Team member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rolePublic',
      title: 'Public role',
      type: 'string',
      description:
        '“Architect” is a protected title under the Architects Act 1997. It cannot be published until entitlement is verified.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'roleType',
      type: 'string',
      options: { list: ['director', 'architect', 'technologist', 'assistant', 'administrator'] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      type: 'text',
      rows: 6,
      validation: (rule) => rule.required().max(900),
    }),
    defineField({
      name: 'expertise',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.max(5),
    }),
    defineField({ name: 'portrait', type: 'imageWithMeta' }),
    defineField({ name: 'order', type: 'number', validation: (rule) => rule.required().integer() }),
    defineField({
      name: 'verificationStatus',
      type: 'string',
      options: { list: ['draft', 'pending', 'verified'], layout: 'radio' },
      initialValue: 'draft',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'protectedTitleVerified',
      title: 'Entitlement to the title “architect” verified by the practice',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'qualificationVerified',
      title: 'Stated qualification verified',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'professionalReference',
      title: 'Verified professional reference (private)',
      type: 'string',
      description: 'Internal only; never rendered.',
    }),
  ],
  validation: (rule) =>
    rule.custom((doc) => {
      const d = doc as
        | {
            rolePublic?: string;
            verificationStatus?: string;
            protectedTitleVerified?: boolean;
            qualificationVerified?: boolean;
          }
        | undefined;
      if (!d) return true;
      if (d.verificationStatus !== 'verified')
        return 'Team members can only be published once verified.';
      if (d.rolePublic && usesProtectedTitle(d.rolePublic) && !d.protectedTitleVerified) {
        return 'This role uses the protected title “architect”. Verify entitlement before publishing.';
      }
      if (d.rolePublic && claimsQualification(d.rolePublic) && !d.qualificationVerified) {
        return 'This role states a qualification. Verify it before publishing.';
      }
      return true;
    }),
  preview: { select: { title: 'name', subtitle: 'rolePublic', media: 'portrait' } },
});
