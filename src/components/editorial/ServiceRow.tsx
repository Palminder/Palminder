import Link from 'next/link';
import type { Service } from '@/lib/content/types';
import { MaterialField } from '@/components/media/MaterialField';
import { MediaFigure } from '@/components/media/MediaFigure';
import { stagingImage } from '@/lib/content';
import { ArrowIcon } from './Button';

/** A full-width editorial row: number, discipline, summary, one image and a restrained arrow link. */
export function ServiceRow({ service }: { service: Service }) {
  const image = stagingImage(service.image);
  return (
    <article className="border-t border-ink/20 py-8 md:py-10 xl:py-12">
      <div className="grid-site items-start">
        <div className="col-span-4 md:col-span-8 xl:col-span-3">
          <p className="type-label text-ink/70">{service.number}</p>
          <h3 className="type-h3 mt-3">
            <Link
              href={`/services/${service.slug}`}
              className="hover:underline focus-visible:underline"
            >
              {service.title}
            </Link>
          </h3>
        </div>
        <div className="col-span-4 mt-4 md:col-span-8 xl:col-span-5 xl:mt-0">
          <p className="type-body-lg measure text-ink/85">{service.summary}</p>
          <Link
            href={`/services/${service.slug}`}
            className="arrow-link type-meta mt-5 inline-flex min-h-11 font-medium text-ink"
          >
            <span>
              {service.navLabel}
              <span className="visually-hidden"> — read about this service</span>
            </span>
            <ArrowIcon />
          </Link>
        </div>
        <div className="col-span-4 mt-6 md:col-span-8 xl:col-span-4 xl:col-start-9 xl:mt-0">
          {image ? (
            <MediaFigure
              image={image}
              sizes="(min-width: 1200px) 30vw, 100vw"
              ratio="4/3"
              hideCaption
            />
          ) : (
            <MaterialField ratio="4/3" tone="stone" />
          )}
        </div>
      </div>
    </article>
  );
}
