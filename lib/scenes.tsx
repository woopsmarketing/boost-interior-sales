import type { ReactNode } from "react";
import { ASSETS, CAPTURED_CONDITIONS, type Asset } from "./assets";
import type { Motion } from "./motion";

/**
 * Story scene data ported from ui_kits/sales-landing/Scenes.jsx.
 * Layer l/t/w are % of the scene frame (crop origin in the 1600×1000 capture),
 * so the layers re-assemble into the original composite. Motion tracks keep the
 * reference animation ranges: [from, to, progressStart, progressEnd].
 */
export interface SceneLayer {
  asset: Asset;
  l: number;
  t: number;
  w: number;
  elevation: "window" | "float" | "none";
  radius: "lg" | "md" | "none";
  motion: Motion;
  /** Hidden in the finished state or duplicated by another layer — skip alt text. */
  decorative?: boolean;
}

export interface StorySceneData {
  id: string;
  rail: string;
  /** Aspect ratio of the scene frame */
  ar: number;
  eyebrow?: string;
  title: ReactNode;
  sub: ReactNode;
  note?: string;
  /** Memory scene: conditions the AI remembered, shown as chips */
  tags?: readonly string[];
  /** Static composite for mobile and reduced motion */
  composite: Asset;
  layers: readonly SceneLayer[];
}

const FRAME = 1400 / 790;

export const STORY_SCENES: readonly StorySceneData[] = [
  {
    id: "talk",
    rail: "대화",
    ar: FRAME,
    title: "방문자가 평소 말투로 상담을 시작합니다.",
    sub: "평수 · 공사 범위 · 스타일을 대화 속에서 이해합니다.",
    composite: ASSETS.sceneConversation,
    layers: [
      {
        asset: ASSETS.siteHero,
        l: 1.43, t: 4.56, w: 60.7, elevation: "window", radius: "lg",
        motion: { z: [0, -50, 0.1, 0.6], blur: [0, 1.2, 0.3, 0.7] },
      },
      {
        asset: ASSETS.chatWelcome,
        l: 61.4, t: 1.27, w: 35.7, elevation: "none", radius: "none", decorative: true,
        motion: { z: 30, opacity: [1, 0, 0.3, 0.5] },
      },
      {
        asset: ASSETS.chatWidget,
        l: 61.4, t: 1.27, w: 35.7, elevation: "none", radius: "none",
        motion: { z: [30, 50, 0.3, 0.6], y: [2, 0, 0.3, 0.6], opacity: [0, 1, 0.3, 0.5] },
      },
    ],
  },
  {
    id: "recommend",
    rail: "사례 추천",
    ar: FRAME,
    title: "조건에 맞는 우리 업체 시공 사례를 바로 보여줍니다.",
    sub: "지역 · 평형 · 공사 범위가 비슷한 사례를 카드로 추천합니다.",
    composite: ASSETS.scenePortfolio,
    layers: [
      {
        asset: ASSETS.siteFull,
        l: 1.43, t: 4.56, w: 89.1, elevation: "window", radius: "lg",
        motion: { z: [0, -70, 0.1, 0.6], blur: [0, 1.5, 0.2, 0.6] },
      },
      {
        asset: ASSETS.portfolioCard,
        l: 62.9, t: 30.6, w: 28.9, elevation: "float", radius: "lg",
        motion: { y: [18, 0, 0.1, 0.55], z: [0, 70, 0.1, 0.55], opacity: [0, 1, 0.05, 0.35] },
      },
    ],
  },
  {
    id: "viewer",
    rail: "사례 뷰어",
    ar: FRAME,
    title: "상담창을 떠나지 않고 사례를 크게 봅니다.",
    sub: "사진과 평형 · 공사 범위 · 스타일 정보를 한 화면에서 확인합니다.",
    composite: ASSETS.sceneViewer,
    layers: [
      {
        asset: ASSETS.siteFull,
        l: 1.43, t: 4.56, w: 89.1, elevation: "window", radius: "lg", decorative: true,
        motion: { z: -80, blur: [0, 3, 0.05, 0.45], brightness: [1, 0.42, 0.05, 0.45] },
      },
      {
        asset: ASSETS.viewerModal,
        l: 14.6, t: 9.7, w: 62.7, elevation: "float", radius: "md",
        motion: { s: [0.86, 1, 0.1, 0.55], z: [-40, 20, 0.1, 0.55], opacity: [0, 1, 0.05, 0.3] },
      },
      {
        asset: ASSETS.viewerCard,
        l: 71.9, t: 8, w: 34.4, elevation: "float", radius: "lg",
        motion: { x: [10, 0, 0.45, 0.8], z: 80, opacity: [0, 1, 0.45, 0.7] },
      },
    ],
  },
  {
    id: "photos",
    rail: "사진",
    ar: 2,
    title: "사진을 넘기며 시공 결과를 확인합니다.",
    sub: "한 사례의 여러 사진을 상담 중에 바로 넘겨 봅니다.",
    composite: ASSETS.scenePhotos,
    layers: [
      {
        asset: ASSETS.photoSink,
        l: 67.7, t: 2.1, w: 30.7, elevation: "window", radius: "md",
        motion: { x: [-150, 0, 0.15, 0.6], y: [30, 0, 0.15, 0.6], z: [-80, 10, 0.15, 0.6], opacity: [0, 1, 0.1, 0.3] },
      },
      {
        asset: ASSETS.photoBath,
        l: 67.7, t: 52.4, w: 30.7, elevation: "window", radius: "md",
        motion: { x: [-150, 0, 0.25, 0.7], y: [-70, 0, 0.25, 0.7], z: [-80, 10, 0.25, 0.7], opacity: [0, 1, 0.2, 0.4] },
      },
      {
        asset: ASSETS.photoKitchen,
        l: 1.43, t: 2.1, w: 64.3, elevation: "float", radius: "lg",
        motion: { x: [12, 0, 0.1, 0.6], s: [1.04, 1, 0.1, 0.6], z: 20 },
      },
    ],
  },
  {
    id: "memory",
    rail: "맥락 기억",
    ar: FRAME,
    title: "처음부터 다시 설명할 필요가 없습니다.",
    sub: "앞서 말한 지역 · 면적 · 공사 범위를 기억하고 견적 상담을 이어갑니다.",
    tags: CAPTURED_CONDITIONS,
    composite: ASSETS.sceneMemory,
    layers: [
      {
        asset: ASSETS.siteFull,
        l: 1.43, t: 4.56, w: 89.1, elevation: "window", radius: "lg", decorative: true,
        motion: { z: -70, blur: [0, 2, 0.1, 0.5] },
      },
      {
        asset: ASSETS.chatMemory,
        l: 61.4, t: 1.27, w: 35.7, elevation: "none", radius: "none",
        motion: { z: [0, 50, 0.1, 0.5] },
      },
    ],
  },
  {
    id: "inquiry",
    rail: "견적 문의",
    ar: FRAME,
    title: "대화가 견적 문의로 이어집니다.",
    sub: "상담창 안에서 이름 · 연락처 · 문의 내용을 바로 남깁니다.",
    composite: ASSETS.sceneInquiry,
    layers: [
      {
        asset: ASSETS.siteHero,
        l: 1.43, t: 4.56, w: 60.7, elevation: "window", radius: "lg", decorative: true,
        motion: { z: -60, blur: [0, 2, 0.1, 0.5] },
      },
      {
        asset: ASSETS.chatForm,
        l: 61.4, t: 1.27, w: 35.7, elevation: "none", radius: "none",
        motion: { z: [0, 60, 0.1, 0.5], x: [0, -12, 0.1, 0.6] },
      },
    ],
  },
  {
    id: "owner",
    rail: "관리 화면",
    ar: 1400 / 760,
    eyebrow: "BoostChat · 사업자 관리 화면",
    title: "들어온 문의는 한눈에 정리됩니다.",
    sub: (
      <>
        고객에게 다시 처음부터 물어보기 전에,
        <br />
        어떤 공사를 원하는지 먼저 확인하고 연락할 수 있습니다.
      </>
    ),
    note: "화면 속 문의는 촬영용 데모 데이터입니다.",
    composite: ASSETS.sceneDashboard,
    layers: [
      {
        asset: ASSETS.dashboard,
        l: 1.43, t: 2.1, w: 89.1, elevation: "window", radius: "lg",
        motion: { z: [0, -70, 0.1, 0.55], blur: [0, 1.5, 0.2, 0.6] },
      },
      {
        asset: ASSETS.inquiryCard,
        l: 10, t: 10.4, w: 84.5, elevation: "float", radius: "lg",
        motion: { y: [10, 0, 0.1, 0.55], z: [0, 70, 0.1, 0.55], opacity: [0, 1, 0.05, 0.35] },
      },
    ],
  },
];

