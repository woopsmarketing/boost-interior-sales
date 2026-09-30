import type { HTMLAttributes, ReactNode } from "react";

type Size = "xl" | "lg" | "md";

const TITLE: Record<Size, string> = {
  xl: "text-[clamp(40px,5.2vw,72px)]",
  lg: "text-[clamp(30px,3.9vw,56px)]",
  md: "text-[clamp(26px,2.8vw,40px)]",
};

interface Props extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Blue eyebrow; default "BoostChat" */
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  size?: Size;
  align?: "left" | "center";
  /** Mono step marker, e.g. "03 / 10" */
  step?: string;
  as?: "h1" | "h2";
  titleId?: string;
  /** Extra classes for the heading (e.g. a mobile size override) */
  titleClassName?: string;
  /** Extra classes for the sub line */
  subClassName?: string;
}

/** Eyebrow → bold statement ending in "." → gray sub line with "·" separators. */
export function SceneHeader({
  eyebrow = "BoostChat",
  title,
  sub,
  size = "lg",
  align = "left",
  step,
  as: Heading = "h2",
  titleId,
  titleClassName = "",
  subClassName = "",
  className = "",
  ...rest
}: Props) {
  const center = align === "center";
  return (
    <header
      {...rest}
      className={`${center ? "mx-auto max-w-[880px] text-center" : "max-w-[780px]"} ${className}`}
    >
      <p
        className={`m-0 flex items-center gap-2.5 text-[15px] leading-[1.4] font-bold text-accent ${center ? "justify-center" : ""}`}
      >
        {step && <span className="font-mono text-[13px] leading-none font-medium text-muted">{step}</span>}
        <span>{eyebrow}</span>
      </p>
      <Heading
        id={titleId}
        className={`mt-3 mb-0 leading-[1.2] font-bold tracking-[-0.035em] text-balance text-ink ${TITLE[size]} ${titleClassName}`}
      >
        {title}
      </Heading>
      {sub && (
        <p className={`mt-4 mb-0 text-[20px] leading-[1.6] tracking-[-0.01em] text-pretty text-muted ${subClassName}`}>
          {sub}
        </p>
      )}
    </header>
  );
}
