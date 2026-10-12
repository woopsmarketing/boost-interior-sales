import { ENTRY_BUILD, manwon, monthly, SETUP_OPTIONS, SUBSCRIPTIONS, WEBSITE } from "@/lib/pricing";

/**
 * Single source of truth for URLs, routes, anchors, the contact channel and the search copy of
 * every page. Change values here (or via env) instead of editing components.
 */

const [MARKETING, CONSULTATION, BUNDLE] = SUBSCRIPTIONS;
/** "AI 마케팅 월 29,700원, AI 상담 월 19,800원, 올인원 월 39,600원" — read from the price list. */
const MONTHLY_PRICES = SUBSCRIPTIONS.map((item) => `${item.name} ${monthly(item)}`).join(", ");

/** Live interior demo site visitors can try as a customer. It opens in a new tab. */
export const DEMO_URL = "https://interior-demo.boostweb.co.kr";
/** The one label of every link to the demo. */
export const DEMO_LABEL = "실제 데모 체험하기";
/** What to type in the demo. Said in the 실제 데모 section, right above its button. */
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
 * Anchor of the 86s full demo video (the consultation walkthrough). Outbound emails link straight to
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

/**
 * Whether this build may be indexed. A Vercel preview serves the same six pages under another
 * address, so it asks not to be indexed (the robots meta in app/layout.tsx, the X-Robots-Tag header
 * in next.config.ts). Everything else is indexable: the production deployment, and a local build,
 * which nothing outside can reach and which the checks read as production will be served.
 * A preview build is never the production one: production is always built as production.
 */
export const INDEXABLE = process.env.VERCEL_ENV !== "preview";

/** Customer-facing product name. The chat backend it runs on keeps its own (internal) name. */
export const SITE_NAME = "BoostInterior";
export const SITE_TITLE = "BoostInterior | 시공사진으로 만드는 마케팅 콘텐츠와 AI 상담";
export const SITE_DESCRIPTION = `인테리어·리모델링 업체의 시공사진으로 릴스·쇼츠 영상과 게시글, 블로그 초안을 만들고, 홈페이지 방문자의 질문에는 AI 상담이 답하며 견적 문의까지 연결합니다. ${MONTHLY_PRICES}.`;

/**
 * Landing anchors the header and the other pages link to. Every id the landing has carried so far
 * still exists on it (see app/page.tsx): links from outside keep landing on the matching block.
 */
export const VALUE_ID = "value";
export const HOW_ID = "how";
export const REELS_ID = "reels";
export const BLOG_ID = "blog";
export const CONSULT_ID = "consult";
export const WEBSITE_ID = "website";
export const BUNDLE_ID = "all-in-one";
export const LIVE_ID = "live";
/** Anchor of the landing's price summary. Every price is on the pricing page, the full conditions one page further. */
export const PRICING_ID = "pricing";
export const FAQ_ID = "faq";
export const CONTACT_ID = "contact";

/**
 * The three feature pages. Each has its own search intent: making marketing content, a consultation
 * chatbot, and a homepage for an interior company. Amounts in a description come from the price list.
 * The third is AI 스마트 홈페이지 (the name is the price list's); its address stays /features/website.
 */
