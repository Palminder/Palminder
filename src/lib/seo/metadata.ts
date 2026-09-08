import type { Metadata } from 'next';
import { absoluteUrl, site } from '@/lib/site';
import { isProductionDeployment } from '@/lib/env';

interface PageMetadataInput {
  title: string;
  description: string;
  /** Canonical path without trailing slash, e.g. "/projects/kelvinside-garden-room". */
  path: string;
  noindex?: boolean;
  image?: { url: string; width: number; height: number; alt: string };
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  /**
   * The route has a sibling `opengraph-image.tsx`. Next.js applies that generated image only when
   * the page metadata leaves `openGraph.images` unset, so no default image is written here.
   */
  hasGeneratedImage?: boolean;
}

export { isProductionDeployment } from '@/lib/env';

/** Per-page metadata with a self-canonical URL and consistent Open Graph output. */
export function pageMetadata(input: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(input.path);
  const image =
    input.image ??
    (input.hasGeneratedImage
      ? undefined
      : {
          url: absoluteUrl('/brand/og-default.png'),
          width: 1200,
          height: 630,
          alt: 'Bracken & Roe — Architecture rooted in Glasgow.',
        });
  const blocked = input.noindex || !isProductionDeployment();
  return {
    title: { absolute: input.title },
    description: input.description,
    alternates: { canonical },
    robots: blocked ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: site.name,
      locale: 'en_GB',
      type: input.type ?? 'website',
      ...(image ? { images: [image] } : {}),
      ...(input.type === 'article'
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      ...(image ? { images: [image.url] } : {}),
    },
  };
}
