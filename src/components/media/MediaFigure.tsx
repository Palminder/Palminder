import Image from 'next/image';
import { MEDIA_TYPE_LABELS, type ImageAsset } from '@/lib/content/types';
import { cn } from '@/lib/utils/cn';
import { aspectRatio, isUnoptimised } from './image';

export interface MediaFigureProps {
  image: ImageAsset;
  /** Required: the rendered width across breakpoints, e.g. "(min-width: 1200px) 58vw, 100vw". */
  sizes: string;
  priority?: boolean;
  /** Force a display ratio for cards; omitted for drawings and intrinsic ratios. */
  ratio?: '16/10' | '4/3' | '3/2' | '4/5' | '1/1' | 'intrinsic';
  className?: string;
  imageClassName?: string;
  /** Hide the caption entirely (e.g. inside a card whose text carries the meaning). */
  hideCaption?: boolean;
  /** Show the media-type label ("Existing condition", "Visualisation") before the caption. */
  showLabel?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
}

const ratioClass: Record<NonNullable<MediaFigureProps['ratio']>, string> = {
  '16/10': 'aspect-[16/10]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '4/5': 'aspect-[4/5]',
  '1/1': 'aspect-square',
  intrinsic: '',
};

/** Image or drawing with caption, credit and an explicit media-type label. */
export function MediaFigure({
  image,
  sizes,
  priority = false,
  ratio = 'intrinsic',
  className,
  imageClassName,
  hideCaption = false,
  showLabel = true,
  fetchPriority,
}: MediaFigureProps) {
  const label = MEDIA_TYPE_LABELS[image.mediaType];
  const hasCaption = !hideCaption && (showLabel || image.caption || image.credit);
  const fixed = ratio !== 'intrinsic';

  return (
    <figure className={cn('m-0', className)}>
      <div
        className={cn(
          'relative w-full overflow-hidden bg-stone/40',
          fixed ? ratioClass[ratio] : '',
        )}
        style={fixed ? undefined : { aspectRatio: aspectRatio(image) }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          fetchPriority={fetchPriority}
          unoptimized={isUnoptimised(image)}
          className={cn('h-full w-full', fixed ? 'object-cover' : 'object-contain', imageClassName)}
        />
      </div>
      {hasCaption ? (
        <figcaption className="type-meta mt-3 text-ink/75">
          {showLabel ? <span className="font-medium text-ink">{label}</span> : null}
          {showLabel && image.caption ? <span aria-hidden="true"> — </span> : null}
          {image.caption ? <span>{image.caption}</span> : null}
          {image.credit ? <span className="block">{image.credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
