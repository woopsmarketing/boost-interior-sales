/**
 * Real product captures (demo tenant "부스트 인테리어") that the landing still draws itself: the chat
 * window of the 실제 데모 block, the admin's request list and one request, and the poster of the 86s
 * recording. Crops come from design-reference/claude-design/assets/product — see HANDOFF.md §3.
 * Everything else on the landing is the asset pack under public/assets/landing/v2 (lib/media.ts).
 * The other `layer-*` / `photo-*` / `scene-*` captures the earlier landings used stay on disk under
 * public/images/product.
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
 */
/** The chat window down to its input row (drops the capture's margins and the strip below). */
export const CHAT_WINDOW: Crop = { x: 7, y: 6, w: 483, h: 679, r: 18 };
/** Desktop composites (1400 × 790) down to the chat input row. */
const COMPOSITE: Crop = { x: 0, y: 0, w: 1400, h: 692, r: 0 };
/** Admin window from the tenant name down. */
const DASHBOARD: Crop = { x: 0, y: 26, w: 1248, h: 677, r: 16 };

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

const p = (file: string, width: number, height: number, alt: string, crop?: Crop): Asset => ({
  src: `/images/product/${file}`,
  width,
  height,
  alt,
  crop,
});

export const ASSETS = {
  chatWidget: p(
    "layer-chat-widget.png",
    500,
    745,
    "대구 32평 아파트 주방·욕실 리모델링 요청에 비슷한 시공사례를 추천하는 BoostInterior 상담창",
    CHAT_WINDOW,
  ),
  dashboard: p("layer-dashboard.png", 1248, 703, "사업자 관리 화면의 상담 요청 목록", DASHBOARD),
  inquiryCard: p(
    "layer-inquiry-card.png",
    1183,
    497,
    "정리된 상담 요청: 고객이 원하는 공사 요약과 지역 · 주거 유형 · 면적 · 공사 범위 · 선호 스타일 · 관심 사례",
  ),

  sceneConversation: p(
    "scene-01-conversation.png",
    1400,
    790,
    "부스트 인테리어 데모 홈페이지와, 방문자 요청에 시공사례를 추천하는 BoostInterior 상담창",
    COMPOSITE,
  ),
} satisfies Record<string, Asset>;
