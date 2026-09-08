import { absoluteUrl, site, socialLinks } from '@/lib/site';

/**
 * Organization structured data. Deliberately general (not LocalBusiness): the office is
 * by appointment, so no opening hours, reception or telephone are claimed.
 */
export function organizationJsonLd(): Record<string, unknown> {
  const sameAs = socialLinks().map((s) => s.href);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/icons/icon-512.png'),
    email: site.email,
    description: site.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: 'Scotland',
      postalCode: site.address.postcode,
      addressCountry: site.address.countryCode,
    },
    areaServed: [
      { '@type': 'City', name: 'Glasgow' },
      { '@type': 'AdministrativeArea', name: 'Scotland' },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}
