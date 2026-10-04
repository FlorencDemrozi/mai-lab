# Content still needed

Real content that is missing. Until it arrives the site uses clearly marked placeholders:
files with `placeholder: true` show an **Unconfirmed** badge, and the build log counts them.
Tick items off as they arrive, and remove `placeholder: true` from the files you confirm.

## Decided

- [x] Motion capture is **OptiTrack** (12 ceiling cameras, ~5 × 8 m). The old site's "Qualisys" is dropped.

## Devices — `src/content/devices/`

- [ ] **Confirm OptiTrack is `installed`.** Status, researcher and applications come from the brief's example file. In `applications`, the example's `fine-movement` became `upper-body`, and `biomechanics` was dropped because it is a modality, not an application.
- [ ] **The other 21 devices are all `planned` + `placeholder: true`.** For each one, confirm or correct:
  - status (`installed` / `acquiring` + expected date / `planned`)
  - **responsible researcher(s)**: *guessed from each person's research focus on the old site*
  - linked applications: *guessed*, apart from the brief's two examples (Gait, HAR)
  - make, model, key specs, quantity, sync capability (hardware / software / none)
  - photo
- [ ] Devices in the new brief with **no file yet**: EMG + IMU body sensor networks, pressure systems, PPG, respiration, radar/contactless, BLE wearable networks, synchronized multimodal acquisition system.
- [ ] Old-site items **not turned into devices**: software licences (eye tracking, EEG, motion capture) and fit-out (mounting rails, UPS, displays, acoustic treatment, furniture). Do they belong on the site?

## Text

- [ ] §3.4 paragraph "from the original brief" (after "Humans are inherently multimodal…"). The original brief is not in the repo.
- [ ] §3.7 paragraph "from the original brief" (Collaborate section).
- [ ] One-sentence descriptions for the 12 applications (`src/content/applications/*.yaml`; Claude drafted them as placeholders).
- [ ] Review the About page (`src/content/pages/en/about.md`), carried over and lightly edited from the old site.
- [ ] Official accessibility statement (`src/content/pages/en/accessibility.md` is a draft; it should link to uustatus.no).
- [ ] Norwegian: modality and application names, UI strings (`src/i18n/ui.ts`) and the tagline "Måle. Forstå. Forbedre liv." were drafted by Claude and **need review by a native speaker**. No Norwegian versions of pages or device texts yet.

## People — `src/content/researchers/`

- [ ] For the 11 researchers carried over from the old site: role, email, UiS profile URL, ORCID, and **consent** to publish their photo and details (`consent: true`).
      Only Florenc Demrozi has an email so far.
- [ ] Researcher photos.
- [ ] Is the list still complete? Should anyone be added or set to `active: false`?

## Images and 3D

- [ ] Hero render and 2D isometric twin image (both from the same Blender model and camera).
- [ ] Floor plan, ceiling height, camera positions or a scan of room KE E-470. The OptiTrack zone's position in the room (`src/content/zones/capture-volume.yaml`) is a placeholder.
- [ ] Device photos.
- [ ] UiS logo files and visual-profile rules. The colours and fonts in `src/styles/tokens.css` are provisional.
- [ ] Open Graph images: `public/og-default.png` is a generated placeholder shared by every page.

## Settings — `src/content/settings.yaml`

- [ ] Shared lab email address (currently florenc.demrozi@uis.no).
- [ ] Building name and postal address (currently "Kjølv Egelands hus, Kristine Bonnevies vei 22, 4021 Stavanger"; please confirm).
- [ ] Visiting information.
- [ ] Social links, if any.

## Open questions (REQUIREMENTS §8)

- [ ] Hosting and domain (the deploy workflow currently targets GitHub Pages).
- [ ] Is Norwegian needed at launch?
- [ ] Is equipment booking in scope later?
