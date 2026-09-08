import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleMeta } from '@/components/editorial/ArticleMeta';
import { Breadcrumbs } from '@/components/editorial/Breadcrumbs';
import { Button } from '@/components/editorial/Button';
import { Callout } from '@/components/editorial/Callout';
import { CTASection } from '@/components/editorial/CTASection';
import { InsightCard } from '@/components/editorial/InsightCard';
import { RichText } from '@/components/editorial/RichText';
import { SectionHeading } from '@/components/editorial/SectionHeading';
import { MediaFigure } from '@/components/media/MediaFigure';
import { JsonLd } from '@/components/seo/JsonLd';
import { getInsight, getInsights, getServices, getTeam, type Gated } from '@/lib/content';
import type { ImageAsset, Insight, Person, Service } from '@/lib/content/types';
import { pageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl, site } from '@/lib/site';

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

/** The hero sits in a 64rem column, so it never renders wider than 1024px. */
const HERO_SIZES = '(min-width:1024px) 1024px, 100vw';

/** Studio byline used whenever an article has no verified named author. */
const STUDIO_AUTHOR = 'Bracken & Roe Studio';

const GUIDANCE_NOTE =
  'This article provides general architectural guidance rather than advice for a specific property. Consent and technical requirements depend on the building, location and proposed work.';

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return { title: 'Article not found', robots: { index: false, follow: false } };
  return pageMetadata({
    title: insight.seo?.title ?? `${insight.title} | Bracken & Roe`,
    description: insight.seo?.description ?? insight.dek,
    path: `/insights/${insight.slug}`,
    type: 'article',
    publishedTime: insight.publishedAt,
    modifiedTime: insight.reviewedAt ?? insight.publishedAt,
    hasGeneratedImage: true,
  });
}

/** Absolute URL for the article hero. */
function heroUrl(image: ImageAsset): string {
  return /^https?:\/\//.test(image.src) ? image.src : absoluteUrl(image.src);
}

/**
 * A named author is shown only when that person's record has passed the publication gate;
 * otherwise the article is credited to the studio.
 */
async function resolveAuthor(
  insight: Insight,
): Promise<{ name: string; person: Gated<Person> | null }> {
  const author = insight.author;
  if (author.type === 'person') {
    const team = await getTeam();
    const person = team.find((p) => p.slug === author.personSlug) ?? null;
    if (person?.gate.publishable) return { name: person.name, person };
  }
  return { name: STUDIO_AUTHOR, person: null };
}

/** Other notes, preferring those that share a service with the current article. */
function pickRelated(all: Gated<Insight>[], current: Gated<Insight>, limit = 3): Gated<Insight>[] {
  const others = all.filter((i) => i.slug !== current.slug);
  const shared = others.filter((i) =>
    i.relatedServiceSlugs.some((s) => current.relatedServiceSlugs.includes(s)),
  );
  const rest = others.filter((i) => !shared.includes(i));
  return [...shared, ...rest].slice(0, limit);
}

