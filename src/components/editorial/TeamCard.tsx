import type { Gated } from '@/lib/content';
import type { Person } from '@/lib/content/types';
import { MediaFigure } from '@/components/media/MediaFigure';
import { StagingBadge } from '@/components/layout/StagingNotice';

interface TeamCardProps {
  person: Gated<Person>;
  /** Teaser omits the biography. */
  compact?: boolean;
}

/** Portrait, name, public role, expertise and biography. */
export function TeamCard({ person, compact = false }: TeamCardProps) {
  return (
    <article className="flex flex-col">
      {person.portrait ? (
        <MediaFigure
          image={person.portrait}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          ratio="4/5"
          hideCaption
        />
      ) : null}
      <div className="mt-5">
        {!person.gate.publishable ? (
          <StagingBadge reasons={person.gate.reasons} className="mb-3" />
        ) : null}
        <h3 className="type-h4">{person.name}</h3>
        <p className="type-meta mt-1 text-ink/75">{person.rolePublic}</p>
        {!compact ? (
          <>
            <p className="type-meta mt-3 text-ink/75">{person.expertise.join(' · ')}</p>
            <p className="type-body mt-4 text-ink/85">{person.bio}</p>
          </>
        ) : null}
      </div>
    </article>
  );
}
