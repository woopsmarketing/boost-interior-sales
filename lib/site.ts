import { manwon, PLANS, SETUP_OPTIONS, won } from "@/lib/pricing";

/**
 * Single source of truth for URLs, contact channel and SEO copy.
 * Change values here (or via env) instead of editing components.
 */

const [INTEGRATION, QUICK] = SETUP_OPTIONS;
const [CORE] = PLANS;

/** Live interior demo site visitors can try as a customer. It opens in a new tab. */
export const DEMO_URL = "https://interior-demo.boostweb.co.kr";
/** The one label of every link to the demo. */
export const DEMO_LABEL = "실제 데모 체험하기";
/** What to type in the demo. Said next to the hero's demo button and again in the 실제 데모 section. */
export const DEMO_PROMPT = "32평인데 주방과 욕실을 리모델링하고 싶어요";
/** The made-up company in the demo and in every capture. It is not the product, and the page says so. */
export const DEMO_COMPANY = "부스트 인테리어";
/** Said wherever the demo company's screens are shown. */
export const DEMO_SCREEN_NOTE = `화면 속 ‘${DEMO_COMPANY}’는 데모용 가상 업체이며, 시공사례 사진은 AI로 만든 예시 이미지입니다.`;

/** 문의 channel: the KakaoTalk 1:1 open chat, whose room is titled BoostWorks. Every 문의 link goes here. */
export const KAKAO_OPEN_CHAT_URL = "https://open.kakao.com/o/sAS9ebQi";
/**
 * The two labels a link to the open chat may carry: `KAKAO_LABEL` anywhere, `KAKAO_RECOMMEND_LABEL`
 * once the reader has seen the price and the next step is "which option is mine".
 */
export const KAKAO_LABEL = "카카오톡 문의";
export const KAKAO_RECOMMEND_LABEL = "내 홈페이지 기준으로 추천받기";
/** Who runs BoostInterior, as the footer and the 문의 notes name it. */
export const OPERATOR = "BoostWorks";
/** Where the 문의 buttons lead, said next to the one whose label does not name KakaoTalk. */
export const KAKAO_NOTE = `${OPERATOR} 카카오톡 1:1 오픈채팅으로 연결됩니다.`;

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

/** Landing anchors the header and the pricing pages link to. */
export const HOW_ID = "how";
export const LIVE_ID = "live";
/** Anchor of the landing's pricing summary. Every price is on the pricing page, the full scope one page further. */
export const PRICING_ID = "pricing";
/** Pricing at a glance (header "가격" link): every price, and which one fits. */
export const PRICING_PATH = "/pricing";
export const PRICING_TITLE = "BoostInterior 가격 | 인테리어 AI 상담 시스템 구축·운영 비용";
/** Amounts come from the price list, so the search snippet cannot fall behind the page. */
export const PRICING_DESCRIPTION = `${INTEGRATION.name} ${manwon(INTEGRATION.price)}만원부터, ${QUICK.name} ${manwon(QUICK.price)}만원, ${CORE.name} 월 ${won(CORE.price)}원부터. 모든 가격은 부가세(VAT) 포함. BoostInterior 구축 방식과 운영 플랜을 한눈에 비교하세요.`;

/** The full scope behind every price: what each option and plan includes, and the FAQ. */
export const PRICING_DETAILS_PATH = "/pricing/details";
export const PRICING_DETAILS_TITLE = "BoostInterior 상세 가격 | 구축 방식별 포함 범위 · 운영 플랜별 기능 비교";
export const PRICING_DETAILS_DESCRIPTION =
  "BoostInterior 구축 방식 4가지의 전체 포함 범위, 운영 플랜 3가지의 전체 기능 비교, 결정 전에 가장 많이 묻는 질문. 모든 가격은 부가세(VAT) 포함.";
/** /pricing/details: anchor of the plan comparison table. The plan cards on both pricing pages link to it. */
export const COMPARISON_ID = "comparison";
/** /pricing/details: the other blocks its summary jumps to. The landing's questions link to the last one. */
export const COMMON_SCOPE_ID = "common-scope";
export const SETUP_COMPARISON_ID = "setup-comparison";
export const PORTFOLIO_VIDEO_ID = "portfolio-video";
export const PRICING_FAQ_ID = "faq";

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
    /** Where each scene starts (s), read off the cut: source-assets/videos/master-sales-edit/edl-main-sales.json. */
    chapters: [
      { label: "상담", at: 4 },
      { label: "사례 추천", at: 22 },
      { label: "사진 확인", at: 32 },
      { label: "견적 문의", at: 49 },
      { label: "관리자 확인", at: 68 },
    ],
  },
} as const;

/**
 * AI Portfolio Video sample: a real result made with the feature, and nothing else. There is none yet,
 * and nothing is shown until there is one. Set this to a real asset under public/ and the sample
 * appears in the three places wired for it: the landing's price summary, the Growth block on /pricing
 * and the AI Portfolio Video block on /pricing/details.
 */
export const PORTFOLIO_VIDEO_SAMPLE: { src: string; poster: string; width: number; height: number } | null = null;
