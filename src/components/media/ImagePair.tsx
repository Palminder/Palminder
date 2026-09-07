import type { ImageAsset } from '@/lib/content/types';
import { MediaFigure } from './MediaFigure';

interface ImagePairProps {
  images: [ImageAsset, ImageAsset];
  /** Column split on desktop; the first figure takes `split` of 12 columns. */
  split?: 6 | 7 | 5;
}

/** Two complementary figures, side by side on desktop and stacked on mobile. */
export function ImagePair({ images, split = 6 }: ImagePairProps) {
  const [a, b] = images;
  const first = split === 7 ? 'xl:col-span-7' : split === 5 ? 'xl:col-span-5' : 'xl:col-span-6';
  const second = split === 7 ? 'xl:col-span-5' : split === 5 ? 'xl:col-span-7' : 'xl:col-span-6';
  const firstSizes = split === 7 ? '(min-width: 1200px) 58vw, 100vw' : split === 5 ? '(min-width: 1200px) 42vw, 100vw' : '(min-width: 1200px) 50vw, 100vw';
  const secondSizes = split === 7 ? '(min-width: 1200px) 42vw, 100vw' : split === 5 ? '(min-width: 1200px) 58vw, 100vw' : '(min-width: 1200px) 50vw, 100vw';
  return (
    <div className="grid-site items-start">
      <MediaFigure image={a} sizes={firstSizes} className={`col-span-4 md:col-span-8 ${first}`} />
      <MediaFigure image={b} sizes={secondSizes} className={`col-span-4 md:col-span-8 ${second}`} />
    </div>
  );
}
