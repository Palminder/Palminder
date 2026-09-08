import type { Metadata } from 'next';
import { Button } from '@/components/editorial/Button';
import { Callout } from '@/components/editorial/Callout';
import { CTASection } from '@/components/editorial/CTASection';
import { PageHero } from '@/components/editorial/PageHero';
import { ProcessSequence } from '@/components/editorial/ProcessSequence';
import { SectionHeading } from '@/components/editorial/SectionHeading';
import { ServiceRow } from '@/components/editorial/ServiceRow';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { getFeaturedProjects, getServices } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Architectural Services in Glasgow | Bracken & Roe',
  description:
    'Feasibility, design, planning and listed-building-consent information, building-warrant drawings, specifications and construction support for homes, traditional buildings, housing programmes and small commercial and community spaces in Glasgow.',
  path: '/services',
});

export default async function ServicesPage() {
  const [services, featured] = await Promise.all([getServices(), getFeaturedProjects(4)]);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Architectural services for existing buildings, homes and neighbourhoods."
        narrow
        lead={
          <p>
            Projects begin at different points. Some need an early feasibility study; others need
            consent drawings, technical information or help turning a developed brief into
            construction work. Bracken & Roe can shape an appointment around the stage and
            complexity of the project.
          </p>
        }
      />

      {/* The four disciplines as full-width editorial rows. ServiceRow titles are H3s, so the section carries its own H2. */}
      <section className="section rule" aria-labelledby="disciplines-heading">
        <div className="container-site">
          <SectionHeading eyebrow="Disciplines" title="Four disciplines" id="disciplines-heading" />
          <div className="mt-10 border-b border-ink/20">
            {services.map((service) => (
              <ServiceRow key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <ProcessSequence />

      {/* Related projects */}
      {featured.length > 0 ? (
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
              <ProjectGrid projects={featured} variant="index" />
            </div>
          </div>
        </section>
      ) : null}

      {/* Scope of appointment: heading in the first four columns, the note in the remaining seven. */}
      <section className="section-tight rule" aria-labelledby="scope-heading">
        <div className="container-site">
          <div className="grid-site">
            <div className="col-span-4 md:col-span-8 xl:col-span-4">
              <h2 id="scope-heading" className="type-h3">
                Agreeing the scope
              </h2>
            </div>
            <div className="col-span-4 md:col-span-8 xl:col-span-7 xl:col-start-6">
              <Callout title="Consents and appointment">
                <p>
                  Not every project needs every statutory application. A small internal alteration
                  may need a building warrant but no planning permission; work that affects the
                  character of a listed building may need listed-building consent as well. Which
                  applications are likely to be relevant depends on the building and the work
                  proposed, and the decision on each rests with the authority.
                </p>
                <p>
                  The services required for a project are agreed with you before work begins, and
                  the appointment can be extended later if the project develops beyond its first
                  stage.
                </p>
              </Callout>
            </div>
          </div>
        </div>
      </section>

      <CTASection tight />
    </>
  );
}
