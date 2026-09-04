/**
 * Internal link check for `dist/`.
 *
 * Every href/src/srcset in the built HTML that points at this site must resolve to a file in
 * dist (directory URLs to index.html) and every fragment must match an id in the target page.
 * External links are listed for manual review; they are not fetched (no network in CI).
 *
 * Usage: node scripts/check-links.mjs
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

if (!existsSync(DIST)) {
  console.error('dist/ does not exist. Run `npm run build` first.');
  process.exit(1);
}

const htmlFiles = walk(DIST).filter((file) => file.endsWith('.html'));
const ids = new Map();
const pages = htmlFiles.map((file) => {
  const html = readFileSync(file, 'utf8');
  const rel = '/' + relative(DIST, file).split(sep).join('/');
  ids.set(rel, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return { file, rel, html };
});

function resolveTarget(pathname) {
  const clean = decodeURIComponent(pathname.split('?')[0]);
  const candidates = [];
  if (clean.endsWith('/')) candidates.push(join(DIST, clean, 'index.html'));
  else {
    candidates.push(join(DIST, clean));
    candidates.push(join(DIST, clean, 'index.html'));
    candidates.push(join(DIST, `${clean}.html`));
  }
  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

const broken = [];
const external = new Set();
const slashWarnings = [];

for (const page of pages) {
  const refs = [];
  for (const match of page.html.matchAll(
    /<(a|link|img|script|source|iframe|video|audio)\b[^>]*>/gi,
  )) {
    const tag = match[0];
    if (/^<link\b/i.test(tag) && /rel="(canonical|sitemap|alternate)"/i.test(tag)) continue;
    const href = tag.match(/\shref="([^"]+)"/i)?.[1];
    const src = tag.match(/\ssrc="([^"]+)"/i)?.[1];
    const srcset = tag.match(/\ssrcset="([^"]+)"/i)?.[1];
    if (href) refs.push(href);
    if (src) refs.push(src);
    if (srcset) for (const part of srcset.split(',')) refs.push(part.trim().split(/\s+/)[0]);
  }

  for (const raw of refs) {
    const ref = raw.replace(/&amp;/g, '&');
    if (/^(mailto:|tel:|data:|javascript:)/i.test(ref)) continue;
    if (/^https?:\/\//i.test(ref)) {
      external.add(ref);
      continue;
    }
    let target = ref;
    let fragment = '';
    const hash = ref.indexOf('#');
    if (hash >= 0) {
      target = ref.slice(0, hash);
      fragment = ref.slice(hash + 1);
    }
    let pathname;
    if (target === '') pathname = page.rel;
    else if (target.startsWith('/')) pathname = target;
    else pathname = new URL(target, `http://local${page.rel}`).pathname;

    const file = resolveTarget(pathname);
    if (!file) {
      broken.push(`${page.rel} -> ${ref}`);
      continue;
    }
    if (
      file.endsWith('.html') &&
      !pathname.endsWith('/') &&
      !pathname.endsWith('.html') &&
      target !== ''
    ) {
      slashWarnings.push(`${page.rel} -> ${ref} (missing trailing slash)`);
    }
    if (fragment) {
      const targetRel = '/' + relative(DIST, file).split(sep).join('/');
      const targetIds = ids.get(targetRel);
      if (targetIds && !targetIds.has(fragment))
        broken.push(`${page.rel} -> ${ref} (missing id "${fragment}")`);
    }
  }
}

for (const message of slashWarnings) console.warn(`warning: ${message}`);
if (external.size > 0) {
  console.log(`External links to review manually (${external.size}):`);
  for (const link of [...external].sort()) console.log(`  ${link}`);
}
if (broken.length > 0) {
  for (const message of broken) console.error(`BROKEN: ${message}`);
  console.error(
    `\ncheck-links: ${broken.length} broken internal link(s) across ${pages.length} pages.`,
  );
  process.exit(1);
}
console.log(`check-links: ${pages.length} pages, no broken internal links.`);
