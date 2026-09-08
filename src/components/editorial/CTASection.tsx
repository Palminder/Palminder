import { Button } from './Button';
import { site } from '@/lib/site';

interface CTASectionProps {
  title?: string;
  copy?: string;
  /** Use a slightly tighter section on inner pages. */
  tight?: boolean;
}

/** Enquiry call to action with the primary button and inline email. */
export function CTASection({
  title = 'Tell us what you are working on.',
  copy = 'A short note about the building, location and stage of the project is enough to start.',
  tight = false,
}: CTASectionProps) {
  return (
    <section
      className={tight ? 'section-tight rule' : 'section rule'}
      aria-labelledby="cta-heading"
    >
      <div className="container-site">
        <div className="grid-site items-end">
          <div className="col-span-4 md:col-span-8 xl:col-span-7">
            <h2 id="cta-heading" className="type-h2">
              {title}
            </h2>
            <p className="type-body-lg measure mt-5 text-ink/85">{copy}</p>
          </div>
          <div className="col-span-4 mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-8 xl:col-span-5 xl:mt-0 xl:justify-end">
            <Button href="/contact#project-enquiry">Discuss a project</Button>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center text-[1.0625rem] underline decoration-ink/40 underline-offset-[0.2em] hover:decoration-ink"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
