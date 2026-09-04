import { getCollection, type CollectionEntry } from 'astro:content';
import { capabilities, type Capability } from '@/data/capabilities';
import {
  categories,
  evidenceTypes,
  targetRoles,
  technologies,
  type CategoryKey,
  type EvidenceType,
  type TargetRoleKey,
  type TechnologyKey,
} from '@/data/taxonomy';
import { yearOf } from './format';

export type Lab = CollectionEntry<'labs'>;
export type CaseStudy = CollectionEntry<'caseStudies'>;
export type OrganisationProject = CollectionEntry<'organisationProjects'>;
export type AutomationProject = CollectionEntry<'automationProjects'>;
export type Experience = CollectionEntry<'experience'>;
export type Credential = CollectionEntry<'credentials'>;

export type LibraryKind = 'lab' | 'case-study' | 'organisation-project';

/** Normalised card data shared by labs, case studies and organisation projects. */
export interface LibraryItem {
  id: string;
  kind: LibraryKind;
  url: string;
  title: string;
  summary: string;
  outcome: string | undefined;
  evidenceType: EvidenceType;
  category: CategoryKey;
  technologies: TechnologyKey[];
  targetRoles: TargetRoleKey[];
  completedDate: Date;
  lastReviewedDate: Date;
  publishedDate: Date | undefined;
  year: number;
  featured: boolean;
  archived: boolean;
  proof: { code: boolean; diagram: boolean; tests: boolean };
  repositoryUrl: string | undefined;
}

const notDraft = <T extends { data: { draft: boolean } }>(entry: T): boolean => !entry.data.draft;

export const routes = {
  lab: (id: string) => `/labs/${id}/`,
  caseStudy: (id: string) => `/evidence/case-studies/${id}/`,
  organisationProject: (id: string) => `/evidence/organisation-projects/${id}/`,
  category: (key: CategoryKey) => `/labs/category/${key}/`,
  technology: (key: TechnologyKey) => `/labs/technology/${key}/`,
} as const;

export async function getPublishedLabs(): Promise<Lab[]> {
  return getCollection('labs', notDraft);
}

export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  return getCollection('caseStudies', notDraft);
}

export async function getPublishedOrganisationProjects(): Promise<OrganisationProject[]> {
  // The schema already refuses to publish without granted permission; this is defence in depth.
  return getCollection(
    'organisationProjects',
    (entry) => !entry.data.draft && entry.data.publication.permissionStatus === 'granted',
  );
}

export async function getPublishedAutomationProjects(): Promise<AutomationProject[]> {
  return getCollection(
    'automationProjects',
    (entry) => !entry.data.draft && Boolean(entry.data.repositoryUrl),
  );
}

export async function getPublishedExperience(): Promise<Experience[]> {
  const entries = await getCollection(
    'experience',
    (entry) => !entry.data.draft && (entry.data.kind === 'career-break' || entry.data.verified),
  );
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getPublishedCredentials(): Promise<Credential[]> {
  const entries = await getCollection(
    'credentials',
    (entry) => !entry.data.draft && entry.data.status !== undefined,
  );
  return entries.sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
}

export function toLibraryItem(
  entry: Lab | CaseStudy | OrganisationProject,
  kind: LibraryKind,
): LibraryItem {
  const url =
    kind === 'lab'
      ? routes.lab(entry.id)
      : kind === 'case-study'
        ? routes.caseStudy(entry.id)
        : routes.organisationProject(entry.id);
  return {
    id: `${kind}:${entry.id}`,
    kind,
    url,
    title: entry.data.title,
    summary: entry.data.summary,
    outcome: entry.data.outcome,
    evidenceType: entry.data.evidenceType,
    category: entry.data.category,
    technologies: entry.data.technologies,
    targetRoles: entry.data.targetRoles,
    completedDate: entry.data.completedDate,
    lastReviewedDate: entry.data.lastReviewedDate,
    publishedDate: entry.data.publishedDate,
    year: yearOf(entry.data.completedDate),
    featured: entry.data.featured && !entry.data.archived,
    archived: entry.data.archived,
    proof: {
      code: Boolean(entry.data.links.repository),
      diagram: Boolean(entry.data.diagram),
      tests: Boolean(entry.data.links.tests) || entry.data.testEvidence,
    },
    repositoryUrl: entry.data.links.repository,
  };
}

/** Featured (non-archived) first, then most recently reviewed, then title. */
export function sortFeaturedFirst<
  T extends { featured: boolean; archived: boolean; lastReviewedDate: Date; title: string },
>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    if (a.archived !== b.archived) return a.archived ? 1 : -1;
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    const byDate = b.lastReviewedDate.getTime() - a.lastReviewedDate.getTime();
    if (byDate !== 0) return byDate;
    return a.title.localeCompare(b.title);
  });
}

