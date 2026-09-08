import { getInsight } from '@/lib/content';
import { formatDate } from '@/lib/content/format';
import { renderDefaultOgImage, renderOgImage } from '@/lib/seo/og';

export const alt = 'Bracken & Roe insight';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'nodejs';

interface ImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return renderDefaultOgImage();

  return renderOgImage({
    eyebrow: insight.category,
    title: insight.title,
    meta: `Published ${formatDate(insight.publishedAt)}`,
  });
}
