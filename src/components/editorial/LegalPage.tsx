import type { LegalDocument } from '@/lib/content/types';
import { formatDate } from '@/lib/content/format';
import { RichText } from './RichText';

interface LegalPageProps {
  doc: LegalDocument;
  /** Small label above the title. */
  eyebrow?: string;
}

/**
 * Shared layout for the privacy, cookies and accessibility documents: title, lead, an
 * effective/reviewed meta line and the rich body, all in a single 44rem reading column.
 * No hero photography.
 */
export function LegalPage({ doc, eyebrow = 'Legal' }: LegalPageProps) {
  return (
    <article aria-labelledby="legal-heading">
      <div className="container-site pt-10 pb-12 md:pt-14 md:pb-16 xl:pt-20 xl:pb-24">
        <div className="mx-auto max-w-[44rem]">
          <header>
            <p className="type-label reveal text-moss">{eyebrow}</p>
            <h1 id="legal-heading" className="type-h1 reveal mt-4">
              {doc.title}
            </h1>
            {doc.intro ? (
              <p className="type-lead reveal reveal-delay mt-6 text-ink/85">{doc.intro}</p>
            ) : null}
            <p className="type-meta reveal reveal-delay mt-6 border-t border-ink/15 pt-5 text-ink/75">
              Effective <time dateTime={doc.effectiveDate}>{formatDate(doc.effectiveDate)}</time>
              <span aria-hidden="true"> · </span>
              <span className="visually-hidden">, </span>
              Last reviewed <time dateTime={doc.reviewedAt}>{formatDate(doc.reviewedAt)}</time>
            </p>
          </header>

          <div className="mt-10 md:mt-12">
            <RichText blocks={doc.body} />
          </div>
        </div>
      </div>
    </article>
  );
}
