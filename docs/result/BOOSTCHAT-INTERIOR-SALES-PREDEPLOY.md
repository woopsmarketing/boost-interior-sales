# BoostChat Interior Sales Landing — Pre-deploy

Result report for `prompt` (FINAL PRE-DEPLOY / KAKAO CTA / GITHUB / VISUAL REVIEW), 2026-09-30.
It builds on [`BOOSTCHAT-INTERIOR-SALES-LANDING-V1.md`](./BOOSTCHAT-INTERIOR-SALES-LANDING-V1.md).
The design, the 12 sections, motion, responsive and reduced-motion behavior are unchanged.

**Update, same day.** The user approved the deploy ("배포승인") after the visual review on `http://localhost:3000`.
Production is live at **https://boost-interior-sales.vercel.app**. See [PRODUCTION DEPLOYMENT](#production-deployment).

**Later update.** The hero was refined in [`BOOSTCHAT-INTERIOR-SALES-HERO-FINAL.md`](./BOOSTCHAT-INTERIOR-SALES-HERO-FINAL.md).
It adds a fourth Kakao CTA (hero secondary button) and replaces the hero loop video with a product showcase.

---

## Report

```
TASK = BOOSTCHAT INTERIOR SALES PREDEPLOY

KAKAO_OPEN_CHAT_URL =
https://open.kakao.com/o/sAS9ebQi
  (lib/site.ts → KAKAO_OPEN_CHAT_URL, the only place the URL is written.
   The URL returns 200, og:title "BoostWorks".)

CONTACT_EMAIL_REMOVED = YES   (no CONTACT_EMAIL in code, env handling or run instructions)
CONTACT_FORM_REMOVED  = YES   (ContactForm.tsx and the form-only Field.tsx deleted; 0 <form>/<input> on the page)
KAKAO_CTA_CONNECTED   = YES   (3 of 3 consultation CTAs)

KAKAO_CTA_LOCATIONS =
- Fixed header        "카카오톡 도입 상담" (≤820px: "카카오톡 상담")   components/landing/SiteHeader.tsx
- Early Partner       "카카오톡 1:1 도입 상담"                          components/landing/Partner.tsx
- Final CTA #contact  "카카오톡 1:1 도입 상담" (primary)                 components/landing/Contact.tsx
  All three: target="_blank" rel="noopener noreferrer" + sr-only "(새 창에서 열림)",
  the existing ButtonLink `external` convention.

LIVE_DEMO_URL =
https://interior-demo.boostweb.co.kr
  (unchanged; 3 links: Hero, Live Demo, and Final CTA secondary. The URL returns 200.)

DEMO_VIDEO_ANCHOR =
#demo-video   (lib/site.ts → DEMO_VIDEO_ID; section id, header link, aria-labelledby="demo-video-title")

OLD_VIDEO_ANCHOR_REMAINING = NONE
  (0 in code and in the built HTML. Only the historical notes in the V1 report and the `prompt` task file mention "#video".)

GIT_INITIALIZED = YES   (the folder was not a git repo before; checked with `git status`)
GIT_REMOTE =
https://github.com/woopsmarketing/boost-interior-sales
GIT_BRANCH = main
GIT_COMMIT = e56262f610d41e89b901f365bce97d9f7a71ffb6  feat: prepare BoostChat interior sales landing for launch
             (this report is pushed in a follow-up docs commit)
GIT_PUSH   = SUCCESS  (main → origin/main, new branch, upstream set; no force push)

SECRETS_CHECK   = PASS  (no .env*, keys, tokens, OAuth, Vercel or other credentials among the 196 staged files;
                         a pattern scan found only "design tokens" wording)
GITIGNORE_CHECK = PASS  (existing Next.js .gitignore kept as-is: node_modules, .next, out, build, .env*, .vercel,
                         *.pem, *.tsbuildinfo, next-env.d.ts, .DS_Store, debug logs)

TYPECHECK = PASS   (next typegen && tsc --noEmit)
LINT      = PASS   (eslint, 0 problems)
BUILD     = PASS   (next build, 9/9 static routes)

DESKTOP_QA = PASS   (1440, 1280, 1024; 821 pinned edge)
TABLET_QA  = PASS   (768)
MOBILE_QA  = PASS   (390, 375)
REDUCED_MOTION = PASS   (1440, prefers-reduced-motion: reduce)
ACCESSIBILITY_BASIC = PASS

CONTACT_CTA_QA       = PASS   (all 7 viewports: exactly 3 Kakao links with the exact URL, new tab, rel, sr label;
                               no mailto, no empty/"#" links, no form)
LIVE_DEMO_QA         = PASS   (3 links, exact URL, new tab)
DEMO_VIDEO_ANCHOR_QA = PASS   (/#demo-video deep link at 1440, 768, 390 and 1440-reduced: section top at 0±2px,
                               title below the 64px header, 1:26 player; header nav click → #demo-video)

LOCAL_PRODUCTION_SERVER = RUNNING   (next start, production build; PID 80974; log /tmp/boost-interior-sales.log)
FINAL_VISUAL_REVIEW_URL =
http://localhost:3000

VERCEL_CLI          = AVAILABLE via npx (Vercel CLI 61.1.0; not installed globally)
VERCEL_AUTH         = LOGGED IN  (user ran `npx vercel login`; `vercel whoami` → vnfm0580-7392,
                                  team "vnfm0580's projects", Pro)
VERCEL_PROJECT_LINK = LINKED  (vnfm0580s-projects/boost-interior-sales, created on approval by `vercel link --yes`;
                              GitHub repo auto-connected)
READY_FOR_VERCEL_PRODUCTION_DEPLOY = YES
  No technical blocker in the app: it is a static Next 16.3.7 build with no required env vars.

PRODUCTION_DEPLOYED = YES  (after the user's "배포승인")
PRODUCTION_URL      = https://boost-interior-sales.vercel.app
OUTBOUND_VIDEO_LINK = https://boost-interior-sales.vercel.app/#demo-video

KNOWN_ISSUES =
- The GitHub repo is connected to the Vercel project. Every push to `main` now deploys to production automatically.
- The hashed deployment URLs (`boost-interior-sales-<hash>-vnfm0580s-projects.vercel.app`) sit behind
  Vercel Authentication (302 to login). This is Vercel's default Standard Protection. The production
  domain is public. Always share the production URL.
- `vercel link` wrote `.env.local` with a `VERCEL_OIDC_TOKEN`. It is gitignored (`.env*`); keep it out of commits.
- The GitHub repository is PUBLIC. Everything committed is public, including design-reference/,
  source-assets/, the `prompt` task file and .claude/settings.json (it contains a local hook path).
  None of these contain secrets. Make the repository private on GitHub if that isn't intended.
- NEXT_PUBLIC_SITE_URL is not set (on purpose; no final domain yet). On Vercel, canonical, og:url,
  sitemap and robots fall back to https://$VERCEL_PROJECT_PRODUCTION_URL. In production they now
  resolve to https://boost-interior-sales.vercel.app. The local build uses http://localhost:3000.
- Kakao Open Chat on desktop opens the open.kakao.com web page (KakaoTalk app / QR). On phones it
  hands off to the KakaoTalk app. The link was verified, but not on real iOS/Android devices.
- Fixed a pre-existing V1 bug (see EXACT BEHAVIOR CHANGES #5): the hero pause/play button did not
  respond to mouse clicks while the pointer tilted the hero stage.
- Carried over from V1, unchanged: placeholder favicon, 1× product crops, font payload,
  next/font/google needs network at build time (Vercel has it), and the videos have no audio track.
```

