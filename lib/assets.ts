/**
 * Real product captures (demo tenant "부스트 인테리어").
 * Crops come from design-reference/claude-design/assets/product — see HANDOFF.md §3.
 * `scene-*` are full composites (used for mobile / reduced motion);
 * `layer-*` / `photo-*` are the depth layers for the desktop story.
 */
export interface Asset {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Show only this part of the capture. */
  crop?: Crop;
}

/** Part of a capture to show (capture px) and the corner radius of the UI at that size. */
export interface Crop {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
}

/*
 * The captures were taken on the chat platform BoostInterior runs on, and two strips in them
 * carry that platform's own name: the "Powered by" line under the chat input and the label
 * above the tenant name in the admin sidebar. The page presents one product name, so those
 * strips are cropped out. Nothing is painted over — the pixels that remain are untouched.
 * (The phone captures have the same line inside the device frame; see `PHONE_FADE`.)
 */
/** The chat window down to its input row (drops the capture's margins and the strip below). */
export const CHAT_WINDOW: Crop = { x: 7, y: 6, w: 483, h: 679, r: 18 };
/** Desktop composites (1400 × 790) down to the chat input row. */
const COMPOSITE: Crop = { x: 0, y: 0, w: 1400, h: 692, r: 0 };
/** Admin window from the tenant name down. */
const DASHBOARD: Crop = { x: 0, y: 26, w: 1248, h: 677, r: 16 };
const DASHBOARD_COMPOSITE: Crop = { x: 0, y: 42, w: 1360, h: 718, r: 0 };

/**
 * Phone captures (380 × 788): there the line sits inside the device frame, where a crop would
 * cut the phone itself, so the last rows of the screen dissolve instead. Tailwind classes.
 */
export const PHONE_FADE = "[mask-image:linear-gradient(to_bottom,#000_84%,transparent_95%)]";
/** The same rows in the two-phone composite (860 × 830). */
export const PHONE_COMPOSITE_FADE = "[mask-image:linear-gradient(to_bottom,#000_81.5%,transparent_92.5%)]";

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/** Styles for a clipping box (`overflow: hidden`, positioned) and the capture inside it. */
export function cropStyles(asset: Asset, crop: Crop) {
  return {
    box: {
      aspectRatio: `${crop.w} / ${crop.h}`,
      borderRadius: crop.r ? `${pct(crop.r, crop.w)} / ${pct(crop.r, crop.h)}` : undefined,
    },
    img: {
      width: pct(asset.width, crop.w),
      maxWidth: "none",
      left: pct(-crop.x, crop.w),
      top: pct(-crop.y, crop.h),
    },
  } as const;
}

/**
 * The visitor's conditions in the captured demo conversation, as the chat restates them
 * ("대구 32평 아파트 … 주방·욕실 … 화이트톤"). Shown as chips next to the captures.
 */
export const CAPTURED_CONDITIONS = ["대구", "아파트 · 공급 32평", "주방 · 욕실", "화이트"] as const;

const p = (file: string, width: number, height: number, alt: string, crop?: Crop): Asset => ({
  src: `/images/product/${file}`,
  width,
  height,
  alt,
  crop,
});

