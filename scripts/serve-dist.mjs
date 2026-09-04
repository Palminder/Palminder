/**
 * Minimal static server for `dist/` that applies the Cloudflare Pages `_headers` rules,
 * so the Content Security Policy and other headers can be tested locally and in CI.
 *
 * Usage: node scripts/serve-dist.mjs   (PORT defaults to 4321, HOST to 127.0.0.1)
 */
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const DIST = 'dist';
const PORT = Number(process.env.PORT ?? 4321);
const HOST = process.env.HOST ?? '127.0.0.1';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.wasm': 'application/wasm',
  '.woff2': 'font/woff2',
};

/** Parse Cloudflare Pages `_headers` into [{ pattern: RegExp, headers: [[name, value]] }]. */
function parseHeaderRules(text) {
  const rules = [];
  let current = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, '').trimEnd();
    if (!line.trim()) continue;
    if (!/^\s/.test(line)) {
      const pattern = line.trim();
      const regex = new RegExp(
        '^' +
          pattern
            .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
            .replace(/\*/g, '.*')
            .replace(/:[A-Za-z0-9_]+/g, '[^/]+') +
          '$',
      );
      current = { pattern: regex, headers: [] };
      rules.push(current);
    } else if (current) {
      const index = line.indexOf(':');
      if (index > 0)
        current.headers.push([line.slice(0, index).trim(), line.slice(index + 1).trim()]);
    }
  }
  return rules;
}

const headerRules = existsSync(join(DIST, '_headers'))
  ? parseHeaderRules(readFileSync(join(DIST, '_headers'), 'utf8'))
  : [];

function headersFor(pathname) {
  const headers = {};
  for (const rule of headerRules) {
    if (!rule.pattern.test(pathname)) continue;
    for (const [name, value] of rule.headers) {
      if (name.startsWith('!')) delete headers[name.slice(1).toLowerCase()];
      else headers[name.toLowerCase()] = value;
    }
  }
  return headers;
}

function send(res, status, file, pathname) {
  const body = readFileSync(file);
  res.writeHead(status, {
    'content-type': MIME[extname(file)] ?? 'application/octet-stream',
    'content-length': body.length,
    ...headersFor(pathname),
  });
  res.end(body);
}

const server = createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://${HOST}:${PORT}`);
  const pathname = decodeURIComponent(url.pathname);
  const safe = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const full = join(DIST, safe);

  if (existsSync(full) && statSync(full).isDirectory()) {
    if (!pathname.endsWith('/')) {
      res.writeHead(301, { location: `${pathname}/${url.search}` });
      res.end();
      return;
    }
    const index = join(full, 'index.html');
    if (existsSync(index)) return send(res, 200, index, pathname);
  } else if (existsSync(full) && statSync(full).isFile()) {
    return send(res, 200, full, pathname);
  }

  const notFound = join(DIST, '404.html');
  if (existsSync(notFound)) return send(res, 404, notFound, pathname);
  res.writeHead(404, { 'content-type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, HOST, () => {
  console.log(
    `Serving ${DIST}/ at http://${HOST}:${PORT}/ with ${headerRules.length} header rule(s).`,
  );
});
