// node source-assets/landing-v3/capture-demo.mjs
// Screenshots of the live demo homepage (https://interior-demo.boostweb.co.kr) for the 홈페이지 제작
// page: what a homepage made with the product looks like on a desktop and on a phone.
// Pages are only opened and read — nothing is typed, sent or clicked — and the result is written
// under public/assets/landing/v3/stills with an entry in the V3 manifest.
// Playwright comes from the Landing V2 render project (source-assets/landing-v2/node_modules).
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { OUT_DIR } from "./clips.mjs";

const ROOT = new URL("../../", import.meta.url).pathname;
const require = createRequire(join(ROOT, "source-assets/landing-v2/package.json"));
const { chromium } = require("playwright");

const DEMO = "https://interior-demo.boostweb.co.kr";
const CASE = "/portfolio/suseong-white-34py-apartment-remodeling";
const NOTE = "가상 업체 ‘부스트 인테리어’의 데모 홈페이지를 그대로 촬영한 화면입니다. 시공사례 사진은 AI로 만든 예시 이미지입니다.";

const SHAPES = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 2, isMobile: false },
  phone: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

const SHOTS = [
  { id: "SITE-01", file: "site-01-home", shape: "desktop", path: "/", alt: "데모 홈페이지의 첫 화면" },
  { id: "SITE-02", file: "site-02-cases", shape: "desktop", path: "/portfolio", alt: "데모 홈페이지의 시공사례 목록과 조건 검색" },
  { id: "SITE-03", file: "site-03-case", shape: "desktop", path: CASE, alt: "데모 홈페이지의 시공사례 상세 화면" },
  // The form only: the column beside it carries the demo's contact address, which the landing does not repeat.
  { id: "SITE-04", file: "site-04-inquiry", shape: "desktop", path: "/contact", alt: "데모 홈페이지의 견적 문의 양식", crop: { x: 1290, y: 240, w: 1560, h: 1500 } },
  { id: "SITE-05", file: "site-05-home-phone", shape: "phone", path: "/", alt: "휴대폰에서 본 데모 홈페이지의 첫 화면" },
  { id: "SITE-06", file: "site-06-cases-phone", shape: "phone", path: "/portfolio", alt: "휴대폰에서 본 데모 홈페이지의 시공사례 목록" },
  { id: "SITE-07", file: "site-07-case-phone", shape: "phone", path: CASE, alt: "휴대폰에서 본 데모 홈페이지의 시공사례 상세 화면" },
];

const dir = join(ROOT, OUT_DIR, "stills");
mkdirSync(dir, { recursive: true });
const sha256 = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");

const browser = await chromium.launch();
const stills = [];
for (const shot of SHOTS) {
  const shape = SHAPES[shot.shape];
  const context = await browser.newContext({ viewport: { width: shape.width, height: shape.height }, deviceScaleFactor: shape.deviceScaleFactor, isMobile: shape.isMobile, hasTouch: shape.hasTouch ?? false, locale: "ko-KR", reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(`${DEMO}${shot.path}`, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(1500);
  const png = join(dir, `${shot.file}.png`);
  const jpg = join(dir, `${shot.file}.jpg`);
  await page.screenshot({ path: png });
  const crop = shot.crop;
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", png, ...(crop ? ["-vf", `crop=${crop.w}:${crop.h}:${crop.x}:${crop.y}`] : []), "-q:v", "3", jpg]);
  rmSync(png);
  stills.push({
    id: shot.id,
    fallback: `/assets/landing/v3/stills/${shot.file}.jpg`,
    width: crop?.w ?? shape.width * shape.deviceScaleFactor,
    height: crop?.h ?? shape.height * shape.deviceScaleFactor,
    bytes: statSync(jpg).size,
    sha256: sha256(jpg),
    alt: shot.alt,
    note: NOTE,
    noteRequired: true,
    source: { url: `${DEMO}${shot.path}`, viewport: `${shape.width}×${shape.height}`, ...(crop ? { crop } : {}), capturedOn: new Date().toISOString().slice(0, 10) },
  });
  console.log(`${shot.id}  ${shot.shape}  ${(statSync(jpg).size / 1024).toFixed(0)} KB  ${shot.path}`);
  await context.close();
}
await browser.close();

const manifestPath = join(ROOT, OUT_DIR, "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
manifest.stills = stills;
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
