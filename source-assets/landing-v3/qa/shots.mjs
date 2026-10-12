// node source-assets/landing-v3/qa/shots.mjs [base] [outDir]
// ONLY_PAGES=home,pricing ONLY_WIDTHS=320,1440 narrows a run to the pages and widths that changed.
// Full-page screenshots of the six pages at seven widths (Chromium), for the eye review.
// Each page is scrolled through first, so everything that reveals or loads on scroll is in the shot.
import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const ROOT = new URL("../../../", import.meta.url).pathname;
const require = createRequire(join(ROOT, "source-assets/landing-v2/package.json"));
const { chromium } = require("playwright");

const BASE = process.argv[2] ?? "http://localhost:3100";
const OUT = process.argv[3] ?? join(ROOT, "source-assets/landing-v3/qa/out/shots");
export const PAGES = [
  ["home", "/"],
  ["ai-marketing", "/features/ai-marketing"],
  ["ai-consultation", "/features/ai-consultation"],
  ["website", "/features/website"],
  ["pricing", "/pricing"],
  ["pricing-details", "/pricing/details"],
];
export const WIDTHS = [320, 375, 390, 768, 1024, 1440, 1920];
const HEIGHT = { 320: 640, 375: 740, 390: 844, 768: 1024, 1024: 768, 1440: 900, 1920: 1080 };

const only = (name) => process.env[name]?.split(",").filter(Boolean);
const pages = PAGES.filter(([name]) => only("ONLY_PAGES")?.includes(name) ?? true);
const widths = WIDTHS.filter((width) => only("ONLY_WIDTHS")?.includes(String(width)) ?? true);

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const report = [];
for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: HEIGHT[width] }, deviceScaleFactor: 1, locale: "ko-KR", isMobile: width < 768, hasTouch: width < 768 });
  for (const [name, path] of pages) {
    const page = await context.newPage();
    await page.goto(`${BASE}${path}`, { waitUntil: "load" });
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += Math.round(HEIGHT[width] * 0.7)) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      await page.waitForTimeout(140);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(500);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const file = join(OUT, `${name}-${width}.jpg`);
    await page.screenshot({ path: file, fullPage: true, type: "jpeg", quality: 72 });
    report.push({ page: name, width, height: await page.evaluate(() => document.documentElement.scrollHeight), overflow });
    console.log(`${name} ${width}  height ${report.at(-1).height}  overflow ${overflow}`);
    await page.close();
  }
  await context.close();
}
await browser.close();
if (pages.length === PAGES.length && widths.length === WIDTHS.length) writeFileSync(join(OUT, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
