/**
 * Verified site copy and configuration.
 *
 * Every string here comes from the approved build specification (4 September 2026).
 * Contact routes, downloads and the project-enquiry section stay disabled (null/false)
 * until Palminder supplies and approves each item. Nothing in this file may be inferred.
 */

export interface ContactRoutes {
  /** Recruitment email address. Rendered as a plain mailto link when supplied. */
  email: string | null;
  /** Full LinkedIn profile URL. */
  linkedin: string | null;
  /** Full GitHub profile URL. Only rendered when a real profile is supplied. */
  github: string | null;
}

export interface Downloads {
  /** Path under /public to an approved PDF recruiter pack, e.g. '/downloads/recruiter-pack.pdf'. */
  recruiterPackPdf: string | null;
  /** Path under /public to an approved CV PDF, e.g. '/downloads/cv.pdf'. */
  cvPdf: string | null;
}

export const site = {
  name: 'Palminder Dhariwal',
  wordmark: 'PD',
  locale: 'en-GB',
  ogLocale: 'en_GB',
  region: 'Scotland',
  country: 'GB',

  eyebrow: 'PALMINDER DHARIWAL · SCOTLAND · UK FULLY REMOTE',
  headline: 'Microsoft Cloud & Infrastructure Engineer',
  capabilityLine: 'Endpoint · Microsoft 365 · Identity · Azure · Automation',
  heroSubheadline:
    'Endpoint management, Microsoft 365, identity, Azure and automation—backed by enterprise infrastructure experience and current, documented technical evidence.',
  evidenceIntro:
    'Review the work itself: integrated technical case studies, implementation evidence, testing, troubleshooting, architecture decisions and automation. Every item is clearly labelled as a lab, an earned credential or authorised organisational work.',
  availability: 'Based in Scotland · Available for genuinely fully remote UK roles',
  availabilityShort: 'Available for genuinely fully remote UK roles',

  currentDevelopment:
    'Currently studying for Exam MD-102 toward Microsoft 365 Certified: Endpoint Administrator Associate.',
  inProgressLabel: 'IN PROGRESS — NOT YET EARNED',

  experienceLine:
    'Previous experience includes SSE, Queen Margaret University, Prudential via Xtravirt, AVEVA and Wescot.',
  backgroundLine:
    'Previous background includes enterprise infrastructure and support, Windows, Microsoft technologies, virtualisation/VDI and related infrastructure work.',

  careerBreak: {
    heading: 'Career break and structured technical return | 2023–present',
    body: 'Following a health-related career break, I am undertaking a structured return to professional IT through current Microsoft study, documented hands-on environments, automation work and selected real-world projects. This portfolio distinguishes completed evidence from work in progress.',
  },

  projectEnquiries: {
    /** Disabled by default. Only set to true when Palminder explicitly enables project enquiries. */
    enabled: false,
    wording:
      'I selectively consider clearly scoped, remote Microsoft 365, endpoint, identity, Azure and automation projects for UK organisations. Any engagement requires agreed scope, authorisation, access controls, change and rollback arrangements, and permission to document only an appropriately sanitised outcome.',
  },

  contact: {
    email: null,
    linkedin: null,
    github: null,
  } satisfies ContactRoutes as ContactRoutes,

  downloads: {
    recruiterPackPdf: null,
    cvPdf: null,
  } satisfies Downloads as Downloads,

  recruiterPack: {
    version: '0.1.0',
    /** ISO date. Update whenever recruiter-pack content changes. */
    lastUpdated: '2026-09-04',
    referencesStatement: 'Professional references are available during recruitment.',
  },

  /** Optional approved professional headshot, e.g. { src: '/images/headshot.jpg', alt: '...' }. */
  headshot: null as { src: string; alt: string } | null,

  defaultDescription:
    'Palminder Dhariwal, Microsoft Cloud & Infrastructure Engineer based in Scotland. Endpoint management, Microsoft 365, identity, Azure and automation evidence for genuinely fully remote UK roles.',

  cta: {
    primary: { label: 'View technical evidence', href: '/evidence/' },
    secondary: { label: 'Open recruiter pack', href: '/recruiter-pack/' },
  },
} as const;

export type Site = typeof site;

/** Contact routes that have actually been supplied, in display order. */
export function suppliedContactRoutes(): Array<{
  key: keyof ContactRoutes;
  label: string;
  href: string;
  display: string;
}> {
  const routes: Array<{ key: keyof ContactRoutes; label: string; href: string; display: string }> =
    [];
  if (site.contact.email) {
    routes.push({
      key: 'email',
      label: 'Email',
      href: `mailto:${site.contact.email}`,
      display: site.contact.email,
    });
  }
  if (site.contact.linkedin) {
    routes.push({
      key: 'linkedin',
      label: 'LinkedIn',
      href: site.contact.linkedin,
      display: site.contact.linkedin.replace(/^https?:\/\//, ''),
    });
  }
  if (site.contact.github) {
    routes.push({
      key: 'github',
      label: 'GitHub',
      href: site.contact.github,
      display: site.contact.github.replace(/^https?:\/\//, ''),
    });
  }
  return routes;
}
