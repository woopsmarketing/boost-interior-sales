"use client";

import Image, { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Asset } from "@/lib/assets";

export interface Chapter {
  label: string;
  /** Where the scene starts, seconds */
  at: number;
}

const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

/**
 * Click-to-play facade for the 86s walkthrough: nothing is downloaded and nothing plays until the
 * viewer presses play, then the native player (with controls) takes over. The chapters under it
 * start the same video at a scene, so the flow can be checked without watching all of it.
 */
export function DemoVideoPlayer({
  src,
  duration,
  poster,
  chapters,
}: {
  src: string;
  duration: string;
  poster: Asset;
  chapters: readonly Chapter[];
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const startAt = useRef(0);

  const seek = (video: HTMLVideoElement, at: number) => {
    if (video.readyState >= 1) video.currentTime = at;
    else video.addEventListener("loadedmetadata", () => (video.currentTime = at), { once: true });
  };

  const play = (at: number) => {
    const video = videoRef.current;
    if (video) {
      seek(video, at);
      void video.play();
      return;
    }
    startAt.current = at;
    setPlaying(true);
  };

  // The play button unmounts; hand keyboard focus to the player that replaced it.
  useEffect(() => {
    const video = videoRef.current;
    if (!playing || !video) return;
    video.focus();
    if (startAt.current) seek(video, startAt.current);
  }, [playing]);

  // Zoom the facade from its top edge so the rows below the poster's crop fall outside the frame.
  const zoom = poster.crop ? poster.height / poster.crop.h : 1;

  const posterUrl = getImageProps({
    src: poster.src,
    width: poster.width,
    height: poster.height,
    alt: "",
    quality: 75,
  }).props.src;

  return (
    <div>
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
            aria-label={`BoostInterior 실제 작동 영상 (${duration})`}
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
              className="origin-top object-cover brightness-[.62] saturate-[.9]"
              style={{ transform: `scale(${zoom})` }}
            />
            <button
              type="button"
              onClick={() => play(0)}
              className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-5 border-0 bg-transparent p-0 mobile:gap-3"
            >
              <span className="sr-only">데모 영상 재생 ({duration})</span>
              <span
                aria-hidden="true"
                className="grid size-24 place-items-center rounded-pill bg-white/96 shadow-float transition-transform duration-160 ease-out group-hover:scale-[1.04] group-active:scale-[.98] mobile:size-16"
              >
                <span className="ml-1.5 h-0 w-0 border-y-[14px] border-l-[22px] border-y-transparent border-l-gray-900 mobile:ml-1 mobile:border-y-[10px] mobile:border-l-[16px]" />
              </span>
              <span
                aria-hidden="true"
                className="flex items-center gap-2 rounded-pill bg-gray-900/70 px-4 py-2 text-[15px] leading-none font-semibold text-white mobile:px-3 mobile:py-1.5 mobile:text-[13px]"
              >
                <span className="font-mono text-[13px] font-medium mobile:text-[12px]">{duration}</span>
                <span className="text-white/50">·</span>
                소리 없이 재생됩니다
              </span>
            </button>
          </>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 mobile:mt-4 mobile:gap-y-2.5">
        <p id="demo-video-chapters" className="m-0 text-[14px] leading-[1.4] font-bold text-muted">
          장면별로 보기
        </p>
        <ol aria-labelledby="demo-video-chapters" className="m-0 flex list-none flex-wrap items-center gap-2 p-0">
          {chapters.map((chapter, i) => (
            <li key={chapter.label} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-[13px] leading-none text-faint max-[480px]:hidden">
                  →
                </span>
              )}
              <button
                type="button"
                onClick={() => play(chapter.at)}
                className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-pill border border-line-strong bg-white pr-4 pl-3.5 text-[15px] leading-none font-semibold text-ink transition-colors duration-160 ease-out hover:border-blue-200 hover:bg-accent-soft max-[480px]:gap-1.5 max-[480px]:px-3 max-[480px]:text-[14px]"
              >
                <span className="sr-only">{`${clock(chapter.at)}부터 재생: `}</span>
                {chapter.label}
                <span aria-hidden="true" className="font-mono text-[12px] leading-none font-medium text-muted">
                  {clock(chapter.at)}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