function articleJsonLd(
  insight: Insight,
  canonical: string,
  person: Gated<Person> | null,
): Record<string, unknown> {
  const image = heroUrl(insight.hero);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.title,
    description: insight.dek,
    datePublished: insight.publishedAt,
    dateModified: insight.reviewedAt ?? insight.publishedAt,
    author: person
      ? { '@type': 'Person', name: person.name }
      : { '@type': 'Organization', name: site.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/icons/icon-512.png') },
    },
    ...(image ? { image } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();

  const [{ name: authorName, person }, services, allInsights] = await Promise.all([
    resolveAuthor(insight),
    getServices(),
    getInsights(),
  ]);

  const canonical = absoluteUrl(`/insights/${insight.slug}`);
  const relatedServices = insight.relatedServiceSlugs
    .map((s) => services.find((service) => service.slug === s))
    .filter((s): s is Service => Boolean(s));
  const relatedNotes = pickRelated(allInsights, insight);
  const sources = insight.officialSources;

  return (
    <>
      <JsonLd data={articleJsonLd(insight, canonical, person)} />

      <article aria-labelledby="article-heading">
        <div className="container-site pt-6 md:pt-8">
          {/* 1–6: breadcrumbs, category, title, dek, byline and metadata in the reading column */}
          <div className="mx-auto max-w-[44rem]">
            <Breadcrumbs
              items={[{ label: 'Insights', href: '/insights' }]}
              current={insight.title}
            />

            <header className="mt-8 md:mt-10">
              <p className="type-label text-moss">{insight.category}</p>
              <h1 id="article-heading" className="type-h1 mt-4">
                {insight.title}
              </h1>
              <p className="type-lead mt-6 text-ink/85">{insight.dek}</p>
              <p className="type-body mt-6 text-ink/85">
                By <span className="font-medium text-ink">{authorName}</span>
                {person ? `, ${person.rolePublic}` : null}
              </p>
              <div className="mt-5 border-t border-ink/15 pt-5">
                <ArticleMeta insight={insight} authorName={authorName} />
              </div>
            </header>
          </div>

          {/* 7: hero in the wider column */}
          <div className="mx-auto mt-10 max-w-[64rem] md:mt-12">
            <MediaFigure image={insight.hero} sizes={HERO_SIZES} priority fetchPriority="high" />
          </div>

          {/* 8–9: body and the guidance note */}
          <div className="mx-auto mt-10 max-w-[44rem] pb-[var(--section-tight)] md:mt-14">
            <RichText blocks={insight.body} />
            <div className="mt-12">
              <Callout title="A note on this guidance">
                <p>{GUIDANCE_NOTE}</p>
              </Callout>
            </div>
          </div>
        </div>

        {/* 10: official sources */}
        {sources.length > 0 ? (
          <section className="section-tight rule" aria-labelledby="sources-heading">
            <div className="container-site">
              <div className="mx-auto max-w-[44rem]">
                <h2 id="sources-heading" className="type-h3">
                  Sources and further reading
                </h2>
                <ul className="mt-6" role="list">
                  {sources.map((source, i) => (
                    <li
                      key={`${i}-${source.href}`}
                      className="border-t border-ink/15 py-4 first:border-t-0 first:pt-0"
                    >
                      <a
                        href={source.href}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="type-body inline-flex min-h-11 items-center text-ink underline decoration-ink/40 underline-offset-[0.2em] hover:decoration-ink"
                      >
                        {source.label}
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </a>
                      <p className="type-meta mt-1 text-ink/75">{source.publisher}</p>
                      {source.note ? (
                        <p className="type-body mt-2 text-ink/85">{source.note}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}
      </article>

      {/* 11: related service */}
      {relatedServices.length > 0 ? (
        <section className="section-tight rule" aria-labelledby="related-service-heading">
          <div className="container-site">
            <div className="mx-auto max-w-[44rem]">
              <h2 id="related-service-heading" className="type-h3">
                Related service
              </h2>
              <ul className="mt-6" role="list">
                {relatedServices.map((service) => (
                  <li
                    key={service.slug}
                    className="border-t border-ink/15 py-5 first:border-t-0 first:pt-0"
                  >
                    <p className="type-body-lg text-ink/85">{service.summary}</p>
                    <div className="mt-4">
                      <Button href={`/services/${service.slug}`} variant="text">
                        {service.title}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {/* 12: related notes */}
      {relatedNotes.length > 0 ? (
        <section className="section rule" aria-labelledby="related-notes-heading">
          <div className="container-site">
            <SectionHeading
              eyebrow="Insights"
              title="Related notes"
              id="related-notes-heading"
              action={
                <Button href="/insights" variant="text">
                  View all Insights
                </Button>
              }
            />
            <ul className="grid-site mt-10 gap-y-10" role="list">
              {relatedNotes.map((note) => (
                <li key={note.slug} className="col-span-4 md:col-span-4 xl:col-span-4">
                  <InsightCard insight={note} withImage={false} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 13 */}
      <CTASection tight />
    </>
  );
}
