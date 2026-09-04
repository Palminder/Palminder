import { defineCollection, type SchemaContext } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import {
  categoryKeys,
  credentialStatusKeys,
  credentialTypeKeys,
  evidenceTypeKeys,
  relationshipTypeKeys,
  targetRoleKeys,
  technologyKeys,
} from './data/taxonomy';

/**
 * Content collections and schemas.
 *
 * Safety defaults:
 * - `draft` defaults to `true`, so an entry is only published when it explicitly says `draft: false`.
 * - Published entries must carry a `publishedDate`.
 * - Organisation projects cannot be published without granted publication permission.
 * - Credential statuses exclude `planned`; a planned credential fails the build rather than rendering.
 *
 * Entry ids come from the file name (`my-lab.md`) or folder (`my-lab/index.md`).
 * Files or folders beginning with `_` are ignored, which is how private notes and templates
 * can sit alongside content without ever being loaded.
 */

const date = z.coerce.date();
const httpsUrl = z
  .url()
  .refine((value) => value.startsWith('https://'), { message: 'Links must use https://' });

const link = z.object({
  label: z.string().min(1).max(80),
  url: httpsUrl,
});

type ImageFn = SchemaContext['image'];

/** Structural type for refinement contexts, independent of zod's internal naming. */
interface IssueContext {
  addIssue: (issue: { code: 'custom'; message: string; path?: Array<string | number> }) => void;
}

const galleryItem = (image: ImageFn) =>
  z
    .object({
      image: image(),
      alt: z.string().max(300),
      caption: z.string().min(1).max(400),
      /** Set true only when the caption fully conveys the information; alt may then be empty. */
      decorative: z.boolean().default(false),
    })
    .superRefine((item, ctx) => {
      if (!item.decorative && item.alt.trim().length === 0) {
        ctx.addIssue({
          code: 'custom',
          message:
            'Gallery images need alt text unless `decorative: true` and the caption conveys the information.',
          path: ['alt'],
        });
      }
    });

const diagramItem = (image: ImageFn) =>
  z.object({
    image: image(),
    alt: z.string().min(1).max(300),
    caption: z.string().min(1).max(400),
    /** Plain-language description of what the diagram shows, for readers who cannot see it. */
    textAlternative: z.string().min(20).max(2000),
  });

const relatedRef = z
  .string()
  .regex(/^(labs|case-studies|organisation-projects)\/[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Related references look like `labs/my-lab` or `case-studies/my-case-study`.',
  });

const slugField = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slugs use lowercase letters, numbers and hyphens.',
  })
  .optional();

const evidenceCommon = (image: ImageFn) => ({
  slug: slugField,
  title: z.string().min(3).max(120),
  /** One-sentence problem/result summary shown on cards. */
  summary: z.string().min(10).max(240),
  /** One-sentence outcome shown under the title on the detail page. */
  outcome: z.string().min(10).max(240).optional(),
  draft: z.boolean().default(true),
  featured: z.boolean().default(false),
  archived: z.boolean().default(false),
  category: z.enum(categoryKeys),
  technologies: z.array(z.enum(technologyKeys)).min(1).max(12),
  targetRoles: z.array(z.enum(targetRoleKeys)).min(1).max(6),
  /** Free-text keywords for search only. Not rendered as filters. */
  tags: z.array(z.string().min(1).max(40)).max(20).default([]),
  completedDate: date,
  publishedDate: date.optional(),
  lastReviewedDate: date,
  platformVersion: z.string().max(120).optional(),
  links: z
    .object({
      repository: httpsUrl.optional(),
      tests: httpsUrl.optional(),
    })
    .default({}),
  /** Set true only when the page contains a validation plan with actual recorded results. */
  testEvidence: z.boolean().default(false),
  verificationLinks: z.array(link).max(10).default([]),
  gallery: z.array(galleryItem(image)).max(12).default([]),
  diagram: diagramItem(image).optional(),
  related: z.array(relatedRef).max(8).default([]),
  sanitisationStatement: z.string().min(10).max(1000).optional(),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(170).optional(),
});

