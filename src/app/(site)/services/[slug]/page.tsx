import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/editorial/Breadcrumbs';
import { Button } from '@/components/editorial/Button';
import { Callout } from '@/components/editorial/Callout';
import { CTASection } from '@/components/editorial/CTASection';
import { InsightCard } from '@/components/editorial/InsightCard';
import { PageHero } from '@/components/editorial/PageHero';
import { SectionHeading } from '@/components/editorial/SectionHeading';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import {
  getInsightsForService,
  getProjectsForService,
  getService,
  getServices,
} from '@/lib/content';
import type { ServiceSlug } from '@/lib/content/types';
import { pageMetadata } from '@/lib/seo/metadata';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: 'Service not found', robots: { index: false, follow: false } };
  return pageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
  });
}

/**
 * Guidance notes that belong to one service only. They state what the practice prepares and
 * what it does not publish or promise; the consent decision is always the authority's.
 */
function serviceNote(slug: ServiceSlug): ReactNode {
  switch (slug) {
    case 'conservation-listed-buildings':
      return (
        <Callout title="Listed-building consent">
          <p>
            Where works affect the character of a listed building, listed-building consent is a
            separate consent from planning permission, and one may be needed without the other.
            Bracken & Roe prepares the drawings, schedules and supporting statements that an
            application relies on. The decision rests with the planning authority, and we do not
            promise an outcome.
          </p>
        </Callout>
      );
    case 'housing-retrofit':
      return (
        <Callout title="Performance figures">
          <p>
            Predicted U-values, EPC changes and energy savings are not published here unless they
            have been calculated for an actual project and approved for publication. Where a
            retrofit is described on this site, the description covers what was surveyed, detailed
            and built rather than a forecast of how the homes will perform.
          </p>
        </Callout>
      );
    default:
      return null;
  }
}

/** Heading in the first four columns, content at the reading measure in the remaining seven. */
function ProseSection({
  id,
  title,
  paragraphs,
  tight = true,
  children,
}: {
  id: string;
  title: string;
  paragraphs?: string[];
  tight?: boolean;
  children?: ReactNode;
}) {
  const copy = paragraphs ?? [];
  if (copy.length === 0 && !children) return null;
  return (
    <section
      className={tight ? 'section-tight rule' : 'section rule'}
      aria-labelledby={`${id}-heading`}
    >
      <div className="container-site">
        <div className="grid-site">
          <div className="col-span-4 md:col-span-8 xl:col-span-4">
            <h2 id={`${id}-heading`} className="type-h2">
              {title}
            </h2>
          </div>
          <div className="col-span-4 md:col-span-8 xl:col-span-7 xl:col-start-6">
            {children}
            {copy.length > 0 ? (
              <div className={children ? 'mt-10 space-y-5' : 'space-y-5'}>
                {copy.map((text, i) => (
                  <p key={i} className="type-body-lg measure text-ink/85">
                    {text}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const [projects, insights] = await Promise.all([
    getProjectsForService(service.slug),
    getInsightsForService(service.slug),
  ]);
  const note = serviceNote(service.slug);
  const supportingCopy = service.supportingCopy ?? [];

  return (
    <>
      <div className="container-site pt-6 md:pt-8">
        <Breadcrumbs items={[{ label: 'Services', href: '/services' }]} current={service.title} />
      </div>

      <PageHero
        eyebrow={`${service.number} · ${service.title}`}
        title={service.heroHeadline}
        image={service.image}
        lead={service.intro.map((text, i) => (
          <p key={i} className={i > 0 ? 'mt-6' : ''}>
            {text}
          </p>
        ))}
      />

      {/* What we do: the scope list in two columns, then any supporting copy and the page note. */}
      <ProseSection id="scope" title="What we do" tight={false}>
        <ul className="grid grid-cols-1 gap-x-8 md:grid-cols-2" role="list">
          {service.scope.map((item, i) => (
            <li
              key={`${i}-${item}`}
              className="type-body border-t border-ink/15 py-2.5 text-ink/90"
            >
              {item}
            </li>
          ))}
        </ul>
        {supportingCopy.length > 0 ? (
          <div className="mt-10 space-y-5">
            {supportingCopy.map((text, i) => (
              <p key={i} className="type-body-lg measure text-ink/85">
                {text}
              </p>
            ))}
          </div>
        ) : null}
        {note ? <div className="mt-10 max-w-[70ch]">{note}</div> : null}
      </ProseSection>

      {service.sections.map((section, i) => (
        <ProseSection
          key={`${i}-${section.title}`}
          id={`service-section-${i + 1}`}
          title={section.title}
          paragraphs={section.body}
        />
      ))}

      {/* Related projects */}
      {projects.length > 0 ? (
        <section className="section rule" aria-labelledby="related-projects-heading">
          <div className="container-site">
            <SectionHeading
              eyebrow="Projects"
              title="Related projects"
              id="related-projects-heading"
              action={
                <Button href="/projects" variant="text">
                  All projects
                </Button>
              }
            />
            <div className="mt-10">
              <ProjectGrid projects={projects} variant="index" headingLevel="h3" />
            </div>
          </div>
        </section>
      ) : null}

      {/* Related Insights */}
      {insights.length > 0 ? (
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
            <ul className="grid-site mt-10 gap-y-12" role="list">
              {insights.map((insight) => (
                <li key={insight.slug} className="col-span-4 md:col-span-4 xl:col-span-4">
                  <InsightCard insight={insight} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CTASection tight />
    </>
  );
}
