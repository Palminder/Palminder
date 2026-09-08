import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface EditorialIntroProps {
  eyebrow?: string;
  heading: string;
  children: ReactNode;
  link?: ReactNode;
  /** Heading level; sections default to h2. */
  as?: 'h2' | 'h3';
  className?: string;
  /** Layout: heading left, copy right on desktop; or stacked. */
  layout?: 'split' | 'stacked';
}

/** Eyebrow + serif heading + body copy. */
export function EditorialIntro({
  eyebrow,
  heading,
  children,
  link,
  as: Tag = 'h2',
  className,
  layout = 'split',
}: EditorialIntroProps) {
  if (layout === 'stacked') {
    return (
      <div className={cn('max-w-[62rem]', className)}>
        {eyebrow ? <p className="type-label text-moss">{eyebrow}</p> : null}
        <Tag className="type-h2 mt-4">{heading}</Tag>
        <div className="measure mt-6 space-y-5 text-[1.125rem] leading-[1.6] text-ink/85">
          {children}
        </div>
        {link ? <div className="mt-8">{link}</div> : null}
      </div>
    );
  }
  return (
    <div className={cn('grid-site', className)}>
      <div className="col-span-4 md:col-span-8 xl:col-span-5">
        {eyebrow ? <p className="type-label text-moss">{eyebrow}</p> : null}
        <Tag className="type-h2 mt-4">{heading}</Tag>
      </div>
      <div className="col-span-4 mt-6 md:col-span-8 xl:col-span-6 xl:col-start-7 xl:mt-2">
        <div className="measure space-y-5 text-[1.125rem] leading-[1.6] text-ink/85">
          {children}
        </div>
        {link ? <div className="mt-8">{link}</div> : null}
      </div>
    </div>
  );
}
