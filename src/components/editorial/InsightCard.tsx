import Link from 'next/link';
import type { Gated } from '@/lib/content';
import type { Insight } from '@/lib/content/types';
import { formatDate } from '@/lib/content/format';
import { readingTimeMinutes } from '@/lib/content/reading-time';
import { MediaFigure } from '@/components/media/MediaFigure';
import { StagingBadge } from '@/components/layout/StagingNotice';

interface InsightCardProps {
  insight: Gated<Insight>;
  withImage?: boolean;
  headingLevel?: 'h2' | 'h3';
}

/** Title, category, dek, publication and review dates and a real reading time. */
export function InsightCard({ insight, withImage = true, headingLevel: Tag = 'h3' }: InsightCardProps) {
  const minutes = readingTimeMinutes(insight.body);
  return (
    <article className="card-link flex flex-col">
      {withImage ? (
        <Link href={`/insights/${insight.slug}`} tabIndex={-1} aria-hidden="true" className="card-media block">
          <MediaFigure image={insight.hero} sizes="(min-width: 1200px) 30vw, (min-width: 768px) 45vw, 100vw" ratio="4/3" hideCaption />
        </Link>
      ) : null}
      <div className={withImage ? 'mt-5' : ''}>
        <p className="type-label text-moss">{insight.category}</p>
        {!insight.gate.publishable ? <StagingBadge reasons={insight.gate.reasons} className="mt-2" /> : null}
        <Tag className="type-h4 mt-3">
          <Link href={`/insights/${insight.slug}`} className="hover:underline focus-visible:underline">
            {insight.title}
          </Link>
        </Tag>
        <p className="type-body mt-3 text-ink/85">{insight.dek}</p>
        <p className="type-meta mt-4 text-ink/70">
          <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time>
          {insight.reviewedAt ? (
            <>
              <span aria-hidden="true"> · </span>
              <span>
                Reviewed <time dateTime={insight.reviewedAt}>{formatDate(insight.reviewedAt)}</time>
              </span>
            </>
          ) : null}
          <span aria-hidden="true"> · </span>
          <span>{minutes} min read</span>
        </p>
      </div>
    </article>
  );
}
