import { ASSETS, type Asset, type Crop } from "./assets";
import type { Motion } from "./motion";

/**
 * The owner's screen in the landing's consultation section, drawn twice from the same captures; CSS
 * picks one:
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

/**
 * The same request on a phone: its fields, from "인테리어 상담 정보" down to "관심 사례", at a size that
 * reads. The rows under those (an internal case id, the test request's own text) are left out.
 */
export const OWNER_FOCUS: Focus = { asset: cropped(ASSETS.inquiryCard, { x: 8, y: 100, w: 452, h: 192, r: 0 }) };
