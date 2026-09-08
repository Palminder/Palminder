import type { MetadataRoute } from 'next';
import { getInsights, getProjects, getServices } from '@/lib/content';
import { absoluteUrl } from '@/lib/site';

/**
 * Production-indexable pages only. Records are read through the content API and then
 * filtered on `gate.publishable`, so drafts, unverified projects and placeholder-led
 * records never appear in the sitemap even on a staging deployment.
 *
 * Deliberately excluded: /contact/thanks (noindex), /api/*, and draft/preview routes.
 */
const STATIC_PATHS = [
  '/',
  '/practice',
  '/projects',
  '/services',
  '/insights',
  '/contact',
  '/privacy',
  '/cookies',
  '/accessibility',
] as const;

/** Parses an ISO date for `lastModified`; an unparseable value is omitted rather than emitted as "Invalid Date". */
function toDate(iso: string | undefined): Date | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

/** Evaluated per request so the deployment stage and current content are always reflected. */
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects, insights] = await Promise.all([
    getServices(),
    getProjects(),
    getInsights(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
  }));

  const projectEntries: MetadataRoute.Sitemap = projects
    .filter((project) => project.gate.publishable)
    .map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
    }));

  const insightEntries: MetadataRoute.Sitemap = insights
    .filter((insight) => insight.gate.publishable)
    .map((insight) => ({
      url: absoluteUrl(`/insights/${insight.slug}`),
      lastModified: toDate(insight.reviewedAt ?? insight.publishedAt),
    }));

  return [...staticEntries, ...serviceEntries, ...projectEntries, ...insightEntries];
}
