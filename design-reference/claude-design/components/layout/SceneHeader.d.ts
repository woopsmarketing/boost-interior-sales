import * as React from 'react';
/**
 * The repeating scene lockup from every sales capture: blue eyebrow → bold statement ending in "." → gray sub line with "·" separators.
 * @startingPoint section="Layout" subtitle="Eyebrow + statement headline + sub" viewport="700x240"
 */
export interface SceneHeaderProps {
  /** Default "BoostChat". e.g. "BoostChat · 사업자 관리 화면" */
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  size?: 'xl' | 'lg' | 'md';
  align?: 'left' | 'center';
  /** Optional mono step marker, e.g. "03 / 09" */
  step?: string;
  style?: React.CSSProperties;
}
export function SceneHeader(props: SceneHeaderProps): JSX.Element;
