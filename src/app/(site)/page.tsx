import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/editorial/Button';
import { CTASection } from '@/components/editorial/CTASection';
import { EditorialIntro } from '@/components/editorial/EditorialIntro';
import { InsightCard } from '@/components/editorial/InsightCard';
import { ProcessSequence } from '@/components/editorial/ProcessSequence';
import { SectionHeading } from '@/components/editorial/SectionHeading';
import { ServiceRow } from '@/components/editorial/ServiceRow';
import { StudioNoteCard } from '@/components/editorial/StudioNoteCard';
import { TeamCard } from '@/components/editorial/TeamCard';
import { Testimonials } from '@/components/editorial/Testimonial';
import { MaterialField } from '@/components/media/MaterialField';
import { MediaFigure } from '@/components/media/MediaFigure';
import { DrawingFigure } from '@/components/media/DrawingFigure';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { JsonLd } from '@/components/seo/JsonLd';
import { placeholder } from '@/content/seed/placeholders';
import {
  getFeaturedProjects,
  getInsights,
  getProjects,
  getServices,
  getStudioNotes,
  getTeam,
  getTestimonials,
  stagingImage,
} from '@/lib/content';
import { organizationJsonLd } from '@/lib/seo/organization';
import { pageMetadata } from '@/lib/seo/metadata';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Bracken & Roe | Architecture, Conservation & Retrofit in Glasgow',
  description: site.description,
  path: '/',
});

/**
 * Staging hero image. Production must use a strong verified Bracken & Roe project image;
 * until then this licensed-context slot is a labelled placeholder and is never captioned as practice work.
 */
const heroImage = placeholder(
  '16x10',
  'sandstone',
  'Verified project photograph or licensed Glasgow context image — never captioned as practice work',
);
const conservationImage = placeholder(
  '4x5',
  'stone',
  'Close masonry photograph: sandstone, lime joints and a window reveal',
  { mediaType: 'placeholder' },
);
const housingImage = placeholder(
  '4x3',
  'moss',
  'Occupied housing context image for the retrofit section',
);

