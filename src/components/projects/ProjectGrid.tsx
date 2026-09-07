import type { Gated } from '@/lib/content';
import type { Project } from '@/lib/content/types';
import { ProjectCard } from './ProjectCard';

interface ProjectGridProps {
  projects: Gated<Project>[];
  variant?: 'featured' | 'index';
  headingLevel?: 'h2' | 'h3';
}

/**
 * Featured: asymmetric editorial grid (7/5 then 5/7). Index: a regular two-column grid.
 * Both collapse to one column below 768px. Widths are fixed so nothing reflows as images load.
 */
export function ProjectGrid({ projects, variant = 'index', headingLevel = 'h3' }: ProjectGridProps) {
  if (variant === 'featured') {
    return (
      <ul className="grid-site gap-y-12 md:gap-y-16" role="list">
        {projects.map((project, i) => {
          const row = Math.floor(i / 2);
          const first = i % 2 === 0;
          const wide = (first && row % 2 === 0) || (!first && row % 2 === 1);
          const span = wide ? 'md:col-span-8 xl:col-span-7' : 'md:col-span-8 xl:col-span-5';
          const sizes = wide ? '(min-width: 1200px) 58vw, 100vw' : '(min-width: 1200px) 42vw, 100vw';
          return (
            <li key={project.slug} className={`col-span-4 ${span}`}>
              <ProjectCard project={project} sizes={sizes} ratio={wide ? '16/10' : '4/3'} priority={i === 0} headingLevel={headingLevel} />
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <ul className="grid-site gap-y-12 md:gap-y-14" role="list">
      {projects.map((project, i) => (
        <li key={project.slug} className="col-span-4 md:col-span-4 xl:col-span-6" data-sector={project.sector}>
          <ProjectCard project={project} sizes="(min-width: 768px) 50vw, 100vw" ratio="4/3" priority={i < 2} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
