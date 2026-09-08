import type { Metadata } from 'next';
import { OfficeBlock } from '@/components/editorial/OfficeBlock';
import { PageHero } from '@/components/editorial/PageHero';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { maxUploadBytes } from '@/lib/forms/enquiry/files';
import { uploadsEnabled } from '@/lib/security/malware-scan';
import { pageMetadata } from '@/lib/seo/metadata';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Bracken & Roe | Glasgow',
  description: `Send a project enquiry to Bracken & Roe, a Glasgow architectural practice, or email ${site.email}. Meetings by appointment.`,
  path: '/contact',
});

/** Outcomes the enquiry endpoint carries back on the URL after a non-JavaScript submission. */
const SERVER_OUTCOMES = ['error', '429', '403', '413', '415', 'unavailable'] as const;
type ServerOutcome = (typeof SERVER_OUTCOMES)[number];

function parseServerOutcome(value: string | string[] | undefined): ServerOutcome | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  return SERVER_OUTCOMES.find((outcome) => outcome === raw);
}

interface ContactPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const sp = await searchParams;
  const serverOutcome = parseServerOutcome(sp.enquiry);
  const maxUploadMb = Math.round(maxUploadBytes() / 1024 / 1024);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are working on."
        narrow
        lead={
          <p>
            A short note is enough to start. Tell us where the project is, what you are considering
            and the stage you have reached. We’ll reply by email.
          </p>
        }
      />

      {/* Enquiry: form in columns 1–7, office details in 9–12; a single column on mobile with the form first. */}
      <section id="project-enquiry" className="section rule" aria-labelledby="enquiry-heading">
        <div className="container-site">
          <div className="grid-site items-start">
            <div className="relative col-span-4 md:col-span-8 xl:col-span-7">
              <h2 id="enquiry-heading" className="type-h3">
                Project enquiry
              </h2>
              <div className="mt-8">
                <EnquiryForm
                  uploadsEnabled={uploadsEnabled()}
                  maxUploadMb={maxUploadMb}
                  serverOutcome={serverOutcome}
                />
              </div>
              <p className="type-body measure mt-10 text-ink/85">
                Every enquiry is read by the practice and answered by email. There is no need to
                have drawings or a fixed brief before getting in touch.
              </p>
            </div>
            <div className="col-span-4 mt-10 border-t border-ink/20 pt-8 md:col-span-8 xl:col-span-4 xl:col-start-9 xl:mt-0 xl:border-0 xl:pt-0">
              <OfficeBlock />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
