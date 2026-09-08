import type { Metadata } from 'next';
import { Button } from '@/components/editorial/Button';
import { CTASection } from '@/components/editorial/CTASection';
import { EmptyState } from '@/components/editorial/EmptyState';
import { OfficeBlock } from '@/components/editorial/OfficeBlock';
import { PageHero } from '@/components/editorial/PageHero';
import { SectionHeading } from '@/components/editorial/SectionHeading';
import { TeamCard } from '@/components/editorial/TeamCard';
import { ImagePair } from '@/components/media/ImagePair';
import { JsonLd } from '@/components/seo/JsonLd';
import { illustration } from '@/content/seed/media';
import { getSocialLinks, getTeam } from '@/lib/content';
import { pageMetadata } from '@/lib/seo/metadata';
import { organizationJsonLd } from '@/lib/seo/organization';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Practice | Bracken & Roe, Glasgow',
  description:
    'Bracken & Roe is a small architectural practice in Glasgow: how we work, who is in the team and where the office is.',
  path: '/practice',
});

/** Three working principles. Editorial, not corporate values: serif heading and one line each. */
const principles = [
  {
    title: 'Read the building.',
    line: 'Survey, fabric and context come before a preconceived solution.',
  },
  {
    title: 'Make the process legible.',
    line: 'Clients should understand what is being decided, what requires consent and what information is needed next.',
  },
  {
    title: 'Detail for long life.',
    line: 'Materials and junctions should make sense for the building, the weather and future maintenance.',
  },
];

/** Working-method imagery: at the drawing board and on site. */
const drawingBoardImage = illustration(
  'drawing-board-overlay',
  'context',
  'A drawing board seen from above: a floor plan on paper with a tracing-paper overlay of the proposal, a scale rule and a pencil.',
  {
    caption: 'At the drawing board: existing survey and proposed plans overlaid on tracing paper.',
  },
);
const siteInspectionImage = illustration(
  'site-inspection-reveal',
  'context',
  'A sandstone wall with an area of the outer stone opened up to show its construction, with a ladder against it.',
  { caption: 'On site: opening up the fabric to check a detail against what is actually there.' },
);

export default async function PracticePage() {
  const team = await getTeam();

  return (
    <>
      <JsonLd data={organizationJsonLd(await getSocialLinks())} />

      <PageHero
        eyebrow="Practice"
        title="A small practice with a close understanding of Glasgow’s buildings."
        narrow
        lead={
          <>
            <p>
              Bracken & Roe works across private homes, traditional and listed buildings, housing
              programmes, and selected community and commercial spaces. Much of that work involves
              making careful decisions about buildings that already have a history, structure and
              material character.
            </p>
            <p className="mt-6">
              We combine architectural design with the less visible work that makes projects viable:
              measured information, consent strategy, technical coordination, details,
              specifications and communication with the wider project team.
            </p>
          </>
        }
      />

      {/* Principles: three columns of serif H3 and one line, separated by rules. */}
      <section className="section rule" aria-labelledby="principles-heading">
        <div className="container-site">
          <SectionHeading eyebrow="Approach" title="Three principles" id="principles-heading" />
          <ul
            className="mt-10 grid grid-cols-1 gap-x-[var(--gap)] gap-y-8 lg:grid-cols-3"
            role="list"
          >
            {principles.map((principle) => (
              <li key={principle.title} className="border-t border-ink/20 pt-6">
                <h3 className="type-h3">{principle.title}</h3>
                <p className="type-body mt-4 max-w-[40ch] text-ink/85">{principle.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="section rule" aria-labelledby="team-heading">
        <div className="container-site">
          <SectionHeading eyebrow="People" title="The team" id="team-heading" />
          <p className="type-body-lg measure mt-6 text-ink/85">
            Design, survey information and technical decisions stay with the same small group from
            the first visit to completion. Specialist consultants are brought into the team where
            the work requires them, and the practice coordinates their input alongside its own.
          </p>
          {team.length > 0 ? (
            <ul
              className="mt-12 grid grid-cols-1 gap-x-[var(--gap)] gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
              role="list"
            >
              {team.map((person) => (
                <li key={person.slug}>
                  <TeamCard person={person} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-12">
              <EmptyState
                title="Meet the team in person."
                body={`The practice can be reached at ${site.email} to arrange a first conversation or a meeting at the building.`}
              />
            </div>
          )}
        </div>
      </section>

      {/* How we work: drawing board and site inspection */}
      <section className="section rule" aria-labelledby="method-heading">
        <div className="container-site">
          <SectionHeading eyebrow="Method" title="How we work" id="method-heading" />
          <p className="type-body-lg measure mt-6 text-ink/85">
            Most decisions are made between the drawing and the building: at the survey, at the
            drawing board and on site, where a detail can be checked against the fabric it has to
            meet.
          </p>
          <div className="mt-10">
            <ImagePair images={[drawingBoardImage, siteInspectionImage]} />
          </div>
        </div>
      </section>

      {/* Office */}
      <section className="section rule" aria-labelledby="office-heading">
        <div className="container-site">
          <SectionHeading eyebrow="Location" title="Office" id="office-heading" />
          <div className="grid-site mt-10 items-start">
            <div className="col-span-4 md:col-span-8 xl:col-span-5">
              <OfficeBlock headingLevel="h3" />
            </div>
            <div className="col-span-4 mt-8 md:col-span-8 xl:col-span-6 xl:col-start-7 xl:mt-0">
              <p className="type-body-lg measure text-ink/85">
                Bracken & Roe works from an office in {site.address.locality}, {site.address.city}.
                Meetings are by appointment, at the office or on site, so that the right people and
                the relevant drawings are to hand.
              </p>
              <p className="type-body-lg measure mt-5 text-ink/85">
                The practice’s work is rooted in Glasgow and its buildings: tenements, villas,
                terraces, housing estates and the community and commercial spaces between them. For
                an existing building, a first meeting at the building itself is often more useful
                than one at the office.
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="text">
                  Contact the practice
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection tight />
    </>
  );
}
