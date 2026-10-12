// node source-assets/landing-v3/make-hero.mjs
// Re-encodes the approved Landing V2 hero film for the web (same length, same 1080p frame, lower
// bitrate) and records size and measured quality under `hero` in the V3 manifest. The approved
// files in public/assets/landing/v2/videos are read, never written.
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { OUT_DIR, SOURCE_DIR } from "./clips.mjs";

const ROOT = new URL("../../", import.meta.url).pathname;
const CRF = 26;
const CUTS = [
  { key: "wide", src: "01-hero-main.mp4", out: "01-hero-main.mp4" },
  { key: "tall", src: "01-hero-main-vertical.mp4", out: "01-hero-main-vertical.mp4" },
];

const sha256 = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");
const probe = (file) => {
  const data = JSON.parse(
    execFileSync("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", file]).toString(),
  );
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
/** Quality of `file` against the approved film: ffmpeg prints both scores on stderr. */
const measure = (file, source, filter, pattern) => {
  const { stderr } = spawnSync("ffmpeg", ["-v", "info", "-i", file, "-i", source, "-lavfi", filter, "-f", "null", "-"], {
    encoding: "utf8",
    maxBuffer: 1 << 28,
  });
  const found = [...stderr.matchAll(pattern)].pop();
  return found ? Math.round(Number(found[1]) * 1000) / 1000 : null;
};

mkdirSync(join(ROOT, OUT_DIR, "hero"), { recursive: true });

const hero = {};
for (const cut of CUTS) {
  const source = join(ROOT, SOURCE_DIR, cut.src);
  const video = join(ROOT, OUT_DIR, "hero", cut.out);
  execFileSync("ffmpeg", [
    "-v", "error", "-y", "-i", source,
    "-an", "-r", "30",
    "-c:v", "libx264", "-profile:v", "high", "-level", "4.1", "-preset", "slow", "-crf", String(CRF),
    "-pix_fmt", "yuv420p", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
    "-g", "60", "-movflags", "+faststart",
    video,
  ]);
  const before = statSync(source).size;
  const info = probe(video);
  hero[cut.key] = {
    video: `/assets/landing/v3/hero/${cut.out}`,
    ...info,
    sha256: sha256(video),
    source: { file: `/assets/landing/v2/videos/${cut.src}`, bytes: before },
    saved: `${Math.round((1 - info.bytes / before) * 100)}%`,
    ssim: measure(video, source, "ssim", /All:([0-9.]+)/g),
    vmaf: measure(video, source, "libvmaf=n_threads=8:n_subsample=3", /VMAF score: ([0-9.]+)/g),
  };
  console.log(`${cut.key}  ${(before / 1e6).toFixed(2)} MB → ${(info.bytes / 1e6).toFixed(2)} MB  SSIM ${hero[cut.key].ssim}  VMAF ${hero[cut.key].vmaf}`);
}

const manifestPath = join(ROOT, OUT_DIR, "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
manifest.hero = {
  of: "VIDEO-01",
  note: "승인된 VIDEO-01을 같은 길이 · 같은 해상도로 다시 인코딩한 웹용 파일입니다. 장면은 바꾸지 않았습니다.",
  encode: `H.264 High, CRF ${CRF}, slow, 30 fps, yuv420p, no audio, faststart`,
  ...hero,
};
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
