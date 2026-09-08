import type { Metadata } from 'next';
import { Button } from '@/components/editorial/Button';
import { PageHero } from '@/components/editorial/PageHero';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Enquiry received | Bracken & Roe',
  description: 'Your enquiry has been sent to Bracken & Roe. We’ll reply by email.',
  path: '/contact/thanks',
  noindex: true,
});

/** Confirmation page after a successful enquiry. The page itself is the confirmation; no live region is needed. */
export default function ContactThanksPage() {
  return (
    <PageHero
      title="Thank you. Your enquiry has been sent to Bracken & Roe."
      narrow
      lead={<p>We’ll reply by email.</p>}
    >
      <Button href="/projects">View projects</Button>
      <Button href="/" variant="secondary">
        Return home
      </Button>
    </PageHero>
  );
}
