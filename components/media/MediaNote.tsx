import type { ReactNode } from "react";

const TONE = { light: "text-muted", dark: "text-gray-400" } as const;
/** `body` is for a note that is the only disclosure its asset has (the product-made reels): the pack asks for 14px or more. */
const SIZE = { note: "text-[13px]", body: "text-[14px]" } as const;

/**
 * What the screens and photos in the film or still above it are: a demo company, AI-made example
 * photos, a staged time. It sits right under the asset in text a phone can read — the same line
 * inside the asset is too small there.
 */
export function MediaNote({
  children,
  tone = "light",
  size = "note",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof TONE;
  size?: keyof typeof SIZE;
  className?: string;
}) {
  // "전·후" is one word: a word joiner on each side of the dot keeps a narrow column from splitting it.
  const text = typeof children === "string" ? children.replace(/(\S)·(\S)/g, "$1⁠·⁠$2") : children;
  return <p className={`m-0 ${SIZE[size]} leading-[1.6] text-pretty ${TONE[tone]} ${className}`}>{text}</p>;
}
