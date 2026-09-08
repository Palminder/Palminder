import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalPage } from '@/components/editorial/LegalPage';
import { getLegalDocument } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Cookies and Storage | Bracken & Roe',
  description:
    'The Bracken & Roe website sets no analytics, advertising or social cookies. This notice lists the essential storage it does use and why no consent banner is shown.',
  path: '/cookies',
});

export default async function CookiesPage() {
  const doc = await getLegalDocument('cookies');
  if (!doc) notFound();
  return <LegalPage doc={doc} />;
}
