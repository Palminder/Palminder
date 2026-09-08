import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LegalPage } from '@/components/editorial/LegalPage';
import { getLegalDocument } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Accessibility Statement | Bracken & Roe',
  description:
    'Bracken & Roe aims to meet WCAG 2.2 AA on this website. What has been done, the limitations we know about and how to report a problem.',
  path: '/accessibility',
});

export default async function AccessibilityPage() {
  const doc = await getLegalDocument('accessibility');
  if (!doc) notFound();
  return <LegalPage doc={doc} />;
}
