import * as React from 'react';
/**
 * Perspective container for 2.5D product scenes. Children using ProductShot's `z` sit on depth planes; cursor tilt is capped (default 1.5°) and auto-disabled on touch and reduced-motion.
 * @startingPoint section="Depth" subtitle="Perspective stage with ≤1.5° cursor tilt + layered product shots" viewport="700x340"
 */
export interface DepthStageProps {
  /** Max tilt in degrees; 0 disables. Never exceed 2. */
  tilt?: number;
  perspective?: number;
  height?: number | string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export function DepthStage(props: DepthStageProps): JSX.Element;
