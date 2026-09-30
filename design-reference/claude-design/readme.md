# BoostChat Design System

BoostChat is an AI consultation widget for interior / remodeling businesses. It sits on the business's existing homepage: visitors describe what they want in their own words, the AI understands the conditions (region, 평형, scope, style), recommends the business's own portfolio projects, opens a full photo viewer without leaving the chat, remembers context, and turns the conversation into a structured quote inquiry that the owner sees in an admin screen.

This system is for the **premium B2B sales landing page** that sells BoostChat to business owners. The product UI itself is the hero; the marketing layer is calm, architectural, editorial.

## Sources
- `uploads/sales-01.png … sales-09.png` (1600×1000) — composed sales captures of the real product, demo tenant "부스트 인테리어". No codebase, Figma, or logo files were supplied.
- Colors were sampled from these captures (e.g. CTA `#155DFC`, tag bg `#EFF6FF`, page `#F1F2F4`); they match a Tailwind-v4 gray/blue palette, which the product appears to use.

## Products / surfaces represented
1. **Chat widget** (on the tenant's site) — header "부스트 인테리어 / AI 상담원 상담 도우미", gray bubbles, portfolio cards, "상담 요청 남기기" chip, contact form, "Powered by boostchat".
2. **Portfolio viewer** — modal over the site / full-screen on mobile: photo carousel + case card (사례 A, tags) + "이 사례로 상담하기".
3. **Owner admin (사업자 관리 화면)** — sidebar nav, 상담 요청 detail: "고객이 무엇을 원하는지" summary + structured 인테리어 상담 정보.
4. **Mobile** — widget and viewer full-screen.
5. **Sales landing page** (this system's UI kit) — tells the story around 1–4.

---

## CONTENT FUNDAMENTALS
- **Language:** Korean first. English only for the brand name (BoostChat) and "Powered by boostchat".
- **Voice:** calm, declarative, polite 합니다체 for marketing headlines ("…보여줍니다.", "…이어집니다."). The product's AI speaks warmer 해요체 ("…있어요.", "괜찮습니다.").
- **Headline formula:** one capability per sentence, subject = visitor or conversation, ends with a period. e.g. "방문자가 평소 말투로 상담을 시작합니다." / "처음부터 다시 설명할 필요가 없습니다." / "들어온 문의는 한눈에 정리됩니다."
- **Sub line:** lists concrete conditions separated by " · " — "평수 · 공사 범위 · 스타일을 대화 속에서 이해합니다."
- **Eyebrow:** "BoostChat", optionally "BoostChat · 사업자 관리 화면".
- **Address:** the owner is addressed implicitly ("우리 홈페이지", "우리 업체 시공 사례") — first-person-plural from the owner's viewpoint. No "당신".
- **Hero hook:** a question to the owner — "홈페이지 방문자는 들어오는데, 견적 문의까지 오는 사람은 생각보다 적지 않나요?"
- **Numbers:** only real product data (공급 32평, 대구 북구). **Never** invent conversion rates or analytics.
- **Honesty caption:** demo data is labeled — "화면 속 문의는 촬영용 데모 데이터입니다."
- **Emoji:** only inside product captures (the AI's 😊). Never in marketing copy.
- **Links / CTAs:** short verbs with literal arrow: "사례 자세히 보기 →", "전체 포트폴리오 보기 →", "도입 상담 신청".

## VISUAL FOUNDATIONS
- **Color:** off-white cool gray page (`--surface-page #F1F2F4`), white raised surfaces, deep navy ink (`--gray-900 #101828`), gray sub copy (`#596472`). Boost blue `#155DFC` is a controlled accent: eyebrow, primary CTA, links, focus, active step. Everything else is neutral. The orange `#D9691F` belongs to the demo tenant — never BoostChat.
- **Type:** Pretendard throughout. Headlines Bold, tight tracking (−0.025 to −0.035em), 1.18–1.3 leading, `word-break: keep-all`. Body 17/1.6. Mono (JetBrains Mono) only for step counters and code.
- **Spacing:** 4px base. 80px page gutter, 64px header→visual, 128–160px between scenes. Max page 1440, text ≤ 780.
- **Backgrounds:** flat, no gradients, no textures, no illustrations. Imagery = real portfolio photos inside product captures (bright, neutral, white-tone interiors, warm wood accents).
- **Corners:** 16px windows, 12px cards/fields, 20px bubbles/form panels, pills for chips & buttons, 44px devices.
- **Cards:** white, 1px `#E5E7EB` or hairline shadow, radius 12–16. Selected portfolio card: light blue 1px border. No colored left-border accents.
- **Shadows:** wide and soft, low opacity (`--shadow-window`, `--shadow-float`). Depth reads through spread and Z, not darkness.
- **Depth (2.5D):** CSS perspective 1800px. Planes: far −80 (site frame, may blur ≤3px / dim), base 0, near +60–90 (floating cards, viewer). Cursor tilt ≤1.5°, only on fine pointers.
- **Motion:** scroll-scrubbed per scene; ease-out cubic; layers move 10–20% max; fades + translate + scale .86→1. No bounce, no spin, no parallax on text. Reduced motion & mobile: fade-up only.
- **Hover:** buttons darken (`--accent-hover`), arrows nudge 2px; secondary gets gray-25 fill. **Press:** scale .98.
- **Transparency / blur:** only the sticky nav (86% page color + 14px backdrop blur) and background-plane blur during focus. No glassmorphism cards.
- **Layout:** fixed nav (64px), fixed right StoryRail during story, left-aligned lockups, oversized visuals.

## ICONOGRAPHY
- The product uses thin 1.5px line icons (user, close ×, chevrons ‹ › in circles) — visually Lucide-like. No icon files were supplied, so none are copied; **the marketing page avoids icons** and uses typographic glyphs: "→" for links/CTAs, "›" on image CTAs, "·" as separator. If icons are needed, use Lucide from CDN (`https://unpkg.com/lucide-static`) at 1.5px stroke — flagged substitution.
- No emoji in marketing. No custom SVG illustrations.
- **Logo:** none supplied. The BoostChat wordmark is set in Pretendard 800, Boost blue, tight tracking. Do not draw a mark.

## Index
- `styles.css` — imports only → `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- `guidelines/` — 19 foundation cards (colors, type, spacing, radii, elevation, depth, motion, brand).
- `assets/product/` — real captures: `scene-0N-*.png` composites (headline removed) and `layer-*.png` / `photo-*.png` crops for depth stacking.
- `components/` — React primitives (below).
- `ui_kits/sales-landing/` — full landing page.
- `thumbnail.html`, `SKILL.md`.

## Components
- **core/** — `Button` (primary / secondary / ghost / onImage / dark), `Tag` (neutral / accent / outline / inverse)
- **layout/** — `SceneHeader` (eyebrow · statement · sub lockup)
- **depth/** — `DepthStage` (perspective + ≤1.5° tilt), `ProductShot` (capture on a Z plane), `ScrollScene` (pinned, progress-scrubbed scene)
- **navigation/** — `SiteNav`, `StoryRail`
- **forms/** — `Field`

### Intentional additions
No source component library exists; this set is sized to the sales page. `DepthStage`/`ProductShot`/`ScrollScene` exist to enforce the 2.5D rules; `StoryRail` indicates scroll-story progress.

## Caveats
- Fonts load from CDN (Pretendard v1.3.9, JetBrains Mono) — no binaries were provided.
- Layer crops include a few px of page-colored margin and baked shadow from the captures; they sit correctly only on `--surface-page`.
