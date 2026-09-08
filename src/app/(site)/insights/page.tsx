import type { Metadata } from 'next';
import { CTASection } from '@/components/editorial/CTASection';
import { EmptyState } from '@/components/editorial/EmptyState';
import { InsightCard } from '@/components/editorial/InsightCard';
import { PageHero } from '@/components/editorial/PageHero';
import { getInsights } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Insights | Bracken & Roe',
  description:
    'Practical notes from Bracken & Roe on altering, repairing and improving buildings in Glasgow and across Scotland: tenements, consents, listed buildings, masonry repair, retrofit and ventilation.',
  path: '/insights',
});

export default async function InsightsPage() {
  const insights = await getInsights();

  return (
    <>
      <PageHero
        title="Insights"
        narrow
        lead="Practical notes on altering, repairing and improving buildings in Glasgow and across Scotland."
      />

      {/* Three columns from 1200px, two from 768px, one below. */}
      <section className="section-tight rule" aria-labelledby="insights-list-heading">
        <div className="container-site">
          <h2 id="insights-list-heading" className="visually-hidden">
            All Insights
          </h2>
          {insights.length > 0 ? (
            <ul className="grid-site gap-y-12 md:gap-y-14" role="list">
              {insights.map((insight) => (
                <li key={insight.slug} className="col-span-4 md:col-span-4 xl:col-span-4">
                  <InsightCard insight={insight} headingLevel="h2" />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Notes will appear here as they are reviewed."
              body="Each article is checked by the practice before it is published. In the meantime, the services pages describe how we approach existing buildings, and you are welcome to get in touch about a project of your own."
            />
          )}
        </div>
      </section>

      <CTASection tight />
    </>
  );
}
