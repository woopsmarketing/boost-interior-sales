// The files of the landing's asset packs (public/assets/landing/v2 and v3) that the six pages show.
// Only these and the two manifests are in Git: the rest of the V2 pack (approved originals of the
// re-encoded films, films and stills no page uses) stays on the machine that made it. So the list is
// derived, never typed: from the calls the pages make (film, short, sample, still, heroFilm) through
// the manifests, the same way lib/media.ts resolves them. `npm test` checks the files against it,
// and source-assets/landing-v3/qa/media.mjs checks it against a build and a running site.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

/** The manifests lib/media.ts imports: without them nothing builds. */
export const MANIFESTS = ["/assets/landing/v2/manifest.json", "/assets/landing/v3/manifest.json"];

const sources = (dir) =>
  readdirSync(join(ROOT, dir), { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(ts|tsx)$/.test(entry.name))
    .map((entry) => join(entry.parentPath, entry.name));

/** `{ path, id, bytes?, sha256? }` for every pack file a page shows, by path. `bytes` and `sha256` are the manifest's own, where it states them. */
export function usedMedia() {
  const manifest = (version) => JSON.parse(readFileSync(join(ROOT, "public", "assets", "landing", version, "manifest.json"), "utf8"));
  const [V2, V3] = [manifest("v2"), manifest("v3")];
  const stills = [...Object.values(V2.images).flat(), ...V3.stills];
  // lib/media.ts defines the lookups; every other file only calls them.
  const code = ["app", "components", "lib"]
    .flatMap(sources)
    .filter((file) => !file.endsWith(join("lib", "media.ts")))
    .map((file) => readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\/|(?<!:)\/\/.*$/gm, ""))
    .join("\n");

  const used = new Map();
  const add = (id, path, facts = {}) => {
    if (!path) throw new Error(`${id} has no file in its manifest entry`);
    used.set(path, { path, id, ...facts });
  };
  const entry = (list, id) => {
    const found = list.find((item) => item.id === id);
    if (!found) throw new Error(`${id} is not in a manifest`);
    return found;
  };

  for (const [, kind, id] of code.matchAll(/\b(film|short|sample|still)\("([\w-]+)"\)/g)) {
    if (kind === "film") {
      const film = entry(V2.videos, id);
      for (const cut of [film, film.mobileVariant]) {
        add(id, cut.video, { bytes: cut.bytes });
        add(id, cut.posterFallback);
      }
    } else if (kind === "short") {
      const clip = entry(V3.clips, id);
      for (const cut of [clip, clip.mobileVariant]) {
        add(id, cut.video, { bytes: cut.bytes, sha256: cut.sha256 });
        add(id, cut.poster, { bytes: cut.posterBytes });
      }
    } else if (kind === "sample") {
      const reel = entry(V2.samples, id);
      add(id, reel.video, { bytes: reel.bytes, sha256: reel.sha256 });
      add(id, reel.posterFallback);
    } else {
      const image = entry(stills, id);
      add(id, image.fallback, { bytes: image.bytes, sha256: image.sha256 });
    }
  }
  // The hero: the approved film's posters, and the web re-encode of its two cuts. The approved films themselves are not served.
  if (/\bheroFilm\(\)/.test(code)) {
    const approved = entry(V2.videos, V3.hero.of);
    for (const cut of [V3.hero.wide, V3.hero.tall]) add("HERO", cut.video, { bytes: cut.bytes, sha256: cut.sha256 });
    add("HERO", approved.posterFallback);
    add("HERO", approved.mobileVariant.posterFallback);
  }
  // A lookup by a variable would not be seen above, and its file would be missing from a fresh checkout.
  const dynamic = code.match(/\b(?:film|short|sample|still)\((?!["')])[^)]*\)/);
  if (dynamic) throw new Error(`a page looks an asset up by a variable (${dynamic[0]}): list it by its id`);

  return [...used.values()].sort((a, b) => a.path.localeCompare(b.path));
}
