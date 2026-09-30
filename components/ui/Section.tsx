import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  /** Top padding classes — default 160px desktop / 88px mobile */
  pt?: string;
  /** Bottom padding classes — default 160px desktop / 88px mobile */
  pb?: string;
}

/**
 * Standard marketing section (reference `Sec`): 80px gutter on desktop,
 * 20px on mobile, content capped at 1280px.
 */
export function Section({
  pt = "pt-40 mobile:pt-22",
  pb = "pb-40 mobile:pb-22",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <section {...rest} className={`px-20 mobile:px-5 ${pt} ${pb} ${className}`}>
      <div className="mx-auto max-w-[1280px]">{children}</div>
    </section>
  );
}
