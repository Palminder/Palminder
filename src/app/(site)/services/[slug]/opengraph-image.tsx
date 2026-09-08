import { getService } from '@/lib/content';
import { renderDefaultOgImage, renderOgImage } from '@/lib/seo/og';

export const alt = 'Bracken & Roe service';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'nodejs';

interface ImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return renderDefaultOgImage();

  return renderOgImage({
    eyebrow: 'Service',
    title: service.title,
    meta: 'Bracken & Roe · Glasgow',
  });
}
