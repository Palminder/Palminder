/**
 * Post-build verification of `dist/`.
 *
 * Fails the build when the output contains anything that must never be published:
 * draft content, template markers, TODOs, fake testimonial markers, the excluded former
 * employer, zero-value evidence metrics, a planned credential status, inline styles that
 * would break the Content Security Policy, third-party resources, or missing SEO metadata.
 * Also checks preview/production indexing signals and that empty areas are absent.
 *
 * Usage: node scripts/verify-dist.mjs   (reads PUBLIC_SITE_ENV, defaults to preview)
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const CONTENT = join('src', 'content');
const env = process.env.PUBLIC_SITE_ENV === 'production' ? 'production' : 'preview';

const failures = [];
const warnings = [];
const fail = (message) => failures.push(message);
const warn = (message) => warnings.push(message);

if (!existsSync(DIST)) {
  console.error('dist/ does not exist. Run `npm run build` first.');
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function visibleText(html) {
  return decodeEntities(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' '),
  );
}

/** Minimal frontmatter reader: top-level `key: value` pairs only. */
function readFrontmatter(file) {
  const source = readFileSync(file, 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/);
    if (!pair) continue;
    let value = pair[2].trim();
    if (
      (value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith('"') && value.endsWith('"'))
    ) {
      value = value.slice(1, -1);
    }
    data[pair[1]] = value;
  }
  return data;
}

function collectionEntries(dir) {
  const base = join(CONTENT, dir);
  if (!existsSync(base)) return [];
  return walk(base)
    .filter((file) => /\.(md|mdx)$/.test(file))
    .filter(
      (file) =>
        !relative(base, file)
          .split(sep)
          .some((part) => part.startsWith('_')),
    )
    .map((file) => {
      const rel = relative(base, file).split(sep).join('/');
      const slug = rel.replace(/\.(md|mdx)$/, '').replace(/\/index$/, '');
      const data = readFrontmatter(file);
      return { file, slug: data.slug || slug, data, draft: data.draft !== 'false' };
    });
}

const htmlFiles = walk(DIST).filter((file) => file.endsWith('.html'));
if (htmlFiles.length === 0) fail('No HTML files found in dist/.');

const pages = htmlFiles.map((file) => {
  const html = readFileSync(file, 'utf8');
  return {
    file,
    rel: '/' + relative(DIST, file).split(sep).join('/'),
    html,
    text: visibleText(html),
  };
});

// 1. Excluded former employer (name stored encoded so it never appears in the repository).
const excludedEmployer = Buffer.from('SGVpbWRhbA==', 'base64').toString('utf8');
const allFiles = walk(DIST).filter((file) => /\.(html|xml|txt|json|js|css|md)$/.test(file));
for (const file of allFiles) {
  const content = readFileSync(file, 'utf8');
  if (content.toLowerCase().includes(excludedEmployer.toLowerCase())) {
    fail(`Excluded employer name found in ${relative(DIST, file)}.`);
  }
}

// 2. Template markers, TODOs and fake-content markers in visible text.
const markers = [
  /\bTODO\b/,
  /\bFIXME\b/,
  /\bTEMPLATE\b/,
  /lorem ipsum/i,
  /\bJane Doe\b/i,
  /\bJohn Doe\b/i,
  /\bJohn Smith\b/i,
  /\bAcme\b/,
  /\[Client name\]/i,
  /\[Company\]/i,
  /placeholder testimonial/i,
];
for (const page of pages) {
  for (const marker of markers) {
    if (marker.test(page.text)) fail(`Marker ${marker} found in visible text of ${page.rel}.`);
  }
}

// 3. Zero-value evidence metrics and planned credentials.
for (const page of pages) {
  if (/data-metric-value="0"/.test(page.html))
    fail(`Zero-value evidence metric rendered in ${page.rel}.`);
  if (/data-credential-status="planned"/.test(page.html))
    fail(`Planned credential rendered in ${page.rel}.`);
}

