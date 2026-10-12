/**
 * What a player needs to know about a film. Kept apart from lib/media.ts, which reads the asset
 * pack's manifest: the players run in the browser and should not carry the manifest with them.
 */

/** Up to this width a film plays as its vertical cut (1080 × 1920); a 16:9 film this narrow cannot be read. */
export const PORTRAIT_QUERY = "(max-width: 640px)";

export interface Clip {
  src: string;
  /** JPEG poster. next/image serves it as WebP where the browser takes it, and as JPEG where not. */
  poster: string;
  width: number;
  height: number;
  seconds: number;
}

export interface Film extends Clip {
  id: string;
  /** The vertical cut of the same film, re-staged for a phone */
  portrait?: Clip;
  /** What the screens in it are (demo company, AI-made photos …). Shown as text next to the player. */
  note: string;
}

export interface Still {
  id: string;
  /** JPEG source, served the same way as a poster */
  src: string;
  width: number;
  height: number;
  alt: string;
  note: string;
}

/** 29.2 → "0:29", 31.8 → "0:32": to the nearest second, as the product's own screens state a length. */
export function clock(seconds: number) {
  const whole = Math.round(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}
