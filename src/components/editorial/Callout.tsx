import type { ReactNode } from 'react';

interface CalloutProps {
  title?: string;
  children: ReactNode;
}

/** A restrained guidance note: Sandstone rule, no icon, no colour field. */
export function Callout({ title, children }: CalloutProps) {
  return (
    <aside className="border-l-2 border-sandstone pl-5" aria-label={title ?? 'Note'}>
      {title ? <p className="type-label text-ink/80">{title}</p> : null}
      <div className="type-body mt-2 space-y-3 text-ink/85">{children}</div>
    </aside>
  );
}