// 4. Draft entries must not be built or mentioned by title.
const collections = [
  { dir: 'case-studies', route: '/evidence/case-studies/' },
  { dir: 'labs', route: '/labs/' },
  { dir: 'organisation-projects', route: '/evidence/organisation-projects/' },
  { dir: 'automation', route: null },
  { dir: 'credentials', route: null },
  { dir: 'experience', route: null },
];
let publishedOrganisationProjects = 0;
for (const { dir, route } of collections) {
  for (const entry of collectionEntries(dir)) {
    if (dir === 'organisation-projects' && !entry.draft) publishedOrganisationProjects += 1;
    if (!entry.draft) continue;
    if (route) {
      const routeDir = join(DIST, route.slice(1), entry.slug);
      if (existsSync(routeDir))
        fail(`Draft entry ${dir}/${entry.slug} was built to ${route}${entry.slug}/.`);
    }
    // Draft experience entries only carry the organisation name, which the verified
    // experience line is permitted to mention, so their titles are not checked.
    if (dir === 'experience') continue;
    const title = entry.data.title;
    if (title && !/TEMPLATE/i.test(title)) {
      for (const page of pages) {
        if (page.text.includes(title))
          fail(`Draft title "${title}" (${dir}/${entry.slug}) appears in ${page.rel}.`);
      }
    }
  }
}

// 5. The organisation-project area must be absent until at least one project is published.
const organisationIndex = join(DIST, 'evidence', 'organisation-projects', 'index.html');
if (publishedOrganisationProjects === 0 && existsSync(organisationIndex)) {
  fail('Organisation-project index exists but no organisation project is published.');
}
if (publishedOrganisationProjects === 0) {
  for (const page of pages) {
    if (/href="\/evidence\/organisation-projects\//.test(page.html)) {
      fail(`Link to the empty organisation-project area found in ${page.rel}.`);
    }
  }
}

// 6. Content Security Policy compatibility: no inline styles, no third-party resources.
for (const page of pages) {
  if (/<style[\s>]/i.test(page.html))
    fail(`Inline <style> element in ${page.rel} (CSP style-src 'self').`);
  if (/\sstyle="/i.test(page.html))
    fail(`Inline style attribute in ${page.rel} (CSP style-src 'self').`);
  const inlineScripts = page.html.match(/<script(?![^>]*\bsrc=)[^>]*>/gi) ?? [];
  for (const tag of inlineScripts) {
    if (!/type="application\/ld\+json"/.test(tag))
      fail(`Inline executable <script> in ${page.rel}: ${tag}`);
  }
  for (const match of page.html.matchAll(
    /<(?:script|link|img|iframe|source)\b[^>]*?(?:src|href)="(https?:)?\/\/([^/"]+)[^"]*"/gi,
  )) {
    const tag = match[0];
    if (/<link\b[^>]*rel="(canonical|sitemap|alternate|me)"/i.test(tag)) continue;
    fail(`Third-party resource referenced in ${page.rel}: ${tag.slice(0, 120)}`);
  }
}

// 7. SEO metadata: title, description, canonical, unique titles, robots consistency.
const titles = new Map();
for (const page of pages) {
  const title = page.html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim();
  if (!title) fail(`Missing <title> in ${page.rel}.`);
  else {
    if (titles.has(title))
      fail(`Duplicate <title> "${title}" in ${page.rel} and ${titles.get(title)}.`);
    titles.set(title, page.rel);
  }
  if (!/<meta name="description" content="[^"]+"/i.test(page.html))
    fail(`Missing meta description in ${page.rel}.`);
  if (!/<link rel="canonical" href="https?:\/\/[^"]+"/i.test(page.html))
    fail(`Missing canonical link in ${page.rel}.`);
  const robots = page.html.match(/<meta name="robots" content="([^"]+)"/i)?.[1];
  if (!robots) fail(`Missing robots meta in ${page.rel}.`);
  else if (env === 'preview' && !/noindex/.test(robots))
    fail(`Preview build page ${page.rel} is indexable (${robots}).`);
  else if (
    env === 'production' &&
    page.rel !== '/404.html' &&
    /noindex/.test(robots) &&
    !/Archived evidence/.test(page.text)
  ) {
    warn(`Production page ${page.rel} is noindex (${robots}).`);
  }
}

