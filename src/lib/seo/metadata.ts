import type { Metadata } from 'next';
import { absoluteUrl, site } from '@/lib/site';

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
}

export function isProductionDeployment(): boolean {
  return process.env.VERCEL_ENV === 'production';
}

/** Per-page metadata with a self-canonical URL and consistent Open Graph output. */
export function pageMetadata(input: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(input.path);
  const image = input.image ?? {
    url: absoluteUrl('/brand/og-default.png'),
    width: 1200,
    height: 630,
    alt: 'Bracken & Roe — Architecture rooted in Glasgow.',
  };
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
      images: [image],
      ...(input.type === 'article'
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime }
        : {}),
    },
    twitter: { card: 'summary_large_image', title: input.title, description: input.description, images: [image.url] },
  };
}
