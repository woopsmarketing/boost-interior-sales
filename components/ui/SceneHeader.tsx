import type { HTMLAttributes, ReactNode } from "react";
import { SITE_NAME } from "@/lib/site";

type Size = "xl" | "lg" | "md";

const TITLE: Record<Size, string> = {
  xl: "text-[clamp(40px,5.2vw,72px)]",
  lg: "text-[clamp(30px,3.9vw,56px)]",
  md: "text-[clamp(26px,2.8vw,40px)]",
};

/** The sub line: 20px under a section's statement, 17px where the header sits in a card or beside a figure. */
const SUB = { lg: "text-[20px]", md: "text-[17px]" } as const;

/** `dark` is for a header set on the page's dark band. */
const TONE = {
  light: { eyebrow: "text-accent", title: "text-ink", sub: "text-muted" },
  dark: { eyebrow: "text-blue-300", title: "text-white", sub: "text-gray-300" },
} as const;

interface Props extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Blue eyebrow; default is the product name */
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  size?: Size;
  align?: "left" | "center";
  tone?: keyof typeof TONE;
  /** Mono step marker, e.g. "03 / 10" */
  step?: string;
  as?: "h1" | "h2";
  titleId?: string;
  /** Extra classes for the heading (e.g. a mobile size override) */
  titleClassName?: string;
  /** Extra classes for the sub line */
  subClassName?: string;
  subSize?: keyof typeof SUB;
}

/** Eyebrow → bold statement ending in "." → gray sub line with "·" separators. */
export function SceneHeader({
  eyebrow = SITE_NAME,
  title,
  sub,
  size = "lg",
  align = "left",
  tone = "light",
  step,
  as: Heading = "h2",
  titleId,
  titleClassName = "",
  subClassName = "",
  subSize = "lg",
  className = "",
  ...rest
}: Props) {
  const center = align === "center";
  const color = TONE[tone];
  return (
    <header
      {...rest}
      className={`${center ? "mx-auto max-w-[880px] text-center" : "max-w-[780px]"} ${className}`}
    >
      <p
        className={`m-0 flex items-center gap-2.5 text-[15px] leading-[1.4] font-bold ${color.eyebrow} ${center ? "justify-center" : ""}`}
      >
        {step && <span className="font-mono text-[13px] leading-none font-medium text-muted">{step}</span>}
        <span className="text-balance">{eyebrow}</span>
      </p>
      <Heading
        id={titleId}
        className={`mt-3 mb-0 leading-[1.2] font-bold tracking-[-0.035em] text-balance ${color.title} ${TITLE[size]} ${titleClassName}`}
      >
        {title}
      </Heading>
      {sub && (
        <p className={`mt-4 mb-0 ${SUB[subSize]} leading-[1.6] tracking-[-0.01em] text-pretty ${color.sub} ${subClassName}`}>
          {sub}
        </p>
      )}
    </header>
  );
}
