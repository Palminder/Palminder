import { OfficeAddress } from '@/components/layout/OfficeAddress';
import { mapsLink, site } from '@/lib/site';

/** Contact-page office block: fixed address, appointment wording, email and an external maps link. */
export function OfficeBlock() {
  return (
    <div>
      <h2 className="type-h3">Glasgow</h2>
      <OfficeAddress className="type-body mt-5 text-ink/85" withName />
      <a
        href={`mailto:${site.email}`}
        className="mt-5 inline-flex min-h-11 items-center text-[1.0625rem] underline decoration-ink/40 underline-offset-[0.2em] hover:decoration-ink"
      >
        {site.email}
      </a>
      <p className="mt-2">
        <a
          href={mapsLink()}
          rel="noopener noreferrer"
          target="_blank"
          className="type-meta inline-flex min-h-11 items-center underline decoration-ink/40 underline-offset-[0.2em] hover:decoration-ink"
        >
          View location in maps
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </p>
    </div>
  );
}
