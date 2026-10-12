// node source-assets/landing-v3/qa/media.mjs [base]
// The media the six pages show, checked four ways. Results: source-assets/landing-v3/qa/out/media.json.
//  1. Files — each file of the list (tests/used-media.mjs) is under public/, weighs what its manifest
//     says, hashes to the manifest's SHA-256 where it states one, and to the record taken when the
//     pages were approved (SHA256SUMS-public-media-2026-10-11.txt).
//  2. Build — every media path in the built pages (.next) is on the list, and every file on the list
//     is in a built page: the list is neither short nor padded. Run `npm run build` first.
//  3. Git — what Git tracks under public/assets/landing is exactly the list and the two manifests,
//     and every other static file a page shows is tracked too. Skipped outside a Git checkout.
//  4. Site — with a base address, each file answers 200 with its own length and type, and a film
//     answers a byte range with 206 (Safari asks for one before it plays anything).
//     VERCEL_BYPASS=<secret> when the address is a Vercel preview behind deployment protection.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { MANIFESTS, usedMedia } from "../../../tests/used-media.mjs";

const ROOT = new URL("../../../", import.meta.url).pathname;
const BASE = process.argv[2]?.replace(/\/$/, "");
const BYPASS = process.env.VERCEL_BYPASS ? { "x-vercel-protection-bypass": process.env.VERCEL_BYPASS } : {};
const OUT = join(ROOT, "source-assets/landing-v3/qa/out");
const RECORD = join(ROOT, "source-assets/landing-v3/SHA256SUMS-public-media-2026-10-11.txt");
const MEDIA = /\/(?:assets\/landing|video|images)\/[\w\-./]+\.(?:mp4|jpe?g|png|webp|avif|svg|json)/g;
const TYPES = { mp4: "video/mp4", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", json: "application/json" };

const results = [];
const check = (id, title, ok, detail = "") => {
  results.push({ id, title, ok: ok === null ? null : Boolean(ok), detail });
  console.log(`${ok === null ? "SKIP" : ok ? "PASS" : "FAIL"}  ${id}  ${title}${detail ? `  — ${detail}` : ""}`);
};
const mib = (bytes) => `${(bytes / 1_048_576).toFixed(2)}MiB`;
const mb = (bytes) => `${(bytes / 1_000_000).toFixed(1)}MB`;
const local = (path) => join(ROOT, "public", path);
const sha256 = (path) => createHash("sha256").update(readFileSync(local(path))).digest("hex");

// ── 1. Files ─────────────────────────────────────────────────────────────────────────────────
const used = usedMedia();
const record = new Map(existsSync(RECORD) ? readFileSync(RECORD, "utf8").trim().split("\n").map((line) => line.split(/\s+/).reverse().map((part, i) => (i === 0 ? `/${part}` : part))) : []);
const files = used.map((item) => {
  const there = existsSync(local(item.path));
  return { ...item, there, size: there ? statSync(local(item.path)).size : 0, hash: there ? sha256(item.path) : "" };
});
const missing = files.filter((file) => !file.there);
check("FILE-EXISTS", `the ${files.length} files the pages show are under public/`, missing.length === 0, missing.map((file) => file.path).join(" "));
const sized = files.filter((file) => file.bytes !== undefined);
const offSize = sized.filter((file) => file.size !== file.bytes);
check("FILE-BYTES", `${sized.length} files weigh what their manifest says`, offSize.length === 0, offSize.map((file) => `${file.path} ${file.size}≠${file.bytes}`).join(" "));
const hashed = files.filter((file) => file.sha256);
const offHash = hashed.filter((file) => file.hash !== file.sha256);
check("FILE-SHA256-MANIFEST", `${hashed.length} files hash to the SHA-256 in their manifest`, offHash.length === 0, offHash.map((file) => file.path).join(" "));
const recorded = files.filter((file) => record.has(file.path));
const offRecord = recorded.filter((file) => record.get(file.path) !== file.hash);
check(
  "FILE-SHA256-RECORD",
  `${recorded.length} of ${files.length} files hash to the record taken when the pages were approved`,
  record.size === 0 ? null : offRecord.length === 0 && recorded.length === files.length,
  record.size === 0 ? "no record on this machine" : [...offRecord.map((file) => file.path), ...files.filter((file) => !record.has(file.path)).map((file) => `${file.path} (not recorded)`)].join(" "),
);
for (const path of MANIFESTS) check(`FILE-MANIFEST ${path}`, "the manifest is there and parses", existsSync(local(path)) && Boolean(JSON.parse(readFileSync(local(path), "utf8")).pack));
const total = files.reduce((sum, file) => sum + file.size, 0) + MANIFESTS.reduce((sum, path) => sum + statSync(local(path)).size, 0);

// ── 2. Build ─────────────────────────────────────────────────────────────────────────────────
const listed = new Set(files.map((file) => file.path));
/** Static files outside the packs that a built page names: the 86s film, its poster, the product captures. */
let others = [];
const built = join(ROOT, ".next/server/app");
if (!existsSync(built)) check("BUILD", "the built pages name exactly the files on the list", null, "no build: run `npm run build`");
else {
  const pages = readdirSync(built, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(html|rsc)$/.test(entry.name))
    .map((entry) => join(entry.parentPath, entry.name));
  // An image is named inside /_next/image?url=…, percent-encoded.
  const named = new Set(pages.flatMap((page) => decodeURIComponent(readFileSync(page, "utf8").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).match(MEDIA) ?? []));
  const pack = [...named].filter((path) => path.startsWith("/assets/landing/"));
  const unlisted = pack.filter((path) => !listed.has(path));
  const unshown = [...listed].filter((path) => !named.has(path));
  check("BUILD-LISTED", `every pack file a built page names is on the list (${pack.length} named in ${pages.length} files)`, unlisted.length === 0, unlisted.join(" "));
  check("BUILD-SHOWN", "every file on the list is named by a built page", unshown.length === 0, unshown.join(" "));
  others = [...named].filter((path) => !path.startsWith("/assets/landing/")).sort();
  const gone = others.filter((path) => !existsSync(local(path)));
  check("BUILD-OTHER", `the ${others.length} other static files the pages name are under public/`, gone.length === 0, gone.join(" ") || others.join(" "));
}

// ── 3. Git ───────────────────────────────────────────────────────────────────────────────────
let tracked = null;
try {
  tracked = new Set(execFileSync("git", ["ls-files", "public"], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim().split("\n").filter(Boolean).map((path) => path.slice("public".length)));
} catch {
  check("GIT", "Git tracks exactly the list", null, "not a Git checkout");
}
if (tracked) {
  const want = new Set([...listed, ...MANIFESTS]);
  const pack = [...tracked].filter((path) => path.startsWith("/assets/landing/"));
  const untracked = [...want].filter((path) => !tracked.has(path));
  const extra = pack.filter((path) => !want.has(path));
  check("GIT-TRACKED", `the ${want.size} files a build needs are in Git`, untracked.length === 0, untracked.slice(0, 8).join(" ") + (untracked.length > 8 ? ` … ${untracked.length} in all` : ""));
  check("GIT-ONLY", "Git tracks nothing else of the packs (no approved original, no unused film or still)", extra.length === 0, extra.slice(0, 8).join(" "));
  const loose = others.filter((path) => !tracked.has(path));
  check("GIT-OTHER", "the other static files the pages name are in Git", loose.length === 0, loose.join(" "));
}

// ── 4. Site ──────────────────────────────────────────────────────────────────────────────────
if (!BASE) check("HTTP", "each file answers 200 on the running site", null, "no base address given");
else {
  const wrong = [];
  const noRange = [];
  const uncached = [];
  const targets = [...files.map((file) => ({ path: file.path, size: file.size })), ...MANIFESTS.map((path) => ({ path, size: statSync(local(path)).size })), ...others.map((path) => ({ path, size: statSync(local(path)).size }))];
  for (const { path, size } of targets) {
    const response = await fetch(`${BASE}${path}`, { method: "HEAD", headers: BYPASS });
    const type = TYPES[path.split(".").pop()];
    const length = Number(response.headers.get("content-length"));
    // A compressed answer (the manifests, as JSON) carries the compressed length, so only its status and type are read.
    const exact = response.headers.get("content-encoding") ? true : length === size;
    if (response.status !== 200 || !exact || (type && !response.headers.get("content-type")?.startsWith(type))) wrong.push(`${path} → ${response.status} ${response.headers.get("content-type")} ${length}/${size}`);
    if (!/max-age=\d+/.test(response.headers.get("cache-control") ?? "")) uncached.push(path);
    if (path.endsWith(".mp4")) {
      const part = await fetch(`${BASE}${path}`, { headers: { ...BYPASS, Range: "bytes=0-1023" } });
      if (part.status !== 206 || (await part.arrayBuffer()).byteLength !== 1024) noRange.push(`${path} → ${part.status}`);
    }
  }
  check("HTTP-200", `${targets.length} static files answer 200 with their own length and type at ${BASE}`, wrong.length === 0, wrong.slice(0, 6).join(" | "));
  check("HTTP-RANGE", `${targets.filter(({ path }) => path.endsWith(".mp4")).length} films answer a byte range with 206`, noRange.length === 0, noRange.slice(0, 6).join(" | "));
  check("HTTP-CACHE", "each answer carries a Cache-Control max-age", uncached.length === 0, uncached.slice(0, 6).join(" "));
}

// ── Summary ──────────────────────────────────────────────────────────────────────────────────
const groups = {};
for (const file of files) {
  const key = file.path.split("/").slice(3, 5).join("/");
  groups[key] ??= { files: 0, bytes: 0 };
  groups[key].files += 1;
  groups[key].bytes += file.size;
}
console.log(`\n${files.length} files + ${MANIFESTS.length} manifests: ${total} bytes (${mb(total)}, ${mib(total)})`);
for (const [key, group] of Object.entries(groups)) console.log(`  ${key.padEnd(12)} ${String(group.files).padStart(3)} files  ${mb(group.bytes)}`);
const failed = results.filter((result) => result.ok === false);
console.log(`\n${results.filter((result) => result.ok).length} passed, ${failed.length} failed, ${results.filter((result) => result.ok === null).length} skipped`);
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "media.json"), `${JSON.stringify({ base: BASE ?? null, total, groups, others, results, files: files.map(({ path, id, size, hash }) => ({ path, id, size, sha256: hash })) }, null, 2)}\n`);
process.exit(failed.length ? 1 : 0);
