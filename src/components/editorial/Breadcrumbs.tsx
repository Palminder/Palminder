import Link from 'next/link';
import type { Route } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/site';

export interface Crumb {
  label: string;
  href: Route;
}

interface BreadcrumbsProps {
  items: Crumb[];
  /** The current page (not linked). */
  current: string;
  className?: string;
}

/** Breadcrumb navigation with BreadcrumbList structured data. */
export function Breadcrumbs({ items, current, className }: BreadcrumbsProps) {
  const itemListElement = [
    ...items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
    { '@type': 'ListItem', position: items.length + 1, name: current },
  ];
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="type-meta flex flex-wrap items-center gap-x-2 gap-y-1 text-ink/75">
        {items.map((c) => (
          <li key={c.href} className="flex items-center gap-2">
            <Link
              href={c.href}
              className="inline-flex min-h-8 items-center underline decoration-ink/30 underline-offset-[0.2em] hover:decoration-ink"
            >
              {c.label}
            </Link>
            <span aria-hidden="true">/</span>
          </li>
        ))}
        <li aria-current="page" className="text-ink">
          {current}
        </li>
      </ol>
      <JsonLd
        data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement }}
      />
    </nav>
  );
}