---

## CHANGED FILES

| File | Change |
|---|---|
| `lib/site.ts` | Removed `CONTACT_EMAIL`. Added `KAKAO_OPEN_CHAT_URL` and `DEMO_VIDEO_ID = "demo-video"`. |
| `components/landing/Contact.tsx` | Replaced the disabled form with a CTA card: Kakao primary, live demo secondary. Now a server component (no client JS). |
| `components/landing/ContactForm.tsx` | **Deleted** (mailto form). |
| `components/ui/Field.tsx` | **Deleted**. It was used only by ContactForm. |
| `components/landing/SiteHeader.tsx` | Header CTA opens Kakao. "데모 영상" link now points to `#demo-video`. |
| `components/landing/Partner.tsx` | Early Partner CTA opens Kakao. |
| `components/landing/DemoVideo.tsx` | Section `id="demo-video"`, title id `demo-video-title`. |
| `components/motion/DepthStage.tsx` | Tilt wrapper is no longer a hit target (`pointer-events-none`, children `auto`). Fixes the hero pause/play click. |
| `docs/result/BOOSTCHAT-INTERIOR-SALES-LANDING-V1.md` | Added an update banner. Fixed `#video`, `CONTACT_EMAIL` env table and run instructions. |
| `docs/result/BOOSTCHAT-INTERIOR-SALES-PREDEPLOY.md` | New (this report). |