export function sortNewestReviewed<
  T extends { archived: boolean; lastReviewedDate: Date; title: string },
>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    if (a.archived !== b.archived) return a.archived ? 1 : -1;
    const byDate = b.lastReviewedDate.getTime() - a.lastReviewedDate.getTime();
    if (byDate !== 0) return byDate;
    return a.title.localeCompare(b.title);
  });
}

/** Labs and integrated case studies together form the searchable library. */
export async function getLibraryItems(): Promise<LibraryItem[]> {
  const [labs, caseStudies] = await Promise.all([getPublishedLabs(), getPublishedCaseStudies()]);
  const items = [
    ...labs.map((entry) => toLibraryItem(entry, 'lab')),
    ...caseStudies.map((entry) => toLibraryItem(entry, 'case-study')),
  ];
  return sortFeaturedFirst(items);
}

export interface LibraryFacets {
  evidenceTypes: Array<{ key: EvidenceType; label: string; count: number }>;
  categories: Array<{ key: CategoryKey; label: string; count: number }>;
  technologies: Array<{ key: TechnologyKey; label: string; count: number }>;
  targetRoles: Array<{ key: TargetRoleKey; label: string; count: number }>;
  years: Array<{ key: string; label: string; count: number }>;
}

/** Facet values that actually occur in published items, so filters never offer empty options. */
export function libraryFacets(items: LibraryItem[]): LibraryFacets {
  const count = <K extends string>(values: K[]): Map<K, number> => {
    const map = new Map<K, number>();
    for (const value of values) map.set(value, (map.get(value) ?? 0) + 1);
    return map;
  };
  const typeCounts = count(items.map((item) => item.evidenceType));
  const categoryCounts = count(items.map((item) => item.category));
  const technologyCounts = count(items.flatMap((item) => item.technologies));
  const roleCounts = count(items.flatMap((item) => item.targetRoles));
  const yearCounts = count(items.map((item) => String(item.year)));

  return {
    evidenceTypes: (Object.keys(evidenceTypes) as EvidenceType[])
      .filter((key) => typeCounts.has(key))
      .map((key) => ({ key, label: evidenceTypes[key].label, count: typeCounts.get(key) ?? 0 })),
    categories: (Object.keys(categories) as CategoryKey[])
      .filter((key) => categoryCounts.has(key))
      .map((key) => ({ key, label: categories[key].label, count: categoryCounts.get(key) ?? 0 })),
    technologies: (Object.keys(technologies) as TechnologyKey[])
      .filter((key) => technologyCounts.has(key))
      .map((key) => ({ key, label: technologies[key], count: technologyCounts.get(key) ?? 0 }))
      .sort((a, b) => a.label.localeCompare(b.label)),
    targetRoles: (Object.keys(targetRoles) as TargetRoleKey[])
      .filter((key) => roleCounts.has(key))
      .map((key) => ({ key, label: targetRoles[key], count: roleCounts.get(key) ?? 0 })),
    years: [...yearCounts.keys()]
      .sort((a, b) => Number(b) - Number(a))
      .map((key) => ({ key, label: key, count: yearCounts.get(key) ?? 0 })),
  };
}

export interface EvidenceMetric {
  key: string;
  /** Plural label, e.g. "Validated labs". */
  label: string;
  /** Singular label used when the value is exactly one. */
  singular: string;
  value: number;
  href: string;
}

/** Evidence counts computed from published, non-archived content. Zero-value metrics are omitted. */
export async function getEvidenceMetrics(): Promise<EvidenceMetric[]> {
  const [caseStudies, labs, automation, organisationProjects] = await Promise.all([
    getPublishedCaseStudies(),
    getPublishedLabs(),
    getPublishedAutomationProjects(),
    getPublishedOrganisationProjects(),
  ]);
  const live = <T extends { data: { archived: boolean } }>(entries: T[]) =>
    entries.filter((e) => !e.data.archived);
  const metrics: EvidenceMetric[] = [
    {
      key: 'case-studies',
      label: 'Integrated case studies',
      singular: 'Integrated case study',
      value: live(caseStudies).length,
      href: '/evidence/case-studies/',
    },
    {
      key: 'validated-labs',
      label: 'Validated labs',
      singular: 'Validated lab',
      value: live(labs).filter((lab) => lab.data.evidenceType === 'validated-lab').length,
      href: '/labs/',
    },
    {
      key: 'automation-repositories',
      label: 'Public automation repositories',
      singular: 'Public automation repository',
      value: live(automation).length,
      href: '/evidence/automation/',
    },
    {
      key: 'organisation-projects',
      label: 'Authorised organisation projects',
      singular: 'Authorised organisation project',
      value: live(organisationProjects).length,
      href: '/evidence/organisation-projects/',
    },
  ];
  return metrics.filter((metric) => metric.value > 0);
}

