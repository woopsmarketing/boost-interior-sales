import { manwon, PLANS, SETUP_OPTIONS, won } from "@/lib/pricing";

/**
 * Single source of truth for URLs, contact channel and SEO copy.
 * Change values here (or via env) instead of editing components.
 */

const [INTEGRATION, QUICK] = SETUP_OPTIONS;
const [CORE] = PLANS;

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

/** Customer-facing product name. The chat backend it runs on keeps its own (internal) name. */
export const SITE_NAME = "BoostInterior";
export const SITE_TITLE = "BoostInterior | 인테리어 업체를 위한 AI 상담·견적 시스템";
export const SITE_DESCRIPTION =
  "인테리어·리모델링 홈페이지 방문자의 조건을 이해하고, 관련 시공사례 추천부터 상담·견적 문의까지 연결하는 AI 상담 시스템.";

/** Anchor of the landing's pricing summary. The full scope lives on the pricing page. */
export const PRICING_ID = "pricing";
/** Dedicated pricing page (header "가격" link). */
export const PRICING_PATH = "/pricing";
export const PRICING_TITLE = "BoostInterior 가격 | 인테리어 AI 상담 시스템 구축·운영 비용";
/** Amounts come from the price list, so the search snippet cannot fall behind the page. */
export const PRICING_DESCRIPTION = `${INTEGRATION.name} ${manwon(INTEGRATION.price)}만원부터, ${QUICK.name} ${manwon(QUICK.price)}만원, ${CORE.name} 월 ${won(CORE.price)}원부터. 모든 가격은 부가세(VAT) 포함. BoostInterior 구축 방식과 운영 플랜의 포함 범위를 확인하세요.`;
/** /pricing: anchor of the plan comparison table. The plan cards link to it. */
export const COMPARISON_ID = "comparison";

/** Anchor of the Founding Partner block on the landing. */
export const PARTNER_ID = "partner";

/**
 * The 15s hero loop (public/video/chat-to-portfolio*.mp4) is kept on disk but no longer
 * rendered: the hero shows the product showcase instead.
 */
export const VIDEOS = {
  /** 86s full product walkthrough. Silent. */
  master: {
    src: "/video/master-sales.mp4",
    duration: "1:26",
    seconds: 86,
    width: 1920,
    height: 1080,
  },
} as const;

/**
 * AI Portfolio Video sample for /pricing. There is no real sample yet, and nothing is shown
 * until there is one: set this to a real asset under public/ and the block appears.
 */
export const PORTFOLIO_VIDEO_SAMPLE: { src: string; poster: string; width: number; height: number } | null = null;
