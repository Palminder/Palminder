import type { Testimonial as TestimonialRecord } from '@/lib/content/types';

/** Renders verified, consented testimonials only; nothing at all otherwise. No stars. */
export function Testimonials({ items }: { items: TestimonialRecord[] }) {
  if (items.length === 0) return null;
  return (
    <section className="section rule" aria-labelledby="testimonials-heading">
      <div className="container-site">
        <h2 id="testimonials-heading" className="visually-hidden">
          What clients have said
        </h2>
        <div className="grid-site">
          {items.map((t) => (
            <blockquote key={t.id} className="col-span-4 md:col-span-8 xl:col-span-6">
              <p className="type-lead">“{t.quote}”</p>
              <footer className="type-meta mt-4 text-ink/75">
                — {t.attribution}
                {t.descriptor ? `, ${t.descriptor}` : ''}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
