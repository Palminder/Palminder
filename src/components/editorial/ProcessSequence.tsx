import { processNote, processStages } from '@/content/seed/process';

/** The architectural working sequence. Not a proprietary framework. */
export function ProcessSequence({ heading = 'How a project proceeds' }: { heading?: string }) {
  return (
    <section className="section rule" aria-labelledby="process-heading">
      <div className="container-site">
        <div className="grid-site">
          <div className="col-span-4 md:col-span-8 xl:col-span-4">
            <p className="type-label text-moss">Working sequence</p>
            <h2 id="process-heading" className="type-h2 mt-4">
              {heading}
            </h2>
            <p className="type-meta mt-6 max-w-[34ch] text-ink/75">{processNote}</p>
          </div>
          <ol className="col-span-4 mt-8 md:col-span-8 xl:col-span-7 xl:col-start-6 xl:mt-0">
            {processStages.map((stage, i) => (
              <li
                key={stage.title}
                className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-ink/20 py-6 first:border-t-0 first:pt-0 md:grid-cols-[4rem_1fr]"
              >
                <span className="type-label pt-1.5 text-ink/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="type-h4">{stage.title}</h3>
                  <p className="type-body measure mt-2 text-ink/85">{stage.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
