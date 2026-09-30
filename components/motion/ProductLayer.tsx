import Image from "next/image";
import type { Asset } from "@/lib/assets";
import { motionProps, type Motion } from "@/lib/motion";

const ELEVATION = {
  none: "",
  window: "shadow-window",
  float: "shadow-float",
} as const;

const RADIUS = {
  none: "",
  md: "rounded-md",
  lg: "rounded-lg",
} as const;

/** Largest rendered width of a story visual (page max 1440 − 2 × 80 gutter). */
const VISUAL_MAX = 1280;

/**
 * A real product capture on a Z plane inside a DepthStage (reference `ProductShot`).
 * Positioned in % of the scene frame; transform/filter/opacity are scroll-scrubbed.
 */
export function ProductLayer({
  asset,
  l,
  t,
  w,
  elevation = "window",
  radius = "lg",
  motion,
  decorative = false,
  frameWidth = VISUAL_MAX,
  className = "",
  imgClassName = "",
}: {
  asset: Asset;
  l: number;
  t: number;
  w: number;
  elevation?: keyof typeof ELEVATION;
  radius?: keyof typeof RADIUS;
  motion: Motion;
  decorative?: boolean;
  /** Max rendered width of the parent frame, for `sizes` */
  frameWidth?: number;
  className?: string;
  imgClassName?: string;
}) {
  const { style, ...data } = motionProps(motion);
  return (
    <figure
      {...data}
      className={`absolute m-0 ${radius === "none" ? "" : "overflow-hidden"} ${ELEVATION[elevation]} ${RADIUS[radius]} ${className}`}
      style={{ left: `${l}%`, top: `${t}%`, width: `${w}%`, ...style }}
    >
      <Image
        src={asset.src}
        width={asset.width}
        height={asset.height}
        alt={decorative ? "" : asset.alt}
        sizes={`${Math.ceil((w / 100) * frameWidth)}px`}
        quality={85}
        draggable={false}
        className={`block h-auto w-full select-none ${imgClassName}`}
      />
    </figure>
  );
}
