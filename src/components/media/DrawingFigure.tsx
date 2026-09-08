import Image from 'next/image';
import { MEDIA_TYPE_LABELS, type ImageAsset } from '@/lib/content/types';
import { cn } from '@/lib/utils/cn';
import { aspectRatio, isUnoptimised } from './image';
import { ZoomableDrawing } from './ZoomableDrawing';

interface DrawingFigureProps {
  image: ImageAsset;
  sizes: string;
  className?: string;
  zoomable?: boolean;
}

/** Plans, sections and elevations at their natural sheet ratio, on Paper, with a figure-style caption. */
export function DrawingFigure({ image, sizes, className, zoomable = true }: DrawingFigureProps) {
  const number = image.drawing?.number;
  const title = image.drawing?.title ?? MEDIA_TYPE_LABELS[image.mediaType];
  const label = number ? `${number} — ${title}` : title;
  return (
    <figure className={cn('m-0', className)}>
      <div className="drawing-sheet relative w-full" style={{ aspectRatio: aspectRatio(image) }}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          unoptimized={isUnoptimised(image)}
          className="h-full w-full object-contain"
        />
      </div>
      {zoomable ? <ZoomableDrawing image={image} label={label} /> : null}
      <figcaption className="type-meta mt-3 text-ink/75">
        <span className="font-medium text-ink">{label}</span>
        {image.drawing?.note ? <span className="block">{image.drawing.note}</span> : null}
      </figcaption>
    </figure>
  );
}
