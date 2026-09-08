import 'server-only';
import { draftMode } from 'next/headers';
import imageUrlBuilder from '@sanity/image-url';
import { previewClient, sanityClient } from '@/sanity/client';
import {
  insightsQuery,
  legalDocumentQuery,
  projectsQuery,
  servicesQuery,
  siteSettingsQuery,
  studioNotesQuery,
  teamQuery,
  testimonialsQuery,
} from '@/sanity/queries';
import { portableTextToBlocks, portableTextToParagraphs, type PTNode } from './portable-text';
import type { ContentSource } from './source';
import type {
  ImageAsset,
  Insight,
  LegalDocument,
  MediaType,
  Person,
  Project,
  Service,
  StudioNote,
  Testimonial,
} from './types';

const builder = imageUrlBuilder(sanityClient);

interface SanityImage {
  asset?: { _ref?: string };
  url?: string;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
  credit?: string;
  mediaType?: MediaType;
  drawing?: { number?: string; title?: string; note?: string };
  rights?: ImageAsset['rights'];
  hotspot?: unknown;
  crop?: unknown;
}

function toImage(node: unknown): ImageAsset | null {
  const img = node as SanityImage | null | undefined;
  if (!img?.asset && !img?.url) return null;
  const width = img.width ?? 2000;
  const height = img.height ?? 1333;
  const cappedWidth = Math.min(width, 2400);
  // Capped at 2400px; the Sanity CDN serves negotiated AVIF/WebP through the image loader.
  const src = builder
    .image(img as never)
    .width(cappedWidth)
    .fit('max')
    .auto('format')
    .url();
  return {
    src,
    width: cappedWidth,
    height: Math.round((cappedWidth / width) * height),
    alt: img.alt ?? '',
    mediaType: img.mediaType ?? 'context',
    caption: img.caption,
    credit: img.credit,
    drawing: img.drawing?.title
      ? { number: img.drawing.number, title: img.drawing.title, note: img.drawing.note }
      : undefined,
    rights: img.rights,
  };
}

async function fetchQuery<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = ['content'],
): Promise<T> {
  const { isEnabled } = await draftMode();
  if (isEnabled) {
    return previewClient().fetch<T>(query, params, { cache: 'no-store' });
  }
  return sanityClient.fetch<T>(query, params, { next: { tags } });
}

/** Context illustration used when a CMS record has no hero image of its own. */
const fallbackImage = (alt: string): ImageAsset => ({
  src: '/illustrations/glasgow-tenement-street.svg',
  width: 1600,
  height: 1000,
  alt,
  mediaType: 'context',
  rights: { sourceType: 'practice', creator: 'Bracken & Roe', synthetic: true },
});

const images = (list: SanityImage[] | undefined) =>
  (list ?? []).map(toImage).filter((i): i is ImageAsset => Boolean(i));

