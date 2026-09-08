import { stage } from '@/lib/content';

/** Shown only on staging builds so that seed content can never be mistaken for the public site. */
export function StagingNotice() {
  if (stage() !== 'staging') return null;
  return (
    <div className="bg-terracotta text-paper" role="note">
      <p className="container-site type-meta py-2">
        <strong className="font-medium">Staging build.</strong> Team, project, note and article
        records shown here are seed content awaiting verification and will not appear on the public
        site until verified.
      </p>
    </div>
  );
}

/** Inline label for a record held back by a publication gate (staging only). */
export function StagingBadge({
  reasons,
  className = '',
}: {
  reasons: string[];
  className?: string;
}) {
  if (reasons.length === 0) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 border border-terracotta px-2 py-0.5 text-[0.75rem] font-medium uppercase tracking-[0.06em] text-terracotta ${className}`}
    >
      Staging record — not verified
    </span>
  );
}