export interface CapabilityEvidence {
  capability: Capability;
  items: LibraryItem[];
  automation: AutomationProject[];
  total: number;
  browseUrl: string;
}

/** Capability cards backed by published evidence only. Empty capabilities are omitted. */
export async function getCapabilityEvidence(): Promise<CapabilityEvidence[]> {
  const [library, organisationProjects, automation] = await Promise.all([
    getLibraryItems(),
    getPublishedOrganisationProjects(),
    getPublishedAutomationProjects(),
  ]);
  const all = sortFeaturedFirst([
    ...library,
    ...organisationProjects.map((entry) => toLibraryItem(entry, 'organisation-project')),
  ]).filter((item) => !item.archived);
  const liveAutomation = automation.filter((entry) => !entry.data.archived);

  return capabilities
    .map((capability) => {
      const items = all.filter((item) => capability.categories.includes(item.category));
      const automationItems = capability.includesAutomationRepositories
        ? liveAutomation
        : liveAutomation.filter((entry) => capability.categories.includes(entry.data.category));
      const primaryCategory = capability.categories[0];
      const browseUrl =
        capability.categories.length === 1 && primaryCategory
          ? routes.category(primaryCategory)
          : '/labs/';
      return {
        capability,
        items,
        automation: automationItems,
        total: items.length + automationItems.length,
        browseUrl,
      };
    })
    .filter((entry) => entry.total > 0);
}

/** Resolve `related` references to published library items. Unknown or draft references are dropped. */
export async function resolveRelated(refs: string[]): Promise<LibraryItem[]> {
  if (refs.length === 0) return [];
  const [labs, caseStudies, organisationProjects] = await Promise.all([
    getPublishedLabs(),
    getPublishedCaseStudies(),
    getPublishedOrganisationProjects(),
  ]);
  const lookup = new Map<string, LibraryItem>();
  for (const lab of labs) lookup.set(`labs/${lab.id}`, toLibraryItem(lab, 'lab'));
  for (const cs of caseStudies)
    lookup.set(`case-studies/${cs.id}`, toLibraryItem(cs, 'case-study'));
  for (const op of organisationProjects) {
    lookup.set(`organisation-projects/${op.id}`, toLibraryItem(op, 'organisation-project'));
  }
  return refs.map((ref) => lookup.get(ref)).filter((item): item is LibraryItem => Boolean(item));
}

export interface EvidenceHighlight {
  kind: 'library' | 'automation';
  item?: LibraryItem;
  automation?: AutomationProject;
}

/** Up to `limit` highlighted items for the evidence hub: case studies, automation, organisation projects. */
export async function getEvidenceHighlights(limit = 6): Promise<EvidenceHighlight[]> {
  const [caseStudies, automation, organisationProjects] = await Promise.all([
    getPublishedCaseStudies(),
    getPublishedAutomationProjects(),
    getPublishedOrganisationProjects(),
  ]);
  const cs = sortFeaturedFirst(caseStudies.map((e) => toLibraryItem(e, 'case-study'))).filter(
    (i) => !i.archived,
  );
  const op = sortFeaturedFirst(
    organisationProjects.map((e) => toLibraryItem(e, 'organisation-project')),
  ).filter((i) => !i.archived);
  const auto = automation
    .filter((e) => !e.data.archived)
    .sort(
      (a, b) =>
        Number(b.data.featured) - Number(a.data.featured) ||
        b.data.lastReviewedDate.getTime() - a.data.lastReviewedDate.getTime(),
    );

  const highlights: EvidenceHighlight[] = [];
  const featuredFirst: EvidenceHighlight[] = [
    ...op.filter((i) => i.featured).map((item) => ({ kind: 'library' as const, item })),
    ...cs.filter((i) => i.featured).map((item) => ({ kind: 'library' as const, item })),
    ...auto
      .filter((e) => e.data.featured)
      .map((automation) => ({ kind: 'automation' as const, automation })),
    ...op.filter((i) => !i.featured).map((item) => ({ kind: 'library' as const, item })),
    ...cs.filter((i) => !i.featured).map((item) => ({ kind: 'library' as const, item })),
    ...auto
      .filter((e) => !e.data.featured)
      .map((automation) => ({ kind: 'automation' as const, automation })),
  ];
  for (const highlight of featuredFirst) {
    if (highlights.length >= limit) break;
    highlights.push(highlight);
  }
  return highlights;
}
