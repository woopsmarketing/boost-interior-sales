import { ASSETS, CAPTURED_CONDITIONS, CHAT_WINDOW, type Asset, type Crop } from "./assets";
import type { Motion } from "./motion";

/**
 * Product visuals of the landing's "작동 방식" steps and of the owner's screen.
 * Each step is drawn twice from the same captures and CSS picks one:
 * - above 820px, `layers`: captures layered on a depth stage. They settle into place while the
 *   stage scrolls into view (see MotionController); the stage itself is never pinned.
 * - at 820px and below, `focus`: one capture cropped to the part that matters, wide enough to read.
 *   A desktop composite scaled down to a phone would not be readable.
 */
export interface SceneLayer {
  asset: Asset;
  /** Position and width of the whole capture, % of the stage (see `at`) */
  l: number;
  t: number;
  w: number;
  elevation: "window" | "float" | "none";
  radius: "lg" | "md" | "none";
  motion: Motion;
  /** Repeats what another layer or the text already says — skip alt text. */
  decorative?: boolean;
}

export interface Stage {
  /** Stage size the layers were composed at, px */
  frame: { w: number; h: number };
  layers: readonly SceneLayer[];
  /** Conditions shown as chips in front of the captures, placed in % of the stage */
  tags?: { label: string; items: readonly string[]; l: number; t: number };
}

export interface Focus {
  asset: Asset;
  /** Rows at the bottom of the crop dissolve instead of ending in a cut */
  fade?: boolean;
  /** Small captures shown in a row under the main one */
  thumbs?: readonly Asset[];
}

const STEP_FRAME = { w: 720, h: 520 };
const OWNER_FRAME = { w: 1400, h: 760 };

const cropped = (asset: Asset, crop: Crop): Asset => ({ ...asset, crop });

/**
 * Place the visible part of a capture at x / y with width w (stage px). ProductLayer positions the
 * whole capture and shows its crop in place, so the crop's offset is taken back out here.
 */
function at(frame: { w: number; h: number }, asset: Asset, x: number, y: number, w: number) {
  const k = w / (asset.crop?.w ?? asset.width);
  return {
    asset,
    l: ((x - (asset.crop?.x ?? 0) * k) / frame.w) * 100,
    t: ((y - (asset.crop?.y ?? 0) * k) / frame.h) * 100,
    w: ((asset.width * k) / frame.w) * 100,
  };
}
const step = (asset: Asset, x: number, y: number, w: number) => at(STEP_FRAME, asset, x, y, w);

/** Captures trimmed to their UI: the margins of the page they were taken on are left out. */
const SITE = cropped(ASSETS.siteHero, { x: 0, y: 1, w: 847, h: 702, r: 12 });
const CASE_CARD = cropped(ASSETS.portfolioCard, { x: 2, y: 2, w: 401, h: 424, r: 14 });
const CASE_INFO = cropped(ASSETS.viewerCard, { x: 4, y: 4, w: 474, h: 287, r: 14 });
/** The viewer's photo pane. Its info pane is shown by CASE_INFO, larger. */
const VIEWER = cropped(ASSETS.viewerModal, { x: 0, y: 0, w: 600, h: 622, r: 12 });
const PHOTO = { x: 1, y: 1, w: 428, h: 320, r: 10 };

/** Entry motion, back to front: each plane starts a little lower and later than the one behind it. */
const BACK: Motion = { unit: "px", y: [28, 0, 0, 0.7], z: -30, opacity: [0, 1, 0, 0.3] };
const FRONT: Motion = { unit: "px", y: [56, 0, 0.12, 0.9], z: [0, 40, 0.12, 0.9], opacity: [0, 1, 0.1, 0.45] };
const TOP: Motion = { unit: "px", y: [72, 0, 0.3, 1], z: [0, 70, 0.3, 1], opacity: [0, 1, 0.28, 0.62] };

/** Steps 1–3 of HOW_STEPS (lib/home.ts), by step id. Step 4 is the owner's screen below. */
export const STEP_VISUALS: Readonly<Record<string, { stage: Stage; focus: Focus }>> = {
  talk: {
    stage: {
      frame: STEP_FRAME,
      layers: [
        { ...step(SITE, 0, 44, 500), elevation: "window", radius: "lg", motion: BACK, decorative: true },
        { ...step(ASSETS.chatWelcome, 390, 28, 330), elevation: "float", radius: "none", motion: FRONT },
      ],
    },
    focus: { asset: cropped(ASSETS.chatWelcome, { ...CHAT_WINDOW, h: 352 }), fade: true },
  },
  recommend: {
    stage: {
      frame: STEP_FRAME,
      layers: [
        { ...step(VIEWER, 300, 8, 420), elevation: "window", radius: "md", motion: BACK },
        { ...step(CASE_CARD, 0, 20, 316), elevation: "float", radius: "lg", motion: FRONT },
        { ...step(cropped(ASSETS.photoSink, PHOTO), 12, 378, 138), elevation: "window", radius: "md", motion: TOP },
        { ...step(cropped(ASSETS.photoBath, PHOTO), 162, 378, 138), elevation: "window", radius: "md", motion: TOP },
        { ...step(CASE_INFO, 452, 352, 268), elevation: "float", radius: "lg", motion: TOP },
      ],
    },
    focus: { asset: CASE_CARD, thumbs: [ASSETS.photoKitchen, ASSETS.photoSink, ASSETS.photoBath] },
  },
  inquiry: {
    stage: {
      frame: STEP_FRAME,
      layers: [
        { ...step(ASSETS.chatMemory, 0, 0, 330), elevation: "window", radius: "none", motion: BACK },
        { ...step(ASSETS.chatForm, 390, 56, 330), elevation: "float", radius: "none", motion: FRONT },
      ],
      tags: { label: "기억한 조건", items: CAPTURED_CONDITIONS, l: 40.5, t: 30 },
    },
    focus: { asset: cropped(ASSETS.chatMemory, { ...CHAT_WINDOW, h: 540 }), fade: true },
  },
};

const owner = (asset: Asset, x: number, y: number, w: number) => at(OWNER_FRAME, asset, x, y, w);

/** The admin: the request list behind, one request in front. Demo data, and the section says so. */
export const OWNER_STAGE: Stage = {
  frame: OWNER_FRAME,
  layers: [
    {
      ...owner(ASSETS.dashboard, 20, 42, 1248),
      elevation: "window",
      radius: "lg",
      motion: { z: [0, -50, 0.05, 0.8], blur: [0, 1.2, 0.2, 0.8] },
      decorative: true,
    },
    {
      asset: ASSETS.inquiryCard,
      l: 10,
      t: 10.4,
      w: 84.5,
      elevation: "float",
      radius: "lg",
      motion: { unit: "px", y: [48, 0, 0.05, 0.8], z: [0, 60, 0.05, 0.8], opacity: [0, 1, 0.05, 0.4] },
    },
  ],
};

/** The same request on a phone: its fields, from "인테리어 상담 정보" down, at a size that reads. */
export const OWNER_FOCUS: Focus = { asset: cropped(ASSETS.inquiryCard, { x: 8, y: 100, w: 452, h: 388, r: 0 }) };
