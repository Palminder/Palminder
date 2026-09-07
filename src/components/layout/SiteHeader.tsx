import Link from 'next/link';
import { Wordmark } from '@/components/brand/Wordmark';
import { navigation, site } from '@/lib/site';
import { MobileMenu } from './MobileMenu';
import { PrimaryNav } from './PrimaryNav';

/** Sticky Paper header with a 1px rule. Never placed over changing photography. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/20 bg-paper">
      <div className="container-site flex h-[68px] items-center justify-between lg:h-[84px]">
        <Link href="/" className="inline-flex min-h-11 items-center text-ink" aria-label="Bracken & Roe — home">
          <Wordmark height={22} decorative className="lg:hidden" />
          <Wordmark height={26} decorative className="hidden lg:block" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          <PrimaryNav items={navigation.primary} />
          <Link
            href={navigation.cta.href}
            className="inline-flex min-h-11 items-center border border-ink px-5 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper"
          >
            {navigation.cta.label}
          </Link>
        </nav>

        <MobileMenu
          primary={navigation.primary}
          services={navigation.services}
          cta={navigation.cta}
          email={site.email}
        />
      </div>
    </header>
  );
}
