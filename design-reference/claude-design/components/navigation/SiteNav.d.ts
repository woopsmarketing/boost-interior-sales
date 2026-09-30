import * as React from 'react';
/** Marketing top bar: BoostChat wordmark (type only — no logo file exists), anchor links, one blue CTA. Goes solid + blurred after scroll. */
export interface SiteNavProps {
  links?: { label: string; href: string }[];
  cta?: string | null;
  onCta?: () => void;
  active?: string;
  /** true once scrolled past hero */
  solid?: boolean;
  style?: React.CSSProperties;
}
export function SiteNav(props: SiteNavProps): JSX.Element;
