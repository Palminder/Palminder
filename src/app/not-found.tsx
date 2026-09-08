import type { Metadata } from 'next';
import { Button } from '@/components/editorial/Button';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="container-site section">
      <div className="grid-site">
        <div className="col-span-4 md:col-span-8 xl:col-span-8">
          <h1 className="type-h1">That page isn’t here.</h1>
          <p className="type-lead measure mt-6 text-ink/85">
            The page may have moved, or the address may be incorrect.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/projects">View projects</Button>
            <Button href="/" variant="secondary">
              Return home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
