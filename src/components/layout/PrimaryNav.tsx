'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';

interface NavItem {
  label: string;
  href: Route;
}

export function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop navigation with aria-current on the active section. */
export function PrimaryNav({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-7">
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className="nav-link type-meta inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-ink"
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
