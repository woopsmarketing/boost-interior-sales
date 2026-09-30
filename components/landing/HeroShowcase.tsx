"use client";

import Image, { getImageProps } from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { preload } from "react-dom";
import { DepthStage } from "@/components/motion/DepthStage";
import { ASSETS, CAPTURED_CONDITIONS, type Asset } from "@/lib/assets";

/** Layers are placed in px of the 600 × 640 frame they were composed at, rendered as %. */
const FRAME = { w: 600, h: 640 };
const SPLIT = "(min-width: 1024px)";

const STEPS = ["자연어 상담", "시공사례 추천", "사진 확인", "견적 문의"] as const;

/** Part of a capture to show (capture px, trims the baked-in margins) and the UI's own corner radius. */
interface Crop {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
}

interface Shot {
  asset: Asset;
  crop: Crop;
  l: number;
  t: number;
  w: number;
  /** Steps (0-based) the capture is shown in */
  steps: readonly number[];
  shadow: "shadow-window" | "shadow-float";
  /** Depth for the cursor tilt, px */
  z: number;
}

const CHAT_CROP: Crop = { x: 7, y: 6, w: 483, h: 728, r: 18 };
const CHAT_BOX = { l: 236, t: 0, w: 364 };

const SHOTS: readonly Shot[] = [
  {
    asset: ASSETS.siteHero,
    crop: { x: 0, y: 1, w: 847, h: 702, r: 12 },
    l: 0, t: 44, w: 432,
    steps: [0, 1, 2, 3], shadow: "shadow-window", z: -30,
  },
  { asset: ASSETS.chatWidget, crop: CHAT_CROP, ...CHAT_BOX, steps: [0, 1, 2], shadow: "shadow-float", z: 0 },
  { asset: ASSETS.chatMemory, crop: CHAT_CROP, ...CHAT_BOX, steps: [3], shadow: "shadow-float", z: 0 },
  {
    asset: ASSETS.portfolioCard,
    crop: { x: 2, y: 2, w: 401, h: 424, r: 14 },
    l: 40, t: 356, w: 236,
    steps: [1], shadow: "shadow-float", z: 40,
  },
  {
    asset: ASSETS.photoKitchen,
    crop: { x: 1, y: 1, w: 898, h: 672, r: 24 },
    l: 0, t: 316, w: 372,
    steps: [2], shadow: "shadow-float", z: 40,
  },
  {
    asset: ASSETS.viewerCard,
    crop: { x: 4, y: 4, w: 474, h: 287, r: 14 },
    l: 232, t: 478, w: 256,
    steps: [2], shadow: "shadow-float", z: 60,
  },
];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * Hero product showcase (desktop, ≥1024px): real BoostChat captures on the demo homepage,
 * cycling 자연어 상담 → 시공사례 추천 → 사진 확인 → 견적 문의 with a slow crossfade.
 * The active step's CSS progress bar is the timer — its animationend advances the step,
 * so pausing is just `animation-play-state`. Rotation holds on hover, focus, offscreen and
 * on the pause button; with reduced motion there is no bar animation, so step 1 stays.
 * Only step 1's captures are in the server HTML; the others mount once the page is idle.
 */
