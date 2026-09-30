# BoostChat Interior Sales Landing — Production V1

Result report for `prompt` (BOOSTCHAT INTERIOR SALES LANDING — PRODUCTION V1).
Built locally only. Not deployed.

> **Updated by the pre-deploy pass — see [`BOOSTCHAT-INTERIOR-SALES-PREDEPLOY.md`](./BOOSTCHAT-INTERIOR-SALES-PREDEPLOY.md).**
> - The contact form, the mailto flow and `CONTACT_EMAIL` were removed. Every 도입 상담 CTA now opens the
>   KakaoTalk 1:1 open chat (`KAKAO_OPEN_CHAT_URL` in `lib/site.ts`).
> - The full demo video section anchor is now `#demo-video` (was `#video`).
>
> Contact-form details below are kept only as a record of V1.
>
> **Hero refined — see [`BOOSTCHAT-INTERIOR-SALES-HERO-FINAL.md`](./BOOSTCHAT-INTERIOR-SALES-HERO-FINAL.md).** The hero is now
> copy + a real product showcase (desktop) or a phone capture (tablet/mobile). The hero loop video, its pause button and the
> flow pills described below are no longer rendered (the video files are kept).

---

## Report

```
MIGRATION_MODE = MIGRATE_CLEANLY

DESIGN_SOURCE_READ = YES
HANDOFF_RULES_FOLLOWED = YES
REAL_PRODUCT_ASSETS_USED = YES
FAKE_UI_CREATED = NO

HERO_VIDEO_CONNECTED = YES
MASTER_VIDEO_CONNECTED = YES
LIVE_DEMO_CONNECTED = YES

FINAL_SECTIONS =
   1. HERO               #top      "홈페이지까지 찾아온 고객, 견적 문의까지 자연스럽게 이어지고 있나요?" + hero loop video
   2. PROBLEM            #problem  5-step visitor journey + "BoostChat은 이 과정을 하나의 대화 안에서 이어줍니다."
   3. INTERACTIVE STORY  #talk → #recommend → #viewer → #photos → #memory → #inquiry
                         (대화 → 조건 이해·사례 추천 → 사례 뷰어 → 사진 → 기억 → 견적 문의)
   4. OWNER SIDE         #owner    사업자 관리 화면 (+ "화면 속 문의는 촬영용 데모 데이터입니다.")
   5. MOBILE             #mobile
   6. FULL VIDEO         #demo-video  master-sales.mp4, 1:26   (was #video in V1)
   7. BEFORE / AFTER     #compare
   8. WHY WE BUILT IT    #why
   9. INSTALL            #install (scene) + #install-paths
                         A. 기존 홈페이지 + BoostChat / B. 홈페이지 제작 + BoostChat
  10. LIVE DEMO          #live     → https://interior-demo.boostweb.co.kr
  11. EARLY PARTNER      #partner
  12. FINAL CTA          #contact  도입 상담 → KakaoTalk 1:1 open chat (V1: disabled form)
      + fixed header, story rail (desktop), footer

DESKTOP_QA = PASS          (1440, 1280, 1024)
TABLET_QA = PASS           (768)
MOBILE_QA = PASS           (390, 375)
REDUCED_MOTION = PASS
ACCESSIBILITY_BASIC = PASS
TYPECHECK = PASS           (next typegen && tsc --noEmit)
LINT = PASS                (eslint, 0 problems)
BUILD = PASS               (next build, all routes static)

CONTACT_METHOD =   [V1 record — replaced by KakaoTalk 1:1 open chat in PREDEPLOY]
  CONTACT_EMAIL is NOT configured, so the #contact form currently renders
  DISABLED. It shows a notice ("온라인 도입 상담 접수를 준비하고 있습니다…"),
  a "실제 데모 체험하기" link, and the status line
  "상담 신청 기능이 아직 연결되지 않아 지금은 입력할 수 없습니다."
  Nothing is sent or stored anywhere.
  When CONTACT_EMAIL is set at build time, submitting validates 업체명/연락처
  and then opens the visitor's mail app with a prefilled message
  (subject "[BoostChat 도입 상담] {업체명}"). The page says exactly that and
  never shows a fake "접수되었습니다" success state. There is no backend, CRM or DB.

KNOWN_ISSUES =
  - [RESOLVED in PREDEPLOY] CONTACT_EMAIL is not set, so there is currently no working
    contact channel on the page. → 도입 상담 now goes to the KakaoTalk 1:1 open chat.
  - NEXT_PUBLIC_SITE_URL is not set. canonical / og:url / sitemap fall back to
    https://$VERCEL_PROJECT_PRODUCTION_URL on Vercel, or http://localhost:3000 locally.
  - Favicon and apple-icon are placeholders: a white "B" on #155DFC. There is
    no real BoostChat logo in the design source.
  - Product crops are 1× PNGs with the capture margins and shadows baked in
    (as HANDOFF describes). They are slightly soft on 2× displays at the
    largest scene sizes.
  - Not tested on real iOS Safari or Android devices, only in Playwright
    Chromium with mobile viewports.
  - Font payload: Pretendard subset 592 KB, plus JetBrains Mono (latin only).
  - The desktop hero loop is 2.2 MB. It is lazy (preload="metadata") and only
    plays when visible, but it is still the largest above-the-fold download on desktop.
  - JetBrains Mono uses next/font/google, so `next build` needs network
    access. Vercel has it; an offline build would fail.
  - Neither video has an audio track, so the master player's volume control
    has no effect. This is expected, not a bug.
  - [RESOLVED in PREDEPLOY] The project folder is not a git repository yet.

READY_FOR_VERCEL = YES
READY_FOR_OUTBOUND_SALES = NO
  → [V1 record] the contact-channel blocker was removed in PREDEPLOY (KakaoTalk).
    NEXT_PUBLIC_SITE_URL still needs the final domain once it is known.
```

