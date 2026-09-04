import { site } from '@/data/site';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function pageTitle(title?: string): string {
  if (!title) return `${site.name} · ${site.headline}`;
  return `${title} · ${site.name}`;
}

export function absoluteUrl(path: string, base: URL | undefined): string {
  const origin = base ?? new URL('http://localhost:4321');
  return new URL(path, origin).toString();
}

export function personJsonLd(base: URL | undefined): Record<string, unknown> {
  const sameAs = [site.contact.linkedin, site.contact.github].filter((value): value is string =>
    Boolean(value),
  );
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.headline,
    url: absoluteUrl('/', base),
    address: {
      '@type': 'PostalAddress',
      addressRegion: site.region,
      addressCountry: site.country,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    knowsAbout: [
      'Endpoint management',
      'Microsoft 365',
      'Identity and access',
      'Azure',
      'Automation',
    ],
  };
}

export function websiteJsonLd(base: URL | undefined): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: absoluteUrl('/', base),
    inLanguage: site.locale,
    about: { '@type': 'Person', name: site.name },
  };
}

export function breadcrumbJsonLd(
  items: BreadcrumbItem[],
  base: URL | undefined,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href, base),
    })),
  };
}

export interface CreativeWorkInput {
  name: string;
  description: string;
  path: string;
  dateCreated: Date;
  dateModified: Date;
  datePublished?: Date | undefined;
  keywords: string[];
  genre: string;
}

export function creativeWorkJsonLd(
  input: CreativeWorkInput,
  base: URL | undefined,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path, base),
    inLanguage: site.locale,
    genre: input.genre,
    keywords: input.keywords.join(', '),
    dateCreated: input.dateCreated.toISOString().slice(0, 10),
    dateModified: input.dateModified.toISOString().slice(0, 10),
    ...(input.datePublished
      ? { datePublished: input.datePublished.toISOString().slice(0, 10) }
      : {}),
    author: { '@type': 'Person', name: site.name },
  };
}