interface EvidenceCommonShape {
  draft: boolean;
  featured: boolean;
  archived: boolean;
  publishedDate?: Date | undefined;
  completedDate: Date;
  lastReviewedDate: Date;
}

function evidenceRefinements(entry: EvidenceCommonShape, ctx: IssueContext) {
  if (!entry.draft && !entry.publishedDate) {
    ctx.addIssue({
      code: 'custom',
      message: 'Published entries (draft: false) must include a publishedDate.',
      path: ['publishedDate'],
    });
  }
  if (entry.lastReviewedDate.getTime() < entry.completedDate.getTime()) {
    ctx.addIssue({
      code: 'custom',
      message: 'lastReviewedDate cannot be earlier than completedDate.',
      path: ['lastReviewedDate'],
    });
  }
  if (entry.archived && entry.featured) {
    ctx.addIssue({
      code: 'custom',
      message: 'Archived evidence cannot be featured.',
      path: ['featured'],
    });
  }
}

const labs = defineCollection({
  loader: glob({ pattern: ['**/[^_]*.md', '**/[^_]*.mdx'], base: './src/content/labs' }),
  schema: ({ image }) =>
    z
      .object({
        ...evidenceCommon(image),
        evidenceType: z.enum(['focused-lab', 'validated-lab']),
        /** Group several small related exercises into one narrative. */
        series: z
          .object({
            name: z.string().min(1).max(120),
            parts: z
              .array(
                z.object({
                  title: z.string().min(1).max(120),
                  summary: z.string().min(1).max(240),
                }),
              )
              .min(2)
              .max(20),
          })
          .optional(),
      })
      .superRefine(evidenceRefinements),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: ['**/[^_]*.md', '**/[^_]*.mdx'], base: './src/content/case-studies' }),
  schema: ({ image }) =>
    z
      .object({
        ...evidenceCommon(image),
        evidenceType: z.literal('integrated-case-study').default('integrated-case-study'),
      })
      .superRefine(evidenceRefinements),
});

const organisationProjects = defineCollection({
  loader: glob({
    pattern: ['**/[^_]*.md', '**/[^_]*.mdx'],
    base: './src/content/organisation-projects',
  }),
  schema: ({ image }) =>
    z
      .object({
        ...evidenceCommon(image),
        evidenceType: z
          .literal('external-organisation-project')
          .default('external-organisation-project'),
        organisation: z.object({
          /** Approved organisation name or approved anonymised descriptor. */
          name: z.string().min(1).max(120),
          /** Organisation type, only when permitted. */
          type: z.string().max(120).optional(),
          /** Approximate size, only when permitted. */
          size: z.string().max(80).optional(),
        }),
        relationshipType: z.enum(relationshipTypeKeys),
        /** Required when relationshipType is `other`. */
        relationshipDescription: z.string().max(160).optional(),
        /** Whether the work was paid. Never imply an unpaid project was paid. */
        paid: z.boolean(),
        problem: z.string().min(20),
        businessContext: z.string().min(20),
        scope: z.string().min(20),
        exclusions: z.string().min(5),
        environment: z.string().min(20),
        accessModel: z.string().min(20),
        assessmentAndFindings: z.string().min(20),
        designAndOptions: z.string().min(20),
        implementation: z.string().min(20),
        securityAndDataHandling: z.string().min(20),
        testingAndAcceptance: z.string().min(20),
        changeControl: z.string().min(20),
        rollbackAndRecovery: z.string().min(20),
        measuredResult: z.string().min(20),
        documentationAndHandover: z.string().min(20),
        feedback: z
          .object({
            quote: z.string().min(1).max(600),
            /** Role or organisation only. Never a personal email or phone number. */
            attribution: z.string().min(1).max(120),
            permissionGranted: z.boolean(),
          })
          .optional(),
        referenceAvailable: z.boolean().default(false),
        publication: z.object({
          permissionStatus: z.enum(['granted', 'pending', 'declined']),
          approvedDate: date.optional(),
          /** Role of the approver, never contact details. */
          approvedBy: z.string().max(120).optional(),
          disclosureRestrictions: z.string().min(1).max(1000),
        }),
      })
      .superRefine((entry, ctx) => {
        evidenceRefinements(entry, ctx);
        if (!entry.draft) {
          if (entry.publication.permissionStatus !== 'granted') {
            ctx.addIssue({
              code: 'custom',
              message:
                'Organisation projects can only be published once publication permission is granted.',
              path: ['publication', 'permissionStatus'],
            });
          }
          if (!entry.publication.approvedDate) {
            ctx.addIssue({
              code: 'custom',
              message: 'Published organisation projects need the publication approval date.',
              path: ['publication', 'approvedDate'],
            });
          }
        }
        if (entry.feedback && !entry.feedback.permissionGranted) {
          ctx.addIssue({
            code: 'custom',
            message:
              'Feedback can only be included when permissionGranted is true. Remove it otherwise.',
            path: ['feedback', 'permissionGranted'],
          });
        }
        if (entry.relationshipType === 'other' && !entry.relationshipDescription) {
          ctx.addIssue({
            code: 'custom',
            message: 'Describe the relationship accurately when relationshipType is `other`.',
            path: ['relationshipDescription'],
          });
        }
        if (/@|\+?\d[\d\s]{8,}/.test(entry.feedback?.attribution ?? '')) {
          ctx.addIssue({
            code: 'custom',
            message: 'Feedback attribution must not contain an email address or phone number.',
            path: ['feedback', 'attribution'],
          });
        }
      }),
});

