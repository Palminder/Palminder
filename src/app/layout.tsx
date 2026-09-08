import type { Metadata, Viewport } from 'next';
import { draftMode } from 'next/headers';
import type { ReactNode } from 'react';
import '@/styles/globals.css';
import { fontClassName } from '@/styles/fonts';
import { SkipLink } from '@/components/layout/SkipLink';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { StagingNotice } from '@/components/layout/StagingNotice';
import { isProductionDeployment } from '@/lib/seo/metadata';
import { site, siteUrl } from '@/lib/site';

const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: 'Bracken & Roe | Architecture, Conservation & Retrofit in Glasgow',
    template: '%s | Bracken & Roe',
  },
  description: site.description,
  applicationName: site.name,
  robots: isProductionDeployment()
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: {
    icon: [
      { url: '/icons/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    siteName: site.name,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/brand/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Bracken & Roe — Architecture rooted in Glasgow.',
      },
    ],
  },
  formatDetection: { telephone: false, email: false, address: false },
};

/**
 * Pages render per request so that Next.js applies the per-request CSP nonce (from src/proxy.ts)
 * to its own inline scripts. Content reads remain cached and tag-revalidated in the content layer.
 */
export const dynamic = 'force-dynamic';

/** Draft preview is never indexable, whatever the deployment. */
export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  return isEnabled ? { ...baseMetadata, robots: { index: false, follow: false } } : baseMetadata;
}

export const viewport: Viewport = {
  themeColor: '#F3F0E8',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { isEnabled: isDraft } = await draftMode();
  return (
    <html lang="en-GB" className={fontClassName}>
      <body className="min-h-dvh bg-paper text-ink antialiased">
        <SkipLink />
        <StagingNotice />
        {isDraft ? (
          <div className="bg-moss text-paper" role="note">
            <p className="container-site type-meta flex flex-wrap items-center justify-between gap-3 py-2">
              <span>Draft preview is on. This view is not indexed.</span>
              <a href="/api/draft/disable" className="underline underline-offset-[0.2em]">
                Exit preview
              </a>
            </p>
          </div>
        ) : null}
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
