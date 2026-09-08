import { getProject } from '@/lib/content';
import { projectStatusLabel } from '@/lib/content/format';
import { SECTOR_LABELS } from '@/lib/content/types';
import { renderDefaultOgImage, renderOgImage } from '@/lib/seo/og';

export const alt = 'Bracken & Roe project';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'nodejs';

interface ImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return renderDefaultOgImage();

  const sector = project.sectorLabel ?? SECTOR_LABELS[project.sector];
  return renderOgImage({
    eyebrow: 'Project',
    title: project.title,
    meta: [project.locationDisplay, sector, projectStatusLabel(project)].join(' · '),
  });
}