// 8. robots.txt and sitemap.
const robotsTxt = join(DIST, 'robots.txt');
if (!existsSync(robotsTxt)) fail('robots.txt is missing.');
else {
  const body = readFileSync(robotsTxt, 'utf8');
  if (env === 'preview' && !/Disallow: \/\s*$/m.test(body))
    fail('Preview robots.txt must disallow all crawling.');
  if (env === 'production' && !/Allow: \//.test(body))
    fail('Production robots.txt must allow crawling.');
  if (env === 'production' && !/Sitemap: https?:\/\//.test(body))
    fail('Production robots.txt must list the sitemap.');
}
const sitemapIndex = join(DIST, 'sitemap-index.xml');
if (!existsSync(sitemapIndex)) fail('sitemap-index.xml is missing.');
else {
  const sitemaps = walk(DIST).filter((file) => /sitemap-\d+\.xml$/.test(file));
  for (const file of sitemaps) {
    const xml = readFileSync(file, 'utf8');
    if (/\/404\//.test(xml)) fail('Sitemap lists the 404 page.');
    for (const page of pages) {
      if (
        /Archived evidence — retained for historical context/.test(page.text) &&
        xml.includes(page.rel.replace(/index\.html$/, ''))
      ) {
        fail(`Sitemap lists archived evidence ${page.rel}.`);
      }
    }
  }
}

// 9. Search index present.
if (!existsSync(join(DIST, 'pagefind', 'pagefind.js')))
  fail('Pagefind index (dist/pagefind/pagefind.js) is missing.');

// 10. Home page first-screen essentials and MD-102 status label.
const home = pages.find((page) => page.rel === '/index.html');
if (!home) fail('Home page missing.');
else {
  const required = [
    'Palminder Dhariwal',
    'Microsoft Cloud & Infrastructure Engineer',
    'Endpoint · Microsoft 365 · Identity · Azure · Automation',
    'Based in Scotland · Available for genuinely fully remote UK roles',
    'IN PROGRESS — NOT YET EARNED',
    'View technical evidence',
    'Open recruiter pack',
    'Previous experience includes SSE, Queen Margaret University, Prudential via Xtravirt, AVEVA and Wescot.',
  ];
  for (const text of required) {
    if (!home.text.includes(text)) fail(`Home page is missing required text: "${text}".`);
  }
  if (/career break/i.test(home.text))
    fail('Career-break wording must not appear on the home page.');
}
for (const page of pages) {
  if (/\b(autis|disabilit|medical|diagnos)/i.test(page.text))
    fail(`Health, disability or autism wording found in ${page.rel}.`);
  if (
    /\b(we|our team|our clients)\b/i.test(page.text) &&
    /(we offer|our services|our clients|our team)/i.test(page.text)
  ) {
    fail(`Agency-style plural language found in ${page.rel}.`);
  }
  if (
    /\b(digital transformation expert|innovative solutions|passionate IT professional|technology guru|thought leader|rockstar|ninja)\b/i.test(
      page.text,
    )
  ) {
    fail(`Banned marketing language found in ${page.rel}.`);
  }
}

for (const message of warnings) console.warn(`warning: ${message}`);
if (failures.length > 0) {
  for (const message of failures) console.error(`FAIL: ${message}`);
  console.error(`\nverify-dist: ${failures.length} failure(s) in ${pages.length} pages (${env}).`);
  process.exit(1);
}
console.log(
  `verify-dist: ${pages.length} pages checked (${env}); no failures, ${warnings.length} warning(s).`,
);