const automationProjects = defineCollection({
  loader: glob({ pattern: ['**/[^_]*.md', '**/[^_]*.mdx'], base: './src/content/automation' }),
  schema: z
    .object({
      slug: slugField,
      title: z.string().min(3).max(120),
      summary: z.string().min(10).max(240),
      draft: z.boolean().default(true),
      featured: z.boolean().default(false),
      archived: z.boolean().default(false),
      evidenceType: z.enum(evidenceTypeKeys).default('validated-lab'),
      category: z.enum(categoryKeys).default('automation-and-infrastructure-as-code'),
      technologies: z.array(z.enum(technologyKeys)).min(1).max(12),
      targetRoles: z.array(z.enum(targetRoleKeys)).min(1).max(6),
      tags: z.array(z.string().min(1).max(40)).max(20).default([]),
      problem: z.string().min(20).max(600),
      approach: z.string().min(20).max(600),
      safetyControls: z.array(z.string().min(5).max(200)).min(1).max(10),
      tests: z.string().min(10).max(600),
      usage: z.string().min(10).max(600),
      /** Public, sanitised repository. Required to publish. */
      repositoryUrl: httpsUrl.optional(),
      completedDate: date,
      publishedDate: date.optional(),
      lastReviewedDate: date,
      platformVersion: z.string().max(120).optional(),
      verificationLinks: z.array(link).max(10).default([]),
      seoTitle: z.string().max(70).optional(),
      seoDescription: z.string().max(170).optional(),
    })
    .superRefine((entry, ctx) => {
      evidenceRefinements(entry, ctx);
      if (!entry.draft && !entry.repositoryUrl) {
        ctx.addIssue({
          code: 'custom',
          message: 'Published automation projects must link to a public repository.',
          path: ['repositoryUrl'],
        });
      }
    }),
});

