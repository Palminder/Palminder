import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalPage } from '@/components/editorial/LegalPage';
import { getLegalDocument } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Notice | Bracken & Roe',
  description:
    'How Bracken & Roe handles personal information sent through this website: what is collected, why, who processes it and your rights under UK data protection law.',
  path: '/privacy',
});

export default async function PrivacyPage() {
  const doc = await getLegalDocument('privacy');
  if (!doc) notFound();
  return <LegalPage doc={doc} />;
}
