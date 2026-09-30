# BoostChat Interior Sales Landing: Hero Final

Result report for `prompt` (FINAL HERO REFINEMENT → MAIN PUSH → PRODUCTION DEPLOY → QA), 2026-09-30 → 10-01 KST.
It builds on [`BOOSTCHAT-INTERIOR-SALES-LANDING-V1.md`](./BOOSTCHAT-INTERIOR-SALES-LANDING-V1.md) and
[`BOOSTCHAT-INTERIOR-SALES-PREDEPLOY.md`](./BOOSTCHAT-INTERIOR-SALES-PREDEPLOY.md).
Only the hero changed. The other sections are unchanged: the rest of the 12-section structure, the copy, the tokens, the story motion, the video section and the CTAs.

---

## Report

```
TASK = HERO FINAL REFINEMENT

PRODUCTION_URL =
https://boost-interior-sales.vercel.app

HERO_DEMO_CTA   = "실제 데모 체험하기 →"  (primary, blue)   → https://interior-demo.boostweb.co.kr   (DEMO_URL)
HERO_KAKAO_CTA  = "카카오톡 1:1 도입 상담" (secondary, white) → https://open.kakao.com/o/sAS9ebQi      (KAKAO_OPEN_CHAT_URL)
                  Both use ButtonLink `external`: target="_blank", rel="noopener noreferrer", sr-only "(새 창에서 열림)".
HERO_VIDEO_LINK = "▶ 86초 실제 작동 영상 보기 →", a small text link (not a button) → #demo-video (DEMO_VIDEO_ID)
                  "작동 방식 보기" is no longer a hero button. The header nav still has "작동 방식" → #talk.

PRODUCT_SHOWCASE = Desktop ≥1024px, right column (hero grid 52fr | 48fr).
                   Real captures in layers: the demo interior homepage (back), the BoostChat chat window
                   (anchor, right), and one companion card per step (front). Each capture is cropped to its UI
                   edge with CSS; the captures carry margins from the page they were taken on.
SHOWCASE_STATES  = 01 자연어 상담   chat restating the visitor's request + "이해한 조건" chips
                   02 시공사례 추천  chat + recommended case card (사례 A, 공사 범위가 같은 사례)
                   03 사진 확인     chat + case photo from the viewer + 사례 A info card
                   04 견적 문의     chat switches to the memory + contact-form state + "기억한 조건" chips
AUTO_CYCLE       = YES. 5s per step, 700ms crossfade (companion cards also move 12px).
                   The active step's CSS progress bar is the timer (its animationend advances the step).
                   Holds on mouse hover, keyboard focus, when scrolled offscreen, and on the pause button.
                   Steps can be picked by click / keyboard (aria-current="step").
REDUCED_MOTION   = No rotation, no transitions, no bar animation. Step 01 shows statically. The pause button is
                   hidden (nothing moves). Steps can still be picked manually and switch instantly.
MOBILE_BEHAVIOR  = <1024px (tablet, mobile): stacked. Copy → CTAs → one static real phone capture
                   (layer-phone-chat.png, 300px / 72vw, device-rounded). No layers, no rotation.
                   ≤480px: the two CTAs are full-width and stacked.

REAL_PRODUCT_ASSETS_USED = YES   (all from lib/assets.ts / public/images/product; list below)
FAKE_UI_CREATED = NO
  The only non-capture element is the condition chips (대구 · 아파트 · 공급 32평 · 주방 · 욕실 · 화이트).
  They are page annotations, not product UI. They restate what the captured chat itself says. They reuse
  the style of the existing memory-scene chips. The strings now live in one constant, CAPTURED_CONDITIONS
  (lib/assets.ts), which both places use.

EMAIL_VIDEO_THUMBNAIL = public/images/email/video-thumbnail.webp  (1200×675, 16:9, 39.6 KB)
                        public/images/email/video-thumbnail.jpg   (same image, 84.9 KB; for Outlook desktop,
                                                                   which does not render WebP)
                        Source: scene-01-conversation.png. This is the same real capture the site uses as the
                        86s video's poster. It adds a small centered play button and one caption,
                        "86초 실제 작동 영상".
EMAIL_VIDEO_THUMBNAIL_URL =
https://boost-interior-sales.vercel.app/images/email/video-thumbnail.webp   (HTTP 200, image/webp)
https://boost-interior-sales.vercel.app/images/email/video-thumbnail.jpg    (HTTP 200, image/jpeg)

TYPECHECK = PASS   (next typegen && tsc --noEmit)
LINT      = PASS   (eslint, 0 problems)
BUILD     = PASS   (next build, 9/9 static routes)

GIT_COMMIT = 64a79e09134fbd32a308853fc8fd2bda5ba0755b  feat: refine sales hero with real product showcase and Kakao CTA
             (this report is pushed in a follow-up docs commit)
GIT_PUSH   = SUCCESS  (3f31a7f..64a79e0 main -> main, fast-forward, no force)

VERCEL_DEPLOY = READY  dpl_13sthWfX5cywNwXYyaiUnLn3B9sa, target production, built from main by the Git integration
                (15s build), aliased to https://boost-interior-sales.vercel.app.
                The public alias serves it: every image URL in the production HTML carries dpl_13sthWfX5cywNwXYyaiUnLn3B9sa.
PRODUCTION_QA = PASS  (7 viewports + reduced motion, 0 failures, on the public alias; details below)

KNOWN_ISSUES =
- Captures are 1× PNG crops (carried over from V1). At 1440 the chat text renders at about 10–11px and is
  slightly soft on 2× screens. At 1024 it is about 8px. It reads as real UI, but not every word is meant to be read there.
- Mouse hover pauses the rotation (WAI-ARIA carousel guidance). A visitor whose pointer rests on the showcase
  sees it hold, with the progress bar stopped. It resumes on mouse-out.
- The hero flow pills (대화 → 관련 사례 → 사진 → 상담 → 견적 문의) are gone. The showcase step row replaces them,
  so the page doesn't run two unsynchronized cycles.
- The hero loop video is no longer rendered or loaded. public/video/chat-to-portfolio*.mp4 and its poster stay
  on disk and on production (/video/chat-to-portfolio.mp4 still answers 206).
  The now-unused HeroVideo.tsx, FlowLine.tsx and VIDEOS.hero config were removed (in git history).
- 821–1023px (small tablets, e.g. iPad portrait/landscape below 1024) get the stacked tablet layout with the phone capture.
- `next dev` only: Next may log "layer-chat-widget.png was detected as LCP… add loading=eager". It matches images by
  URL, and the story scene below uses the same capture lazily. The check does not exist in production builds
  (production console: 0 warnings).
- The PREDEPLOY checks expected exactly 3 Kakao links. There are now 4 (header, hero, Early Partner, Final CTA).
- The `prompt` task file has uncommitted local edits. They were left out of the commits on purpose.
- The docs commit that adds this report triggers one more production build with identical app code.
- Carried over, unchanged: not tested on real iOS/Android devices (Playwright Chromium only), placeholder favicon,
  NEXT_PUBLIC_SITE_URL unset (falls back to the production vercel.app URL).
```

