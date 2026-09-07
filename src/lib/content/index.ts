import 'server-only';
import { cache } from 'react';
import { localSource } from './local';
import type { ContentSource } from './source';
import {
  contentStage,
  evaluateInsight,
  evaluatePerson,
  evaluateProject,
  evaluateStudioNote,
  evaluateTestimonial,
  mayRender,
  type ContentStage,
  type GateResult,
} from './publication';
import type {
  Insight,
  LegalDocument,
  Person,
  Project,
  Sector,
  Service,
  ServiceSlug,
  StudioNote,
  Testimonial,
} from './types';

export type Gated<T> = T & { gate: GateResult };

function withGate<T>(record: T, gate: GateResult): Gated<T> {
  return { ...record, gate };
}

export function isSanityConfigured(): boolean {
  return Boolean(process.env.SANITY_PROJECT_ID?.trim() && process.env.SANITY_DATASET?.trim());
}

async function getSource(): Promise<ContentSource> {
  if (isSanityConfigured()) {
    const { sanitySource } = await import('./sanity');
    return sanitySource;
  }
  return localSource;
}

export const stage = (): ContentStage => contentStage();

/** Projects that may render for the current stage, in editorial order. */
export const getProjects = cache(async (options: { sector?: Sector } = {}): Promise<Gated<Project>[]> => {
  const s = stage();
  const source = await getSource();
  const all = await source.projects();
  return all
    .map((p) => withGate(p, evaluateProject(p)))
    .filter((p) => mayRender(p.gate, s))
    .filter((p) => (options.sector ? p.sector === options.sector : true))
    .sort((a, b) => a.order - b.order);
});

export const getProject = cache(async (slug: string): Promise<Gated<Project> | null> => {
  const list = await getProjects();
  return list.find((p) => p.slug === slug) ?? null;
});

export const getFeaturedProjects = cache(async (limit = 4): Promise<Gated<Project>[]> => {
  const list = await getProjects();
  const featured = list.filter((p) => p.featured);
  const fill = list.filter((p) => !p.featured);
  return [...featured, ...fill].slice(0, limit);
});

export async function getAdjacentProjects(slug: string): Promise<{ previous: Gated<Project> | null; next: Gated<Project> | null }> {
  const list = await getProjects();
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1) return { previous: null, next: null };
  return { previous: list[i - 1] ?? null, next: list[i + 1] ?? null };
}

export const getTeam = cache(async (): Promise<Gated<Person>[]> => {
  const s = stage();
  const source = await getSource();
  const all = await source.team();
  return all
    .map((p) => withGate(p, evaluatePerson(p)))
    .filter((p) => mayRender(p.gate, s))
    .sort((a, b) => a.order - b.order);
});

export const getServices = cache(async (): Promise<Service[]> => {
  const source = await getSource();
  const all = await source.services();
  return [...all].sort((a, b) => a.number.localeCompare(b.number));
});

export const getService = cache(async (slug: string): Promise<Service | null> => {
  const list = await getServices();
  return list.find((s) => s.slug === slug) ?? null;
});

export const getInsights = cache(async (): Promise<Gated<Insight>[]> => {
  const s = stage();
  const source = await getSource();
  const all = await source.insights();
  return all
    .map((i) => withGate(i, evaluateInsight(i)))
    .filter((i) => mayRender(i.gate, s))
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
});

export const getInsight = cache(async (slug: string): Promise<Gated<Insight> | null> => {
  const list = await getInsights();
  return list.find((i) => i.slug === slug) ?? null;
});

export const getStudioNotes = cache(async (limit?: number): Promise<Gated<StudioNote>[]> => {
  const s = stage();
  const source = await getSource();
  const all = await source.studioNotes();
  const list = all
    .map((n) => withGate(n, evaluateStudioNote(n)))
    .filter((n) => mayRender(n.gate, s))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return typeof limit === 'number' ? list.slice(0, limit) : list;
});

/** Testimonials render only when verified and consented — in every stage. */
export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const source = await getSource();
  const all = await source.testimonials();
  return all.filter((t) => evaluateTestimonial(t).publishable);
});

export const getLegalDocument = cache(async (type: LegalDocument['type']): Promise<LegalDocument | null> => {
  const source = await getSource();
  return source.legalDocument(type);
});

export async function getRelatedProjects(slugs: string[], limit = 3): Promise<Gated<Project>[]> {
  const list = await getProjects();
  const bySlug = new Map(list.map((p) => [p.slug, p]));
  return slugs.map((s) => bySlug.get(s)).filter((p): p is Gated<Project> => Boolean(p)).slice(0, limit);
}

export async function getRelatedInsights(slugs: string[], limit = 3): Promise<Gated<Insight>[]> {
  const list = await getInsights();
  const bySlug = new Map(list.map((i) => [i.slug, i]));
  return slugs.map((s) => bySlug.get(s)).filter((i): i is Gated<Insight> => Boolean(i)).slice(0, limit);
}

export async function getProjectsForService(slug: ServiceSlug, limit = 3): Promise<Gated<Project>[]> {
  const list = await getProjects();
  return list.filter((p) => p.relatedService === slug).slice(0, limit);
}

export async function getInsightsForService(slug: ServiceSlug, limit = 3): Promise<Gated<Insight>[]> {
  const list = await getInsights();
  return list.filter((i) => i.relatedServiceSlugs.includes(slug)).slice(0, limit);
}
