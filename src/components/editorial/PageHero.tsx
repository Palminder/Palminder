import type { ReactNode } from 'react';
import type { ImageAsset } from '@/lib/content/types';
import { MediaFigure } from '@/components/media/MediaFigure';
import { cn } from '@/lib/utils/cn';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  image?: ImageAsset;
  /** Column width for the title block on desktop when there is no image. */
  narrow?: boolean;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
}

/** Text-first hero: copy in columns 1–5, image in 6–12 where present; copy first on mobile. */
export function PageHero({ eyebrow, title, lead, image, narrow = false, children, className, titleClassName }: PageHeroProps) {
  return (
    <section className={cn('container-site pt-10 pb-12 md:pt-14 md:pb-16 xl:pt-20 xl:pb-24', className)}>
      <div className="grid-site items-end">
        <div className={cn('col-span-4 md:col-span-8', image ? 'xl:col-span-5' : narrow ? 'xl:col-span-8' : 'xl:col-span-10')}>
          {eyebrow ? <p className="type-label reveal text-moss">{eyebrow}</p> : null}
          <h1 className={cn('type-h1 reveal mt-4', titleClassName)}>{title}</h1>
          {lead ? <div className="type-lead reveal reveal-delay measure mt-6 text-ink/85">{lead}</div> : null}
          {children ? <div className="reveal reveal-delay mt-8 flex flex-wrap items-center gap-4">{children}</div> : null}
        </div>
        {image ? (
          <div className="col-span-4 mt-8 md:col-span-8 xl:col-span-7 xl:mt-0 xl:-mr-[var(--gutter)] 2xl:-mr-[calc((100vw-var(--site-max))/2)]">
            <MediaFigure image={image} sizes="(min-width: 1200px) 60vw, 100vw" priority fetchPriority="high" ratio="16/10" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
