import Link from 'next/link';
import type { Gated } from '@/lib/content';
import { SECTOR_LABELS, type Project } from '@/lib/content/types';
import { projectStatusLabel } from '@/lib/content/format';
import { realityLabel } from '@/lib/content/publication';
import { MediaFigure } from '@/components/media/MediaFigure';
import { StagingBadge } from '@/components/layout/StagingNotice';

interface ProjectCardProps {
  project: Gated<Project>;
  sizes: string;
  ratio?: '4/3' | '3/2' | '16/10';
  priority?: boolean;
  headingLevel?: 'h2' | 'h3';
}

/** Image first, then title, location, sector and status. Nothing essential hides behind hover. */
export function ProjectCard({ project, sizes, ratio = '4/3', priority = false, headingLevel: Tag = 'h3' }: ProjectCardProps) {
  const reality = realityLabel(project.realityType);
  const sector = project.sectorLabel ?? SECTOR_LABELS[project.sector];
  return (
    <article className="card-link flex flex-col" data-sector={project.sector}>
      <Link href={`/projects/${project.slug}`} tabIndex={-1} aria-hidden="true" className="card-media block">
        <MediaFigure image={project.hero} sizes={sizes} ratio={ratio} priority={priority} hideCaption />
      </Link>
      <div className="mt-4">
        {!project.gate.publishable ? <StagingBadge reasons={project.gate.reasons} className="mb-2" /> : null}
        <Tag className="type-h4">
          <Link href={`/projects/${project.slug}`} className="hover:underline focus-visible:underline">
            {project.title}
          </Link>
        </Tag>
        <p className="type-meta mt-1.5 text-ink/75">
          <span className="serif-italic text-[1rem] text-ink/85">{project.locationDisplay}</span>
          <span aria-hidden="true"> · </span>
          <span>{sector}</span>
          <span aria-hidden="true"> · </span>
          <span>{projectStatusLabel(project)}</span>
          {reality ? (
            <>
              <span aria-hidden="true"> · </span>
              <span className="font-medium text-terracotta">{reality}</span>
            </>
          ) : null}
        </p>
      </div>
    </article>
  );
}
