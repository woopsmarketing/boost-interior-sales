/**
 * Landing V3 short clips: 5–10 s highlights cut out of the Landing V2 films (public/assets/landing/v2/videos).
 * Nothing is re-staged: a clip is one scene of a film, trimmed just inside its fades, scaled to a web size
 * and re-encoded. `hold` repeats the scene's last frame (a still screen) to bring a short scene to five seconds.
 * `in` / `out` are seconds in the source film; `poster` is the second of the source the poster frame is taken at.
 * `scenes` names the storyboard scenes (source-assets/landing-v2/storyboards) the clip is.
 */
export const SOURCE_DIR = "public/assets/landing/v2/videos";
export const OUT_DIR = "public/assets/landing/v3";

export const CLIPS = [
  {
    id: "CLIP-01",
    file: "clip-01-case-draft",
    title: "사진과 메모가 시공사례 초안이 되는 과정",
    of: "VIDEO-04",
    scenes: "S2",
    wide: { src: "04-ai-portfolio-to-website.mp4", in: 3.2, out: 9.8, poster: 8.9 },
    tall: { src: "04-ai-portfolio-to-website-vertical.mp4", in: 3.0, out: 11.0, poster: 9.6 },
  },
  {
    id: "CLIP-02",
    file: "clip-02-reels-result",
    title: "시공사진으로 만든 릴스 · 쇼츠 영상",
    of: "VIDEO-02",
    scenes: "S3–S4",
    wide: { src: "02-reels-shorts-generator.mp4", in: 6.8, out: 16.3, poster: 9.4 },
    tall: { src: "02-reels-shorts-generator-vertical.mp4", in: 6.8, out: 15.7, poster: 9.0 },
  },
  {
    id: "CLIP-03",
    file: "clip-03-blog-draft",
    title: "시공 정보로 만든 네이버 블로그 초안",
    of: "VIDEO-03",
    scenes: "S3 (앞부분)",
    wide: { src: "03-naver-blog-generator.mp4", in: 8.3, out: 14.55, poster: 12.9 },
    tall: { src: "03-naver-blog-generator-vertical.mp4", in: 7.2, out: 14.0, poster: 9.4 },
  },
  {
    id: "CLIP-04",
    file: "clip-04-consult-answer",
    title: "방문자 질문에 시공사례로 답하는 AI 상담",
    of: "VIDEO-05",
    scenes: "S3",
    wide: { src: "05-ai-consultation-24-7.mp4", in: 10.4, out: 18.7, poster: 16.9 },
    tall: { src: "05-ai-consultation-24-7-vertical.mp4", in: 7.3, out: 15.7, poster: 13.5 },
  },
  {
    id: "CLIP-05",
    file: "clip-05-site-gallery",
    title: "업체 홈페이지의 시공사례 목록",
    of: "VIDEO-04",
    scenes: "S4",
    wide: { src: "04-ai-portfolio-to-website.mp4", in: 17.8, out: 24.8, poster: 22.9 },
    tall: { src: "04-ai-portfolio-to-website-vertical.mp4", in: 19.0, out: 23.05, hold: 1.0, poster: 22.5 },
  },
  {
    id: "CLIP-06",
    file: "clip-06-case-publish",
    title: "시공사례를 확인하고 게시하는 과정",
    of: "VIDEO-04",
    scenes: "S3",
    wide: { src: "04-ai-portfolio-to-website.mp4", in: 10.5, out: 17.0, poster: 14.9 },
    tall: { src: "04-ai-portfolio-to-website-vertical.mp4", in: 12.6, out: 18.35, poster: 14.5 },
  },
  {
    id: "CLIP-07",
    file: "clip-07-consult-inquiry",
    title: "상담창 안에서 여는 상담 요청 양식",
    of: "VIDEO-05",
    scenes: "S4",
    wide: { src: "05-ai-consultation-24-7.mp4", in: 19.4, out: 26.4, poster: 25.2 },
    tall: { src: "05-ai-consultation-24-7-vertical.mp4", in: 16.3, out: 21.4, poster: 20.4 },
  },
];

/** Web sizes. The films are 1920×1080 / 1080×1920; a clip plays in a slot at most 760 CSS px wide (320 for the vertical cut). */
export const SIZES = { wide: { w: 1280, h: 720 }, tall: { w: 720, h: 1280 } };
/** H.264 High, CRF 24, slow preset, a keyframe every 2 s, yuv420p / bt709, no audio track, faststart. */
export const ENCODE = { crf: 24, preset: "slow", fps: 30 };
