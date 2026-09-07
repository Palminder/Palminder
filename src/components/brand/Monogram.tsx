import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from './paths';

interface MonogramProps {
  size?: number;
  className?: string;
}

/** The B&R monogram in currentColor. Minimum size 20 × 20 px. */
export function Monogram({ size = 24, className }: MonogramProps) {
  return (
    <svg
      viewBox={MONOGRAM_VIEWBOX}
      width={Math.round((size * 32) / 24)}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path fill="none" stroke="currentColor" strokeWidth={3} d={MONOGRAM_PATH} />
    </svg>
  );
}
