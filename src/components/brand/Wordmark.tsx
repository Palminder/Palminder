import { WORDMARK_PAD, WORDMARK_PATH, WORDMARK_VIEWBOX } from './paths';

interface WordmarkProps {
  /** Rendered height in CSS px; width follows the lockup's proportions. */
  height?: number;
  className?: string;
  /** Provide when the wordmark is not inside a link that already has an accessible name. */
  title?: string;
  decorative?: boolean;
}

/** The primary wordmark as an inline outlined SVG in currentColor. Minimum width 145px. */
export function Wordmark({
  height = 24,
  className,
  title = 'Bracken & Roe',
  decorative = false,
}: WordmarkProps) {
  const [, , w, h] = WORDMARK_VIEWBOX.split(' ').map(Number);
  const width = Math.round(((w ?? 607) / (h ?? 100)) * height);
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      width={width}
      height={height}
      className={className}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
      style={{ minWidth: 145 }}
    >
      <path fill="currentColor" transform={`translate(${WORDMARK_PAD} 0)`} d={WORDMARK_PATH} />
    </svg>
  );
}
