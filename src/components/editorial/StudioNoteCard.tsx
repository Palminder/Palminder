import type { Gated } from '@/lib/content';
import type { StudioNote } from '@/lib/content/types';
import { formatMonthYear } from '@/lib/content/format';
import { MediaFigure } from '@/components/media/MediaFigure';

/** One image or drawing, a category, a month and a single observation. No engagement metrics. */
export function StudioNoteCard({ note }: { note: Gated<StudioNote> }) {
  return (
    <article className="flex flex-col">
      <MediaFigure
        image={note.media}
        sizes="(min-width: 1200px) 22vw, (min-width: 640px) 45vw, 100vw"
        hideCaption
      />
      <p className="type-label mt-4 text-moss">
        {note.category}
        <span className="sr-only">, </span>
        <span className="ml-3 normal-case tracking-normal text-ink/60">
          <time dateTime={note.date}>{formatMonthYear(note.date)}</time>
        </span>
      </p>
      <p className="type-body mt-2 text-ink/85">{note.text}</p>
    </article>
  );
}
