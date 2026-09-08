import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/editorial/Breadcrumbs';
import { Button } from '@/components/editorial/Button';
import { CTASection } from '@/components/editorial/CTASection';
import { StagingBadge } from '@/components/layout/StagingNotice';
import { DrawingFigure } from '@/components/media/DrawingFigure';
import { ImagePair } from '@/components/media/ImagePair';
import { MediaFigure } from '@/components/media/MediaFigure';
import { ProjectFacts } from '@/components/projects/ProjectFacts';
import {
  getAdjacentProjects,
  getProject,
  getProjects,
  getService,
  type Gated,
} from '@/lib/content';
import { projectStatusLabel } from '@/lib/content/format';
import { realityLabel } from '@/lib/content/publication';
import {
  DRAWING_MEDIA_TYPES,
  SECTOR_LABELS,
  type ImageAsset,
  type MediaType,
  type Project,
} from '@/lib/content/types';
import { pageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/site';
import { cn } from '@/lib/utils/cn';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/** Full-container figures: the site container tops out at 1360px. */
const FULL_WIDTH_SIZES = '(min-width: 1440px) 1360px, 100vw';
/** Drawing sheets always render at full container width so nothing is cropped. */
const DRAWING_SIZES = '(min-width:1200px) 1320px, 100vw';
/** A single story image sits in the central eight columns on desktop. */
const SINGLE_SIZES = '(min-width: 1200px) 66vw, 100vw';

/** Drawings that describe the existing and proposed building come first; sections and details follow the technical copy. */
const LEADING_DRAWING_TYPES: ReadonlySet<MediaType> = new Set<MediaType>([
  'existing-plan',
  'proposed-plan',
  'elevation',
  'survey-drawing',
]);

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: 'Project not found', robots: { index: false, follow: false } };
  return pageMetadata({
    title: `${project.title} — ${project.locationDisplay} | Bracken & Roe`,
    description: project.seo?.description ?? project.summary,
    path: `/projects/${project.slug}`,
    image: openGraphImage(project.hero),
    hasGeneratedImage: true,
  });
}

/** Only real raster photography is offered as a share image; placeholders and SVG sheets fall back to the default. */
function openGraphImage(
  image: ImageAsset,
): { url: string; width: number; height: number; alt: string } | undefined {
  if (image.placeholder || image.src.endsWith('.svg')) return undefined;
  const url = /^https?:\/\//.test(image.src) ? image.src : absoluteUrl(image.src);
  return { url, width: image.width, height: image.height, alt: image.alt };
}

function splitDrawings(drawings: ImageAsset[]): { leading: ImageAsset[]; remaining: ImageAsset[] } {
  const leading = drawings.filter((d) => LEADING_DRAWING_TYPES.has(d.mediaType)).slice(0, 2);
  const remaining = drawings.filter((d) => !leading.includes(d));
  return { leading, remaining };
}

type GalleryGroup =
  { kind: 'pair'; images: [ImageAsset, ImageAsset] } | { kind: 'single'; image: ImageAsset };

/** Alternates a pair and a single so the remaining story images keep an editorial rhythm. */
function galleryRhythm(images: ImageAsset[]): GalleryGroup[] {
  const groups: GalleryGroup[] = [];
  let i = 0;
  let pairNext = true;
  while (i < images.length) {
    const a = images[i];
    const b = images[i + 1];
    if (!a) break;
    // A final two images always pair rather than stacking as two singles.
    const usePair = Boolean(b) && (pairNext || images.length - i === 2);
    if (usePair && b) {
      groups.push({ kind: 'pair', images: [a, b] });
      i += 2;
    } else {
      groups.push({ kind: 'single', image: a });
      i += 1;
    }
    pairNext = !pairNext;
  }
  return groups;
}

