"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Silent product loop for the hero (chat → portfolio recommendation).
 * Plays muted/inline only when motion is allowed and the video is on screen;
 * reduced motion shows the poster. A visible pause/play control covers WCAG 2.2.2.
 */
export function HeroVideo({
  src,
  mobileSrc,
  poster,
  width,
  height,
  label,
}: {
  src: string;
  /** Lighter encode picked by ≤820px screens */
  mobileSrc?: string;
  poster: string;
  width: number;
  height: number;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  /** Explicit viewer choice from the control; overrides the motion preference. */
  const intent = useRef<"play" | "pause" | null>(null);
  const visible = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const wanted = intent.current ? intent.current === "play" : !reduce.matches;
      if (wanted && visible.current) video.play().catch(() => {}); // autoplay can be refused — poster stays
      else video.pause();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      sync();
    });
    io.observe(video);
    reduce.addEventListener("change", sync);
    return () => {
      io.disconnect();
      reduce.removeEventListener("change", sync);
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      intent.current = "play";
      video.play().catch(() => {});
    } else {
      intent.current = "pause";
      video.pause();
    }
  };

  return (
    <div className="relative">
      <video
        ref={ref}
        className="block h-auto w-full"
        width={width}
        height={height}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      >
        {mobileSrc && <source src={mobileSrc} type="video/mp4" media="(max-width: 820px)" />}
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? "미리보기 영상 재생" : "미리보기 영상 일시정지"}
        className="absolute right-4 bottom-4 grid size-10 cursor-pointer place-items-center rounded-pill border-0 bg-white/96 text-gray-900 shadow-md transition-[background-color,transform] duration-160 ease-out hover:bg-white active:scale-[.96] mobile:right-2 mobile:bottom-2 mobile:size-9"
      >
        {paused ? (
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" className="ml-0.5">
            <path d="M3 1.8v10.4a.6.6 0 0 0 .92.5l8.1-5.2a.6.6 0 0 0 0-1L3.92 1.3A.6.6 0 0 0 3 1.8Z" fill="currentColor" />
          </svg>
        ) : (
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14">
            <rect x="2.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
            <rect x="8.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}
