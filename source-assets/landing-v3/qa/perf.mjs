// node source-assets/landing-v3/qa/perf.mjs [base]
// What a first visit costs, in Chromium: each page on a throttled phone (Slow 4G: 1.6 Mbps down,
// 750 kbps up, 150 ms round trip; CPU 4× slower; 390 × 844 at 2×) and on an unthrottled desktop.
// Nothing is scrolled: the numbers are the first screen's. Result: qa/out/perf.json.
import { mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const ROOT = new URL("../../../", import.meta.url).pathname;
const { chromium } = createRequire(join(ROOT, "source-assets/landing-v2/package.json"))("playwright");
const BASE = process.argv[2] ?? "http://localhost:3100";
const OUT = join(ROOT, "source-assets/landing-v3/qa/out");
const PAGES = [
  ["home", "/"],
  ["ai-marketing", "/features/ai-marketing"],
  ["ai-consultation", "/features/ai-consultation"],
  ["website", "/features/website"],
  ["pricing", "/pricing"],
  ["pricing-details", "/pricing/details"],
];
const PROFILES = [
  { name: "phone, Slow 4G, CPU 4×", viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, network: { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 }, cpu: 4, settle: 12000 },
  { name: "desktop, no throttling", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false, network: null, cpu: 1, settle: 5000 },
];
const KINDS = { Document: "html", Script: "js", Stylesheet: "css", Font: "font", Image: "image", Media: "video" };
const kb = (bytes) => Math.round(bytes / 102.4) / 10;

const browser = await chromium.launch();
const rows = [];
for (const profile of PROFILES) {
  for (const [name, path] of PAGES) {
    const context = await browser.newContext({ viewport: profile.viewport, deviceScaleFactor: profile.deviceScaleFactor, isMobile: profile.isMobile, hasTouch: profile.hasTouch, locale: "ko-KR" });
    await context.addInitScript(() => {
      window.__perf = { lcp: 0, lcpWhat: "", cls: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__perf.lcp = entry.startTime;
          window.__perf.lcpWhat = entry.element ? `${entry.element.tagName.toLowerCase()}${entry.url ? ` ${entry.url.split("/").pop().slice(0, 60)}` : ` “${(entry.element.textContent ?? "").trim().slice(0, 24)}”`}` : "";
        }
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__perf.cls += entry.value;
      }).observe({ type: "layout-shift", buffered: true });
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
    if (profile.network) await cdp.send("Network.emulateNetworkConditions", profile.network);
    if (profile.cpu > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: profile.cpu });
    const requests = new Map();
    cdp.on("Network.requestWillBeSent", (event) => requests.set(event.requestId, { url: event.request.url, kind: KINDS[event.type] ?? "other", bytes: 0, done: false }));
    cdp.on("Network.dataReceived", (event) => {
      const request = requests.get(event.requestId);
      if (request) request.bytes += event.encodedDataLength;
    });
    cdp.on("Network.loadingFinished", (event) => {
      const request = requests.get(event.requestId);
      if (request) Object.assign(request, { bytes: event.encodedDataLength, done: true });
    });
    const sum = () => {
      const total = {};
      for (const request of requests.values()) total[request.kind] = (total[request.kind] ?? 0) + request.bytes;
      return total;
    };
    await page.goto(`${BASE}${path}`, { waitUntil: "load", timeout: 120000 });
    const atLoad = sum();
    const videosAtLoad = [...requests.values()].filter((request) => request.kind === "video").length;
    await page.waitForTimeout(profile.settle);
    const timing = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      const fcp = performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0;
      return { ...window.__perf, fcp, ttfb: nav.responseStart, load: nav.loadEventEnd };
    });
    const settled = sum();
    const videos = [...new Set([...requests.values()].filter((request) => request.kind === "video").map((request) => request.url.split("/").pop()))];
    const row = {
      profile: profile.name,
      page: name,
      ttfbMs: Math.round(timing.ttfb),
      fcpMs: Math.round(timing.fcp),
      lcpMs: Math.round(timing.lcp),
      lcpElement: timing.lcpWhat,
      cls: Math.round(timing.cls * 1000) / 1000,
      loadMs: Math.round(timing.load),
      atLoadKB: Object.fromEntries(Object.entries(atLoad).map(([kind, bytes]) => [kind, kb(bytes)])),
      // The text font is preloaded and does not hold the load event back: the settled figures are the first screen's whole cost.
      settledKB: Object.fromEntries(Object.entries(settled).map(([kind, bytes]) => [kind, kb(bytes)])),
      videoRequestsBeforeLoad: videosAtLoad,
      firstScreenVideoFiles: videos,
      videoKBAfterSettle: kb(settled.video ?? 0),
      settleMs: profile.settle,
    };
    rows.push(row);
    console.log(`${profile.name} | ${name} | FCP ${row.fcpMs} LCP ${row.lcpMs} (${row.lcpElement}) CLS ${row.cls} load ${row.loadMs} | html ${row.settledKB.html ?? 0} js ${row.settledKB.js ?? 0} css ${row.settledKB.css ?? 0} font ${row.settledKB.font ?? 0} img ${row.settledKB.image ?? 0} KB | video before load ${videosAtLoad}, after: ${videos.join(" ") || "none"} (${row.videoKBAfterSettle} KB in ${profile.settle / 1000}s)`);
    await context.close();
  }
}
await browser.close();
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "perf.json"), `${JSON.stringify({ base: BASE, at: new Date().toISOString(), rows }, null, 2)}\n`);
