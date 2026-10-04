// Runs axe-core (WCAG 2.1 A/AA rules) on every page in dist/, in light and dark mode.
// Usage: npm run build && npm run test:a11y   (needs: npx playwright install chromium)
import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const DIST = resolve('dist');
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif',
  '.woff2': 'font/woff2', '.xml': 'application/xml', '.json': 'application/json',
};

async function htmlPages(dir, base = '') {
  const out = [];
  for (const name of await readdir(dir)) {
    const full = join(dir, name);
    if ((await stat(full)).isDirectory()) out.push(...(await htmlPages(full, `${base}/${name}`)));
    else if (name === 'index.html') out.push(`${base}/`);
  }
  return out;
}

const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  try {
    const body = await readFile(join(DIST, path));
    res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
});
await new Promise((r) => server.listen(0, r));
const origin = `http://localhost:${server.address().port}`;

const pages = (await htmlPages(DIST)).sort();
const browser = await chromium.launch();
let failures = 0;
for (const colorScheme of ['light', 'dark']) {
  const context = await browser.newContext({ colorScheme, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  for (const path of pages) {
    await page.goto(origin + path);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    for (const v of result.violations) {
      failures++;
      console.error(`✗ [${colorScheme}] ${path} — ${v.id} (${v.impact}): ${v.help}`);
      for (const n of v.nodes.slice(0, 3)) console.error(`    ${n.target.join(' ')}`);
    }
  }
  await context.close();
}
await browser.close();
server.close();

console.log(`${failures ? '✗' : '✓'} axe: ${pages.length} pages × 2 themes, ${failures} violation(s).`);
process.exit(failures ? 1 : 0);
