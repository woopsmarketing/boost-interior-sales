# Sales Landing UI kit

The BoostChat B2B sales page for interior / remodeling business owners, built as one continuous scroll story around the **real product captures** in `assets/product/`.

- `index.html` — full page order: Hero → Problem → 7 pinned product scenes (대화…관리 화면) → Mobile → Demo video → Before/After → Why → Install scene + two install paths → Live demo → Early partner → 도입 상담 form → footer. StoryRail (right edge) jumps between story scenes.
- `Sections.jsx` — Problem, DemoVideo (16:9, 1:26; set `VIDEO_SRC`), BeforeAfter, Why, InstallPaths, LiveDemo (set `DEMO_URL`), Partner.
- `Hero.jsx` — the opening question + animated 5-step flow line (대화 → 관련 사례 → 사진 → 상담 → 견적 문의) + layered site/portfolio visual.
- `Scenes.jsx` — scene data (`SCENES`) and `StoryScene`, `MobileScene`, `InstallScene`. Layer positions are % of the original 1600×1000 capture frame, so crops re-assemble exactly.
- `Closing.jsx` — demo-request form (client-side validation, success state) and footer.

Desktop (>820px): each scene pins for ~210vh and scrubs depth (z, scale, blur) from scroll progress; cursor tilt ≤1.5°.
Mobile (≤820px): no pinning, no tilt — header + the composite capture, fade-up once.
