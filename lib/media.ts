import manifest from "@/public/assets/landing/v2/manifest.json";
import shorts from "@/public/assets/landing/v3/manifest.json";
import type { Clip, Film, Still } from "@/lib/film";

/**
 * The site's media: the films, stills and product-made samples of the asset pack under
 * public/assets/landing/v2, and the short clips cut from those films under public/assets/landing/v3.
 * Paths, sizes, lengths and the disclosure each asset must carry are read from the packs' own
 * manifest.json, so a page cannot fall behind a re-rendered film.
 * An asset a manifest does not list stops the build instead of rendering a broken frame.
 */

type FilmId = "VIDEO-01" | "VIDEO-02" | "VIDEO-03" | "VIDEO-04" | "VIDEO-05" | "VIDEO-06" | "VIDEO-07" | "VIDEO-08";
type SampleId = "SAMPLE-01" | "SAMPLE-02";
type ShortId = "CLIP-01" | "CLIP-02" | "CLIP-03" | "CLIP-04" | "CLIP-05" | "CLIP-06" | "CLIP-07";

function found<T>(item: T | undefined, id: string): T {
  if (!item) throw new Error(`public/assets/landing manifest.json has no ${id}`);
  return item;
}

const clip = (entry: { video: string; posterFallback: string; width: number; height: number; duration: number }): Clip => ({
  src: entry.video,
  poster: entry.posterFallback,
  width: entry.width,
  height: entry.height,
  seconds: entry.duration,
});

export function film(id: FilmId): Film {
  const entry = found(
    manifest.videos.find((video) => video.id === id),
    id,
  );
  return { id, ...clip(entry), portrait: clip(entry.mobileVariant), note: entry.note };
}

/**
 * The hero's brand film as the site serves it: VIDEO-01 re-encoded for the web at the same length
 * and frame (about half the bytes; the measured quality is in the V3 manifest). The approved files
 * stay where they are, and the posters are theirs.
 */
export function heroFilm(): Film {
  const approved = film("VIDEO-01");
  const { wide, tall } = shorts.hero;
  return { ...approved, src: wide.video, portrait: approved.portrait && { ...approved.portrait, src: tall.video } };
}

/** The pack's disclosure sentences, word for word. */
export const DISCLOSURES = manifest.disclosures;

/** Said with every short clip: it is a cut of a longer film of product screens, not a recording of its own. */
export const SHORT_NOTE = "제품 화면을 촬영해 편집한 영상의 한 장면입니다.";

/** What a clip shows beyond its film's own note: AI-made before/after photos, the demo homepage, a form that was never sent. */
const SHORT_EXTRA: Partial<Record<ShortId, string>> = {
  // The pack's sentence opens with "데모용 예시입니다.", which the film's own note has just said.
  "CLIP-02": DISCLOSURES.beforeAfter.replace(/^데모용 예시입니다\.\s*/, ""),
  "CLIP-04": "영상 속 시각은 연출한 것이고, 답변을 기다리는 시간은 편집했습니다.",
  "CLIP-05": DISCLOSURES.demoSite,
  "CLIP-06": "촬영에서는 게시하지 않았습니다.",
  "CLIP-07": "상담 요청 양식은 촬영에서 전송하지 않았습니다.",
};

/**
 * A short clip (5–10s): one scene of a film of the asset pack, trimmed and re-encoded at web size
 * (source-assets/landing-v3/make-clips.mjs). It plays by itself and loops, so its note says three
 * things as text next to it: what the screens are (its film's note), anything this scene shows
 * beyond that, and that it is an edit.
 */
export function short(id: ShortId): Film {
  const entry = found(
    shorts.clips.find((item) => item.id === id),
    id,
  );
  const cut = (file: { video: string; poster: string; width: number; height: number; duration: number }): Clip => ({
    src: file.video,
    poster: file.poster,
    width: file.width,
    height: file.height,
    seconds: file.duration,
  });
  const source = film(entry.of as FilmId);
  const note = [source.note, SHORT_EXTRA[id], SHORT_NOTE].filter(Boolean).join(" ");
  return { id, ...cut(entry), portrait: cut(entry.mobileVariant), note };
}

/**
 * A reel the product made, as it came out: no caption, no re-encode. It has no disclosure inside,
 * so the player always carries `note` next to it and never goes full screen.
 */
export function sample(id: SampleId): Film {
  const entry = found(
    manifest.samples.find((item) => item.id === id),
    id,
  );
  // The product's own cover image is the poster: the reel itself opens on a black frame.
  return { id, ...clip(entry), note: entry.note };
}

/** The asset pack's stills, and the screenshots of the live demo homepage taken for the 홈페이지 제작 page (SITE-01 …). */
const STILLS = [...Object.values(manifest.images).flat(), ...shorts.stills];

export function still(id: string): Still {
  const entry = found(
    STILLS.find((image) => image.id === id),
    id,
  );
  return { id, src: entry.fallback, width: entry.width, height: entry.height, alt: entry.alt, note: entry.note };
}
