import type { Block } from '@/lib/content/types';
import { DRAWING_MEDIA_TYPES } from '@/lib/content/types';
import { DrawingFigure } from '@/components/media/DrawingFigure';
import { MediaFigure } from '@/components/media/MediaFigure';
import { Callout } from './Callout';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Renders the shared block model used by Insight bodies and legal documents. */
export function RichText({ blocks, className = '' }: { blocks: Block[]; className?: string }) {
  return (
    <div className={`rich-text type-body-lg text-ink/90 ${className}`}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={i}>{block.text}</p>;
          case 'heading': {
            const id = block.id ?? slugify(block.text);
            return block.level === 2 ? (
              <h2 key={i} id={id}>
                {block.text}
              </h2>
            ) : (
              <h3 key={i} id={id}>
                {block.text}
              </h3>
            );
          }
          case 'list':
            return block.ordered ? (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            ) : (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case 'quote':
            return (
              <blockquote key={i}>
                <p>{block.text}</p>
                {block.attribution ? (
                  <footer className="type-meta mt-2 text-ink/70">— {block.attribution}</footer>
                ) : null}
              </blockquote>
            );
          case 'callout':
            return (
              <Callout key={i} title={block.title}>
                <p>{block.text}</p>
              </Callout>
            );
          case 'figure':
            return DRAWING_MEDIA_TYPES.has(block.image.mediaType) ? (
              <DrawingFigure key={i} image={block.image} sizes="(min-width: 1024px) 760px, 100vw" />
            ) : (
              <MediaFigure key={i} image={block.image} sizes="(min-width: 1024px) 760px, 100vw" />
            );
          case 'table':
            return (
              <div key={i} className="scroll-x">
                <table>
                  {block.caption ? (
                    <caption className="type-meta mb-2 text-left text-ink/75">
                      {block.caption}
                    </caption>
                  ) : null}
                  <thead>
                    <tr>
                      {block.header.map((h, j) => (
                        <th key={j} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td key={c}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
