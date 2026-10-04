// Checks WCAG AA contrast for every text/background token pair, in both themes.
// Reads the hex values straight from src/styles/tokens.css, so it stays in sync.
import { readFile } from 'node:fs/promises';

const css = await readFile('src/styles/tokens.css', 'utf8');
const block = (re) => Object.fromEntries([...(css.match(re)?.[1] ?? '').matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
const light = block(/:root\s*\{([\s\S]*?)\n\}/);
const dark = { ...light, ...block(/:root\[data-theme='dark'\]\s*\{([\s\S]*?)\n\}/) };

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// [foreground, background, minimum ratio]
const PAIRS = [
  ['ink', 'bg', 4.5], ['ink', 'bg-raised', 4.5], ['ink', 'bg-sunken', 4.5],
  ['ink-soft', 'bg', 4.5], ['ink-soft', 'bg-raised', 4.5], ['ink-soft', 'bg-sunken', 4.5],
  ['accent', 'bg', 4.5], ['accent', 'bg-raised', 4.5], ['accent-ink', 'accent', 4.5],
  ['ink', 'accent-soft', 4.5],
  ['status-installed', 'status-installed-bg', 4.5], ['status-acquiring', 'status-acquiring-bg', 4.5],
  ['status-planned', 'status-planned-bg', 4.5], ['status-retired', 'status-retired-bg', 4.5],
  ['unconfirmed', 'bg-raised', 4.5], ['unconfirmed', 'bg', 4.5],
  ['focus', 'bg', 3], ['line-strong', 'bg-raised', 3],
];

let bad = 0;
for (const [name, theme] of [['light', light], ['dark', dark]]) {
  for (const [fg, bg, min] of PAIRS) {
    const r = ratio(theme[fg], theme[bg]);
    const ok = r >= min;
    if (!ok) bad++;
    console.log(`${ok ? '✓' : '✗'} ${name.padEnd(5)} ${fg} on ${bg}: ${r.toFixed(2)} (min ${min})`);
  }
}
process.exit(bad ? 1 : 0);
