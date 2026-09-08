'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Wordmark } from '@/components/brand/Wordmark';
import { isActivePath } from './PrimaryNav';

interface NavItem {
  label: string;
  href: Route;
}

interface MobileMenuProps {
  primary: readonly NavItem[];
  services: readonly NavItem[];
  cta: NavItem;
  email: string;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-viewport Paper navigation panel. Traps focus, closes on Escape, returns focus
 * to the trigger, locks document scrolling while open and closes on navigation.
 */
export function MobileMenu({ primary, services, cta, email }: MobileMenuProps) {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so navigation closes it without an effect.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const close = useCallback(() => setOpenedOn(null), []);

  useEffect(() => {
    if (!open) return;
    // The panel and its trigger are hidden from the desktop breakpoint, so close it there.
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) close();
    };
    desktop.addEventListener('change', onChange);
    const body = document.body;
    const trigger = triggerRef.current;
    body.setAttribute('data-menu-open', 'true');
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (focusables.length === 0) return;
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (!firstEl || !lastEl) return;
      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onChange);
      body.removeAttribute('data-menu-open');
      trigger?.focus();
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="nav-link inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-[0.9375rem] font-medium text-ink lg:hidden"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenedOn(open ? null : pathname)}
      >
        {open ? 'Close' : 'Menu'}
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-paper text-ink lg:hidden"
        >
          <div className="container-site flex h-[68px] shrink-0 items-center justify-between border-b border-ink/20">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center"
              aria-label="Bracken & Roe — home"
            >
              <Wordmark height={20} decorative />
            </Link>
            <button
              type="button"
              className="nav-link inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-[0.9375rem] font-medium"
              onClick={close}
            >
              Close
            </button>
          </div>

          <nav className="container-site flex grow flex-col py-8" aria-label="Primary">
            <ul className="flex flex-col">
              {primary.map((item) => (
                <li key={item.href} className="border-b border-ink/15">
                  <Link
                    href={item.href}
                    className="flex min-h-14 items-center py-3 font-serif text-[2rem] leading-none"
                    aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href={cta.href}
                className="inline-flex min-h-12 w-full items-center justify-center bg-moss px-6 text-[0.9375rem] font-medium text-paper"
              >
                {cta.label}
              </Link>
              <a
                href={`mailto:${email}`}
                className="mt-4 inline-flex min-h-11 items-center underline decoration-ink/40 underline-offset-[0.2em]"
              >
                {email}
              </a>
            </div>

            <div className="mt-10">
              <p className="type-label text-ink/70">Services</p>
              <ul className="mt-3 flex flex-col">
                {services.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center text-[1.0625rem]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