---

## CHANGED FILES

| File | Change |
|---|---|
| `components/landing/Hero.tsx` | Two-column grid at ≥1024px (`split:`). CTA row is now demo + Kakao. Adds the 86초 video text link and the tablet/mobile phone capture. The title is 40–60px in two-column mode (was 72px max). |
| `components/landing/HeroShowcase.tsx` | **New** client island: layered real captures, 4-step crossfade, step row with progress bars, pause button, holds, deferred loading and a desktop-only LCP preload. |
| `components/landing/HeroVideo.tsx` | **Deleted.** The hero loop is no longer rendered. The video files are kept. |
| `components/landing/FlowLine.tsx` | **Deleted.** The showcase step row replaces the hero flow pills. |
| `components/ui/SceneHeader.tsx` | New optional `subClassName`. The hero uses it for an 18px sub line at 1024–1100px. |
| `app/globals.css` | `split` variant (min-width 1024px) and `showcase-progress` keyframes. Removed the unused `flow-pill` / `flow-badge` keyframes. |
| `lib/site.ts` | `VIDEOS.master.seconds = 86` feeds the link text. Removed the `VIDEOS.hero` config. |
| `lib/assets.ts` | `CAPTURED_CONDITIONS` (shared by the hero chips and the memory scene). |
| `lib/scenes.tsx` | Memory scene tags now use `CAPTURED_CONDITIONS`. Same strings, so the output is unchanged. |
| `public/images/email/video-thumbnail.webp`, `.jpg` | **New** email thumbnail. |
| `docs/result/BOOSTCHAT-INTERIOR-SALES-HERO-FINAL.md` | **New** (this report). |
| `docs/result/BOOSTCHAT-INTERIOR-SALES-LANDING-V1.md`, `…-PREDEPLOY.md` | One-line pointer to this report. |

