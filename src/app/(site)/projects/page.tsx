import type { Metadata } from 'next';
import { CTASection } from '@/components/editorial/CTASection';
import { EmptyState } from '@/components/editorial/EmptyState';
import { PageHero } from '@/components/editorial/PageHero';
import { ProjectFilter } from '@/components/projects/ProjectFilter';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { getProjects } from '@/lib/content';
import type { Sector } from '@/lib/content/types';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Projects | Bracken & Roe',
  description:
    'Selected work by Bracken & Roe in and around Glasgow: residential alterations, conservation and listed-building work, housing retrofit, and spaces for work and community use.',
  path: '/projects',
});

const SECTORS: Sector[] = [
  'residential',
  'conservation',
  'housing-retrofit',
  'commercial-community',
];

export default async function ProjectsPage() {
  const all = await getProjects();

  // Counts are computed on the server so the filter can report them before any interaction.
  const bySector = Object.fromEntries(
    SECTORS.map((s) => [s, all.filter((p) => p.sector === s).length]),
  ) as Record<Sector, number>;
  const counts = { all: all.length, ...bySector };

  return (
    <>
      <PageHero
        title="Projects"
        lead="Residential alterations, conservation work, housing retrofit and selected spaces for work and community use."
      />

      <section className="section-tight rule" aria-labelledby="project-list-heading">
        <div className="container-site">
          <h2 id="project-list-heading" className="visually-hidden">
            All projects
          </h2>
          {all.length > 0 ? (
            <ProjectFilter counts={counts}>
              <ProjectGrid projects={all} variant="index" headingLevel="h2" />
            </ProjectFilter>
          ) : (
            <EmptyState
              title="Selected work is shared in conversation."
              body="The services pages describe the kinds of building and work the practice takes on, and you are welcome to get in touch about a project of your own."
            />
          )}
        </div>
      </section>

      <CTASection tight />
    </>
  );
}
