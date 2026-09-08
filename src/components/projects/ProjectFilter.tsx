'use client';

import { useId, useState, type ReactNode } from 'react';
import type { Sector } from '@/lib/content/types';

type FilterValue = 'all' | Sector;

const FILTERS: Array<{ value: FilterValue; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'residential', label: 'Residential' },
  { value: 'conservation', label: 'Conservation' },
  { value: 'housing-retrofit', label: 'Housing & Retrofit' },
  { value: 'commercial-community', label: 'Commercial & Community' },
];

interface ProjectFilterProps {
  counts: Record<FilterValue, number>;
  /** Server-rendered project grid; every project is present in the initial HTML. */
  children: ReactNode;
}

/**
 * Client-side filter that hides cards by data attribute. The grid itself is server rendered,
 * so the meaning and accessibility of the page do not depend on JavaScript.
 */
export function ProjectFilter({ counts, children }: ProjectFilterProps) {
  const [active, setActive] = useState<FilterValue>('all');
  const statusId = useId();
  const activeLabel = FILTERS.find((f) => f.value === active)?.label ?? 'All';
  const count = counts[active] ?? 0;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by sector"
        className="flex flex-wrap gap-x-2 gap-y-2 border-b border-ink/20 pb-4"
      >
        {FILTERS.map((f) => {
          const pressed = active === f.value;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(f.value)}
              className={`nav-link inline-flex min-h-11 min-w-11 items-center px-3 text-[0.9375rem] font-medium transition-colors ${
                pressed ? 'text-ink' : 'text-ink/70 hover:text-ink'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <p id={statusId} role="status" aria-live="polite" className="type-meta mt-4 text-ink/70">
        {active === 'all'
          ? `${count} projects`
          : `${count} ${count === 1 ? 'project' : 'projects'} — ${activeLabel}`}
      </p>
      <div className="mt-8" data-filter={active}>
        {active !== 'all' ? (
          <style>{`[data-filter="${active}"] li[data-sector]:not([data-sector="${active}"]) { display: none; }`}</style>
        ) : null}
        {children}
      </div>
    </div>
  );
}
