import Image from "next/image";
import type { CSSProperties } from "react";
import { DepthStage } from "@/components/motion/DepthStage";
import { ProductLayer } from "@/components/motion/ProductLayer";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { cropStyles, type Asset } from "@/lib/assets";
import { motionProps, type Motion } from "@/lib/motion";
import { stepLabel, type StorySceneData } from "@/lib/scenes";

const HEADER_MOTION: Motion = { opacity: [0.7, 1, 0, 0.12] };

/**
 * One product scene of the scroll story.
 * - pinned (desktop, motion allowed): 210vh section, sticky 100vh stage, layers scrubbed by scroll.
 * - unpinned (≤820px or reduced motion): header + the static composite capture in normal flow.
 * Both variants are server-rendered; CSS media queries pick one, so there is no layout swap on hydration.
 */
export function StoryScene({ scene }: { scene: StorySceneData }) {
  const titleId = `${scene.id}-title`;
  const header = motionProps(HEADER_MOTION);
  return (
    <section id={scene.id} data-scene aria-labelledby={titleId} className="relative pinned:h-[210vh]">
      <div className="pinned:sticky pinned:top-0 pinned:h-screen pinned:overflow-hidden">
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col px-20 pt-24 pb-6 unpinned:pt-30 unpinned:pb-0 mobile:px-5 mobile:pt-18">
          <div data-reveal="unpinned">
            <SceneHeader
              {...header}
              step={stepLabel(scene.id)}
              eyebrow={scene.eyebrow}
              title={scene.title}
              sub={scene.sub}
              titleId={titleId}
              titleClassName="mobile:text-[26px]"
            />
          </div>

          {/* Desktop depth stage — fills the space left under the header (container query height). */}
          <div className="mt-10 min-h-0 flex-1 [container-type:size] unpinned:hidden">
            <div
              className="relative aspect-(--ar) w-[min(100%,calc(100cqh*var(--ar)))]"
              style={{ "--ar": scene.ar } as CSSProperties}
            >
              <DepthStage>
                {scene.layers.map((layer, i) => (
                  <ProductLayer key={i} {...layer} />
                ))}
                {scene.tags && <RememberedTags tags={scene.tags} />}
              </DepthStage>
            </div>
          </div>

          {/* Static composite — mobile and reduced motion. */}
          <div data-reveal="unpinned" className="mt-12 hidden unpinned:block desktop-static:pr-12 mobile:mt-7">
            <Composite asset={scene.composite} />
          </div>

          {scene.note && (
            <p className="m-0 text-[13px] leading-[1.5] text-muted pinned:absolute pinned:right-20 pinned:bottom-6 unpinned:mt-3">
              {scene.note}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/** The scene as one capture, cropped to `asset.crop` when it has one. */
function Composite({ asset }: { asset: Asset }) {
  const image = {
    src: asset.src,
    width: asset.width,
    height: asset.height,
    alt: asset.alt,
    sizes: "(max-width: 820px) calc(100vw - 40px), 1280px",
    quality: 85,
  };
  const { crop } = asset;
  if (!crop) {
    return <Image {...image} alt={image.alt} className="block h-auto w-full rounded-md" style={{ maxWidth: asset.width }} />;
  }
  const { box, img } = cropStyles(asset, crop);
  return (
    <div className="relative overflow-hidden rounded-md" style={{ ...box, maxWidth: crop.w }}>
      <Image {...image} alt={image.alt} className="absolute block h-auto" style={img} />
    </div>
  );
}

/** Memory scene: the conditions the AI kept, stacked in front of the capture. */
function RememberedTags({ tags }: { tags: readonly string[] }) {
  const label = motionProps({ opacity: [0, 1, 0.2, 0.35] });
  return (
    <div
      className="absolute top-[28%] left-[44%] flex flex-col items-end gap-3"
      style={{ transform: "translateZ(90px)" }}
    >
      <span {...label} aria-hidden="true" className="text-[13px] leading-none font-semibold text-muted">
        기억한 조건
      </span>
      <ul className="m-0 flex list-none flex-col items-end gap-3 p-0" aria-label="기억한 조건">
        {tags.map((tag, i) => {
          const a = 0.25 + i * 0.1;
          const m = motionProps({ x: [16, 0, a, a + 0.2], unit: "px", opacity: [0, 1, a, a + 0.15] });
          return (
            <li
              key={tag}
              {...m}
              className={`inline-flex h-8 items-center rounded-pill px-[13px] text-[14px] leading-none font-medium whitespace-nowrap shadow-md ${
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
