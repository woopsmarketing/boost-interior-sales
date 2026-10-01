import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onImage" | "dark";
type Size = "sm" | "nav" | "md" | "lg";

interface Common {
  variant?: Variant;
  size?: Size;
  /** Trailing "→" that nudges 2px on hover */
  arrow?: boolean;
  full?: boolean;
  className?: string;
  children: ReactNode;
}

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[14px]",
  nav: "h-10 px-[18px] text-[14px]",
  md: "h-12 px-[22px] text-[16px]",
  lg: "h-14 px-7 text-[17px]",
};

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-white border-transparent hover:bg-accent-hover hover:text-white disabled:bg-accent-disabled",
  secondary:
    "bg-raised text-ink border-line-strong hover:bg-gray-25 hover:text-ink disabled:bg-gray-100 disabled:text-faint",
  ghost: "bg-transparent text-accent border-transparent hover:bg-accent-soft hover:text-accent",
  onImage: "bg-white/96 text-gray-900 border-transparent hover:bg-white hover:text-gray-900",
  dark: "bg-gray-900 text-white border-transparent hover:bg-gray-800 hover:text-white",
};

function classes({ variant = "primary", size = "md", full, className }: Omit<Common, "children">) {
  return [
    "group inline-flex items-center justify-center gap-2 rounded-pill border font-semibold leading-none tracking-[-0.01em] whitespace-nowrap no-underline",
    "transition-[background-color,transform] duration-160 ease-out active:scale-[.98] disabled:cursor-not-allowed disabled:active:scale-100",
    SIZES[size],
    VARIANTS[variant],
    full ? "flex w-full" : "",
    className ?? "",
  ].join(" ");
}

function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block transition-transform duration-160 ease-out group-hover:translate-x-0.5">
      →
    </span>
  );
}

/**
 * Navigation — renders an <a>. External links open in a new tab and say so;
 * site routes ("/pricing") go through next/link, in-page anchors ("#pricing") stay plain.
 */
export function ButtonLink({
  variant,
  size,
  arrow,
  full,
  className,
  children,
  external,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean }) {
  const Anchor = !external && rest.href.startsWith("/") ? Link : "a";
  return (
    <Anchor
      {...rest}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={classes({ variant, size, full, className })}
    >
      {children}
      {arrow && <Arrow />}
      {external && <span className="sr-only"> (새 창에서 열림)</span>}
    </Anchor>
  );
}

/** Actions — renders a <button>. */
export function Button({
  variant,
  size,
  arrow,
  full,
  className,
  children,
  type = "button",
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} type={type} className={classes({ variant, size, full, className })}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
