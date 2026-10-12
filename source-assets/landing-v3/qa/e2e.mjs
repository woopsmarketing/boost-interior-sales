// node source-assets/landing-v3/qa/e2e.mjs [base] [chromium|webkit …]
// Browser checks of the six pages against a running build: page basics, links and anchors, prices,
// buttons, and how the films behave. Results: source-assets/landing-v3/qa/out/e2e/<browser>.json.
// Chromium comes from the Playwright of source-assets/landing-v2. WebKit is driven by whichever
// Playwright on this machine matches the WebKit build in the Playwright cache (nothing is downloaded).
// WebKit here is Playwright's desktop build: it is not Safari on an iPhone.
// EXPECT_NOINDEX=1 when the base is a Vercel preview: there every page must ask not to be indexed.
// VERCEL_BYPASS=<secret> when the preview sits behind Vercel's deployment protection (the address
// answers 401): the project's "Protection Bypass for Automation" secret, sent to the base address only.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { homedir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../../", import.meta.url).pathname;
const BASE = process.argv[2] ?? "http://localhost:3100";
const WANTED = process.argv.slice(3).length ? process.argv.slice(3) : ["chromium", "webkit"];
const OUT = join(ROOT, "source-assets/landing-v3/qa/out/e2e");

const DEMO = "https://interior-demo.boostweb.co.kr";
const KAKAO = "https://open.kakao.com/o/sAS9ebQi";
const PAGES = [
  ["home", "/"],
  ["ai-marketing", "/features/ai-marketing"],
  ["ai-consultation", "/features/ai-consultation"],
  ["website", "/features/website"],
  ["pricing", "/pricing"],
  ["pricing-details", "/pricing/details"],
];
const DESKTOP = { width: 1440, height: 900 };
const PHONE = { width: 390, height: 844 };
/** Every amount the pages may show. Anything else next to 원 is a mistake. */
const WON = new Set(["29,700", "19,800", "39,600", "49,500", "9,900", "290,000", "490,000", "1,200,000", "2,500,000"]);
const MANWON = new Set(["29", "49", "120", "250"]);
/** Anchors the site before this change linked to (or that mail and messages may carry): each must still land. */
const LEGACY = {
  "/": ["top", "main", "demo-video", "value", "how", "live", "pricing", "faq", "why", "problem", "install", "install-prep", "partner", "contact", "talk", "recommend", "inquiry", "owner"],
  "/pricing": ["top", "plans", "setup", "decide", "assurances", "details", "plan-core", "plan-growth", "plan-managed", "plan-additions", "integration", "quick-website", "improvement", "custom-website", "founding-partner", "contact"],
  "/pricing/details": ["top", "comparison", "common-scope", "setup-comparison", "portfolio-video", "quick-vs-improvement", "faq", "plans", "plan-core", "plan-growth", "plan-managed", "two-prices", "setup", "integration", "quick-website", "improvement", "custom-website", "founding-partner", "contact"],
};
const START_LABEL = /(무료 체험|체험) (시작|신청)하기|무료로 시작|지금 (시작|가입|구독|결제)하기|카드 등록하기|결제하기|구독하기|가입하기/;
const AUTO = 'video[aria-hidden="true"]';
/** The homepage product's name, and the label it had before: the old one may not name the product anywhere a visitor clicks. */
const WEBSITE_NAME = "AI 스마트 홈페이지";
const OLD_WEBSITE_LABEL = /^홈페이지 제작( 자세히 알아보기)?$/;
const EXPECT_NOINDEX = process.env.EXPECT_NOINDEX === "1";
const BYPASS = process.env.VERCEL_BYPASS ? { "x-vercel-protection-bypass": process.env.VERCEL_BYPASS } : {};

const landing = createRequire(join(ROOT, "source-assets/landing-v2/package.json"));

/** A Playwright on this machine whose WebKit build is in the cache. */
function findWebkit() {
  const cache = join(homedir(), "Library/Caches/ms-playwright");
  const have = new Set(readdirSync(cache).filter((dir) => dir.startsWith("webkit-")).map((dir) => dir.slice(7)));
  const own = join(ROOT, "source-assets/landing-v2/node_modules/playwright-core");
  const links = existsSync(join(cache, ".links")) ? readdirSync(join(cache, ".links")).map((file) => readFileSync(join(cache, ".links", file), "utf8").trim()) : [];
  for (const dir of [own, ...links]) {
    if (!existsSync(join(dir, "browsers.json"))) continue;
    const revision = JSON.parse(readFileSync(join(dir, "browsers.json"), "utf8")).browsers.find((browser) => browser.name === "webkit")?.revision;
    if (have.has(String(revision))) return { dir, revision };
  }
  return null;
}