export const ASSETS = {
  siteHero: p("layer-site-hero.png", 850, 703, "부스트 인테리어 데모 홈페이지 첫 화면"),
  siteFull: p("layer-site-full.png", 1248, 703, "부스트 인테리어 데모 홈페이지"),
  chatWelcome: p("layer-chat-welcome.png", 500, 745, "BoostInterior 상담창의 첫 인사 메시지", CHAT_WINDOW),
  chatWidget: p(
    "layer-chat-widget.png",
    500,
    745,
    "대구 32평 아파트 주방·욕실 리모델링 요청에 비슷한 시공 사례를 추천하는 BoostInterior 상담창",
    CHAT_WINDOW,
  ),
  chatMemory: p(
    "layer-chat-memory.png",
    500,
    745,
    "앞서 말한 조건을 기억하고 견적 상담을 이어가는 BoostInterior 상담창",
    CHAT_WINDOW,
  ),
  chatForm: p(
    "layer-chat-form.png",
    500,
    745,
    "상담창 안에 표시된 이름·연락처·문의 내용 입력 양식",
    CHAT_WINDOW,
  ),
  portfolioCard: p(
    "layer-portfolio-card.png",
    405,
    428,
    "추천 시공 사례 카드: 32평 주방·욕실 중심 리뉴얼, 대구 북구 · 공급 32평",
  ),
  viewerModal: p("layer-viewer-modal.png", 878, 622, "상담창에서 연 시공 사례 사진 뷰어"),
  viewerCard: p(
    "layer-viewer-card.png",
    482,
    295,
    "사례 A 정보: 32평 주방·욕실 중심 리뉴얼, 공급 32평 · 부분 리모델링 · 주방 · 욕실 · 화이트 · 모던",
  ),
  photoKitchen: p("photo-kitchen.png", 900, 674, "사례 사진: 화이트 톤 주방"),
  photoSink: p("photo-sink.png", 430, 322, "사례 사진: 싱크대와 타일 벽"),
  photoBath: p("photo-bath.png", 430, 322, "사례 사진: 욕실"),
  dashboard: p("layer-dashboard.png", 1248, 703, "사업자 관리 화면의 상담 요청 목록", DASHBOARD),
  inquiryCard: p(
    "layer-inquiry-card.png",
    1183,
    497,
    "정리된 상담 요청: 고객이 원하는 공사 요약과 지역 · 주거 유형 · 면적 · 공사 범위 · 선호 스타일 · 관심 사례",
  ),
  phoneChat: p("layer-phone-chat.png", 380, 788, "휴대폰 화면에서 열린 BoostInterior 상담창"),
  phoneViewer: p("layer-phone-viewer.png", 380, 788, "휴대폰 화면 전체로 열린 시공 사례 뷰어"),

  sceneConversation: p(
    "scene-01-conversation.png",
    1400,
    790,
    "부스트 인테리어 데모 홈페이지와, 방문자 요청에 시공 사례를 추천하는 BoostInterior 상담창",
    COMPOSITE,
  ),
  scenePortfolio: p(
    "scene-02-portfolio.png",
    1320,
    690,
    "데모 홈페이지 위에 표시된 추천 시공 사례 카드",
  ),
  sceneViewer: p(
    "scene-03-viewer.png",
    1520,
    760,
    "상담창을 떠나지 않고 연 시공 사례 사진 뷰어와 사례 정보",
  ),
  scenePhotos: p("scene-04-photos.png", 1420, 720, "한 시공 사례의 주방 · 싱크대 · 욕실 사진"),
  sceneMemory: p(
    "scene-05-memory.png",
    1400,
    790,
    "앞서 말한 지역 · 면적 · 공사 범위를 기억하고 견적 상담을 이어가는 상담창",
    COMPOSITE,
  ),
  sceneInquiry: p(
    "scene-06-inquiry.png",
    1400,
    790,
    "상담창 안에서 바로 남기는 견적 문의 양식",
    COMPOSITE,
  ),
  sceneDashboard: p(
    "scene-07-dashboard.png",
    1360,
    760,
    "사업자 관리 화면에 정리된 상담 요청 상세",
    DASHBOARD_COMPOSITE,
  ),
  sceneMobile: p(
    "scene-08-mobile.png",
    860,
    830,
    "휴대폰에서 화면 전체로 열린 상담창과 시공 사례 뷰어",
  ),
  sceneInstall: p(
    "scene-09-install.png",
    1400,
    790,
    "기존 인테리어 홈페이지 옆에 열린 BoostInterior 상담창",
    COMPOSITE,
  ),
} satisfies Record<string, Asset>;
