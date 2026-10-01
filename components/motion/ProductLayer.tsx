import Image from "next/image";
import { cropStyles, type Asset } from "@/lib/assets";
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
 * l/t/w place the whole capture; a capture with a `crop` shows that part of it, in place.
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
  const image = {
    src: asset.src,
    width: asset.width,
    height: asset.height,
    alt: decorative ? "" : asset.alt,
    sizes: `${Math.ceil((w / 100) * frameWidth)}px`,
    quality: 85,
    draggable: false,
  };
  const { crop } = asset;
  if (crop) {
    const { box, img } = cropStyles(asset, crop);
    const k = w / asset.width;
    return (
      <figure
        {...data}
        className={`absolute m-0 overflow-hidden ${ELEVATION[elevation]} ${className}`}
        // % margins resolve against the frame's width, which is what the capture is scaled by.
        style={{ left: `${l + crop.x * k}%`, top: `${t}%`, marginTop: `${crop.y * k}%`, width: `${crop.w * k}%`, ...box, ...style }}
      >
        <Image {...image} alt={image.alt} className={`absolute block h-auto select-none ${imgClassName}`} style={img} />
      </figure>
    );
  }
  return (
    <figure
      {...data}
      className={`absolute m-0 ${radius === "none" ? "" : "overflow-hidden"} ${ELEVATION[elevation]} ${RADIUS[radius]} ${className}`}
      style={{ left: `${l}%`, top: `${t}%`, width: `${w}%`, ...style }}
    >
      <Image {...image} alt={image.alt} className={`block h-auto w-full select-none ${imgClassName}`} />
    </figure>
  );
}
