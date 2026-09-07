import Link from 'next/link';
import type { Route } from 'next';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'text';

const base =
  'inline-flex items-center justify-center gap-2 min-h-11 px-6 py-2.5 text-[0.9375rem] font-medium leading-none rounded-sm transition-colors duration-200 select-none';

const variants: Record<Variant, string> = {
  primary: 'bg-moss text-paper hover:bg-deep-ink focus-visible:bg-deep-ink',
  secondary: 'border border-ink text-ink hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper',
  text: 'arrow-link px-0 py-2 text-ink underline decoration-ink/40 underline-offset-[0.2em] hover:decoration-ink',
};

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  arrow?: boolean;
}

type LinkButtonProps = CommonProps & { href: Route } & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'className' | 'children'>;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

/** Primary (Moss), secondary (outline) and text-link variants. Square corners, no shadows. */
export function Button(props: ButtonProps) {
  const variant = props.variant ?? 'primary';
  const arrow = props.arrow ?? variant === 'text';
  const classes = cn(base, variants[variant], props.className);
  const content = (
    <>
      <span>{props.children}</span>
      {arrow ? <ArrowIcon /> : null}
    </>
  );
  if (props.href !== undefined) {
    const { href, variant: _variant, className: _className, children: _children, arrow: _arrow, ...rest } = props;
    void _variant; void _className; void _children; void _arrow;
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  const { href: _href, variant: _variant, className: _className, children: _children, arrow: _arrow, type = 'button', ...rest } = props;
  void _href; void _variant; void _className; void _children; void _arrow;
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