---

## How to finish before sending outbound traffic

| Env var | Needed for | Example |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical, OG url, sitemap, robots | `https://<final-domain>` |

It is read at build time, so set it in Vercel Project → Settings → Environment Variables and redeploy.
`DEMO_URL`, `KAKAO_OPEN_CHAT_URL`, `DEMO_VIDEO_ID` and all SEO copy are in `lib/site.ts`.
(`CONTACT_EMAIL` was removed in the pre-deploy pass; the contact channel is KakaoTalk.)

---

## Source paths (spec vs actual)

| Spec says | Actual path used |
|---|---|
| `design-source/` | `design-reference/claude-design/` (kept, untouched, excluded from tsconfig/eslint) |
| `source-assets/video/` | `source-assets/videos/` (kept; copies served from `public/video/`) |
| `source-assets/images/` | `source-assets/images/` (kept; the crops in use are `design-reference/claude-design/assets/product/*`, copied to `public/images/product/`) |

Files read from the design source: `readme.md`, `HANDOFF.md`, `SKILL.md`, `styles.css`, `tokens/*`, `guidelines/*`, `components/**` (prop contracts), and `ui_kits/sales-landing/*` (`index.html`, `Scenes.jsx`, `App.jsx`, etc.). Scene data, layer positions and motion ranges come from `Scenes.jsx`.

Things from the design source that were not ported, per the spec: `_ds_bundle.js`, Babel-in-browser, CDN React, window globals, `*.card.html`, per-frame React state, and inline-style architecture.

---

## Architecture

```
app/
  layout.tsx           fonts, metadata (title/description/OG/Twitter/canonical/robots)
  page.tsx             section order (server component)
  globals.css          Tailwind v4 @theme = design tokens; custom variants
  robots.ts, sitemap.ts, icon.svg, apple-icon.png, opengraph-image.jpg, twitter-image.jpg
  fonts/               Pretendard Variable subset + OFL license
components/
  landing/             one file per section (server) + small client islands:
                       HeroVideo, DemoVideoPlayer (ContactForm removed in PREDEPLOY)
  motion/              DepthStage, ProductLayer (server), MotionController (client)
  ui/                  Button/ButtonLink, SceneHeader, Section, Br (Field removed in PREDEPLOY)
lib/
  site.ts              DEMO_URL, KAKAO_OPEN_CHAT_URL, DEMO_VIDEO_ID, SITE_URL, SEO copy, video paths
  scenes.tsx           all scene data (layers, positions, motion tracks, copy)
  assets.ts            every product image with width/height/alt
  motion.ts            track math (ease-out segment), shared by server and client
public/
  images/product/      25 real product crops
  video/               chat-to-portfolio.mp4 (+720p, poster), master-sales.mp4
```

**Rendering.** The page is fully static. Only two small client islands (HeroVideo, DemoVideoPlayer; V1 also had ContactForm) and one motion controller ship JS beyond the Next/React runtime.

**Story scenes.** Each scene is server-rendered twice:
- a layered 2.5D stage, used for desktop with motion;
- a static composite image, used for mobile or reduced motion.