export default async function HomePage() {
  const [featured, services, team, insights, notes, testimonials, allProjects] = await Promise.all([
    getFeaturedProjects(4),
    getServices(),
    getTeam(),
    getInsights(),
    getStudioNotes(4),
    getTestimonials(),
    getProjects(),
  ]);
  const housingDrawing = allProjects.find(
    (p) => p.slug === 'north-glasgow-window-ventilation-programme',
  )?.drawings[1];
  const teamTeaser = team.filter((p) => p.gate.publishable).slice(0, 3);
  // Staging placeholders never reach production; a material field stands in until verified photography exists.
  const hero = stagingImage(heroImage);
  const conservation = stagingImage(conservationImage);
  const housing = stagingImage(housingImage);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      {/* Hero: copy in columns 1–5, image in 6–12 extending toward the viewport edge. */}
      <section
        className="container-site pt-10 pb-12 md:pt-14 md:pb-16 xl:pt-20 xl:pb-24"
        aria-labelledby="hero-heading"
      >
        <div className="grid-site items-center">
          <div className="col-span-4 md:col-span-8 xl:col-span-5">
            <p className="type-label reveal text-moss">Glasgow architectural practice</p>
            <h1 id="hero-heading" className="type-display reveal mt-5">
              {site.positioning}
            </h1>
            <p className="type-lead reveal reveal-delay measure mt-7 text-ink/85">
              Bracken & Roe works across residential design, conservation and listed buildings,
              housing retrofit, and selected commercial and community projects. We bring careful
              design and practical technical knowledge to existing buildings and new interventions.
            </p>
            <div className="reveal reveal-delay mt-9 flex flex-wrap gap-4">
              <Button href="/contact#project-enquiry">Discuss a project</Button>
              <Button href="/projects" variant="secondary">
                View our work
              </Button>
            </div>
          </div>
          <div className="col-span-4 mt-10 md:col-span-8 xl:col-span-7 xl:mt-0 xl:-mr-[var(--gutter)] 2xl:-mr-[calc((100vw-var(--site-max))/2)]">
            {hero ? (
              <MediaFigure
                image={hero}
                sizes="(min-width: 1200px) 60vw, 100vw"
                priority
                fetchPriority="high"
                ratio="16/10"
                hideCaption
              />
            ) : (
              <MaterialField ratio="16/10" />
            )}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section rule" aria-labelledby="intro-heading">
        <div className="container-site">
          <EditorialIntro
            eyebrow="The practice"
            heading="Working with what is already there."
            link={
              <Button href="/practice" variant="text">
                About the practice
              </Button>
            }
          >
            <p>
              Much of our work begins with an existing building: a sandstone house that needs to
              adapt, a tenement flat with a difficult plan, a listed façade requiring repair, or
              homes that need fabric and ventilation improvements. We start by understanding the
              building before deciding what should change.
            </p>
            <p>
              That approach carries through from early feasibility and consent to building-warrant
              information, detailed drawings, specifications and construction support.
            </p>
          </EditorialIntro>
        </div>
      </section>

      {/* Services: four full-width editorial rows */}
      <section className="section rule" aria-labelledby="services-heading">
        <div className="container-site">
          <SectionHeading
            eyebrow="Services"
            title="Four disciplines, one approach to existing buildings."
            id="services-heading"
            action={
              <Button href="/services" variant="text">
                All services
              </Button>
            }
          />
          <div className="mt-10 border-b border-ink/20">
            {services.map((service) => (
              <ServiceRow key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Selected work: rendered only when verified projects exist */}
      {featured.length > 0 ? (
        <section className="section rule" aria-labelledby="work-heading">
          <div className="container-site">
            <SectionHeading
              eyebrow="Projects"
              title="Selected work"
              id="work-heading"
              action={
                <Button href="/projects" variant="text">
                  All projects
                </Button>
              }
            />
            <div className="mt-10">
              <ProjectGrid projects={featured} variant="featured" />
            </div>
          </div>
        </section>
      ) : null}

      {/* Conservation: masonry photograph beside text */}
      <section className="section rule" aria-labelledby="conservation-heading">
        <div className="container-site">
          <div className="grid-site items-center">
            <div className="col-span-4 md:col-span-8 xl:col-span-5">
              {conservation ? (
                <MediaFigure
                  image={conservation}
                  sizes="(min-width: 1200px) 40vw, 100vw"
                  ratio="4/5"
                  hideCaption
                />
              ) : (
                <MaterialField ratio="4/5" tone="stone" />
              )}
            </div>
            <div className="col-span-4 mt-8 md:col-span-8 xl:col-span-6 xl:col-start-7 xl:mt-0">
              <p className="type-label text-moss">Conservation</p>
              <h2 id="conservation-heading" className="type-h2 mt-4">
                Care for existing fabric
              </h2>
              <p className="type-body-lg measure mt-6 text-ink/85">
                Traditional buildings rarely benefit from a one-size-fits-all response. We look
                first at significance, condition, moisture, previous repairs and how the building
                has been put together. Alterations and repairs can then be designed to retain useful
                original fabric while addressing the practical requirements of continued use.
              </p>
              <div className="mt-8">
                <Button href="/services/conservation-listed-buildings" variant="text">
                  Conservation & listed buildings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Housing and retrofit: technical drawing beside context image */}
      <section className="section rule" aria-labelledby="housing-heading">
        <div className="container-site">
          <div className="grid-site items-start">
            <div className="col-span-4 md:col-span-8 xl:col-span-6">
              <p className="type-label text-moss">Housing & retrofit</p>
              <h2 id="housing-heading" className="type-h2 mt-4">
                Housing work that considers the whole building
              </h2>
              <p className="type-body-lg measure mt-6 text-ink/85">
                Window replacement, insulation and airtightness measures do not sit in isolation.
                Survey information, junctions, existing defects, ventilation, resident access and
                repeatable details all influence whether an upgrade works in practice.
              </p>
              <div className="mt-8">
                <Button href="/services/housing-retrofit" variant="text">
                  Housing & retrofit
                </Button>
              </div>
              <div className="mt-10">
                {housing ? (
                  <MediaFigure
                    image={housing}
                    sizes="(min-width: 1200px) 45vw, 100vw"
                    ratio="4/3"
                    hideCaption
                  />
                ) : (
                  <MaterialField ratio="4/3" tone="stone" />
                )}
              </div>
            </div>
            <div className="col-span-4 mt-8 md:col-span-8 xl:col-span-5 xl:col-start-8 xl:mt-0">
              {housingDrawing ? (
                <DrawingFigure image={housingDrawing} sizes="(min-width: 1200px) 40vw, 100vw" />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Practice */}
      <section className="section rule" aria-labelledby="practice-heading">
        <div className="container-site">
          <EditorialIntro
            eyebrow="Practice"
            heading="Small enough to stay close to the work."
            link={
              <Button href="/practice" variant="text">
                Meet the practice
              </Button>
            }
          >
            <p>
              Bracken & Roe is structured as a small practice rather than a large multidisciplinary
              office. Design, survey information and technical decisions remain closely connected
              throughout a project, with specialist consultants brought into the team where the work
              requires them.
            </p>
          </EditorialIntro>
          {teamTeaser.length === 3 ? (
            <ul className="mt-12 hidden grid-cols-3 gap-[var(--gap)] lg:grid" role="list">
              {teamTeaser.map((person) => (
                <li key={person.slug}>
                  <TeamCard person={person} compact />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <ProcessSequence />

      <Testimonials items={testimonials} />

      {/* Insights */}
      {insights.length > 0 ? (
        <section className="section rule" aria-labelledby="insights-heading">
          <div className="container-site">
            <SectionHeading
              eyebrow="Insights"
              title="Practical notes on Glasgow’s buildings"
              id="insights-heading"
              action={
                <Button href="/insights" variant="text">
                  View all Insights
                </Button>
              }
            />
            <ul className="grid-site mt-10 gap-y-12" role="list">
              {insights.slice(0, 3).map((insight) => (
                <li key={insight.slug} className="col-span-4 md:col-span-4 xl:col-span-4">
                  <InsightCard insight={insight} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* From the Studio */}
      {notes.length > 0 ? (
        <section className="section rule" aria-labelledby="studio-heading">
          <div className="container-site">
            <SectionHeading
              eyebrow="From the studio"
              title="Notes from current work"
              id="studio-heading"
            />
            <ul className="grid-site mt-10 gap-y-10" role="list">
              {notes.map((note) => (
                <li key={note.id} className="col-span-4 sm:col-span-2 md:col-span-4 xl:col-span-3">
                  <StudioNoteCard note={note} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CTASection />

      <p className="visually-hidden">
        <Link href="/contact">Contact Bracken & Roe</Link>
      </p>
    </>
  );
}
