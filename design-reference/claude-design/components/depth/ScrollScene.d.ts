import * as React from 'react';
/** Pinned scroll scene. Children may be a function of progress 0→1 to scrub depth transforms. One capability per scene. */
export interface ScrollSceneProps {
  /** Scroll length in vh (100 = no pin). 160–240 typical. */
  length?: number;
  id?: string;
  style?: React.CSSProperties;
  stickyStyle?: React.CSSProperties;
  children?: React.ReactNode | ((progress: number) => React.ReactNode);
}
export function ScrollScene(props: ScrollSceneProps): JSX.Element;
