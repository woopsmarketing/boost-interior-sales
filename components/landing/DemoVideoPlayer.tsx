"use client";

import Image, { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Asset } from "@/lib/assets";

/**
 * Click-to-play facade for the 86s walkthrough: nothing is downloaded until the
 * viewer presses play, then the native player (with controls) takes over.
 */
export function DemoVideoPlayer({
  src,
  duration,
  poster,
  caption,
}: {
  src: string;
  duration: string;
  poster: Asset;
  caption: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // The play button unmounts; hand keyboard focus to the player that replaced it.
  useEffect(() => {
    if (playing) videoRef.current?.focus();
  }, [playing]);

  const posterUrl = getImageProps({
    src: poster.src,
    width: poster.width,
    height: poster.height,
    alt: "",
    quality: 75,
  }).props.src;

  return (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-900 shadow-float mobile:rounded-md">
      {playing ? (
        <video
          ref={videoRef}
          src={src}
          poster={posterUrl}
          controls
          autoPlay
          playsInline
          preload="auto"
          aria-label={`BoostChat 실제 작동 영상 (${duration})`}
          className="block size-full object-contain"
        />
      ) : (
        <>
          <Image
            src={poster.src}
            alt=""
            fill
            sizes="(max-width: 820px) calc(100vw - 40px), 1280px"
            quality={75}
            className="object-cover brightness-[.62] saturate-[.9]"
          />
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 grid cursor-pointer place-items-center border-0 bg-transparent p-0"
          >
            <span className="sr-only">데모 영상 재생 ({duration})</span>
            <span
              aria-hidden="true"
              className="grid size-24 place-items-center rounded-pill bg-white/96 shadow-float transition-transform duration-160 ease-out group-hover:scale-[1.04] group-active:scale-[.98] mobile:size-16"
            >
              <span className="ml-1.5 h-0 w-0 border-y-[14px] border-l-[22px] border-y-transparent border-l-gray-900 mobile:ml-1 mobile:border-y-[10px] mobile:border-l-[16px]" />
            </span>
          </button>
          <div className="pointer-events-none absolute right-8 bottom-7 left-8 flex items-center justify-between gap-3 text-white mobile:right-4 mobile:bottom-3.5 mobile:left-4">
            <span className="text-[17px] leading-[1.3] font-semibold mobile:text-[14px]">{caption}</span>
            <span className="flex-none rounded-pill bg-gray-900/60 px-2.5 py-1.5 font-mono text-[13px] leading-none">
              {duration}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