CSS media queries choose between them, so the layout never swaps on hydration. The server renders every layer in its final (p=1) state, so the page is complete without JavaScript.

**Motion.** A single `MotionController` handles all motion:
- one passive scroll listener, scheduled with rAF;
- cached section measurements, refreshed on resize and ResizeObserver;
- styles written directly to the DOM.

There is no React state per frame. It drives:
- layer tracks from `data-motion`
- the nav solid state
- the rail's current step
- pointer tilt (≤1.5°, fine pointers only)
- hero parallax
- one-shot reveal, below the fold only

Depth follows the design system: perspective 1800px, Z −80…+90.

**Hero pills.** The pills (대화 → 관련 사례 → 사진 → 상담 → 견적 문의) cycle with pure CSS keyframes, 9s.

---

## Videos

**Hero — `chat-to-portfolio.mp4` (15s loop, 1920×1080)**
- Muted, looping, playsInline, with a poster (`chat-to-portfolio-poster.webp`, a frame from the video).
- It starts only when it is on screen and motion is allowed, and it pauses when scrolled away.
- Screens ≤820px get `chat-to-portfolio-720.mp4`: 424 KB, re-encoded from the same file (x264 CRF 26, faststart, no audio).
- A visible pause/play button is included (WCAG 2.2.2).
- Under reduced motion it shows the poster, and a tap on play still plays it.

**Demo — `master-sales.mp4` (1:26, 1920×1080, 9.2 MB)**
- A click-to-play facade (poster plus a play button labelled with the duration), so nothing downloads until the visitor asks.
- The click mounts `<video controls autoplay playsinline>` and moves focus to it.
- Keyboard works: Enter/Space on the button.

The `VIDEO_SRC` placeholder from the design source was replaced with this real file.

---

## Typography decision

