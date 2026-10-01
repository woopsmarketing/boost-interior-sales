// BoostInterior end card for the 86s sales video — same layout as the original card in
// sales-capture-studio-v1/scripts/render-overlays.mjs, with the customer-facing brand line.
//   node render-endcard.mjs <out.png>
import { createRequire } from "node:module";
import path from "node:path";
const require = createRequire("/Users/woops/projects/web-recon-track-b/package.json");
const { chromium } = require("playwright");

const out = process.argv[2];
const FONT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "PretendardVariable.woff2");
const T = { brand: "#155DFC", ink: "#0b1220", muted: "#5b6674", canvas: "#F1F2F4" };

const browser = await chromium.launch({ headless: true });
const page = await (await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })).newPage();
await page.setContent(`<html><head><style>
@font-face { font-family: 'Pretendard'; src: url('file://${FONT}') format('woff2'); font-weight: 45 920; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Pretendard', 'Apple SD Gothic Neo', sans-serif; -webkit-font-smoothing: antialiased; word-break: keep-all;
  width: 1920px; height: 1080px; background: ${T.canvas}; display: flex; align-items: center; }
.end { margin-left: 200px; }
.tag { font-size: 64px; font-weight: 700; line-height: 1.26; letter-spacing: -0.03em; color: ${T.ink}; }
.brand { margin-top: 56px; display: flex; align-items: baseline; gap: 18px; }
.brand b { font-size: 40px; font-weight: 800; letter-spacing: -0.03em; color: ${T.brand}; }
.brand span { font-size: 22px; font-weight: 500; color: ${T.muted}; }
.rule { width: 64px; height: 4px; border-radius: 2px; background: ${T.brand}; margin-bottom: 40px; }
</style></head><body><div class="end"><div class="rule"></div>
<div class="tag">홈페이지 방문부터<br>포트폴리오 추천,<br>견적 상담까지.</div>
<div class="brand"><b>BoostInterior</b><span>by BoostWorks</span></div></div></body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out });
await browser.close();
console.log(out);
