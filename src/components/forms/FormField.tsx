import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface FormFieldProps {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: (attrs: {
    id: string;
    'aria-describedby'?: string;
    'aria-invalid'?: true;
    'aria-required'?: true;
  }) => ReactNode;
  className?: string;
}

export const inputClass =
  'w-full min-h-12 border border-ink/40 bg-white px-3.5 py-2.5 text-[1.0625rem] text-ink rounded-sm placeholder:text-ink/40 focus:border-moss focus-visible:outline-2 focus-visible:outline-moss focus-visible:outline-offset-2 aria-[invalid=true]:border-terracotta';

/** Persistent visible label, helper text and inline error, wired with aria-describedby. */
export function FormField({
  id,
  label,
  helper,
  error,
  required,
  optional,
  children,
  className,
}: FormFieldProps) {
  const helperId = helper ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={id} className="type-meta font-medium text-ink">
        {label}
        {optional ? <span className="font-normal text-ink/70"> (optional)</span> : null}
      </label>
      {helper ? (
        <p id={helperId} className="type-meta mt-1 text-ink/70">
          {helper}
        </p>
      ) : null}
      <div className="mt-2">
        {children({
          id,
          'aria-describedby': describedBy,
          ...(error ? { 'aria-invalid': true as const } : {}),
          ...(required ? { 'aria-required': true as const } : {}),
        })}
      </div>
      {error ? (
        <p id={errorId} className="type-meta mt-2 font-medium text-terracotta">
          <span className="visually-hidden">Error: </span>
          {error}
        </p>
      ) : null}
    </div>
  );
}
