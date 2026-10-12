import Link from "next/link";
import type { ReactNode } from "react";

const SIZE = { md: "text-[16px]", sm: "text-[15px]" } as const;

const TONE = {
  light: "text-link",
  dark: "text-blue-300 hover:text-white",
} as const;

/**
 * "자세히 알아보기 →" — a text link to another page or to a block of this one. The arrow nudges on
 * hover; the row is 44px tall so it is a fair target on a phone.
 */
export function MoreLink({
  href,
  children,
  tone = "light",
  size = "md",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: keyof typeof TONE;
  size?: keyof typeof SIZE;
  /** Opens in a new tab, and says so */
  external?: boolean;
  className?: string;
}) {
  const classes = `group inline-flex min-h-11 items-center gap-1.5 ${SIZE[size]} leading-[1.4] font-semibold no-underline ${TONE[tone]} ${className}`;
  const body = (
    <>
      <span className="underline-offset-4 group-hover:underline">{children}</span>
      <span aria-hidden="true" className="transition-transform duration-160 ease-out group-hover:translate-x-0.5">
        →
      </span>
    </>
  );
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {body}
        <span className="sr-only"> (새 창에서 열림)</span>
      </a>
    );
  if (href.startsWith("#"))
    return (
      <a href={href} className={classes}>
        {body}
      </a>
    );
  return (
    <Link href={href} className={classes}>
      {body}
    </Link>
  );
}