Not changed: every section other than the hero, `SiteHeader`, `Partner`, `Contact`, `DemoVideo`, the story scenes, `MotionController`, the tokens, the dependencies (none added) and the product assets.

## EXACT HERO CHANGES

1. **CTA hierarchy.** It is now `[ 실제 데모 체험하기 → ] [ 카카오톡 1:1 도입 상담 ]`, with `▶ 86초 실제 작동 영상 보기 →` below as a text link, then the existing note "● 기존 인테리어 홈페이지에도 설치할 수 있습니다." There are two big buttons, not three. URLs come from `lib/site.ts`. No URL is hard-coded.
2. **Left column copy unchanged.** The eyebrow, headline (same words and line breaks), sub line and install note are unchanged. The headline is 60px at 1440, 52px at 1280 and 42px at 1024 (was 72px max). The sub line is 18px only between 1024 and 1100px, so it keeps two lines.
3. **Right column.** The empty space right of the headline is now the product showcase. It is vertically centered with the copy. Its width is capped by viewport height, so the frame and step row always fit the first screen:

   | Viewport | Showcase + step row | Bottom of step row |
   |---|---|---|
   | 1440×900 | 591px wide | 798px |
   | 1280×800 | 515px wide | 716px |
   | 1024×768 | 392px wide | 600px |

4. **Removed from the hero:** the 15s loop video and its pause button (V1), and the flow pills (V1).
5. **Tablet and mobile.** The copy and CTAs are followed by one static phone capture. Before, it was the 720p loop video.

## PRODUCT ASSETS USED

All files are existing entries in `lib/assets.ts`, served from `public/images/product/` (copied there in V1 from `design-reference/claude-design/assets/product/`).

| Asset | Where | Crop (capture px) |
|---|---|---|
| `layer-site-hero.png` (850×703) | showcase back layer, all steps | x0 y1 847×702, r12 |
| `layer-chat-widget.png` (500×745) | chat window, steps 01–03 | x7 y6 483×728, r18 |
| `layer-chat-memory.png` (500×745) | chat window, step 04 | same window crop |
| `layer-portfolio-card.png` (405×428) | step 02 companion | x2 y2 401×424, r14 |
| `photo-kitchen.png` (900×674) | step 03 companion (viewer photo) | x1 y1 898×672 |
| `layer-viewer-card.png` (482×295) | step 03 companion (사례 A info) | x4 y4 474×287, r14 |
| `layer-phone-chat.png` (380×788) | tablet/mobile hero visual | x2 y2 375×784, r52 |
| `scene-01-conversation.png` (1400×790) | email thumbnail source | centre 16:9 crop |

The crops are CSS only (`overflow:hidden` + percent offsets). No image was edited, so the files stay identical to the design handoff. The chips reuse `CAPTURED_CONDITIONS`, which is the text of the captured conversation.

## SHOWCASE BEHAVIOR

