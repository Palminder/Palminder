export interface PageInfo<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  start: number;
  end: number;
  baseUrl: string;
  urlFor: (page: number) => string;
  prevUrl: string | undefined;
  nextUrl: string | undefined;
}

export const DEFAULT_PAGE_SIZE = 20;

/**
 * Splits a list into pages. Page 1 lives at `baseUrl`; later pages at `${baseUrl}page/N/`.
 * The URL scheme keeps listing pages distinct from detail slugs.
 */
export function paginate<T>(
  items: readonly T[],
  currentPage: number,
  baseUrl: string,
  pageSize = DEFAULT_PAGE_SIZE,
): PageInfo<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.min(Math.max(1, currentPage), totalPages);
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, totalItems);
  const urlFor = (n: number) => (n <= 1 ? baseUrl : `${baseUrl}page/${n}/`);
  return {
    items: items.slice(start, end),
    currentPage: page,
    totalPages,
    totalItems,
    pageSize,
    start,
    end,
    baseUrl,
    urlFor,
    prevUrl: page > 1 ? urlFor(page - 1) : undefined,
    nextUrl: page < totalPages ? urlFor(page + 1) : undefined,
  };
}

/** Page numbers 2..N for `getStaticPaths` of a `page/[page]` route. */
export function extraPageNumbers(totalItems: number, pageSize = DEFAULT_PAGE_SIZE): number[] {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => i + 2);
}
