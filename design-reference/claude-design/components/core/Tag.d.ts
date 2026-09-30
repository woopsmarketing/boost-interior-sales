import * as React from 'react';
/** Pill chip mirroring the product's portfolio tags (공급 32평 · 부분 리모델링 · 주방). */
export interface TagProps {
  /** neutral = gray-100 · accent = blue-50 (match reason) · outline · inverse */
  tone?: 'neutral' | 'accent' | 'outline' | 'inverse';
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export function Tag(props: TagProps): JSX.Element;
