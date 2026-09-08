import { cn } from '@/lib/utils/cn';

interface MaterialFieldProps {
  ratio?: '16/10' | '4/3' | '3/2' | '4/5' | '1/1';
  tone?: 'sandstone' | 'stone';
  className?: string;
}

const ratioClass: Record<NonNullable<MaterialFieldProps['ratio']>, string> = {
  '16/10': 'aspect-[16/10]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '4/5': 'aspect-[4/5]',
  '1/1': 'aspect-square',
};

/**
 * A solid material field used where verified photography has not yet been supplied.
 * Purely decorative (hidden from assistive technology); never carries a label or image.
 */
export function MaterialField({
  ratio = '16/10',
  tone = 'sandstone',
  className,
}: MaterialFieldProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'w-full',
        ratioClass[ratio],
        tone === 'sandstone' ? 'bg-sandstone' : 'bg-stone',
        className,
      )}
    />
  );
}
