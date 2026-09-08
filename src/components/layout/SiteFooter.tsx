import Link from 'next/link';
import { Wordmark } from '@/components/brand/Wordmark';
import { navigation, site, socialLinks } from '@/lib/site';
import { OfficeAddress } from './OfficeAddress';

/** Deep Ink footer with Paper text. No telephone, no newsletter, no credentials. */
export function SiteFooter() {
  const socials = socialLinks();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-deep-ink text-paper" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="visually-hidden">
        Practice information
      </h2>
      <div className="container-site section-tight">
        <div className="grid-site">
          <div className="col-span-4 md:col-span-8 xl:col-span-5">
            <Link href="/" className="inline-flex text-paper" aria-label="Bracken & Roe — home">
              <Wordmark height={26} decorative />
            </Link>
            <p className="type-lead mt-5 text-paper/90">{site.positioning}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-flex min-h-11 items-center text-[1.0625rem] underline decoration-paper/40 underline-offset-[0.2em] hover:decoration-paper"
            >
              {site.email}
            </a>
            <OfficeAddress className="mt-8 text-paper/85" tone="dark" />
          </div>

          <nav
            className="col-span-4 mt-10 md:col-span-4 md:mt-0 xl:col-span-3 xl:col-start-8"
            aria-label="Footer"
          >
            <p className="type-label text-paper/60">Navigate</p>
            <ul className="mt-3 flex flex-col">
              {navigation.primary.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-[1.0625rem] hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-4 mt-6 md:col-span-4 md:mt-0 xl:col-span-2 xl:col-start-11">
            {socials.length > 0 ? (
              <>
                <p className="type-label text-paper/60">Elsewhere</p>
                <ul className="mt-3 flex flex-col">
                  {socials.map((s) => (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="inline-flex min-h-11 items-center text-[1.0625rem] hover:underline"
                      >
                        {s.label}
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            <p
              className={
                socials.length > 0 ? 'type-label mt-8 text-paper/60' : 'type-label text-paper/60'
              }
            >
              Legal
            </p>
            <ul className="mt-3 flex flex-col">
              {navigation.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-[1.0625rem] hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule-on-dark mt-12 pt-6">
          <p className="type-meta text-paper/60">
            © {year} {site.name}. Architecture rooted in Glasgow.
          </p>
        </div>
      </div>
    </footer>
  );
}