- **Timer.** The active step renders a 3px bar with `animation: showcase-progress 5s linear`. `onAnimationEnd` moves to the next step, and the new bar restarts at 0. There are no timers or intervals. Pausing sets `animation-play-state: paused`, so the bar and the rotation always stay in sync.
- **Holds.** Rotation holds:
  - on mouse hover (pointerType mouse only, so touch never sticks);
  - on keyboard focus inside the showcase (`:focus-visible` only, so a mouse click on a step doesn't hold);
  - when the showcase is offscreen (IntersectionObserver);
  - on the pause button, labelled "화면 자동 전환 일시정지 / 재생".

  This follows WCAG 2.2.2 and the WAI-ARIA carousel guidance.
- **Transitions.** 700ms `ease-out`. It uses opacity for the chat window and the site, plus a 12px translate for companion cards. The chips fade in with a 90ms stagger.
- **Depth.** The frame sits in the page's existing `DepthStage`, so it gets the same ≤1.5° cursor tilt on fine pointers and the same light hero scroll parallax (`data-hero-parallax`) as V1. Layers sit at Z −30 / 0 / +40…+60px.
- **Accessibility:**
  - the frame is a labelled group whose label names the current step;
  - inactive layers are `aria-hidden`;
  - each capture keeps its `ASSETS` alt text;
  - a manual step change is announced through a polite live region; auto-rotation stays silent.
- **Loading:**
  - Only step 01's two captures are in the server HTML.
  - The other four mount after `load` + idle, and only when the viewport is ≥1024px.
  - Picking a step mounts them immediately.
  - The step 01 chat capture (desktop LCP) gets `<link rel="preload" … media="(min-width: 1024px)" fetchpriority="high">`, and its `<img>` stays lazy. Desktop fetches it early; phones never fetch it (verified).

## RESPONSIVE BEHAVIOR

| Width | Layout | Hero visual |
|---|---|---|
| ≥1101 | 2 columns, headline 4.1vw (≤60px) | showcase, step labels on one line |
| 1024–1100 | 2 columns, sub line 18px | showcase; step labels stack as number over label; chips scale with the frame (container units, floor 11px) |
| 821–1023 | stacked (desktop gutters) | static phone capture |
| ≤820 | stacked (mobile gutters) | static phone capture, 72vw ≤ 300px |
| ≤480 | CTAs full-width, stacked | same |

Horizontal overflow is 0 at every tested width.

## PERFORMANCE IMPACT

Playwright, cold cache, first 6s (includes deferred showcase states). The OLD column was measured on the previous production build, before this deploy. The NEW column was measured on this build.

| | OLD 1440 (DPR 2) | NEW 1440 (DPR 2) | OLD 390 (DPR 3) | NEW 390 (DPR 3) |
|---|---|---|---|---|
| Video | 2,061 KB (hero loop) | **0** | 144 KB (720p loop) | **0** |
| Images | 102 KB | 222 KB (hero showcase ≈ 157 KB of it) | 148 KB | 147 KB (phone capture 31 KB) |
| JS | 143 KB | 145 KB (+2 KB) | 144 KB | 145 KB |
| LCP element | H1 | hero chat capture (preloaded) | H1 | H1 |

- No dependency was added: no carousel library, no animation library, no WebGL.
- Net page weight: desktop is about 1.9 MB lighter and mobile about 0.1 MB lighter.
- Page height:
  - 1440: 24,867 → 24,087px
  - 1440 reduced motion: 17,601 → 16,820px
  - 390: 11,556px

## PRODUCTION QA EVIDENCE

**Checks.** All three were run after the last code change:

```
$ npm run typecheck   → ✓ Types generated successfully; tsc exit 0
$ npm run lint        → eslint exit 0, no output
$ npm run build       → ✓ Compiled successfully; 9/9 static pages; exit 0
```

The new copy has 170 distinct non-ASCII characters. All are in the Pretendard subset (checked with fontTools; 0 missing).

**Deploy**

```
$ git push origin main          3f31a7f..64a79e0  main -> main
$ npx vercel inspect <deployment> --wait
  id      dpl_13sthWfX5cywNwXYyaiUnLn3B9sa   target production   status ● Ready   build 15s
  Aliases https://boost-interior-sales.vercel.app
$ curl https://boost-interior-sales.vercel.app/
  dpl ids in HTML: dpl_13sthWfX5cywNwXYyaiUnLn3B9sa (only)
  showcase marker 1 · chat-to-portfolio refs 0 · "작동 방식 보기" 0
  Kakao hrefs 4 · href="#demo-video" 2 · image preload media="(min-width: 1024px)"
  /images/email/video-thumbnail.webp  200 image/webp  39,556 B
  /images/email/video-thumbnail.jpg   200 image/jpeg  84,921 B
```

**Browser QA.** Playwright 1.63 (Chromium) against the public alias `https://boost-interior-sales.vercel.app`. The same suite also passed against the local `next start` build before pushing.

| Viewport | Result | Overflow | Kakao links | Demo links | `#demo-video` links | Hero visual | `#demo-video` jump | 86s video | Console |
|---|---|---|---|---|---|---|---|---|---|
| 1440×900 | PASS | 0 | header, hero, partner, contact | hero, live, contact | header, hero | showcase 591px, steps end 798 | 0px | 86.6s plays | 0 |
| 1280×800 | PASS | 0 | same | same | same | showcase 515px, steps end 716 | 0px | 86.6s | 0 |
| 1024×768 | PASS | 0 | same | same | same | showcase 392px, steps end 600 | 0px | 86.6s | 0 |
| 768×1024 | PASS | 0 | same | same | same | phone 300px | 0px | 86.6s | 0 |
| 390×844 | PASS | 0 | same | same | same | phone 280px | 0px | 86.6s | 0 |
| 375×667 | PASS | 0 | same | same | same | phone 270px | 0px | 86.6s | 0 |
| 1440 reduced | PASS | 0 | same | same | same | showcase, static step 01 | 0px | 86.6s | 0 |

Each row also checks:
- every Kakao and demo link has `target=_blank` and `rel="noopener noreferrer"`, and the Kakao links have the sr-only new-tab label;
- the hero button order is 실제 데모 체험하기 → 카카오톡 1:1 도입 상담;
- no hero `<video>` and no "작동 방식 보기";
- 0 `mailto:`, empty or `#` links, and 0 `<form>`;
- all 18 `main > section` blocks are present (the 12 sections with the story scenes);
- 0 reveal blocks are left hidden after a full scroll;
- 0 console errors or warnings, 0 page errors and 0 failed requests.

**Showcase behavior on production** (1440×900):

- **Auto-cycle.** Step 01 → 02 at 6.0s (the first cycle waits for hydration), → 03 at 11.0s, → 04 at 16.1s, → 01 at 21.1s.
- **Hover.** Holds for 7s on the same step and advances again after mouse-out.
- **Pause button.** Holds for 7s, the label switches to "재생", and it resumes on click.
- **Keyboard focus** (Shift+Tab onto a step): holds for 7s.
- **Offscreen.** `animation-play-state: paused`.
- **Reduced motion:**
  - still on step 01 after 11s;
  - the bar has no animation (`animation-name: none`);
  - the pause button is hidden;
  - clicking step 03 switches instantly.
- **390×844:**
  - image requests are the phone capture plus the story composites below it (lazy, same as V1);
  - no desktop showcase capture is fetched.

Screenshots were reviewed for:
- all four states at 1440;
- 1280, 1024 (all states), 768, 390 and 375;
- 1440 with reduced motion;
- the email thumbnail.

## VISUAL REVIEW CHECKLIST

Open https://boost-interior-sales.vercel.app:

1. **Desktop hero.** The headline sits on the left. On the right, the chat window over the demo homepage cycles through 01 → 04 every 5s.
2. **Hover the showcase.** It holds, and the blue bar stops. Click a step label to jump to it. The round button next to the steps pauses and resumes.
3. **실제 데모 체험하기** opens the demo site. **카카오톡 1:1 도입 상담** opens the BoostWorks open chat. Both open in a new tab.
4. **86초 실제 작동 영상 보기** scrolls to the video section. Play shows 1:26.
5. **Phone width.** The copy is followed by full-width buttons and one phone screen, with no rotation.
6. **Email thumbnail:**
   - https://boost-interior-sales.vercel.app/images/email/video-thumbnail.webp
   - https://boost-interior-sales.vercel.app/images/email/video-thumbnail.jpg (use this one if the list includes Outlook users)