async function launch(name) {
  if (name === "chromium") {
    const browser = await landing("playwright").chromium.launch();
    return { browser, engine: `Chromium ${browser.version()} (Playwright ${landing("playwright/package.json").version})` };
  }
  const found = findWebkit();
  if (!found) return null;
  const core = createRequire(join(found.dir, "package.json"))(found.dir);
  const browser = await core.webkit.launch();
  return { browser, engine: `WebKit ${browser.version()} (Playwright ${JSON.parse(readFileSync(join(found.dir, "package.json"), "utf8")).version}, build ${found.revision}, desktop)` };
}

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
const file = (url) => new URL(url).pathname.split("/").pop();

/** Every film file the page asks for, once each, in order. */
function watchFilms(page) {
  const files = [];
  page.on("request", (request) => {
    const url = request.url();
    if (/\.mp4(\?|$)/.test(url) && !files.includes(file(url))) files.push(file(url));
  });
  return files;
}

const films = (page) =>
  page.evaluate((auto) =>
    [...document.querySelectorAll("video")].map((video) => ({
      auto: video.matches(auto),
      src: (video.getAttribute("src") ?? "").split("/").pop(),
      paused: video.paused,
      time: video.currentTime,
      muted: video.muted,
      loop: video.loop,
      inline: video.playsInline,
      controls: video.controls,
      autoplayAttr: video.hasAttribute("autoplay"),
      section: video.closest("section, header")?.id ?? "",
    })), AUTO);

const playingAuto = async (page) => (await films(page)).filter((film) => film.auto && !film.paused);

/** The film of a section is running: its clock moves. */
async function runs(page, section, wait = 6000) {
  const read = () =>
    page.evaluate(([id, auto]) => {
      const video = document.querySelector(`#${id} ${auto}`);
      return video ? { paused: video.paused, time: video.currentTime } : null;
    }, [section, AUTO]);
  const until = Date.now() + wait;
  while (Date.now() < until) {
    const before = await read();
    if (before && !before.paused) {
      await sleep(400);
      const after = await read();
      if (after && !after.paused && after.time !== before.time) return true;
    } else await sleep(200);
  }
  return false;
}

const center = (page, selector) => page.evaluate((target) => document.querySelector(target)?.scrollIntoView({ block: "center", behavior: "instant" }), selector);

async function scrollThrough(page, step, pause, each) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += step) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await sleep(pause);
    if (each) await each();
  }
}