Not changed: `.gitignore` (already correct), `design-reference/`, `source-assets/`, all other sections, copy, tokens, motion, videos and dependencies.

## EXACT BEHAVIOR CHANGES

1. **Header CTA.** "도입 상담 신청" used to scroll to the disabled form. It now reads **"카카오톡 도입 상담"** (mobile **"카카오톡 상담"**) and opens the BoostWorks KakaoTalk 1:1 open chat in a new tab.
2. **Early Partner CTA.** "도입 상담 받아보기" used to scroll to the form. It now reads **"카카오톡 1:1 도입 상담"** and opens the Kakao open chat.
3. **Final CTA (`#contact`).** The headline and supporting copy are unchanged. The disabled form, its notice ("온라인 도입 상담 접수를 준비하고 있습니다…") and its status line ("상담 신청 기능이 아직 연결되지 않아…") are gone. In their place is the same white card (same radius, shadow and padding) with:
   - "업체명과 홈페이지 주소를 남겨주시면 확인 후 카카오톡으로 답변드립니다."
   - **카카오톡 1:1 도입 상담** (primary, full width)
   - **실제 데모 체험하기** (secondary, full width)
   - small note: "BoostWorks 카카오톡 1:1 오픈채팅 상담방으로 연결됩니다."
4. **Demo video anchor.** The 86s video section is now reached at `/#demo-video`, from the header "데모 영상" link and from direct links in outbound emails. `/#video` no longer exists.
5. **Hero pause/play (bug fix, pre-existing in V1).** On desktop, the hero parallax pushes the video back (`translateZ(-60px)`) once the page is scrolled. With the pointer resting on the hero, the tilted, transparent tilt wrapper sat in front of it and swallowed the click, so pause/play did nothing for mouse users. Keyboard and touch were unaffected. The wrapper no longer takes pointer events. Tilt still works on the hero and on the story scenes. There is no visual change.

## GIT EVIDENCE

```
$ git status            (before)  fatal: not a git repository
$ git init && git branch -M main
$ git remote add origin https://github.com/woopsmarketing/boost-interior-sales.git
$ gh repo view …        isEmpty: true, visibility: PUBLIC
$ git branch --show-current
main
$ git remote -v
origin  https://github.com/woopsmarketing/boost-interior-sales.git (fetch)
origin  https://github.com/woopsmarketing/boost-interior-sales.git (push)
$ git log --oneline -1
e56262f feat: prepare BoostChat interior sales landing for launch
$ git push -u origin main
To https://github.com/woopsmarketing/boost-interior-sales.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
$ git ls-remote origin main
e56262f610d41e89b901f365bce97d9f7a71ffb6  refs/heads/main
```

196 files in the first commit. `.next/`, `node_modules/`, `next-env.d.ts` and `tsconfig.tsbuildinfo` are ignored. The largest file is `master-sales.mp4` (9.7 MB, once in `public/video/` and once in `source-assets/videos/`).

## QA EVIDENCE

**Checks.** All three were run after the final code change:

