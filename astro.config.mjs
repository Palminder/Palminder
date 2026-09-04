// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
import { shikiClassTransformer } from './src/lib/shiki-classes.mjs';
import { satteri } from '@astrojs/markdown-satteri';
import { tableScrollPlugin } from './src/lib/satteri-table-scroll.mjs';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

/**
 * Site configuration for the Palminder Dhariwal portfolio.
 *
 * - Fully static output, directory-style URLs with trailing slashes.
 * - Stylesheets are never inlined so the Content Security Policy in `public/_headers`
 *   can stay strict (`style-src 'self'`).
 * - The sitemap excludes the 404 page and any content entry flagged `archived: true`.
 *   Draft entries are never built into routes at all (see `src/lib/content.ts`).
 */

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), 'PUBLIC_');
const siteEnv =
  (env.PUBLIC_SITE_ENV ?? process.env.PUBLIC_SITE_ENV) === 'production' ? 'production' : 'preview';

// Production must always set PUBLIC_SITE_URL. Preview builds fall back to Cloudflare's
// CF_PAGES_URL, and local builds to the dev server origin.
const siteUrl =
  env.PUBLIC_SITE_URL ||
  process.env.PUBLIC_SITE_URL ||
  process.env.CF_PAGES_URL ||
  'http://localhost:4321';

if (siteEnv === 'production' && !(env.PUBLIC_SITE_URL || process.env.PUBLIC_SITE_URL)) {
  throw new Error(
    'PUBLIC_SITE_URL must be set for a production build (PUBLIC_SITE_ENV=production).',
  );
}

/** Route prefixes for each content collection directory. */
const collectionRoutes = {
  'case-studies': '/evidence/case-studies/',
  labs: '/labs/',
  'organisation-projects': '/evidence/organisation-projects/',
};

/**
 * Minimal frontmatter scan (no YAML dependency) to find archived entries so they can be
 * excluded from the sitemap. The real schema validation happens in `src/content.config.ts`.
 * @returns {Set<string>}
 */
function archivedPathnames() {
  const result = new Set();
  const contentRoot = join(process.cwd(), 'src', 'content');
  for (const [dir, prefix] of Object.entries(collectionRoutes)) {
    const base = join(contentRoot, dir);
    let files = [];
    try {
      files = walk(base);
    } catch {
      continue;
    }
    for (const file of files) {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
      const rel = relative(base, file).split(sep).join('/');
      if (rel.split('/').some((part) => part.startsWith('_'))) continue;
      const source = readFileSync(file, 'utf8');
      const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!match) continue;
      const frontmatter = match[1];
      const archived = /^archived:\s*true\s*$/m.test(frontmatter);
      if (!archived) continue;
      const slug = rel.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '');
      result.add(`${prefix}${slug}/`);
    }
  }
  return result;
}

/** @param {string} dir @returns {string[]} */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const excludedFromSitemap = archivedPathnames();

export default defineConfig({
  site: siteUrl,
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    format: 'directory',
    inlineStylesheets: 'never',
  },
  devToolbar: { enabled: false },
  prefetch: false,
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        if (pathname === '/404/' || pathname === '/404.html') return false;
        return !excludedFromSitemap.has(pathname);
      },
    }),
  ],
  markdown: {
    // Sätteri is Astro 7's native Markdown pipeline. Tables are wrapped in a scroll region and
    // Shiki output is converted from inline styles to classes (see src/lib/shiki-classes.mjs).
    processor: satteri({ hastPlugins: [tableScrollPlugin] }),
    shikiConfig: {
      theme: 'github-light-high-contrast',
      wrap: false,
      transformers: [shikiClassTransformer()],
    },
  },
});
