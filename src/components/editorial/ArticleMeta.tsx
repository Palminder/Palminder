import type { Insight } from '@/lib/content/types';
import { formatDate } from '@/lib/content/format';
import { readingTimeMinutes } from '@/lib/content/reading-time';

interface ArticleMetaProps {
  insight: Insight;
  authorName: string;
}

/** Author, publication date, review date and reading time computed from the word count. */
export function ArticleMeta({ insight, authorName }: ArticleMetaProps) {
  const minutes = readingTimeMinutes(insight.body);
  return (
    <dl className="type-meta grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-ink/75">
      <dt className="font-medium text-ink">Author</dt>
      <dd>{authorName}</dd>
      <dt className="font-medium text-ink">Published</dt>
      <dd>
        <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time>
      </dd>
      {insight.reviewedAt ? (
        <>
          <dt className="font-medium text-ink">Last reviewed</dt>
          <dd>
            <time dateTime={insight.reviewedAt}>{formatDate(insight.reviewedAt)}</time>
          </dd>
        </>
      ) : null}
      <dt className="font-medium text-ink">Reading time</dt>
      <dd>{minutes} min</dd>
    </dl>
  );
}