```
$ npm run typecheck   → ✓ Types generated successfully; tsc exit 0
$ npm run lint        → eslint exit 0, no output
$ npm run build       → ✓ Compiled successfully; 9/9 static pages; exit 0
```

**Built output** (`.next/server/app/index.html`):
- `href="#video"` 0, `id="video"` 0
- `mailto:` 0, `CONTACT_EMAIL` 0, `<form` 0
- `id="demo-video"` 1, `href="#demo-video"` 1
- Kakao URL present: 3 hrefs, plus their RSC payload copies

**Font.** All 265 non-ASCII characters in the page source, including the new copy, are in the Pretendard subset (checked with fontTools; 0 missing).

**Browser QA.** Playwright 1.63 (Chromium 153) against `next start`, production build.

| Viewport | Overflow | Kakao links | Demo links | Scenes | Hero video | Console |
|---|---|---|---|---|---|---|
| 1440×900 | 0 | header / partner / contact | top / live / contact | 9 pinned stages | plays; mouse pause → play OK | 0 |
| 1280×800 | 0 | same | same | pinned | plays; pause/play OK | 0 |
| 1024×768 | 0 | same | same | pinned | plays; pause/play OK | 0 |
| 821×1000 | 0 | same (header fits: 741 ≤ 821px) | same | pinned | plays | 0 |
| 768×1024 | 0 | same ("카카오톡 상담") | same | 9 static composites | 720p plays | 0 |
| 390×844 | 0 | same | same | static | 720p plays | 0 |
| 375×667 | 0 | same | same | static | 720p plays when in view | 0 |
| 1440 reduced | 0 | same | same | static composites | poster (paused) | 0 |

- **Page height** matches V1: 24,867px at 1440 and 17,601px under reduced motion.
- **Header nav.** "데모 영상" click leads to `hash=#demo-video`, with the section at the top (±1px) and its title 194px from the top, clear of the 64px header.
- **Deep link `/#demo-video`** at 1440, 768, 390 and 1440-reduced:
  - the section lands at the top (within ±2px);
  - the title is visible below the header;
  - no reveal block is left hidden;
  - the play button reads "데모 영상 재생 (1:26)".
