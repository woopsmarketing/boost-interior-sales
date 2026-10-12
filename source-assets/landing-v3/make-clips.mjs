// node source-assets/landing-v3/make-clips.mjs [CLIP-01 …]
// Cuts the Landing V3 short clips and their posters with the installed ffmpeg and writes
// public/assets/landing/v3/manifest.json. The Landing V2 films are read, never written.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CLIPS, ENCODE, OUT_DIR, SIZES, SOURCE_DIR } from "./clips.mjs";

const ROOT = new URL("../../", import.meta.url).pathname;
const only = process.argv.slice(2);
const run = (bin, args) => execFileSync(bin, args, { stdio: ["ignore", "pipe", "pipe"] }).toString();
const sha256 = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");
const probe = (file) => {
  const data = JSON.parse(run("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", file]));
  const video = data.streams.find((stream) => stream.codec_type === "video");
  return {
    width: video.width,
    height: video.height,
    duration: Math.round(Number(data.format.duration) * 10) / 10,
    bytes: Number(data.format.size),
    hasAudio: data.streams.some((stream) => stream.codec_type === "audio"),
    codec: `${video.codec_name} ${video.profile}`,
  };
};

for (const dir of ["clips", "posters"]) mkdirSync(join(ROOT, OUT_DIR, dir), { recursive: true });

function cut(clip, shape) {
  const spec = clip[shape];
  const size = SIZES[shape];
  const source = join(ROOT, SOURCE_DIR, spec.src);
  const name = `${clip.file}${shape === "tall" ? "-vertical" : ""}`;
  const video = join(ROOT, OUT_DIR, "clips", `${name}.mp4`);
  const poster = join(ROOT, OUT_DIR, "posters", `${name}.jpg`);
  const filters = [`trim=start=${spec.in}:end=${spec.out}`, "setpts=PTS-STARTPTS", `scale=${size.w}:${size.h}:flags=lanczos`];
  if (spec.hold) filters.push(`tpad=stop_mode=clone:stop_duration=${spec.hold}`);
  if (!only.length || only.includes(clip.id)) {
    run("ffmpeg", [
      "-v", "error", "-y", "-i", source,
      "-vf", filters.join(","),
      "-an", "-r", String(ENCODE.fps),
      "-c:v", "libx264", "-profile:v", "high", "-level", "4.0", "-preset", ENCODE.preset, "-crf", String(ENCODE.crf),
      "-pix_fmt", "yuv420p", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
      "-g", String(ENCODE.fps * 2), "-movflags", "+faststart",
      video,
    ]);
    run("ffmpeg", ["-v", "error", "-y", "-ss", String(spec.poster), "-i", source, "-frames:v", "1", "-vf", `scale=${size.w}:${size.h}:flags=lanczos`, "-q:v", "3", poster]);
  }
  const info = probe(video);
  return {
    video: `/assets/landing/v3/clips/${name}.mp4`,
    poster: `/assets/landing/v3/posters/${name}.jpg`,
    ...info,
    posterBytes: statSync(poster).size,
    sha256: sha256(video),
    source: { file: `/assets/landing/v2/videos/${spec.src}`, in: spec.in, out: spec.out, ...(spec.hold ? { holdLastFrame: spec.hold } : {}), posterAt: spec.poster },
  };
}

const clips = CLIPS.map((clip) => {
  const wide = cut(clip, "wide");
  const tall = cut(clip, "tall");
  console.log(`${clip.id}  ${wide.duration}s ${(wide.bytes / 1024).toFixed(0)} KB  |  vertical ${tall.duration}s ${(tall.bytes / 1024).toFixed(0)} KB`);
  return { id: clip.id, title: clip.title, of: clip.of, scenes: clip.scenes, ...wide, mobileVariant: tall };
});

const manifestPath = join(ROOT, OUT_DIR, "manifest.json");
let previous = {};
try {
  previous = JSON.parse(readFileSync(manifestPath, "utf8"));
} catch {}
writeFileSync(
  manifestPath,
  `${JSON.stringify(
    {
      pack: "LANDING_ASSET_PACK_V3",
      basePath: "/assets/landing/v3",
      origin: "Landing V2 영상(public/assets/landing/v2/videos)의 한 장면을 잘라 웹 크기로 다시 인코딩한 편집본입니다. 장면을 새로 만들거나 순서를 바꾸지 않았습니다.",
      encode: `H.264 High, CRF ${ENCODE.crf}, ${ENCODE.preset}, ${ENCODE.fps} fps, yuv420p, no audio, faststart`,
      clips,
      // The hero cuts (make-hero.mjs) and the demo captures (capture-demo.mjs) are written by their own scripts: kept as they are.
      ...(previous.hero ? { hero: previous.hero } : {}),
      ...(previous.stills ? { stills: previous.stills } : {}),
    },
    null,
    2,
  )}\n`,
);
