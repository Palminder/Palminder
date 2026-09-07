interface EmptyStateProps {
  title: string;
  body: string;
}

/** Calm empty state in editorial language; never exposes editor or debug wording. */
export function EmptyState({ title, body }: EmptyStateProps) {
  return (
    <div className="border-t border-ink/20 py-10">
      <p className="type-h4">{title}</p>
      <p className="type-body measure mt-3 text-ink/80">{body}</p>
    </div>
  );
}