- **Click-to-play.** It mounts `<video controls>` with src `/video/master-sales.mp4`, which plays with a duration of 86.6s. Focus moves to the player.
- **Reveal.** After a full scroll, 0 blocks are left hidden at every width. A too-fast scroll in the harness briefly reported pending blocks; a normal-speed scroll showed 0.
- **Keyboard.** Tab order is skip link → logo → 4 nav links → "카카오톡 도입 상담 (새 창에서 열림)" → hero demo CTA. Every stop shows the 2px focus ring. The Final CTA Kakao button shows the same ring (2px, #3283FF).
- **Hero pause/play.** Before the fix, a settled mouse click hit `DIV[data-tilt-inner]` 4 times out of 4. After the fix, the same clicks toggled pause → play → pause → play.
- **Screenshots reviewed:**
  - Final CTA at 1440, 768 and 390
  - Early Partner at 1440
  - deep-link landing at 1440 and 390

**External URLs.**
- `https://open.kakao.com/o/sAS9ebQi` → 200 ("KakaoTalk Open Chat", og:title "BoostWorks")
- `https://interior-demo.boostweb.co.kr` → 200

**Local server.** `curl http://localhost:3000/` → 200 (209 KB). The video range request → 206.

## VISUAL REVIEW CHECKLIST

Open `http://localhost:3000`:

1. **Hero.** Headline, the loop video, and the pause/play button (click it with the mouse).
2. **실제 데모 체험하기.** Opens interior-demo.boostweb.co.kr in a new tab.
3. **Interactive Story.** The story scenes scroll smoothly with the right-edge rail.
4. **86s video.** Open `http://localhost:3000/#demo-video` directly: it should land on the video, and play should give 1:26.
5. **Early Partner.** "카카오톡 1:1 도입 상담" opens the BoostWorks Kakao open chat.
6. **Final CTA and header.** The Kakao card replaces the old form. The header "카카오톡 도입 상담" goes to the same chat.
7. **Mobile width.** DevTools at 390px, or a phone on the same Wi-Fi (`http://172.30.1.18:3000`). Check the header "카카오톡 상담" button and the Kakao hand-off.

Stop the preview when done: `kill $(lsof -tiTCP:3000 -sTCP:LISTEN)`

## PRODUCTION DEPLOYMENT

Run after the user's **"배포승인"**:

```
$ npx vercel link --yes
  ✓ Created vnfm0580s-projects/boost-interior-sales   (Detected Next.js)
  > Connecting GitHub repository: https://github.com/woopsmarketing/boost-interior-sales  > Connected
  ✓ Created .env.local file   (VERCEL_OIDC_TOKEN; gitignored)
$ npx vercel deploy --prod
  Production  https://boost-interior-sales-g9vvrfpjx-vnfm0580s-projects.vercel.app
  ▲ Aliased   https://boost-interior-sales.vercel.app
  deployment dpl_A6CAA3MtQx5x9P6ZCZZfnUCfcKkV   readyState READY   target production
  inspector  https://vercel.com/vnfm0580s-projects/boost-interior-sales/A6CAA3MtQx5x9P6ZCZZfnUCfcKkV
```

**Production checks** (unauthenticated, against https://boost-interior-sales.vercel.app)

- `/`, `/robots.txt`, `/sitemap.xml`, `/video/master-sales.mp4` and `/opengraph-image.jpg` all load (range requests → 206).
- `canonical` and `og:url` are `https://boost-interior-sales.vercel.app`. og:image and twitter:image are absolute URLs on the same domain. `robots.txt` and the sitemap point to the same domain.
- The HTML has 3 Kakao hrefs, `id="demo-video"` and `href="#demo-video"` once each, and 0 `mailto:`, `href="#video"` or `<form`.
- The full Playwright suite (same script as local) ran against production: **0 failures.**
  - Covers 1440, 1280, 1024, 821, 768, 390, 375 and 1440-reduced.
  - Kakao and demo links pass, there is no overflow, no reveal block is left hidden, and the console has 0 errors or warnings.
  - Hero mouse pause/play works at 1440, 1280 and 1024.
  - The `/#demo-video` deep link lands on the section (±2px) and plays 86.6s at 1440, 768, 390 and 1440-reduced.

## VERCEL NEXT STEP

> Done on approval: steps 0–3 below (login, link, production deploy; the Git connection happened during `link`).
> What remains: set `NEXT_PUBLIC_SITE_URL` once a custom domain is attached.

Original plan, run only after the user said **"배포 승인"**:

```bash
cd /Users/woops/projects/boost-interior-sales

# 0) one-time login — DONE (vnfm0580-7392)

# 1) link the folder to a new Vercel project (default team; project name = folder name "boost-interior-sales")
#    If the project already exists in Vercel: npx vercel link --yes --project boost-interior-sales
npx vercel link --yes

# 2) production deploy (Vercel builds from source; framework auto-detected as Next.js)
npx vercel deploy --prod

# 3) optional: connect the GitHub repo so pushes to main auto-deploy
npx vercel git connect https://github.com/woopsmarketing/boost-interior-sales
```

After the production URL (or custom domain) is final:

```bash
npx vercel env add NEXT_PUBLIC_SITE_URL production --value https://<final-domain>
npx vercel deploy --prod      # rebuild so canonical / og:url / sitemap use it
```

Setting `NEXT_PUBLIC_SITE_URL` is optional right after the first deploy. Without `NEXT_PUBLIC_SITE_URL`, Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is used, so canonical and OG already point at the production `*.vercel.app` URL, or at the primary custom domain once one is attached and the project is redeployed.

**Alternative, no CLI.** Go to vercel.com/new → Import `woopsmarketing/boost-interior-sales` → Deploy. Importing deploys `main` to production immediately, so only do this after approval.

The outbound email video link is `https://<final-domain>/#demo-video`.
