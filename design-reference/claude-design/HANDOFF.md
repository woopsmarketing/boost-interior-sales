# HANDOFF — BoostChat Interior Sales Landing

This package is the design reference for building the production Next.js landing page. Everything renders as-is from static files. No build step.

## 1. Entry point
`ui_kits/sales-landing/index.html`. Serve the package root over a static server (e.g. `npx serve .`) and open that path. The page uses relative `../../` paths.

Load order: `styles.css` → React 18 + Babel (CDN) → `_ds_bundle.js` (compiled components, exposed as `window.BoostChatDesignSystem_29c1c3`) → `Scenes.jsx` → `Hero.jsx` → `Sections.jsx` → `Closing.jsx` → inline `App`.

## 2. Folder structure
- `styles.css` — `@import` list only
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css` (all CSS custom properties on `:root`)
- `components/` — React primitives. Each has `.jsx` + `.d.ts` (props) + `.prompt.md` (usage) + one `*.card.html` preview.
  - `core/` — Button, Tag
  - `layout/` — SceneHeader
  - `depth/` — DepthStage, ProductShot, ScrollScene
  - `navigation/` — SiteNav, StoryRail
  - `forms/` — Field
- `ui_kits/sales-landing/`
  - `index.html` — the page and the App shell (nav, story rail, section order)
  - `Hero.jsx`
  - `Scenes.jsx` — scene data, pinned scenes, mobile and install scenes, `useIsMobile` / `useIsNarrow`, Reveal
  - `Sections.jsx` — Problem, DemoVideo, BeforeAfter, Why, InstallPaths, LiveDemo, Partner
  - `Closing.jsx` — form and footer
- `guidelines/` — foundation specimen cards (colors, type, spacing, radii, elevation, depth, motion, brand)
- `assets/product/` — product crops (see §3)
- `uploads/` — the original `sales-01…09.png` source captures (1600×1000)
- `readme.md` — brand, content and visual guidelines
- `SKILL.md` — agent skill manifest
- `thumbnail.html` — project tile
- `_ds_bundle.js`, `_ds_manifest.json` — generated component bundle and index. They are needed only to render the reference HTML; do not port them.

## 3. Asset map (crop origin in the 1600×1000 source)
- **sales-01** (conversation):
  - `scene-01-conversation.png` (60,195 1400×790)
  - `layer-chat-widget.png` (920,205 500×745)
  - `layer-site-hero.png` (80,231 850×703)
- **sales-02** (portfolio recommendation):
  - `scene-02-portfolio.png`
  - `layer-portfolio-card.png` (940,437 405×428)
  - `layer-site-full.png` (80,231 1248×703)
- **sales-03** (viewer):
  - `scene-03-viewer.png`
  - `layer-viewer-modal.png` (265,272 878×622)
  - `layer-viewer-card.png` (1066,258 482×295)
- **sales-04** (photos):
  - `scene-04-photos.png`
  - `photo-kitchen.png`
  - `photo-sink.png`
  - `photo-bath.png`
- **sales-05** (memory):
  - `scene-05-memory.png`
  - `layer-chat-memory.png`
- **sales-06** (inquiry form):
  - `scene-06-inquiry.png`
  - `layer-chat-form.png`
- **sales-07** (owner admin):
  - `scene-07-dashboard.png`
  - `layer-dashboard.png`
  - `layer-inquiry-card.png` (200,294 1183×497)
- **sales-08** (mobile):
  - `scene-08-mobile.png`
  - `layer-phone-chat.png`
  - `layer-phone-viewer.png`
- **sales-09** (install / welcome):
  - `scene-09-install.png`
  - `layer-chat-welcome.png`

`scene-*` are composites with the headline removed. The mobile layout and the video poster use them. `layer-*` / `photo-*` are the depth-stacking layers for desktop. In `Scenes.jsx`, layer positions are % of the scene frame, so layers re-assemble exactly.

## 4. Key tokens
- **Page and text:** page `--surface-page #F1F2F4`, raised `#FFFFFF`, ink `--text-strong #101828`, sub `--text-muted #596472`
- **Accent:** `--accent #155DFC` (hover `#0D4BE0`, soft `#EFF6FF`, disabled `#89ADFD`). Used only for the eyebrow, primary CTA, links, focus and active step.
- **Demo-client colors:** tenant orange `#D9691F` and warm `#FAF8F4` belong to the demo client inside the screenshots. Never use them for BoostChat UI.
- **Type:** Pretendard. Headline scale clamp → 72 / 56 / 40, tracking −0.035em, `word-break: keep-all`. Body 17/1.6.
- **Radii:** 6 / 8 / 12 / 16 / 20 / 28 / 44 / pill.
- **Shadows:** `--shadow-window`, `--shadow-float`, `--shadow-device` (wide, low opacity).
- **Layout:** gutter 80, page max 1440, 160px between sections.
- **Depth:** perspective 1800px, planes −80 … +90px, tilt ≤ 1.5°.
- **Motion:** `--ease-out cubic-bezier(.22,.61,.36,1)`; 160 / 280 / 600 / 900ms.

