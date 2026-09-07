/** First focusable element on every page; becomes visible on focus and lands on <main>. */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="visually-hidden focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-normal focus:bg-ink focus:px-4 focus:py-3 focus:text-paper focus:[clip:auto] focus:[clip-path:none]"
    >
      Skip to main content
    </a>
  );
}
