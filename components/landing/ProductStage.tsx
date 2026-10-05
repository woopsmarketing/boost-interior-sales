import Image from "next/image";
import { DepthStage } from "@/components/motion/DepthStage";
import { ProductLayer } from "@/components/motion/ProductLayer";
import { cropStyles } from "@/lib/assets";
import { motionProps } from "@/lib/motion";
import type { Focus, Stage } from "@/lib/scenes";

/**
 * Real captures layered on a depth stage, in normal page flow. On desktop with motion allowed the
 * MotionController settles the layers into place as the stage scrolls into view; everywhere else
 * they are simply in their finished state, which is also what the server renders.
 */
export function StageView({
  stage,
  frameWidth,
  className = "",
}: {
  stage: Stage;
  /** Largest rendered width of the stage, for the captures' `sizes` */
  frameWidth: number;
  className?: string;
}) {
  const { frame, layers, tags } = stage;
  return (
    <div data-scene className={`relative w-full ${className}`} style={{ aspectRatio: `${frame.w} / ${frame.h}` }}>
      <DepthStage>
        {layers.map((layer, i) => (
          <ProductLayer key={i} {...layer} frameWidth={frameWidth} />
        ))}
        {tags && <Tags {...tags} />}
      </DepthStage>
    </div>
  );
}

/** Conditions the chat kept, stacked in front of the captures. */
function Tags({ label, items, l, t }: NonNullable<Stage["tags"]>) {
  const head = motionProps({ opacity: [0, 1, 0.35, 0.55] });
  return (
    <div className="absolute flex flex-col items-center gap-2.5" style={{ left: `${l}%`, top: `${t}%`, transform: "translateZ(80px)" }}>
      <span {...head} aria-hidden="true" className="text-[13px] leading-none font-semibold text-muted">
        {label}
      </span>
      <ul className="m-0 flex list-none flex-col items-center gap-2.5 p-0" aria-label={label}>
        {items.map((tag, i) => {
          const a = 0.4 + i * 0.1;
          const m = motionProps({ y: [14, 0, a, a + 0.25], unit: "px", opacity: [0, 1, a, a + 0.2] });
          return (
            <li
              key={tag}
              {...m}
              className={`inline-flex h-8 items-center rounded-pill px-[13px] text-[14px] leading-none font-medium whitespace-nowrap shadow-md narrow:h-7 narrow:px-2.5 narrow:text-[12px] ${
                i === 0 ? "bg-accent-soft text-blue-700" : "bg-white text-body"
              }`}
            >
              {tag}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** One capture cropped to the part that matters: what a phone shows instead of the layered stage. */
export function FocusView({ focus, className = "" }: { focus: Focus; className?: string }) {
  const { asset, fade, thumbs } = focus;
  const { crop } = asset;
  // A cropped capture is drawn wider than its box, by as much as the crop leaves out: ask for that width.
  const zoom = crop ? asset.width / crop.w : 1;
  const image = {
    src: asset.src,
    width: asset.width,
    height: asset.height,
    alt: asset.alt,
    sizes: `(max-width: 480px) calc((100vw - 40px) * ${zoom.toFixed(2)}), ${Math.round(440 * zoom)}px`,
    quality: 85,
  };
  return (
    <div className={`max-w-[440px] ${className}`}>
      {/* The shadow sits on the wrapper: a mask on the capture itself would cut its own shadow off. */}
      <div className="[filter:drop-shadow(0_10px_24px_rgba(16,24,40,.12))]">
        {crop ? (
          <div
            className={`relative overflow-hidden ${fade ? "[mask-image:linear-gradient(to_bottom,#000_70%,transparent)]" : ""}`}
            style={cropStyles(asset, crop).box}
          >
            <Image {...image} alt={image.alt} className="absolute block h-auto" style={cropStyles(asset, crop).img} />
          </div>
        ) : (
          <Image {...image} alt={image.alt} className="block h-auto w-full rounded-md" />
        )}
      </div>
      {thumbs && (
        <ul className="mt-3 mb-0 grid list-none grid-cols-3 gap-2 p-0">
          {thumbs.map((thumb) => (
            <li key={thumb.src} className="relative aspect-[4/3] overflow-hidden rounded-md shadow-sm">
              <Image src={thumb.src} alt={thumb.alt} fill sizes="(max-width: 480px) 33vw, 146px" quality={75} className="object-cover" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