async function run(name) {
  const launched = await launch(name);
  const results = [];
  const check = (id, title, ok, detail = "") => {
    results.push({ id, title, ok: ok === null ? null : Boolean(ok), detail });
    console.log(`${ok === null ? "SKIP" : ok ? "PASS" : "FAIL"}  ${name}  ${id}  ${title}${detail ? `  — ${detail}` : ""}`);
  };
  if (!launched) {
    check("ENGINE", "browser available", null, "no Playwright on this machine matches a cached WebKit build");
    return { engine: null, results };
  }
  const { browser, engine } = launched;
  console.log(`\n=== ${engine}`);
  const context = async (viewport, extra = {}) => {
    const opened = await browser.newContext({ viewport, locale: "ko-KR", isMobile: viewport.width < 768, hasTouch: viewport.width < 768, ...extra });
    // One request with the secret sets Vercel's bypass cookie for the base address; the pages then open as usual.
    if (process.env.VERCEL_BYPASS) await opened.request.get(`${BASE}/robots.txt`, { headers: { ...BYPASS, "x-vercel-set-bypass-cookie": "true" } });
    return opened;
  };

  // ── 1. Pages ───────────────────────────────────────────────────────────────────────────────
  const seen = {};
  for (const [shape, viewport] of [["desktop", DESKTOP], ["phone", PHONE]]) {
    const ctx = await context(viewport);
    for (const [key, path] of PAGES) {
      const page = await ctx.newPage();
      const errors = [];
      const failed = [];
      page.on("console", (message) => message.type() === "error" && errors.push(message.text().slice(0, 200)));
      page.on("pageerror", (error) => errors.push(`pageerror: ${String(error).slice(0, 200)}`));
      page.on("response", (response) => response.status() >= 400 && failed.push(`${response.status()} ${response.url()}`));
      page.on("requestfailed", (request) => failed.push(`${request.failure()?.errorText ?? "failed"} ${request.url()}`));
      const response = await page.goto(`${BASE}${path}`, { waitUntil: "load" });
      await scrollThrough(page, Math.round(viewport.height * 0.7), 150);
      await sleep(900);
      const facts = await page.evaluate(() => {
        const text = (() => {
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode: (node) => (node.parentElement?.closest("script, style, noscript") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
          });
          const parts = [];
          while (walker.nextNode()) parts.push(walker.currentNode.nodeValue);
          return parts.join(" ");
        })();
        const ids = [...document.querySelectorAll("[id]")].map((el) => el.id);
        return {
          h1: [...document.querySelectorAll("h1")].map((el) => el.textContent.trim()),
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.content ?? "",
          canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
          ogTitle: document.querySelector('meta[property="og:title"]')?.content ?? "",
          ogImage: document.querySelector('meta[property="og:image"]')?.content ?? "",
          robots: document.querySelector('meta[name="robots"]')?.content ?? "",
          lang: document.documentElement.lang,
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          ids,
          duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i),
          brokenImages: [...document.images].filter((img) => img.getClientRects().length && img.complete && img.naturalWidth === 0).map((img) => img.currentSrc || img.src),
          pendingImages: [...document.images].filter((img) => img.getClientRects().length && !img.complete).length,
          fields: document.querySelectorAll("form, input, textarea, select").length,
          links: [...document.querySelectorAll("a[href]")].map((a) => ({ href: a.getAttribute("href"), text: a.textContent.trim().replace(/\s+/g, " "), target: a.target, rel: a.rel })),
          buttons: [...document.querySelectorAll("button")].map((button) => (button.getAttribute("aria-label") ?? button.textContent).trim().replace(/\s+/g, " ")),
          jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => script.textContent),
          text,
        };
      });
      const at = `${key}@${shape}`;
      facts.xRobots = response?.headers()["x-robots-tag"] ?? "";
      check(`PAGE-STATUS ${at}`, "200", response?.status() === 200, String(response?.status()));
      const named = facts.links.filter((link) => link.text === WEBSITE_NAME && link.href === "/features/website");
      const old = [...facts.links.map((link) => link.text), ...facts.buttons].filter((label) => OLD_WEBSITE_LABEL.test(label));
      check(`PAGE-NAME ${at}`, `the menu names the homepage product "${WEBSITE_NAME}" at /features/website, and nothing links by its old name`, named.length > 0 && old.length === 0, old.join(" | ") || `${named.length} link(s)`);
      check(`PAGE-CONSOLE ${at}`, "no console or page errors", errors.length === 0, errors.slice(0, 3).join(" | "));
      // A film still downloading when the page is closed is not a failure; nothing is closed yet here.
      check(`PAGE-REQUESTS ${at}`, "no failed requests", failed.length === 0, failed.slice(0, 3).join(" | "));
      check(`PAGE-H1 ${at}`, "exactly one h1", facts.h1.length === 1, facts.h1.join(" / "));
      check(`PAGE-OVERFLOW ${at}`, "no horizontal scroll", facts.overflow <= 0, `${facts.overflow}px`);
      check(`PAGE-IMAGES ${at}`, "no broken image", facts.brokenImages.length === 0 && facts.pendingImages === 0, [...facts.brokenImages, facts.pendingImages ? `${facts.pendingImages} still loading` : ""].filter(Boolean).slice(0, 3).join(" | "));
      check(`PAGE-IDS ${at}`, "ids are unique", facts.duplicateIds.length === 0, facts.duplicateIds.join(", "));
      check(`PAGE-FIELDS ${at}`, "no form or input (nothing is collected on this site)", facts.fields === 0, String(facts.fields));
      const starts = [...facts.links.map((link) => link.text), ...facts.buttons].filter((label) => START_LABEL.test(label));
      check(`PAGE-START ${at}`, "no button or link starts a trial, a subscription or a payment", starts.length === 0, starts.join(" | "));
      const won = [...facts.text.matchAll(/(\d[\d,]*)\s*원/g)].map((match) => match[1]).filter((amount) => !WON.has(amount));
      const manwon = [...facts.text.matchAll(/(\d[\d,]*)\s*만\s*원/g)].map((match) => match[1]).filter((amount) => !MANWON.has(amount));
      const meta = `${facts.title} ${facts.description} ${facts.jsonLd.join(" ")}`;
      const metaWon = [...meta.matchAll(/(\d[\d,]*)\s*원/g)].map((match) => match[1]).filter((amount) => !WON.has(amount));
      const metaManwon = [...meta.matchAll(/(\d[\d,]*)\s*만\s*원/g)].map((match) => match[1]).filter((amount) => !MANWON.has(amount));
      check(`PAGE-PRICES ${at}`, "every amount on the page, in its title, description and FAQ data is on the price list", won.length + manwon.length + metaWon.length + metaManwon.length === 0, [...new Set([...won, ...manwon, ...metaWon, ...metaManwon])].join(", "));
      check(`PAGE-VAT ${at}`, "the page says its prices include VAT", /VAT 포함|부가세\(VAT\)가 포함/.test(facts.text) && !/(VAT|부가세)\s*(는|은)?\s*(별도|미포함|제외)/.test(facts.text));
      let faq = "";
      try {
        for (const raw of facts.jsonLd) {
          const data = JSON.parse(raw);
          const missing = (data.mainEntity ?? []).filter((entry) => !facts.text.replace(/\s+/g, " ").includes(entry.name.replace(/\s+/g, " ")));
          if (missing.length) faq = `not on the page: ${missing.map((entry) => entry.name).join(" | ")}`;
        }
      } catch (error) {
        faq = `unparseable: ${error}`;
      }
      check(`PAGE-FAQDATA ${at}`, "FAQ data parses and lists only questions shown on the page", faq === "", faq || `${facts.jsonLd.length} block(s)`);
      if (shape === "desktop") seen[path] = facts;
      else {
        const lost = seen[path].ids.filter((id) => !facts.ids.includes(id) && !/^(_|:|«)/.test(id));
        check(`PAGE-SAME ${key}`, "phone and desktop carry the same anchors", lost.length === 0, lost.join(", "));
        // The phone menu and the desktop bar may differ in links; the destinations must be the same set.
        seen[path].links = [...seen[path].links, ...facts.links];
      }
      await page.close();
    }
    await ctx.close();
  }

  // ── 2. Search data: one title, description and address per page ─────────────────────────────
  const paths = Object.keys(seen);
  for (const field of ["title", "description", "canonical"]) {
    const values = paths.map((path) => seen[path][field]);
    check(`SEO-${field.toUpperCase()}`, `${field} is set and differs on every page`, values.every(Boolean) && new Set(values).size === values.length, values.filter((value, i) => !value || values.indexOf(value) !== i).join(" | "));
  }
  check("SEO-CANONICAL-PATH", "each page's canonical is its own path", paths.every((path) => new URL(seen[path].canonical).pathname.replace(/\/$/, "") === path.replace(/\/$/, "")), paths.map((path) => new URL(seen[path].canonical).pathname).join(" "));
  check("SEO-OG", "og:title and og:image on every page", paths.every((path) => seen[path].ogTitle && seen[path].ogImage), paths.filter((path) => !seen[path].ogTitle || !seen[path].ogImage).join(" "));
  // Both signals, on every page: the robots meta and the X-Robots-Tag header. A preview must carry noindex, anything else must not.
  const noindex = (path) => [/noindex/.test(seen[path].robots), /noindex/.test(seen[path].xRobots)];
  const wrong = paths.filter((path) => (EXPECT_NOINDEX ? !noindex(path).every(Boolean) : noindex(path).some(Boolean)));
  check("SEO-INDEX", EXPECT_NOINDEX ? "a preview: every page asks not to be indexed, in its meta and its header" : "no page asks not to be indexed, in its meta or its header", wrong.length === 0, wrong.map((path) => `${path} [meta "${seen[path].robots}" header "${seen[path].xRobots}"]`).join(" ") || seen[paths[0]].robots);
  check("SEO-LANG", "lang is ko", paths.every((path) => seen[path].lang === "ko"), paths.map((path) => seen[path].lang).join(" "));
  const sitemap = await (await fetch(`${BASE}/sitemap.xml`, { headers: BYPASS })).text();
  const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname.replace(/\/$/, "") || "/");
  check("SEO-SITEMAP", "the sitemap lists the six pages and nothing else", paths.every((path) => listed.includes(path)) && listed.length === paths.length, listed.join(" "));
  const robots = await (await fetch(`${BASE}/robots.txt`, { headers: BYPASS })).text();
  check("SEO-ROBOTS", "robots.txt allows crawling and names the sitemap", /Allow: \//.test(robots) && /Sitemap: /.test(robots) && !/Disallow: \/\s*$/m.test(robots), robots.replace(/\s+/g, " ").slice(0, 120));

  // ── 3. Links ──────────────────────────────────────────────────────────────────────────────
  const broken = [];
  const outside = [];
  const unsafe = [];
  const targets = new Set();
  for (const path of paths) {
    for (const link of seen[path].links) {
      if (/^https?:/.test(link.href)) {
        if (!link.href.startsWith(DEMO) && link.href !== KAKAO) outside.push(`${path}: ${link.href}`);
        if (link.target !== "_blank" || !/noopener/.test(link.rel) || !/noreferrer/.test(link.rel)) unsafe.push(`${path}: ${link.text} (${link.target} ${link.rel})`);
        continue;
      }
      if (/^(mailto|tel):/.test(link.href)) {
        outside.push(`${path}: ${link.href}`);
        continue;
      }
      const url = new URL(link.href, `${BASE}${path}`);
      const to = url.pathname.replace(/\/$/, "") || "/";
      targets.add(`${to}${url.hash}`);
      if (!seen[to]) broken.push(`${path}: ${link.href} (no such page)`);
      else if (url.hash && !seen[to].ids.includes(decodeURIComponent(url.hash.slice(1)))) broken.push(`${path}: ${link.href} (no such anchor)`);
    }
  }
  check("LINK-INTERNAL", `every internal link lands on a page and an anchor that exist (${targets.size} destinations)`, broken.length === 0, [...new Set(broken)].slice(0, 6).join(" | "));
  check("LINK-OUTSIDE", "links leave the site only for the demo and the KakaoTalk open chat", outside.length === 0, [...new Set(outside)].slice(0, 6).join(" | "));
  check("LINK-REL", "links that leave open in a new tab with noopener noreferrer", unsafe.length === 0, [...new Set(unsafe)].slice(0, 6).join(" | "));
  for (const [path, ids] of Object.entries(LEGACY)) {
    const lost = ids.filter((id) => !seen[path].ids.includes(id));
    check(`LINK-LEGACY ${path}`, `the ${ids.length} anchors the earlier site carried are still there`, lost.length === 0, lost.join(", "));
  }
  // Opening an address with an anchor really arrives at it (the header must not cover it either).
  {
    const ctx = await context(DESKTOP);
    const page = await ctx.newPage();
    const missed = [];
    for (const target of ["/#demo-video", "/#pricing", "/#partner", "/#how", "/pricing#trial", "/pricing#plan-core", "/pricing#quick-website", "/pricing/details#faq", "/pricing/details#portfolio-video", "/pricing/details#integration", "/features/ai-marketing#samples", "/features/ai-consultation#install", "/features/website#prices"]) {
      await page.goto(`${BASE}${target}`, { waitUntil: "load" });
      // The page scrolls there smoothly: read the place it comes to rest at.
      const read = () => page.evaluate((id) => document.getElementById(id)?.getBoundingClientRect().top ?? null, target.split("#")[1]);
      let top = await read();
      for (let i = 0, last = NaN; i < 12 && top !== last; i++) {
        last = top;
        await sleep(400);
        top = await read();
      }
      if (top === null || top < -40 || top > DESKTOP.height * 0.6) missed.push(`${target} (${top === null ? "missing" : Math.round(top)})`);
    }
    check("LINK-ARRIVE", "an address with an anchor opens at that block", missed.length === 0, missed.join(" | "));
    await ctx.close();
  }

  // ── 4. Films ──────────────────────────────────────────────────────────────────────────────
  for (const [shape, viewport] of [["desktop", DESKTOP], ["phone", PHONE]]) {
    const tall = shape === "phone";
    const hero = tall ? "01-hero-main-vertical.mp4" : "01-hero-main.mp4";
    const ctx = await context(viewport);
    const page = await ctx.newPage();
    const files = watchFilms(page);
    await page.goto(`${BASE}/`, { waitUntil: "load" });
    const early = await page.evaluate(() => {
      const end = performance.getEntriesByType("navigation")[0]?.loadEventStart ?? 0;
      return {
        before: performance.getEntriesByType("resource").filter((entry) => /\.mp4/.test(entry.name) && entry.startTime < end).map((entry) => entry.name),
        preloads: document.querySelectorAll('link[rel="preload"][as="video"]').length,
      };
    });
    check(`FILM-01 ${shape}`, "no film file is asked for before the page has loaded", early.before.length === 0 && early.preloads === 0, early.before.join(" "));
    const heroRuns = await runs(page, "top", 8000);
    const first = (await films(page)).find((film) => film.auto);
    check(`FILM-02 ${shape}`, "the hero film starts by itself: muted, inline, looping, no controls", heroRuns && first && first.muted && first.loop && first.inline && !first.controls && !first.autoplayAttr, JSON.stringify(first ?? {}));
    check(`FILM-03 ${shape}`, "at the top of the page only the hero's file has been asked for, in this screen's shape", files.length === 1 && files[0] === hero, files.join(" "));

    await center(page, "#how picture");
    const clipRuns = await runs(page, "how", 6000);
    const during = await playingAuto(page);
    check(`FILM-04 ${shape}`, "a clip starts when it comes on screen, and the hero stops", clipRuns && during.length === 1 && during[0].section === "how", JSON.stringify(during.map((film) => `${film.section}:${film.src}`)));
    await center(page, "#faq");
    await sleep(900);
    const after = await playingAuto(page);
    check(`FILM-05 ${shape}`, "it pauses once it is off screen", after.length === 0, JSON.stringify(after.map((film) => film.section)));
    await center(page, "#how picture");
    check(`FILM-05b ${shape}`, "…and plays again when the visitor comes back to it", await runs(page, "how", 5000));

    // The visitor's pause holds.
    await center(page, "#how picture");
    await runs(page, "how", 6000);
    await page.locator('#how button[aria-label$="일시정지"]').click();
    await sleep(300);
    const paused = (await playingAuto(page)).length === 0;
    await center(page, "#faq");
    await sleep(700);
    await center(page, "#how picture");
    await sleep(1600);
    const stillPaused = (await playingAuto(page)).length === 0;
    check(`FILM-06 ${shape}`, "a clip the visitor paused stays paused after scrolling away and back", paused && stillPaused, `paused ${paused}, after scroll ${stillPaused}`);
    // Turning the phone (or resizing across the breakpoint) must not start it again.
    await page.setViewportSize(tall ? { width: 844, height: 390 } : { width: 600, height: 900 });
    await sleep(700);
    await center(page, "#how picture");
    await sleep(1800);
    const turned = (await playingAuto(page)).filter((film) => film.section === "how").length === 0;
    await page.setViewportSize(viewport);
    await sleep(700);
    await center(page, "#how picture");
    await sleep(1800);
    const back = (await playingAuto(page)).filter((film) => film.section === "how").length === 0;
    check(`FILM-07 ${shape}`, "…and after the screen is turned and turned back", turned && back, `turned ${turned}, back ${back}`);
    const press = page.locator("#how button", { hasText: "재생" }).or(page.locator('#how button[aria-label$="재생"]')).first();
    await press.click();
    check(`FILM-08 ${shape}`, "their own press starts it again", await runs(page, "how", 6000));
    await page.close();

    // One at a time, all the way down; and on a phone only the vertical cuts.
    const walk = await ctx.newPage();
    const walked = watchFilms(walk);
    await walk.goto(`${BASE}/`, { waitUntil: "load" });
    await runs(walk, "top", 8000);
    let most = 0;
    let started = new Set();
    await scrollThrough(walk, Math.round(viewport.height * 0.33), 260, async () => {
      const now = await playingAuto(walk);
      most = Math.max(most, now.length);
      now.forEach((film) => started.add(film.section));
    });
    check(`FILM-09 ${shape}`, "never more than one film playing while scrolling the whole page", most <= 1 && started.size >= 4, `most at once ${most}; played in: ${[...started].join(", ")}`);
    const wrongShape = walked.filter((name) => /-vertical\.mp4$/.test(name) !== tall);
    check(`FILM-10 ${shape}`, tall ? "a phone asks only for the vertical cuts" : "a wide screen asks only for the 16:9 cuts", wrongShape.length === 0, `${walked.length} files${wrongShape.length ? `; wrong: ${wrongShape.join(" ")}` : ""}`);
    const pressOnly = walked.filter((name) => !/^clip-0\d-|^01-hero-main/.test(name));
    check(`FILM-11 ${shape}`, "films the visitor has to press for are not downloaded by scrolling", pressOnly.length === 0, pressOnly.join(" "));
    await walk.close();

    // Flung from the top to the bottom and back up to one clip: films passed on the way are not fetched, and the one it stops at plays.
    const fling = await ctx.newPage();
    const flung = watchFilms(fling);
    await fling.goto(`${BASE}/`, { waitUntil: "load" });
    await runs(fling, "top", 8000);
    let crowd = 0;
    await scrollThrough(fling, viewport.height, 30, async () => {
      crowd = Math.max(crowd, (await playingAuto(fling)).length);
    });
    const passed = flung.length;
    await center(fling, "#website picture");
    const rests = await runs(fling, "website", 6000);
    const atRest = await playingAuto(fling);
    check(`FILM-20 ${shape}`, "a fast scroll past every section fetches no film on the way, never plays two, and the clip it stops at plays", passed <= 2 && crowd <= 1 && rests && atRest.length === 1 && atRest[0].section === "website", `files after the fling ${passed} (${flung.slice(0, passed).join(" ")}), most at once ${crowd}, resting clip plays ${rests}`);
    await fling.close();

    // Turned: the other cut, and only that one more.
    const turn = await ctx.newPage();
    const turnFiles = watchFilms(turn);
    await turn.goto(`${BASE}/`, { waitUntil: "load" });
    await runs(turn, "top", 8000);
    await turn.setViewportSize(tall ? { width: 844, height: 390 } : { width: 600, height: 900 });
    const other = tall ? "01-hero-main.mp4" : "01-hero-main-vertical.mp4";
    await sleep(500);
    await center(turn, "#top picture");
    const swapped = await runs(turn, "top", 8000);
    const heroNow = (await films(turn)).filter((film) => film.auto && film.section === "top");
    check(`FILM-12 ${shape}`, "turning the screen swaps the hero to the other cut: one player, two files in all", swapped && heroNow.length === 1 && heroNow[0].src === other && turnFiles.length === 2, `${turnFiles.join(" ")}; playing ${heroNow.map((film) => film.src).join(" ")}`);

    // Hidden tab. The tab cannot really be hidden from here, so the page is told it is.
    const hide = (hidden) =>
      turn.evaluate((value) => {
        Object.defineProperty(document, "hidden", { configurable: true, get: () => value });
        Object.defineProperty(document, "visibilityState", { configurable: true, get: () => (value ? "hidden" : "visible") });
        document.dispatchEvent(new Event("visibilitychange"));
      }, hidden);
    await hide(true);
    await sleep(400);
    const quiet = (await playingAuto(turn)).length === 0;
    await hide(false);
    const again = await runs(turn, "top", 5000);
    check(`FILM-13 ${shape}`, "films stop while the tab is hidden and go on when it is back (hidden state simulated)", quiet && again, `stopped ${quiet}, resumed ${again}`);
    await turn.close();
    await ctx.close();

    // Reduced motion, data saver, autoplay refused: nothing starts or downloads by itself.
    for (const [id, label, extra, script] of [
      ["FILM-14", "reduced motion", { reducedMotion: "reduce" }, null],
      ["FILM-15", "data saver", {}, () => Object.defineProperty(navigator, "connection", { configurable: true, value: { saveData: true, effectiveType: "4g", addEventListener() {}, removeEventListener() {} } })],
    ]) {
      const calm = await context(viewport, extra);
      if (script) await calm.addInitScript(script);
      const still = await calm.newPage();
      const asked = watchFilms(still);
      await still.goto(`${BASE}/`, { waitUntil: "load" });
      await sleep(2500);
      await scrollThrough(still, Math.round(viewport.height * 0.6), 320);
      await still.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await sleep(500);
      const before = [...asked];
      const none = before.length === 0 && (await films(still)).length === 0;
      const button = still.locator("#top button", { hasText: "재생 (소리 없음)" });
      const offered = (await button.count()) === 1;
      if (offered) await button.click();
      const byHand = offered && (await runs(still, "top", 8000));
      check(`${id} ${shape}`, `${label}: no film downloads or starts by itself; the poster and a play button stay, and a press plays it`, none && offered && byHand, `files before the press: ${before.length ? before.join(" ") : "none"}; button ${offered}; plays on press ${byHand}`);
      await calm.close();
    }
    {
      const strict = await context(viewport);
      await strict.addInitScript(() => {
        const play = HTMLMediaElement.prototype.play;
        HTMLMediaElement.prototype.play = function () {
          return window.__allow ? play.call(this) : Promise.reject(new DOMException("blocked", "NotAllowedError"));
        };
      });
      const blocked = await strict.newPage();
      const asked = watchFilms(blocked);
      await blocked.goto(`${BASE}/`, { waitUntil: "load" });
      await center(blocked, "#top picture");
      await sleep(3500);
      const heroButton = await blocked.locator("#top button", { hasText: "재생 (소리 없음)" }).count();
      await center(blocked, "#how picture");
      await sleep(1500);
      const clipButton = await blocked.locator("#how button", { hasText: "재생 (소리 없음)" }).count();
      const onlyHero = asked.length === 1;
      await blocked.evaluate(() => (window.__allow = true));
      await blocked.locator("#how button", { hasText: "재생 (소리 없음)" }).click();
      const pressed = await runs(blocked, "how", 8000);
      check(`FILM-16 ${shape}`, "autoplay refused by the browser: the poster and a play button stay, later films do not try, a press plays", heroButton === 1 && clipButton === 1 && onlyHero && pressed, `hero button ${heroButton}, clip button ${clipButton}, files before the press ${asked.slice(0, -1).join(" ") || asked.join(" ")}, plays on press ${pressed}`);
      await strict.close();
    }
    {
      // The file does not arrive: the poster stays, with a way to try again.
      const ctxFail = await context(viewport);
      const lost = await ctxFail.newPage();
      await lost.route(/clip-01-case-draft[^/]*\.mp4/, (route) => route.abort());
      await lost.goto(`${BASE}/`, { waitUntil: "load" });
      await center(lost, "#how picture");
      const alert = lost.locator("#how [role=alert]");
      const shown = await alert.waitFor({ timeout: 8000 }).then(() => true, () => false);
      const text = shown ? await alert.innerText() : "";
      await lost.unroute(/clip-01-case-draft[^/]*\.mp4/);
      if (shown) await alert.locator("button", { hasText: "다시 시도" }).click();
      const recovered = shown && (await runs(lost, "how", 8000));
      check(`FILM-17 ${shape}`, "a film that fails to load says so and offers 다시 시도, which plays it", shown && /불러오지 못했습니다/.test(text) && recovered, `message ${shown}, recovered ${recovered}`);
      await ctxFail.close();
    }
  }
  {
    // A film the visitor starts takes the stage from the ones that play by themselves, and gives it back.
    const ctx = await context({ width: 1440, height: 1900 });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/features/ai-marketing`, { waitUntil: "load" });
    const before = await runs(page, "top", 8000);
    await page.locator("#samples button", { hasText: "재생" }).first().click();
    await sleep(2500);
    const all = await films(page);
    const reel = all.find((film) => !film.auto);
    const held = all.filter((film) => film.auto && !film.paused).length === 0;
    await page.evaluate(() => document.querySelector("#samples video")?.pause());
    const resumed = await runs(page, "top", 6000);
    check("FILM-18 desktop", "a film the visitor starts stops the self-playing one beside it, which goes on when theirs is paused", before && reel && !reel.paused && reel.controls && held && resumed, `before ${before}, reel playing ${Boolean(reel && !reel.paused)}, others held ${held}, resumed ${resumed}`);
    await ctx.close();
  }
  {
    // Each film's poster: the hero's loads with the page, the others only near the screen.
    const ctx = await context(DESKTOP);
    const page = await ctx.newPage();
    await page.goto(`${BASE}/`, { waitUntil: "load" });
    const posters = await page.evaluate(() => [...document.querySelectorAll("picture > img")].map((img) => ({ section: img.closest("section, header")?.id ?? "", loading: img.loading, priority: img.getAttribute("fetchpriority") ?? "", alt: img.alt })));
    const heroPoster = posters.find((poster) => poster.section === "top");
    const eager = posters.filter((poster) => poster.loading !== "lazy" && poster.section !== "top");
    check("FILM-19 desktop", "the hero's poster loads first; every other poster is lazy", heroPoster?.loading === "eager" && heroPoster.priority === "high" && eager.length === 0, `${posters.length} posters; eager elsewhere: ${eager.map((poster) => poster.section).join(", ") || "none"}`);
    await ctx.close();
  }

  await browser.close();
  return { engine, results };
}

mkdirSync(OUT, { recursive: true });
let bad = 0;
for (const name of WANTED) {
  const { engine, results } = await run(name);
  writeFileSync(join(OUT, `${name}.json`), `${JSON.stringify({ engine, base: BASE, at: new Date().toISOString(), results }, null, 2)}\n`);
  const failed = results.filter((result) => result.ok === false);
  bad += failed.length;
  console.log(`\n${name}: ${results.filter((result) => result.ok).length} passed, ${failed.length} failed, ${results.filter((result) => result.ok === null).length} skipped`);
  failed.forEach((result) => console.log(`  FAIL ${result.id} ${result.title} — ${result.detail}`));
}
process.exit(bad ? 1 : 0);
