# MMAI Lab website — conventions for Claude Code

Website for the **MMAI Lab — Multimodal AI Lab**, University of Stavanger (formerly "BMD Living Lab").
Tagline: **Sensing. Understanding. Improving Lives.** (full stops, not commas).

Full spec: `docs/REQUIREMENTS.md` (converted from `docs/MMAI Lab Website — Requirements Brief.docx`; the .docx is the source of truth if they differ).
Missing real content is tracked in `TODO-content.md`.

## Repository layout

- `webpage/` — the **old** hand-written static site (archive only; do not edit, do not build on it).
- `docs/` — requirements brief.
- New site: Astro project (see REQUIREMENTS §5 for the target structure).

## Working mode

- Work **phase by phase** (REQUIREMENTS §8). Phase numbering follows §8:
  1 Foundation · 2 Home experience with 2D hotspot twin (go live) · 3 3D twin · 4 Growth.
  (§5 calls the 2D layer "Phase 1" and 3D "Phase 2" — that refers to the twin's layers, not delivery phases.)
- Propose before building; wait for approval on stack/structure changes.
- Phase 2: build section by section and check each in the browser at desktop and mobile widths, light and dark, keyboard only.
- Do not commit or push unless asked.

## Content rules

- **All lab-specific text and data lives in `src/content/`** — never hard-coded in components.
  UI chrome strings go in `src/i18n/`.
- One file per item (Markdown + front matter or YAML), Zod-validated in `src/content.config.ts`.
- Relations stored by ID on **one side only**; reverse links computed at build time.
- Every device **must** have `status` (`installed` | `acquiring` | `planned` | `retired`) and ≥1 researcher, or the build fails with a clear message.
- Status is shown as a **text badge** (never colour alone) everywhere a device appears.
  `planned`/`acquiring` are never presented as available; `retired` is hidden from lab views.
- `twin_object` is the only link between content and the 3D/2D scene. A device without a twin shape still appears everywhere else and is flagged in the build log.
- Bilingual fields `{ en, no }`; missing `no` falls back to `en`.
- Placeholder images and dummy data must be clearly marked (`placeholder: true` / `TODO` in the file) and listed in `TODO-content.md`.
- Motion capture is **OptiTrack** (12 ceiling cameras, ~5 × 8 m volume). The old site's "Qualisys" is wrong.

## Technical rules

- Astro + TypeScript + Zod; plain CSS with custom properties (light/dark tokens).
- Near-zero JS by default; interactive islands only for the twin, application selector, theme/menu.
- **Everything must work without JavaScript** (all content readable; twin interaction is the only loss).
- Three.js only in Phase 3, lazy-loaded near the viewport; only when WebGL is available, the device is capable and reduced motion is off. 2D layer is the permanent fallback. Both layers share device data and the same card component.
- No third-party trackers, CDNs or external fonts — self-host and subset fonts.
- All motion respects `prefers-reduced-motion`.
- Emails lightly obfuscated, still one-click `mailto:`.
- Images AVIF/WebP with explicit sizes; hero LCP < 2.5 s on mid-range 4G.

## Quality bar

- WCAG 2.1 AA (Norwegian universal-design rules). Twin: Tab through devices in logical order, Enter opens card, Esc closes, accessible name per device; visible focus.
- Every interactive visual has an equivalent text list on the same page.
- Lighthouse mobile ≥ 90 (performance and accessibility); axe passes in CI.
- Every device/researcher/application/project/publication: own URL, title, description, OG image; schema.org data; sitemap.
- Acceptance checklist: REQUIREMENTS §8.