export const FEATURES = {
  marketing: {
    path: "/features/ai-marketing",
    label: MARKETING.name,
    title: "AI 마케팅 | 시공사진으로 릴스·쇼츠 영상과 블로그 초안 만들기 - BoostInterior",
    description: `인테리어 시공사진과 공사 정보를 올리면 릴스·쇼츠용 세로 영상, 표지 이미지, 인스타그램 본문과 해시태그, 네이버 블로그 초안이 만들어집니다. ${MARKETING.name} ${monthly(MARKETING)}(VAT 포함). 제품이 만든 영상을 그대로 확인해 보세요.`,
  },
  consultation: {
    path: "/features/ai-consultation",
    label: CONSULTATION.name,
    title: "AI 상담 | 인테리어 업체 홈페이지 AI 상담 챗봇과 견적 문의 접수 - BoostInterior",
    description: `홈페이지 방문자의 질문에 AI가 우리 업체 정보로 답하고, 견적 문의를 받아 관리 화면에 정리합니다. 기존 홈페이지에도 상담창을 설치해 쓸 수 있습니다. ${CONSULTATION.name} ${monthly(CONSULTATION)}(VAT 포함).`,
  },
  website: {
    path: "/features/website",
    label: WEBSITE.name,
    title: `${WEBSITE.name} | 인테리어 업체 홈페이지 제작과 시공사례 페이지 - BoostInterior`,
    description: `${WEBSITE.name}는 시공사례 목록과 상세, 조건 검색, 견적 문의 양식을 갖추고 ${CONSULTATION.name} · ${MARKETING.name}을 월 구독으로 더해 쓸 수 있는 인테리어 업체 홈페이지입니다. 제작비 ${manwon(ENTRY_BUILD.price)}만원부터(${ENTRY_BUILD.name} 기준, VAT 포함), 기본 운영 월 이용료 없음. 실제 데모 홈페이지를 직접 확인해 보세요.`,
  },
} as const;

/** Pricing at a glance (header "요금 안내" link): every price, and which one fits. */
export const PRICING_PATH = "/pricing";
export const PRICING_TITLE = `요금 안내 | AI 마케팅 · AI 상담 · 올인원 요금과 ${WEBSITE.name} 제작비 - BoostInterior`;
/** Amounts come from the price list, so the search snippet cannot fall behind the page. */
export const PRICING_DESCRIPTION = `${MONTHLY_PRICES}. ${WEBSITE.name} 제작비는 ${manwon(ENTRY_BUILD.price)}만원부터(${ENTRY_BUILD.name} 기준)이며 기본 운영 월 이용료가 없습니다. 모든 가격은 부가세(VAT) 포함.`;

/** The conditions behind every price: what each product carries, what it needs, and the questions. */
export const PRICING_DETAILS_PATH = "/pricing/details";
export const PRICING_DETAILS_TITLE = "상세 요금 | 상품별 제공 기능 · 이용 조건 · 홈페이지 제작 범위 비교 - BoostInterior";
export const PRICING_DETAILS_DESCRIPTION = `${MARKETING.name} · ${CONSULTATION.name} · ${BUNDLE.name}과 ${WEBSITE.name}를 항목별로 비교합니다. 홈페이지 필요 여부, 시공사례 추천에 필요한 자료, 초기 구축비, 무료 체험 정책, 구축 방식 ${SETUP_OPTIONS.length}가지의 포함 범위. 모든 가격은 부가세(VAT) 포함.`;
/** Both pricing pages: the three subscriptions, the trial policy and the homepage builds. */
export const PLANS_ID = "plans";
export const TRIAL_ID = "trial";
export const SETUP_ID = "setup";
/** /pricing/details: the product comparison table. */
export const COMPARISON_ID = "comparison";
/** /pricing/details: the other blocks its summary jumps to. The landing's questions link to the last one. */
export const CONSULT_SETUP_ID = "common-scope";
export const SETUP_COMPARISON_ID = "setup-comparison";
export const PRICING_FAQ_ID = "faq";

/** Anchor of the Founding Partner block on the landing. */
export const PARTNER_ID = "partner";

/**
 * The header and footer menu, in the order an owner asks: what it does (three pages), what it
 * costs, try it. 문의 is the button next to it. The first three open under one "기능" button on a
 * desktop bar and are listed in full in the phone menu.
 */
export const NAV_FEATURES = [FEATURES.marketing, FEATURES.consultation, FEATURES.website] as const;
export const NAV_PRICING_LABEL = "요금 안내";
export const NAV_DEMO_LABEL = "실제 데모";

/**
 * The landing's films and stills are the asset pack under public/assets/landing/v2 (see lib/media.ts).
 * This one predates the pack: an 86s cut of real product screens, scene by scene, from the visitor's
 * first question to a request in the admin. It is not one take — its form is never sent and the
 * request in the admin is a test one — so the landing calls it a cut, never a recording of one run.
 * (The 15s loop public/video/chat-to-portfolio*.mp4 is kept on disk and no longer rendered.)
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
