import * as React from 'react';
/**
 * Pill button. One primary per view; blue is reserved for the main conversion action.
 * @startingPoint section="Core" subtitle="Pill CTA — primary / secondary / ghost / onImage / dark" viewport="700x260"
 */
export interface ButtonProps {
  /** primary = Boost blue CTA · secondary = white w/ border · ghost = blue text · onImage = white pill over photos · dark = navy */
  variant?: 'primary' | 'secondary' | 'ghost' | 'onImage' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  /** Trailing → arrow (product uses literal "→") */
  arrow?: boolean;
  disabled?: boolean;
  full?: boolean;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;
