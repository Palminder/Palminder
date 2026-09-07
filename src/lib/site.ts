/**
 * Fixed brand facts. These are the single source of truth for the name, domain,
 * public email and office address. No telephone number exists and none may be added.
 */
export const site = {
  name: 'Bracken & Roe',
  legalNameConfirmed: false, // set true only once the legal entity name has been confirmed
  domain: 'brackenroe.co.uk',
  email: 'studio@brackenroe.co.uk',
  positioning: 'Architecture rooted in Glasgow.',
  proposition:
    'Bracken & Roe is a Glasgow architectural practice working across residential design, conservation and listed buildings, housing retrofit, and selected commercial and community projects. We combine careful design with a practical understanding of existing buildings, technical delivery and the consent process.',
  promise: 'Careful design. Clear technical thinking. Respect for what is already there.',
  description:
    'Glasgow architectural practice for residential projects, conservation and listed buildings, housing retrofit, and selected commercial and community work.',
  address: {
    name: 'Bracken & Roe',
    line1: 'Office 1810',
    line2: '3 Fitzroy Place, 1/1 Sauchiehall Street',
    locality: 'Finnieston',
    city: 'Glasgow',
    postcode: 'G3 7RH',
    country: 'United Kingdom',
    countryCode: 'GB',
    appointmentNote: 'Meetings by appointment.',
  },
  locale: 'en-GB',
} as const;

export type SiteAddress = typeof site.address;

/** Canonical origin without trailing slash. */
export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/+$/, '');
  if (process.env.VERCEL_ENV === 'production') return `https://${site.domain}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export function absoluteUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl()}${p === '/' ? '' : p.replace(/\/+$/, '')}`;
}

/** Social links render only when a real URL is configured. */
export function socialLinks(): { label: string; href: string; id: 'instagram' | 'linkedin' }[] {
  const out: { label: string; href: string; id: 'instagram' | 'linkedin' }[] = [];
  const ig = process.env.SOCIAL_INSTAGRAM_URL?.trim();
  const li = process.env.SOCIAL_LINKEDIN_URL?.trim();
  if (ig && /^https:\/\//.test(ig)) out.push({ id: 'instagram', label: 'Instagram', href: ig });
  if (li && /^https:\/\//.test(li)) out.push({ id: 'linkedin', label: 'LinkedIn', href: li });
  return out;
}

/** External maps link generated from the supplied address; never an embedded map. */
export function mapsLink(): string {
  const a = site.address;
  const q = encodeURIComponent(`${a.line2}, ${a.city} ${a.postcode}, ${a.country}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export const navigation = {
  primary: [
    { label: 'Projects', href: '/projects' },
    { label: 'Services', href: '/services' },
    { label: 'Practice', href: '/practice' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: { label: 'Discuss a project', href: '/contact#project-enquiry' },
  services: [
    { label: 'Residential', href: '/services/residential' },
    { label: 'Conservation & Listed Buildings', href: '/services/conservation-listed-buildings' },
    { label: 'Housing & Retrofit', href: '/services/housing-retrofit' },
    { label: 'Commercial & Community', href: '/services/commercial-community' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
} as const;