/** Heading in the first four columns, prose at the article reading measure in the remaining seven. */
function ProseSection({
  id,
  title,
  paragraphs,
  children,
}: {
  id: string;
  title: string;
  paragraphs: string[];
  children?: ReactNode;
}) {
  if (paragraphs.length === 0 && !children) return null;
  return (
    <section className="section-tight rule" aria-labelledby={`${id}-heading`}>
      <div className="container-site">
        <div className="grid-site">
          <div className="col-span-4 md:col-span-8 xl:col-span-4">
            <h2 id={`${id}-heading`} className="type-h2">
              {title}
            </h2>
          </div>
          <div className="col-span-4 md:col-span-8 xl:col-span-7 xl:col-start-6">
            {paragraphs.length > 0 ? (
              <div className="measure-article space-y-5">
                {paragraphs.map((text, i) => (
                  <p key={i} className="type-body-lg text-ink/85">
                    {text}
                  </p>
                ))}
              </div>
            ) : null}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Figures between prose sections: full container width with bottom spacing before the next rule. */
function FigureBlock({ children }: { children: ReactNode }) {
  return <div className="container-site pb-[var(--section-tight)]">{children}</div>;
}

function SingleFigure({ image }: { image: ImageAsset }) {
  return (
    <div className="grid-site">
      <MediaFigure
        image={image}
        sizes={SINGLE_SIZES}
        className="col-span-4 md:col-span-8 xl:col-span-8 xl:col-start-3"
      />
    </div>
  );
}

function AdjacentLink({
  project,
  label,
  align = 'start',
}: {
  project: Gated<Project>;
  label: string;
  align?: 'start' | 'end';
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'group inline-flex min-h-11 flex-col justify-center py-2',
        align === 'end' ? 'md:items-end md:text-right' : '',
      )}
    >
      <span className="type-label text-moss">{label}</span>
      <span className="type-h4 mt-2 block group-hover:underline group-focus-visible:underline">
        {project.title}
      </span>
      <span className="serif-italic mt-1 block text-[1rem] text-ink/80">
        {project.locationDisplay}
      </span>
    </Link>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const [service, { previous, next }] = await Promise.all([
    getService(project.relatedService),
    getAdjacentProjects(slug),
  ]);

  const reality = realityLabel(project.realityType);
  const sector = project.sectorLabel ?? SECTOR_LABELS[project.sector];
  const [galleryA, galleryB, galleryMajor] = project.gallery;
  // Photographs hold the 16/10 hero ratio; a drawing supplied as the hero is never cropped.
  const heroRatio = DRAWING_MEDIA_TYPES.has(project.hero.mediaType) ? 'intrinsic' : '16/10';
  const remainingGallery = galleryRhythm(project.gallery.slice(3));
  const { leading: leadingDrawings, remaining: remainingDrawings } = splitDrawings(
    project.drawings,
  );

  return (
    <>
      {/* 1–6: breadcrumbs, hero, title line, summary and facts */}
      <div className="container-site pt-6 pb-[var(--section-tight)] md:pt-8">
        <Breadcrumbs items={[{ label: 'Projects', href: '/projects' }]} current={project.title} />

        <div className="mt-6 md:mt-8">
          <MediaFigure
            image={project.hero}
            sizes="100vw"
            priority
            fetchPriority="high"
            ratio={heroRatio}
          />
        </div>

        <div className="grid-site mt-10 items-end md:mt-12">
          <div className="col-span-4 md:col-span-8 xl:col-span-7">
            {!project.gate.publishable ? (
              <StagingBadge reasons={project.gate.reasons} className="mb-4" />
            ) : null}
            <h1 className="type-h1">{project.title}</h1>
            <p className="type-meta mt-4 text-ink/75">
              <span className="serif-italic text-[1rem] text-ink/85">
                {project.locationDisplay}
              </span>
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
            <p className="type-lead measure mt-6 text-ink/85">{project.summary}</p>
          </div>
          <div className="col-span-4 mt-8 md:col-span-8 xl:col-span-5 xl:col-start-8 xl:mt-0">
            <ProjectFacts project={project} />
          </div>
        </div>
      </div>

      {/* 7: brief */}
      <ProseSection id="brief" title="Brief" paragraphs={project.brief} />

      {/* 8: first image pair */}
      {galleryA && galleryB ? (
        <FigureBlock>
          <ImagePair images={[galleryA, galleryB]} />
        </FigureBlock>
      ) : galleryA ? (
        <FigureBlock>
          <SingleFigure image={galleryA} />
        </FigureBlock>
      ) : null}

      {/* 9: existing building */}
      <ProseSection id="existing" title="Existing building" paragraphs={project.existing} />

      {/* 10: existing and proposed drawings */}
      {leadingDrawings.length > 0 ? (
        <FigureBlock>
          <div className="space-y-10 md:space-y-14">
            {leadingDrawings.map((drawing, i) => (
              <DrawingFigure key={`${i}-${drawing.src}`} image={drawing} sizes={DRAWING_SIZES} />
            ))}
          </div>
        </FigureBlock>
      ) : null}

      {/* 11: architectural response */}
      <ProseSection id="response" title="Architectural response" paragraphs={project.response} />

      {/* 12: major image */}
      {galleryMajor ? (
        <FigureBlock>
          <MediaFigure image={galleryMajor} sizes={FULL_WIDTH_SIZES} />
        </FigureBlock>
      ) : null}

      {/* 13: technical and materials */}
      <ProseSection id="technical" title="Technical & materials" paragraphs={project.technical}>
        {project.materials.length > 0 ? (
          <div className={project.technical.length > 0 ? 'mt-10' : ''}>
            <h3 id="materials-heading" className="type-h4">
              Materials
            </h3>
            <ul
              className="mt-4 grid grid-cols-1 gap-x-8 sm:grid-cols-2"
              role="list"
              aria-labelledby="materials-heading"
            >
              {project.materials.map((material, i) => (
                <li
                  key={`${i}-${material}`}
                  className="type-body border-t border-ink/15 py-2.5 text-ink/90"
                >
                  {material}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </ProseSection>

      {/* 14: sections and details, then the remaining story images */}
      {remainingDrawings.length > 0 || remainingGallery.length > 0 ? (
        <FigureBlock>
          <div className="space-y-10 md:space-y-14">
            {remainingDrawings.map((drawing, i) => (
              <DrawingFigure key={`${i}-${drawing.src}`} image={drawing} sizes={DRAWING_SIZES} />
            ))}
            {remainingGallery.map((group, i) =>
              group.kind === 'pair' ? (
                <ImagePair key={`pair-${i}`} images={group.images} />
              ) : (
                <SingleFigure key={`single-${i}`} image={group.image} />
              ),
            )}
          </div>
        </FigureBlock>
      ) : null}

      {/* 15: outcome */}
      <ProseSection id="outcome" title="Outcome" paragraphs={project.outcome} />

      {/* 16: related service */}
      {service ? (
        <section className="section-tight rule" aria-labelledby="related-service-heading">
          <div className="container-site">
            <div className="grid-site">
              <div className="col-span-4 md:col-span-8 xl:col-span-4">
                <h2 id="related-service-heading" className="type-h3">
                  Related service
                </h2>
              </div>
              <div className="col-span-4 md:col-span-8 xl:col-span-7 xl:col-start-6">
                <p className="type-body-lg measure-article text-ink/85">{service.summary}</p>
                <div className="mt-6">
                  <Button href={`/services/${project.relatedService}`} variant="text">
                    {service.title}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 17: previous and next project */}
      {previous || next ? (
        <nav aria-label="Other projects" className="rule">
          <div className="container-site py-8 md:py-10">
            <div className="grid-site">
              <div className="col-span-4 md:col-span-4 xl:col-span-6">
                {previous ? <AdjacentLink project={previous} label="Previous project" /> : null}
              </div>
              <div className="col-span-4 flex md:col-span-4 md:justify-end xl:col-span-6">
                {next ? <AdjacentLink project={next} label="Next project" align="end" /> : null}
              </div>
            </div>
          </div>
        </nav>
      ) : null}

      {/* 18 */}
      <CTASection tight />
    </>
  );
}
