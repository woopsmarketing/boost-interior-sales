"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { clock, PORTRAIT_QUERY, type Clip, type Film } from "@/lib/film";
import { INSET_FOCUS } from "./frames";
import { idle, release, solo } from "./solo";

/** `playing` covers paused too: once the film has drawn a frame, the native controls show its state. */
type Status = "idle" | "loading" | "playing" | "failed";

type FullScreenVideo = HTMLVideoElement & { webkitExitFullscreen?: () => void };

/** A poster through next/image: sized for its slot, WebP where the browser takes it. Posters carry small screen text, hence 85. */
export function posterProps(clip: Clip, sizes: string, quality = 85) {
  return getImageProps({ src: clip.poster, width: clip.width, height: clip.height, alt: "", sizes, quality }).props;
}

/**
 * Click-to-play film. Until the play button is pressed only the poster is fetched — no video bytes,
 * no metadata. The press picks one file: the vertical cut on a phone, the 16:9 film everywhere else,
 * so a browser never downloads both. After that the native player (with its controls) takes over.
 * The film has no sound track, and the button says so.
 * A film that fails to load falls back to its poster with a way to try again.
 */
export function FilmPlayer({
  film,
  label,
  sizes,
  portraitSizes = "(max-width: 360px) calc(100vw - 40px), 320px",
  inline = false,
  rewind = false,
  cue = "center",
  className = "",
}: {
  film: Film;
  /** What the film shows, for the play button and the player */
  label: string;
  /** `sizes` of the 16:9 poster (of the only poster, for a vertical film) */
  sizes: string;
  /** `sizes` of the vertical poster shown on phones */
  portraitSizes?: string;
  /** Keep the player in the page (no full screen, no picture-in-picture): its note has to stay next to it */
  inline?: boolean;
  /** Go back to the poster when the film ends (a film whose last frame is black) */
  rewind?: boolean;
  /** Where the play button sits. A cover the product made has its title in the middle: its button goes below it. */
  cue?: "center" | "bottom";
  /** Frame classes: aspect ratio, radius, shadow */
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [clip, setClip] = useState<Clip | null>(null);
  /** The film has drawn a frame: until then the poster shows through the player. */
  const [drawn, setDrawn] = useState(false);
  /** Counts presses of "다시 시도": a new player is mounted for each. */
  const [attempt, setAttempt] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const playButton = useRef<HTMLButtonElement>(null);
  const retryButton = useRef<HTMLButtonElement>(null);
  /** The player had the keyboard focus when it went away (the film ended, or failed): what replaces it takes the focus. */
  const handFocus = useRef(false);
  const leave = () => {
    handFocus.current = document.activeElement === player.current;
  };
  /** The key that pressed play is still down. Its release must not land on the player, which would pause it. */
  const keyHeld = useRef(false);
  const holdKey = () => {
    keyHeld.current = true;
    window.addEventListener("keyup", () => (keyHeld.current = false), { once: true });
  };

  const start = () => {
    const narrow = window.matchMedia(PORTRAIT_QUERY).matches;
    setClip(narrow && film.portrait ? film.portrait : film);
    setDrawn(false);
    setStatus("loading");
  };

  // The play button unmounts: start the film inside the press, and hand keyboard focus to the player —
  // once the pressing key is up, where it was a key (Enter starts the film on its way down).
  useEffect(() => {
    const video = player.current;
    if (!clip || !video) return;
    const focus = () => video.focus({ preventScroll: true });
    if (keyHeld.current) window.addEventListener("keyup", focus, { once: true });
    else focus();
    video.play().catch((error: unknown) => {
      // A newer play() or a pause() interrupting this one is not a failure.
      if (error instanceof DOMException && error.name === "AbortError") return;
      leave();
      release(video);
      setStatus("failed");
    });
    return () => {
      window.removeEventListener("keyup", focus);
      release(video);
    };
  }, [clip, attempt]);

  useEffect(() => {
    if (!handFocus.current) return;
    if (status === "idle") playButton.current?.focus({ preventScroll: true });
    else if (status === "failed") retryButton.current?.focus({ preventScroll: true });
    else return;
    handFocus.current = false;
  }, [status]);

  // A film whose note has to stay next to it never fills the screen. Chromium hides the button (controlsList);
  // any other browser's player is put back in the page as soon as it leaves it.
  useEffect(() => {
    const video: FullScreenVideo | null = player.current;
    if (!inline || !clip || !video) return;
    const back = () => {
      if (document.fullscreenElement === video) document.exitFullscreen().catch(() => {});
    };
    // An iPhone opens its own full-screen player, with its own event.
    const backFromNative = () => video.webkitExitFullscreen?.();
    video.addEventListener("fullscreenchange", back);
    video.addEventListener("webkitbeginfullscreen", backFromNative);
    return () => {
      video.removeEventListener("fullscreenchange", back);
      video.removeEventListener("webkitbeginfullscreen", backFromNative);
    };
  }, [inline, clip, attempt]);

  // Scrolled out of view: stop. It plays without sound, so nobody would notice it running.
  useEffect(() => {
    const el = frame.current;
    if (!el || !clip) return;
    // Only once it has been in view: a film started from the keyboard may still be scrolling into view.
    let seen = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) seen = true;
      // Not while it fills the screen: the frame behind a full-screen film can move out of view (a tablet turned).
      else if (seen && document.fullscreenElement !== player.current) player.current?.pause();
    });
    io.observe(el);
    return () => io.disconnect();
  }, [clip]);

  // Back to the poster and its play button. The player is emptied first, so its download stops with it.
  const reset = () => {
    leave();
    const video = player.current;
    if (video) {
      video.removeAttribute("src");
      video.load();
    }
    setClip(null);
    setStatus("idle");
  };

  const wide = posterProps(film, sizes);
  const tall = film.portrait ? posterProps(film.portrait, portraitSizes) : null;
  // The two cuts differ in length, and CSS shows the one this width plays (the same query the press uses).
  const length = tall ? (
    <>
      <span className="phone:hidden">{clock(film.seconds)}</span>
      <span className="hidden phone:inline">{clock(film.portrait!.seconds)}</span>
    </>
  ) : (
    clock(film.seconds)
  );

  return (
    <div ref={frame} className={`relative overflow-hidden bg-gray-900 ${className}`}>
      <picture>
        {tall && <source media={PORTRAIT_QUERY} srcSet={tall.srcSet} sizes={tall.sizes} />}
        {/* Art direction: next/image's own props (getImageProps) on a <picture>. */}
        <img {...wide} alt="" className="absolute inset-0 size-full object-cover" />
      </picture>

      {clip && status !== "failed" && (
        <video
          ref={player}
          key={`${clip.src}#${attempt}`}
          src={clip.src}
          width={clip.width}
          height={clip.height}
          controls
          muted
          playsInline
          preload="auto"
          {...(inline ? { controlsList: "nofullscreen nodownload noremoteplayback", disablePictureInPicture: true } : {})}
          aria-label={`${label} (소리 없음)`}
          onPlay={(event) => solo(event.currentTarget)}
          onPlaying={() => {
            setDrawn(true);
            setStatus("playing");
          }}
          // Paused before its first frame (scrolled away, or another film started): back to the poster.
          onPause={(event) => {
            idle(event.currentTarget);
            if (!drawn) reset();
          }}
          onEnded={(event) => {
            idle(event.currentTarget);
            if (rewind) reset();
          }}
          // Not the emptied player a reset leaves behind.
          onError={(event) => {
            if (!event.currentTarget.getAttribute("src")) return;
            leave();
            // The player goes away without having paused: the films that play by themselves may go on.
            release(event.currentTarget);
            setStatus("failed");
          }}
          // Unseen until its first frame, so the poster stays up while it loads (a loading player paints a dark
          // panel of its own). Opaque after: a vertical cut in a frame turned to 16:9 must not show the other poster beside it.
          className={`absolute inset-0 block size-full object-contain ${INSET_FOCUS} ${drawn ? "bg-black" : "opacity-0"}`}
        />
      )}

      {status === "idle" && (
        <button
          ref={playButton}
          type="button"
          onClick={start}
          onKeyDown={holdKey}
          className={`group absolute inset-0 flex cursor-pointer flex-col items-center border-0 bg-transparent p-0 transition-colors duration-160 ease-out hover:bg-gray-900/10 ${INSET_FOCUS} ${
            cue === "bottom" ? "justify-end gap-2.5 pb-6 mobile:pb-4" : "justify-center gap-3"
          }`}
        >
          <span className="sr-only">
            {label} 재생 ({length}, 소리 없음)
          </span>
          <span
            aria-hidden="true"
            className={`grid place-items-center rounded-pill bg-white/96 shadow-float transition-transform duration-160 ease-out group-hover:scale-[1.05] group-active:scale-[.97] ${
              cue === "bottom" ? "size-14 mobile:size-12" : "size-[72px] mobile:size-16"
            }`}
          >
            <span className="ml-1 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-gray-900" />
          </span>
          <span
            aria-hidden="true"
            className="flex items-center gap-1.5 rounded-pill bg-gray-900/72 px-3 py-1.5 text-[13px] leading-none font-semibold whitespace-nowrap text-white"
          >
            <span className="font-mono text-[12px] font-medium">{length}</span>
            <span className="text-white/50">·</span>
            소리 없음
          </span>
        </button>
      )}

      {/* Only until the first frame: after that the native player shows its own buffering. */}
      {status === "loading" && !drawn && (
        <span role="status" className="pointer-events-none absolute inset-0 grid place-items-center bg-gray-900/20">
          <span className="sr-only">영상을 불러오는 중입니다</span>
          <span aria-hidden="true" className="size-10 rounded-pill border-[3px] border-white/40 border-t-white motion-safe:animate-spin" />
        </span>
      )}

      {status === "failed" && (
        <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-900/78 px-5 text-center">
          <p className="m-0 text-[15px] leading-[1.5] font-semibold text-white">영상을 불러오지 못했습니다.</p>
          <button
            ref={retryButton}
            type="button"
            onKeyDown={holdKey}
            onClick={() => {
              setAttempt((n) => n + 1);
              start();
            }}
            className="inline-flex h-11 cursor-pointer items-center rounded-pill border-0 bg-white px-5 text-[14px] leading-none font-semibold text-gray-900"
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}
