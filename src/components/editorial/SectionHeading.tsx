import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  as?: 'h2' | 'h3';
  action?: ReactNode;
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  as: Tag = 'h2',
  action,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-x-8 gap-y-4', className)}>
      <div>
        {eyebrow ? <p className="type-label text-moss">{eyebrow}</p> : null}
        <Tag id={id} className={cn('type-h2', eyebrow ? 'mt-4' : '')}>
          {title}
        </Tag>
      </div>
      {action ? <div className="pb-1">{action}</div> : null}
    </div>
  );
}
