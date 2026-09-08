import type { Gated } from '@/lib/content';
import type { Person } from '@/lib/content/types';
import { MediaFigure } from '@/components/media/MediaFigure';

interface TeamCardProps {
  person: Gated<Person>;
  /** Teaser omits the expertise line and biography. */
  compact?: boolean;
}

/**
 * Name, public role, expertise and biography, set typographically above a rule. A portrait is
 * shown when the record carries one.
 */
export function TeamCard({ person, compact = false }: TeamCardProps) {
  return (
    <article className="flex flex-col border-t border-ink/20 pt-6">
      {person.portrait ? (
        <MediaFigure
          image={person.portrait}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          ratio="4/5"
          hideCaption
          className="mb-5"
        />
      ) : null}
      <p className="type-label text-moss">{person.rolePublic}</p>
      <h3 className="type-h3 mt-3">{person.name}</h3>
      {!compact ? (
        <>
          <p className="type-meta mt-3 text-ink/75">{person.expertise.join(' · ')}</p>
          <p className="type-body mt-4 max-w-[46ch] text-ink/85">{person.bio}</p>
        </>
      ) : (
        <p className="type-meta mt-3 text-ink/75">{person.expertise.join(' · ')}</p>
      )}
    </article>
  );
}