const experience = defineCollection({
  loader: glob({ pattern: ['**/[^_]*.md', '**/[^_]*.mdx'], base: './src/content/experience' }),
  schema: z
    .object({
      slug: slugField,
      organisation: z.string().min(1).max(120),
      kind: z.enum(['employment', 'career-break']).default('employment'),
      role: z.string().min(1).max(120).optional(),
      startDate: date.optional(),
      endDate: date.optional(),
      current: z.boolean().default(false),
      location: z.string().max(120).optional(),
      summary: z.string().max(600).optional(),
      responsibilities: z.array(z.string().min(5).max(300)).max(15).default([]),
      technologies: z.array(z.string().min(1).max(60)).max(30).default([]),
      /** True only once the entry matches the approved CV or another supplied source. */
      verified: z.boolean().default(false),
      draft: z.boolean().default(true),
      /** Lower numbers display first. */
      order: z.number().int().min(0).max(1000).default(100),
      /** Private authoring note. Never rendered. */
      sourceNote: z.string().max(1000).optional(),
    })
    .superRefine((entry, ctx) => {
      if (!entry.draft && entry.kind === 'employment' && !entry.verified) {
        ctx.addIssue({
          code: 'custom',
          message:
            'Employment entries can only be published once verified against the approved CV.',
          path: ['verified'],
        });
      }
      if (entry.startDate && entry.endDate && entry.endDate.getTime() < entry.startDate.getTime()) {
        ctx.addIssue({
          code: 'custom',
          message: 'endDate cannot be before startDate.',
          path: ['endDate'],
        });
      }
      if (entry.current && entry.endDate) {
        ctx.addIssue({
          code: 'custom',
          message: 'A current entry cannot have an endDate.',
          path: ['endDate'],
        });
      }
    }),
});

const credentials = defineCollection({
  loader: glob({ pattern: ['**/[^_]*.md', '**/[^_]*.mdx'], base: './src/content/credentials' }),
  schema: z
    .object({
      slug: slugField,
      title: z.string().min(3).max(160),
      issuer: z.string().min(1).max(120),
      credentialType: z.enum(credentialTypeKeys),
      /** `planned` is deliberately not a valid public status. */
      status: z.enum(credentialStatusKeys),
      earnedDate: date.optional(),
      renewalOrExpiryDate: date.optional(),
      verificationUrl: httpsUrl.optional(),
      examCode: z.string().max(20).optional(),
      /** Limited to what the credential validates. */
      description: z.string().min(10).max(320),
      featured: z.boolean().default(false),
      draft: z.boolean().default(true),
      order: z.number().int().min(0).max(1000).default(100),
    })
    .superRefine((entry, ctx) => {
      const earnedStatuses = ['earned-current', 'earned-expired', 'historical'];
      if (earnedStatuses.includes(entry.status) && !entry.earnedDate) {
        ctx.addIssue({
          code: 'custom',
          message:
            'Earned credentials must record the earned date from the official transcript or badge.',
          path: ['earnedDate'],
        });
      }
      if (entry.status === 'in-progress') {
        if (entry.credentialType !== 'exam-in-progress') {
          ctx.addIssue({
            code: 'custom',
            message: 'In-progress entries must use credentialType `exam-in-progress`.',
            path: ['credentialType'],
          });
        }
        if (!entry.examCode) {
          ctx.addIssue({
            code: 'custom',
            message: 'In-progress entries need the exam code.',
            path: ['examCode'],
          });
        }
        if (entry.earnedDate || entry.verificationUrl) {
          ctx.addIssue({
            code: 'custom',
            message: 'An in-progress credential cannot have an earned date or verification link.',
            path: ['earnedDate'],
          });
        }
      }
      if (entry.credentialType === 'exam-in-progress' && entry.status !== 'in-progress') {
        ctx.addIssue({
          code: 'custom',
          message: 'credentialType `exam-in-progress` must use status `in-progress`.',
          path: ['status'],
        });
      }
      if (entry.credentialType === 'applied-skill' && entry.status === 'in-progress') {
        ctx.addIssue({
          code: 'custom',
          message: 'Applied Skills are published only once earned and verified.',
          path: ['status'],
        });
      }
    }),
});

export const collections = {
  labs,
  caseStudies,
  organisationProjects,
  automationProjects,
  experience,
  credentials,
};