- **Pretendard Variable v1.3.9** (SIL OFL 1.1), self-hosted with `next/font/local`, `display: swap`, weight axis 45–930.
- The full variable woff2 is 2.0 MB. It is subset with Pretendard's own `subset_glyphs.txt` (KS X 1001 Hangul + Latin + symbols, the same set as Pretendard's official "subset" builds), plus arrows and punctuation used by the copy. Result: **592 KB**.
- All 321 distinct characters in the page copy are covered.
- It is self-hosted rather than loaded from a CDN, for reliability and to avoid a third-party font request. No layout shift was measured (CLS 0).
- If new copy ever needs rarer Hangul (outside KS X 1001), regenerate the subset:

  ```sh
  npm pack pretendard@1.3.9 && tar xzf pretendard-1.3.9.tgz
  python3 - <<'EOF'
  t = open('package/subset_glyphs.txt', encoding='utf-8').read()
  extra = '→←↑↓›‹·•…“”‘’–—「」『』※○●◦×%&@#*+=/\\|~^_<>()[]{}:;.,!?\'"`$0123456789  '
  open('glyphs.txt', 'w', encoding='utf-8').write(''.join(sorted(set(t + extra + NEW_CHARS))))
  EOF
  pyftsubset package/dist/web/variable/woff2/PretendardVariable.woff2 \
    --text-file=glyphs.txt --flavor=woff2 \
    --output-file=app/fonts/PretendardVariable.subset.woff2
  ```

  `pyftsubset` comes from `pip install fonttools brotli`.

- **JetBrains Mono** is used only for step counters and timecodes. It comes from `next/font/google` (latin subset); Next downloads and self-hosts it at build time.

Typesetting carried over from the design system:
- `word-break: keep-all` everywhere and `text-wrap: balance` on headings;
- headline tracking of −0.035em;
- explicit line breaks that apply only per viewport (`components/ui/Br.tsx`), so Korean lines break at word boundaries at 1440, 768, 390 and 375.

---

## Deviations from the design reference (all intentional)

| # | Change | Why |
|---|---|---|
| 1 | Hero primary CTA is **"실제 데모 체험하기"** (live demo). "작동 방식 보기" is secondary; 도입 상담 stays in the header and the final CTA. | The spec's CTA priority makes the live demo primary. The reference hero used 도입 상담 as primary. |
| 2 | The talk scene's static (mobile/reduced-motion) composite is `scene-01-conversation`. | The reference used `scene-09-install`, which would show the same image twice on mobile and doesn't match the scene. |
| 3 | The hero video extends into the left/right gutters (−60px / −20px). | The video's own background is the page color. Showing the UI larger matched the reference screenshot's visual weight. |
| 4 | The pinned scene visual is sized with container-query height, so it always fits under the header. | In the reference, the bottom ~37px of the visual was clipped at 1440×900. |
| 5 | Small helper text uses `muted` (#596472, 5.37:1) instead of `subtle`/`faint`. | `subtle` is 4.32:1 and `faint` 2.32:1 on #F1F2F4, both below WCAG AA for small text. |
| 6 | Added a pause/play control on the hero loop. | WCAG 2.2.2, and so reduced-motion users can still choose to watch. |
| 7 | Added a 720p hero encode for ≤820px. | Mobile hero media went from ~3.5 MB of range requests to 424 KB. |
| 8 | Phone-only (≤480px) line breaks in the hero headline. | Readable 4-line break at 390/375 without changing the tablet/desktop breaks. |
| 9 | Under reduced motion on desktop, static composites get right padding. | Keeps them clear of the story rail. |

Tokens, colors, type scale, spacing, radii, shadows, section order, Korean copy, scene data, layer positions and motion ranges are unchanged from the design source. Tenant orange appears only inside the product screenshots.

---

## Reduced motion (`prefers-reduced-motion: reduce`)

Verified in Playwright at 1440×900 by comparing the two modes:

| | Motion allowed | Reduced |
|---|---|---|
| Scene pinning | sticky, 210vh scroll track | static, normal flow |
| Scene visual | layered 2.5D stage | single static composite, in order |
| Pointer tilt | ≤1.5° | none |
| Hero parallax | yes | none |
| Hero pills | 9s cycle | frozen on step 1 |
| Hero video | autoplays when visible | poster; plays only on request |
| Reveal transitions | once, below fold | none (all content visible) |
| `scroll-behavior` | smooth | auto |
| Page height | 25,352px | 18,085px |

The mobile layout (≤820px) has no pinning, tilt, 3D or rail, regardless of the motion preference.

---

## QA performed

**Checks**
- `npm run typecheck`, `npm run lint` and `npm run build` all pass.

**Playwright (Chromium) at 1440, 1280, 1024, 768, 390 and 375**
- No horizontal overflow (`scrollWidth === innerWidth` at every width).
- No console errors or warnings.
- No reveal element left hidden after a full scroll.
- Captured:
  - full desktop page
  - hero
  - story scenes (recommend at 3 progress points; viewer, memory, owner, mobile, install)
  - video section, idle and playing
  - live demo, partner and final CTA
  - rail jump
  - keyboard focus states
  - full mobile page at 390 and 375

**Behavior**
- The master video plays from the keyboard, focus moves into the player, and it reports a duration of 86.6s.
- The hero loop plays muted and pauses offscreen.
- The rail jump lands scenes mid-progress.
- The nav turns solid after 40px.

**Accessibility**
- Headings: one `h1`, then `h2` per section, then `h3`.
- A skip link comes first.
- Tab order is logical, with a visible 2px focus ring.
- External links announce "(새 창에서 열림)".
- Links and buttons are used correctly.
- All 32 images have alt text; 5 decorative duplicates use `alt=""`.
- The form has labels, required markers, `aria-invalid`/`aria-describedby`, and moves focus to the first error.
- No scroll trap: pinned scenes use `position: sticky`, and scroll is never hijacked.

**Performance (local)**
- LCP is the hero `h1`; CLS is 0.
- HTML is about 27 KB gzip.
- Images use `next/image` with sizes and are lazy below the fold.

---

## Future BoostChat dogfood embed (not implemented)

Nothing here needs restructuring to add the real BoostChat widget later:
- Add the embed script in `app/layout.tsx` with `next/script` (`strategy="lazyOnload"`).
- Optionally change the `#contact` heading or copy in `components/landing/Contact.tsx` to "BoostChat 도입이 궁금하신가요?".

The page doesn't use a fixed bottom-right element that would collide with a chat launcher. The story rail is vertically centered on the right edge and hidden ≤820px.

---

## Not done (by instruction)

The following were not built, per the spec's STOP rules:
- Market Recon integration
- email automation
- CRM
- database
- payment
- CMS
- Three.js/WebGL
- a redesign
- fabricated metrics or testimonials

No deployment was made. `design-reference/` and `source-assets/` are untouched.

## Run locally

```sh
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
# with the final canonical domain:
NEXT_PUBLIC_SITE_URL=https://<final-domain> npm run build
```