/** Sanity-backed content source. Gating still happens in the content API. */
export const sanitySource: ContentSource = {
  name: 'sanity',
  async siteSettings() {
    const doc = await fetchQuery<{ instagramUrl?: string; linkedinUrl?: string } | null>(
      siteSettingsQuery,
      {},
      ['content', 'siteSettings'],
    );
    return {
      instagramUrl: doc?.instagramUrl ?? undefined,
      linkedinUrl: doc?.linkedinUrl ?? undefined,
    };
  },
  async projects() {
    type Doc = Omit<
      Project,
      | 'id'
      | 'brief'
      | 'existing'
      | 'response'
      | 'technical'
      | 'outcome'
      | 'hero'
      | 'gallery'
      | 'drawings'
    > & {
      _id: string;
      brief?: PTNode[];
      context?: PTNode[];
      response?: PTNode[];
      technical?: PTNode[];
      outcome?: PTNode[];
      hero?: SanityImage;
      gallery?: SanityImage[];
      drawings?: SanityImage[];
    };
    const docs = await fetchQuery<Doc[]>(projectsQuery, {}, ['content', 'project']);
    return docs.map((d) => ({
      id: d._id,
      slug: d.slug,
      title: d.title,
      locationDisplay: d.locationDisplay,
      area: d.area,
      sector: d.sector,
      sectorLabel: d.sectorLabel ?? undefined,
      status: d.status,
      year: d.year ?? undefined,
      realityType: d.realityType,
      verificationStatus: d.verificationStatus,
      buildingType: d.buildingType,
      summary: d.summary,
      brief: portableTextToParagraphs(d.brief),
      existing: portableTextToParagraphs(d.context),
      response: portableTextToParagraphs(d.response),
      services: d.services ?? [],
      materials: d.materials ?? [],
      technical: portableTextToParagraphs(d.technical),
      outcome: portableTextToParagraphs(d.outcome),
      hero: toImage(d.hero) ?? fallbackImage(`${d.title} — image missing`),
      gallery: images(d.gallery),
      drawings: images(d.drawings),
      featured: Boolean(d.featured),
      order: d.order ?? 999,
      relatedService: d.relatedService,
      seo: d.seo,
    }));
  },
  async team() {
    type Doc = Omit<Person, 'id' | 'portrait'> & { _id: string; portrait?: SanityImage };
    const docs = await fetchQuery<Doc[]>(teamQuery, {}, ['content', 'person']);
    return docs.map((d) => ({
      id: d._id,
      slug: d.slug,
      name: d.name,
      rolePublic: d.rolePublic,
      roleType: d.roleType,
      expertise: d.expertise ?? [],
      bio: d.bio,
      portrait: toImage(d.portrait) ?? undefined,
      order: d.order ?? 999,
      verificationStatus: d.verificationStatus,
      protectedTitleVerified: Boolean(d.protectedTitleVerified),
      qualificationVerified: Boolean(d.qualificationVerified),
    }));
  },
  async services() {
    type Doc = {
      _id: string;
      title: string;
      slug: Service['slug'];
      number: string;
      navLabel: string;
      shortIntro: string;
      hero: string;
      lead?: PTNode[];
      serviceScope?: string[];
      sections?: Array<{ title: string; body?: PTNode[] }>;
      supportingCopy?: PTNode[];
      image?: SanityImage;
      relatedProjectSlugs?: string[];
      relatedInsightSlugs?: string[];
      seo?: { title?: string; description?: string };
    };
    const docs = await fetchQuery<Doc[]>(servicesQuery, {}, ['content', 'service']);
    return docs.map((d) => ({
      slug: d.slug,
      number: d.number,
      title: d.title,
      navLabel: d.navLabel,
      summary: d.shortIntro,
      heroHeadline: d.hero,
      intro: portableTextToParagraphs(d.lead),
      scope: d.serviceScope ?? [],
      sections: (d.sections ?? []).map((s) => ({
        title: s.title,
        body: portableTextToParagraphs(s.body),
      })),
      supportingCopy: d.supportingCopy ? portableTextToParagraphs(d.supportingCopy) : undefined,
      image: toImage(d.image) ?? fallbackImage(`${d.title} — image missing`),
      relatedProjectSlugs: d.relatedProjectSlugs ?? [],
      relatedInsightSlugs: d.relatedInsightSlugs ?? [],
      seo: {
        title: d.seo?.title ?? `${d.title} | Bracken & Roe`,
        description: d.seo?.description ?? d.shortIntro,
      },
    }));
  },
  async insights() {
    type Doc = Omit<
      Insight,
      | 'id'
      | 'body'
      | 'author'
      | 'hero'
      | 'officialSources'
      | 'relatedServiceSlugs'
      | 'relatedProjectSlugs'
    > & {
      _id: string;
      body?: PTNode[];
      authorSlug?: string;
      hero?: SanityImage;
      officialSources?: Insight['officialSources'];
      relatedServiceSlugs?: Insight['relatedServiceSlugs'];
      relatedProjectSlugs?: string[];
    };
    const docs = await fetchQuery<Doc[]>(insightsQuery, {}, ['content', 'insight']);
    return docs.map((d) => ({
      id: d._id,
      slug: d.slug,
      title: d.title,
      dek: d.dek,
      category: d.category,
      body: portableTextToBlocks(d.body, toImage),
      author: d.authorSlug
        ? { type: 'person' as const, personSlug: d.authorSlug }
        : { type: 'studio' as const },
      publishedAt: d.publishedAt,
      reviewedAt: d.reviewedAt ?? undefined,
      hero: toImage(d.hero) ?? fallbackImage(`${d.title} — image missing`),
      officialSources: d.officialSources ?? [],
      relatedServiceSlugs: d.relatedServiceSlugs ?? [],
      relatedProjectSlugs: d.relatedProjectSlugs ?? [],
      touchesRegulation: d.touchesRegulation ?? true,
      verificationStatus: d.verificationStatus,
      seo: d.seo,
    }));
  },
  async studioNotes() {
    type Doc = {
      _id: string;
      date: string;
      category: StudioNote['category'];
      shortText: string;
      media?: SanityImage;
      relatedProjectSlug?: string;
      optionalSocialURL?: string;
      published?: boolean;
    };
    const docs = await fetchQuery<Doc[]>(studioNotesQuery, {}, ['content', 'studioNote']);
    return docs.map((d) => ({
      id: d._id,
      date: d.date,
      category: d.category,
      text: d.shortText,
      media: toImage(d.media) ?? fallbackImage('Studio note image missing'),
      relatedProjectSlug: d.relatedProjectSlug ?? undefined,
      socialUrl: d.optionalSocialURL ?? undefined,
      published: Boolean(d.published),
    }));
  },
  async testimonials() {
    type Doc = Omit<Testimonial, 'id'> & { _id: string };
    const docs = await fetchQuery<Doc[]>(testimonialsQuery, {}, ['content', 'testimonial']);
    return docs.map((d) => ({ ...d, id: d._id }));
  },
  async legalDocument(type) {
    type Doc = {
      type: LegalDocument['type'];
      title: string;
      intro?: string;
      effectiveDate: string;
      reviewedAt: string;
      body?: PTNode[];
    } | null;
    const doc = await fetchQuery<Doc>(legalDocumentQuery, { type }, ['content', 'legalDocument']);
    if (!doc) return null;
    return {
      type: doc.type,
      title: doc.title,
      intro: doc.intro ?? '',
      effectiveDate: doc.effectiveDate,
      reviewedAt: doc.reviewedAt,
      body: portableTextToBlocks(doc.body, toImage),
    };
  },
};