export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [armed, setArmed] = useState(false);
  const [announce, setAnnounce] = useState("");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);

    // Later steps' captures: fetch after the page has loaded, and only where the showcase shows.
    const wide = window.matchMedia(SPLIT);
    let idle = 0;
    const arm = () => {
      if (!wide.matches) return;
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
      idle = ric(() => setArmed(true));
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    wide.addEventListener("change", arm);
    return () => {
      io.disconnect();
      window.removeEventListener("load", arm);
      wide.removeEventListener("change", arm);
      (window.cancelIdleCallback ?? window.clearTimeout)(idle);
    };
  }, []);

  const running = inView && !paused && !hover && !focused;

  const select = (i: number) => {
    setArmed(true);
    setActive(i);
    setAnnounce(`${i + 1}단계 ${STEPS[i]}`);
  };

  const onPointer = (e: PointerEvent, over: boolean) => {
    if (e.pointerType === "mouse") setHover(over);
  };

  return (
    <div
      ref={root}
      className="w-full"
      onPointerEnter={(e) => onPointer(e, true)}
      onPointerLeave={(e) => onPointer(e, false)}
      // Keyboard focus holds the rotation; a mouse click on a step doesn't.
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <div
        className="relative ml-auto aspect-[600/640] w-[min(100%,calc((100svh-236px)*600/640))] [container-type:inline-size]"
        role="group"
        aria-roledescription="제품 화면 미리보기"
        aria-label={`BoostChat 실제 상담 화면 — ${active + 1}단계 ${STEPS[active]}`}
      >
        <DepthStage>
          <div data-hero-parallax className="preserve-3d relative size-full">
            {SHOTS.map((shot) => {
              const first = shot.steps.includes(0);
              if (!first && !armed) return null;
              return <Capture key={shot.asset.src} shot={shot} on={shot.steps.includes(active)} first={first} />;
            })}
            <Conditions step={active} />
          </div>
        </DepthStage>
      </div>

      <div className="mt-6 ml-auto flex w-[min(100%,calc((100svh-236px)*600/640))] items-start gap-4">
        <ol aria-label="BoostChat 상담 흐름" className="m-0 grid flex-1 list-none grid-cols-4 gap-3 p-0">
          {STEPS.map((label, i) => {
            const current = i === active;
            return (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-current={current ? "step" : undefined}
                  className="group block w-full cursor-pointer border-0 bg-transparent p-0 pt-1 text-left"
                >
                  <span className="block h-[3px] overflow-hidden rounded-pill bg-gray-200">
                    {current && (
                      <span
                        key={active}
                        onAnimationEnd={() => setActive((a) => (a + 1) % STEPS.length)}
                        style={{ animationPlayState: running ? "running" : "paused" }}
                        className="block h-full origin-left bg-accent motion-safe:animate-showcase-progress"
                      />
                    )}
                  </span>
                  <span className="mt-2.5 flex items-baseline gap-1.5 narrow:flex-col narrow:items-start narrow:gap-1">
                    <span className="font-mono text-[12px] leading-none font-medium text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[14px] leading-[1.3] font-semibold whitespace-nowrap transition-colors narrow:text-[13px] duration-280 ease-out group-hover:text-ink ${
                        current ? "text-ink" : "text-muted"
                      }`}
                    >
                      {label}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "화면 자동 전환 재생" : "화면 자동 전환 일시정지"}
          className="grid size-8 flex-none cursor-pointer place-items-center rounded-pill border-0 bg-white text-gray-900 shadow-hairline transition-[background-color,transform] duration-160 ease-out hover:bg-gray-25 active:scale-[.96] motion-reduce:hidden"
        >
          {paused ? (
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 14 14" className="ml-0.5">
              <path d="M3 1.8v10.4a.6.6 0 0 0 .92.5l8.1-5.2a.6.6 0 0 0 0-1L3.92 1.3A.6.6 0 0 0 3 1.8Z" fill="currentColor" />
            </svg>
          ) : (
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 14 14">
              <rect x="2.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
              <rect x="8.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {announce}
      </p>
    </div>
  );
}

/** One real capture, cropped to its UI (the captures carry margins from the page they were taken on). */
function Capture({ shot, on, first }: { shot: Shot; on: boolean; first: boolean }) {
  const { asset, crop } = shot;
  const image = {
    src: asset.src,
    width: asset.width,
    height: asset.height,
    alt: asset.alt,
    sizes: `${Math.ceil((shot.w * asset.width) / crop.w)}px`,
    quality: 85,
  };
  // The first chat capture is the desktop LCP. Preload it for desktop only: on smaller
  // screens the showcase is display:none and its (lazy) images are never fetched.
  if (first && shot.z === 0) {
    const { props } = getImageProps(image);
    preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes, fetchPriority: "high", media: SPLIT });
  }
  const box: CSSProperties = {
    left: pct(shot.l, FRAME.w),
    top: pct(shot.t, FRAME.h),
    width: pct(shot.w, FRAME.w),
    aspectRatio: `${crop.w} / ${crop.h}`,
    transform: `translateZ(${shot.z}px)`,
  };
  const img: CSSProperties = {
    width: pct(asset.width, crop.w),
    maxWidth: "none",
    left: pct(-crop.x, crop.w),
    top: pct(-crop.y, crop.h),
  };
  const moving = shot.z > 0;
  return (
    <figure aria-hidden={!on} className="absolute m-0" style={box}>
      <div
        className={`relative size-full overflow-hidden ${shot.shadow} transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none ${
          on ? "opacity-100" : `opacity-0 ${moving ? "translate-y-3" : ""}`
        }`}
        style={{ borderRadius: `${pct(crop.r, crop.w)} / ${pct(crop.r, crop.h)}` }}
      >
        <Image
          {...image}
          alt={image.alt}
          draggable={false}
          className="absolute block h-auto select-none"
          style={img}
        />
      </div>
    </figure>
  );
}

/** The conditions the chat understood (step 1) and still remembers at the inquiry (step 4). */
function Conditions({ step }: { step: number }) {
  const on = step === 0 || step === 3;
  return (
    <div
      aria-hidden={!on}
      className="absolute flex flex-col items-start gap-[clamp(6px,1.667cqw,10px)]"
      style={{ left: pct(8, FRAME.w), top: pct(430, FRAME.h), transform: "translateZ(50px)" }}
    >
      <span aria-hidden="true" className="grid text-[clamp(11px,2.167cqw,13px)] leading-none font-semibold text-muted">
        {(["이해한 조건", "기억한 조건"] as const).map((label, i) => (
          <span
            key={label}
            className={`col-start-1 row-start-1 transition-opacity duration-700 ease-out motion-reduce:transition-none ${
              (i === 0 ? step === 0 : step === 3) ? "opacity-100" : "opacity-0"
            }`}
          >
            {label}
          </span>
        ))}
      </span>
      <ul className="m-0 flex list-none flex-col items-start gap-[clamp(6px,1.667cqw,10px)] p-0" aria-label={step === 3 ? "상담에서 기억한 조건" : "상담에서 이해한 조건"}>
        {CAPTURED_CONDITIONS.map((tag, i) => (
          <li
            key={tag}
            style={{ transitionDelay: on ? `${120 + i * 90}ms` : "0ms" }}
            className={`inline-flex h-[clamp(24px,5.333cqw,32px)] items-center rounded-pill px-[clamp(9px,2.167cqw,13px)] text-[clamp(11px,2.333cqw,14px)] leading-none font-medium whitespace-nowrap shadow-md transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none ${
              i === 0 ? "bg-accent-soft text-blue-700" : "bg-white text-body"
            } ${on ? "opacity-100" : "-translate-x-3 opacity-0"}`}
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
