import * as React from 'react';
/** A real product capture placed on a depth plane. Never substitute a redrawn UI — pass a file from assets/product. */
export interface ProductShotProps {
  src: string;
  alt?: string;
  /** translateZ in px: far −80 … near +60 */
  z?: number;
  x?: number;
  y?: number;
  scale?: number;
  /** Degrees; keep within ±2 */
  rotate?: number;
  /** Background-plane blur, px (≤ 8) */
  blur?: number;
  opacity?: number;
  elevation?: 'none' | 'window' | 'float' | 'device';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'device';
  /** Add white bg + hairline border */
  frame?: boolean;
  /** Absolute by default (inside DepthStage); false for flow layout */
  absolute?: boolean;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}
export function ProductShot(props: ProductShotProps): JSX.Element;
