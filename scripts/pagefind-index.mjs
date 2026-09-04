/**
 * Builds the Pagefind search index for the lab library after `astro build`.
 *
 * Only pages that opt in with `data-pagefind-body` (lab, case-study and organisation-project
 * detail pages) are indexed, so listing and utility pages never appear as search results.
 * Pagefind's CLI would fall back to indexing every page when no such element exists yet,
 * which is why the Node API is used here. With no evidence published the index is written
 * empty and search simply returns no results.
 *
 * Usage: node scripts/pagefind-index.mjs
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import * as pagefind from 'pagefind';

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
  console.error('dist/ does not exist. Run `astro build` first.');
  process.exit(1);
}

const { index, errors: createErrors } = await pagefind.createIndex({
  forceLanguage: 'en',
  verbose: false,
});
if (createErrors?.length) {
  console.error(createErrors.join('\n'));
  process.exit(1);
}

const files = walk(DIST).filter((file) => file.endsWith('.html'));
let indexed = 0;
for (const file of files) {
  const content = readFileSync(file, 'utf8');
  if (!content.includes('data-pagefind-body')) continue;
  const rel = '/' + relative(DIST, file).split(sep).join('/');
  const url = rel.replace(/index\.html$/, '');
  const { errors } = await index.addHTMLFile({ url, content });
  if (errors?.length) {
    console.error(`Failed to index ${url}: ${errors.join('; ')}`);
    process.exit(1);
  }
  indexed += 1;
}

const { errors: writeErrors } = await index.writeFiles({ outputPath: join(DIST, 'pagefind') });
if (writeErrors?.length) {
  console.error(writeErrors.join('\n'));
  process.exit(1);
}
await pagefind.close();
console.log(`pagefind-index: indexed ${indexed} evidence page(s) into ${DIST}/pagefind.`);
