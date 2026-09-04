/**
 * Lab library search, filters and sorting, powered by the Pagefind index that is generated
 * after `astro build` (`pagefind --site dist`). Loaded only on the lab library page and only
 * when the user interacts with the form or arrives with query parameters.
 *
 * Without JavaScript the server-rendered, paginated list and static category pages are used.
 */

interface PagefindResultData {
  url: string;
  meta: Record<string, string>;
  excerpt: string;
  filters: Record<string, string[]>;
}

interface PagefindResult {
  id: string;
  data: () => Promise<PagefindResultData>;
}

interface PagefindSearchResponse {
  results: PagefindResult[];
  unfilteredResultCount: number;
}

interface PagefindApi {
  init: () => Promise<void>;
  options: (options: Record<string, unknown>) => Promise<void>;
  search: (
    term: string | null,
    options?: { filters?: Record<string, string>; sort?: Record<string, 'asc' | 'desc'> },
  ) => Promise<PagefindSearchResponse>;
}

const FILTER_KEYS = ['type', 'category', 'technology', 'role', 'year'] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

const PAGE_SIZE = 20;

let pagefindPromise: Promise<PagefindApi> | null = null;

const PAGEFIND_URL = '/pagefind/pagefind.js';

function loadPagefind(): Promise<PagefindApi> {
  if (!pagefindPromise) {
    pagefindPromise = (import(/* @vite-ignore */ PAGEFIND_URL) as Promise<PagefindApi>)
      .then(async (module) => {
        await module.options({ excerptLength: 20 });
        await module.init();
        return module;
      })
      .catch((error: unknown) => {
        pagefindPromise = null;
        throw error;
      });
  }
  return pagefindPromise;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function badgeVariant(typeLabel: string): string {
  return typeLabel
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function formatMonthYear(iso: string | undefined): string {
  if (!iso) return '';
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function renderCard(result: PagefindResultData): string {
  const meta = result.meta;
  const title = meta.title ?? result.url;
  const type = meta.type ?? '';
  const category = meta.category ?? '';
  const categoryUrl = meta.category_url ?? '/labs/';
  const technologies = (meta.technologies ?? '')
    .split('|')
    .map((t) => t.trim())
    .filter(Boolean);
  const shown = technologies.slice(0, 4);
  const extra = technologies.length - shown.length;
  const proof = (meta.proof ?? '')
    .split('|')
    .map((p) => p.trim())
    .filter(Boolean);
  const archived = meta.archived === 'true';
  const completed = formatMonthYear(meta.completed);
  const reviewed = formatMonthYear(meta.reviewed);

  return `
<article class="card evidence-card" data-evidence-type="${escapeHtml(badgeVariant(type))}">
  <div class="card__meta">
    <span class="badge badge--${escapeHtml(badgeVariant(type))}">${escapeHtml(type)}</span>
    ${archived ? '<span class="badge badge--archived">Archived evidence</span>' : ''}
    <a class="evidence-card__category" href="${escapeHtml(categoryUrl)}">${escapeHtml(category)}</a>
  </div>
  <h3><a href="${escapeHtml(result.url)}">${escapeHtml(title)}</a></h3>
  <p class="card__summary">${escapeHtml(meta.summary ?? '')}</p>
  <ul class="tag-list" aria-label="Key technologies">
    ${shown.map((t) => `<li><span class="tag">${escapeHtml(t)}</span></li>`).join('')}
    ${extra > 0 ? `<li><span class="tag">+${extra} more</span></li>` : ''}
  </ul>
  <div class="card__footer">
    <p class="evidence-card__dates">Completed <time datetime="${escapeHtml(meta.completed ?? '')}">${escapeHtml(completed)}</time> <span aria-hidden="true">·</span> Reviewed <time datetime="${escapeHtml(meta.reviewed ?? '')}">${escapeHtml(reviewed)}</time></p>
    ${
      proof.length > 0
        ? `<ul class="proof-list" aria-label="Evidence available">${proof
            .map((p) => `<li class="proof"><span>${escapeHtml(p)}</span></li>`)
            .join('')}</ul>`
        : ''
    }
  </div>
</article>`;
}

export function initLabLibrary(): void {
  const formEl = document.getElementById('library-filters');
  const listEl = document.getElementById('library-list');
  const statusEl = document.getElementById('library-status');
  const resultsHeading = document.getElementById('results-heading');
  const serverPagination = document.getElementById('library-pagination');
  const resetButton = document.getElementById('filter-reset');
  if (!(formEl instanceof HTMLFormElement) || !listEl || !statusEl) return;
  const form: HTMLFormElement = formEl;
  const list: HTMLElement = listEl;
  const status: HTMLElement = statusEl;

  const originalList = list.innerHTML;
  const originalHeading = resultsHeading?.textContent ?? '';
  const total = Number(form.dataset.total ?? '0');
  let requestId = 0;
  let debounceTimer: number | undefined;

  form.hidden = false;

  const controls = {
    q: form.elements.namedItem('q') as HTMLInputElement,
    type: form.elements.namedItem('type') as HTMLSelectElement,
    category: form.elements.namedItem('category') as HTMLSelectElement,
    technology: form.elements.namedItem('technology') as HTMLSelectElement,
    role: form.elements.namedItem('role') as HTMLSelectElement,
    year: form.elements.namedItem('year') as HTMLSelectElement,
    sort: form.elements.namedItem('sort') as HTMLSelectElement,
  };

  function readState() {
    const filters: Partial<Record<FilterKey, string>> = {};
    for (const key of FILTER_KEYS) {
      const value = controls[key].value.trim();
      if (value) filters[key] = value;
    }
    return { q: controls.q.value.trim(), filters, sort: controls.sort.value };
  }

  function isDefault(state: ReturnType<typeof readState>): boolean {
    return state.q === '' && Object.keys(state.filters).length === 0;
  }

  function writeUrl(state: ReturnType<typeof readState>): void {
    const params = new URLSearchParams();
    if (state.q) params.set('q', state.q);
    for (const key of FILTER_KEYS) {
      const value = state.filters[key];
      if (value) params.set(key, value);
    }
    if (state.sort && state.sort !== 'featured') params.set('sort', state.sort);
    const query = params.toString();
    const url = `${window.location.pathname}${query ? `?${query}` : ''}`;
    window.history.replaceState(null, '', url);
  }

  function applyUrlState(): boolean {
    const params = new URLSearchParams(window.location.search);
    let any = false;
    const q = params.get('q');
    if (q) {
      controls.q.value = q;
      any = true;
    }
    for (const key of FILTER_KEYS) {
      const value = params.get(key);
      if (value && [...controls[key].options].some((option) => option.value === value)) {
        controls[key].value = value;
        any = true;
      }
    }
    const sort = params.get('sort');
    if (sort && [...controls.sort.options].some((option) => option.value === sort)) {
      controls.sort.value = sort;
      any = true;
    }
    return any;
  }

  function restoreServerList(): void {
    list.innerHTML = originalList;
    if (resultsHeading) resultsHeading.textContent = originalHeading;
    if (serverPagination) serverPagination.hidden = false;
  }

  function describe(state: ReturnType<typeof readState>, count: number): string {
    const parts: string[] = [];
    if (state.q) parts.push(`matching “${state.q}”`);
    for (const key of FILTER_KEYS) {
      const value = state.filters[key];
      if (value) parts.push(`${key}: ${value}`);
    }
    const scope = parts.length > 0 ? ` ${parts.join(', ')}` : '';
    return `${count} of ${total} item${total === 1 ? '' : 's'}${scope}.`;
  }

  async function runSearch(): Promise<void> {
    const state = readState();
    writeUrl(state);
    if (isDefault(state)) {
      restoreServerList();
      status.textContent = `Showing all ${total} item${total === 1 ? '' : 's'}.`;
      return;
    }

    const current = ++requestId;
    status.textContent = 'Searching…';
    let pagefind: PagefindApi;
    try {
      pagefind = await loadPagefind();
    } catch {
      status.textContent =
        'Search is unavailable in this preview because the search index has not been built. Use the category links or the full list below.';
      restoreServerList();
      return;
    }

    const options: { filters?: Record<string, string>; sort?: Record<string, 'asc' | 'desc'> } = {};
    if (Object.keys(state.filters).length > 0)
      options.filters = state.filters as Record<string, string>;
    const term = state.q || null;
    if (state.sort === 'reviewed') options.sort = { reviewed: 'desc' };
    else if (state.sort === 'featured' || !term) options.sort = { rank: 'desc' };

    const response = await pagefind.search(term, options);
    if (current !== requestId) return;

    const results = response.results;
    if (serverPagination) serverPagination.hidden = true;
    if (resultsHeading) resultsHeading.textContent = 'Matching evidence';

    if (results.length === 0) {
      list.innerHTML =
        '<p class="empty-state">No evidence matches these filters. Try removing a filter or reset to see everything.</p>';
      status.textContent = describe(state, 0);
      return;
    }

    const firstPage = await Promise.all(results.slice(0, PAGE_SIZE).map((result) => result.data()));
    if (current !== requestId) return;
    list.innerHTML = firstPage.map(renderCard).join('');

    if (results.length > PAGE_SIZE) {
      const more = document.createElement('button');
      more.type = 'button';
      more.className = 'button button--quiet';
      let shown = PAGE_SIZE;
      more.textContent = `Show more (${results.length - shown} remaining)`;
      more.addEventListener('click', async () => {
        const next = await Promise.all(
          results.slice(shown, shown + PAGE_SIZE).map((result) => result.data()),
        );
        shown += next.length;
        more.insertAdjacentHTML('beforebegin', next.map(renderCard).join(''));
        if (shown >= results.length) more.remove();
        else more.textContent = `Show more (${results.length - shown} remaining)`;
        status.textContent = `Showing ${Math.min(shown, results.length)} of ${results.length} matching items.`;
      });
      list.append(more);
    }
    status.textContent = describe(state, results.length);
  }

  function scheduleSearch(delay: number): void {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      void runSearch();
    }, delay);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    scheduleSearch(0);
  });
  controls.q.addEventListener('input', () => scheduleSearch(250));
  for (const key of [...FILTER_KEYS, 'sort'] as const) {
    controls[key].addEventListener('change', () => scheduleSearch(0));
  }
  resetButton?.addEventListener('click', () => {
    form.reset();
    for (const key of FILTER_KEYS) controls[key].value = '';
    controls.q.value = '';
    controls.sort.value = 'featured';
    window.history.replaceState(null, '', window.location.pathname);
    restoreServerList();
    status.textContent = `Filters cleared. Showing all ${total} item${total === 1 ? '' : 's'}.`;
    controls.q.focus();
  });

  // Warm the index on first interaction so the first search feels immediate.
  form.addEventListener('focusin', () => void loadPagefind().catch(() => undefined), {
    once: true,
  });

  if (applyUrlState()) {
    void runSearch();
  }
}