## 5. Desktop behavior (> 820px)
- **Nav:** fixed. It turns solid (86% page color + 14px backdrop blur) after 40px of scroll.
- **Story rail:** fixed on the right while a story scene is in view. It highlights the current scene and jumps to a scene on click.
- **Story scenes:** each product scene is a `ScrollScene` pinned for 210vh (mobile scene 190vh). Children get progress 0→1, which scrubs each layer's `translateZ`, scale, x/y, blur and opacity: backgrounds recede and blur, and foreground cards rise.
- **Tilt:** `DepthStage` adds cursor tilt of 1.5° at most, only on fine pointers with hover.
- **Hero:** the flow pills cycle every 1.8s. The hero layers get light scroll parallax over the first 700px.
- **Non-pinned sections:** they fade up 16px once on entering the viewport (`Reveal`, IntersectionObserver).
- **Below 1100px:** the two-column blocks (live demo, why, form) stack into one column.
- **Video:** clicking play swaps in a `<video>` when `VIDEO_SRC` is set.
- **Form:** client-side required checks, then a success state (no network call).

## 6. Mobile behavior (≤ 820px)
- No pinning, no tilt, no scrubbing.
- Each scene shows its header plus the matching `scene-*.png` composite, with a one-time fade-up.
- The nav hides its links and keeps a short "상담 신청" CTA.
- The story rail is hidden.
- All grids collapse to one column. Line breaks (`<br>`) become spaces.

## 7. Reduced motion
- **Implemented now:** `DepthStage` disables tilt under `prefers-reduced-motion: reduce`, and smooth scrolling is turned off.
- **Not yet implemented (production must add):** `ScrollScene` scrubbing, the hero flow-pill cycle and `Reveal` fades still run. Production should:
  - render pinned scenes as static composites, like mobile;
  - stop the pill interval;
  - show Reveal content without transitions.

## 8. CDN dependencies
- **Fonts:** Pretendard Variable v1.3.9 from jsDelivr (`tokens/fonts.css`) and JetBrains Mono from Fontsource CDN. No font binaries are included. For production, self-host them (e.g. with `next/font/local` and the Pretendard woff2).
- **Reference runtime:** React 18.3.1, ReactDOM and Babel standalone from unpkg. These are for the reference files only.

## 9. Known caveats
- **Crop edges:** layer crops keep a few px of page-colored margin, and the chat/phone crops include baked-in shadow from the source captures. They blend correctly only on `#F1F2F4`. For crisp production assets, re-export the widget screens from the product at 2×.
- **Resolution:** the source captures are 1600×1000 (1×). Some layers display larger than native on wide screens.
- **Placeholders:** `VIDEO_SRC` and `DEMO_URL` are empty in `Sections.jsx`. The video area shows a poster and play button.
- **No logo:** none was supplied. "BoostChat" is set in Pretendard 800 in `--accent`.
- **No icons:** none were supplied. The page uses typographic glyphs (→ › ·); if icons are needed, Lucide is the suggested match.
- **Demo data:** the owner-screen data is demo data, and the page labels it as such.
- **Visual verification:** the page was checked at about 900px and 390px widths in preview, not on real devices or Safari.

## 10. Reference code vs production-ready
**Treat as reference (reimplement):**
- all `.jsx` in `ui_kits/` and `components/`: inline styles, Babel-in-browser, `window` globals, and scroll state kept in React (re-renders on every frame)
- `_ds_bundle.js` and the `*.card.html` previews

**Carry over directly:**
- token values (`tokens/*.css`) — map them to CSS variables or Tailwind theme
- copy (Korean strings in the jsx files)
- section order and scene data (layer %, animation ranges in `Scenes.jsx`)
- asset files
- component prop contracts (`*.d.ts`) as API guidance

**Production suggestions:**
- scroll-linked transforms with CSS scroll-driven animations or a rAF loop writing to refs, instead of React state
- `next/image` for assets
- a real form submission endpoint
