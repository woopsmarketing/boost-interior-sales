import * as React from 'react';
/** Scroll-story progress indicator (conversation → portfolio → photos → memory → inquiry → owner → mobile → install). */
export interface StoryRailProps {
  steps: string[];
  current?: number;
  onSelect?: (index: number) => void;
  /** vertical shows labels; horizontal is bars only (mobile) */
  orientation?: 'vertical' | 'horizontal';
  style?: React.CSSProperties;
}
export function StoryRail(props: StoryRailProps): JSX.Element;
