/**
 * Single source of truth for URLs, contact channel and SEO copy.
 * Change values here (or via env) instead of editing components.
 */

/** Live interior demo site visitors can try as a customer. */
export const DEMO_URL = "https://interior-demo.boostweb.co.kr";

/** 도입 상담 channel: BoostWorks KakaoTalk 1:1 open chat. Every 상담 CTA links here. */
export const KAKAO_OPEN_CHAT_URL = "https://open.kakao.com/o/sAS9ebQi";

/**
 * Anchor of the 86s full demo video section. Outbound emails link straight to
 * `/#demo-video`, so don't rename it.
 */
export const DEMO_VIDEO_ID = "demo-video";

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/** Canonical origin used for metadataBase, sitemap and robots. */
export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "BoostChat";
export const SITE_TITLE = "BoostChat | 인테리어 홈페이지 AI 상담";
export const SITE_DESCRIPTION =
  "고객 조건에 맞는 시공사례를 추천하고, 사진 상담부터 견적 문의까지 연결하는 인테리어 홈페이지 AI 상담 솔루션.";

export const VIDEOS = {
  /** 15s loop: conversation → portfolio recommendation. Silent. */
  hero: {
    src: "/video/chat-to-portfolio.mp4",
    /** 720p re-encode of the same file (0.4MB vs 2.3MB) for ≤820px screens */
    mobileSrc: "/video/chat-to-portfolio-720.mp4",
    poster: "/video/chat-to-portfolio-poster.webp",
    width: 1920,
    height: 1080,
  },
  /** 86s full product walkthrough. Silent. */
  master: {
    src: "/video/master-sales.mp4",
    duration: "1:26",
    width: 1920,
    height: 1080,
  },
} as const;