/** Follows Why — the widget attached to an existing homepage. */
export const INSTALL_SCENE: StorySceneData = {
  id: "install",
  rail: "설치",
  ar: FRAME,
  title: "우리 홈페이지에 AI 상담창이 붙습니다.",
  sub: "기존 홈페이지는 그대로 두고, 방문자는 버튼 하나로 바로 상담을 시작합니다.",
  composite: ASSETS.sceneInstall,
  layers: [
    {
      asset: ASSETS.siteHero,
      l: 1.43, t: 4.56, w: 60.7, elevation: "window", radius: "lg",
      motion: { x: [24, 0, 0.1, 0.55], z: [20, -30, 0.1, 0.6] },
    },
    {
      asset: ASSETS.chatWelcome,
      l: 61.4, t: 1.27, w: 35.7, elevation: "none", radius: "none",
      motion: { x: [-20, 0, 0.3, 0.7], y: [8, 0, 0.3, 0.7], z: [-40, 40, 0.3, 0.7], opacity: [0, 1, 0.3, 0.55] },
    },
  ],
};

/** Mobile scene sits between the story and the demo video. */
export const MOBILE_SCENE = { id: "mobile", rail: "모바일" } as const;

/** Right-edge story rail, in page order. */
export const RAIL = [
  ...STORY_SCENES.map((s) => ({ id: s.id, label: s.rail })),
  { id: MOBILE_SCENE.id, label: MOBILE_SCENE.rail },
  { id: INSTALL_SCENE.id, label: INSTALL_SCENE.rail },
];

/** "02 / 10" — the hero is step 01. */
export function stepLabel(id: string) {
  const i = RAIL.findIndex((r) => r.id === id);
  const pad = (v: number) => String(v).padStart(2, "0");
  return `${pad(i + 2)} / ${pad(RAIL.length + 1)}`;
}
