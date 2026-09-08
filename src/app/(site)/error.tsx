'use client';

import { useEffect } from 'react';

/** Calm error state. Details are never shown to visitors; the error is reported server-side. */
export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Only the digest is safe to surface; message bodies stay out of the console in production.
    if (process.env.NODE_ENV !== 'production') console.error(error);
  }, [error]);
  return (
    <section className="container-site section">
      <h1 className="type-h1">Something went wrong.</h1>
      <p className="type-lead measure mt-6 text-ink/85">
        Please try again. If the problem continues, email studio@brackenroe.co.uk.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex min-h-11 items-center bg-moss px-6 text-[0.9375rem] font-medium text-paper hover:bg-deep-ink"
      >
        Try again
      </button>
    </section>
  );
}
