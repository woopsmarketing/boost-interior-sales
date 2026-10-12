"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { PORTRAIT_QUERY, type Clip, type Film } from "@/lib/film";
import { posterProps } from "./FilmPlayer";
import { INSET_FOCUS } from "./frames";
import { giveWay } from "./solo";
import { choose, GLIMPSE, join, rest, seen, settle, type Player } from "./stage";

const LANDSCAPE_QUERY = "(min-width: 641px)";
const REDUCE = "(prefers-reduced-motion: reduce)";
/** A film is fetched once it is this close to the screen (half a screen above or below)… */
const NEAR = "50% 0px";
/** …and has stayed that close this long with the page nearly at rest, so a scroll on its way past it fetches nothing. */
const DWELL_MS = 200;
/** Share of the screen's height the page may move within one dwell and still count as nearly at rest. */
const DRIFT = 0.25;
const STEPS = Array.from({ length: 21 }, (_, i) => i / 20);

/** Whether the visitor asked the browser to spare data. Not every browser says. */
const savesData = () => (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

/** The browser refused to start a film by itself (Low Power Mode, a strict autoplay policy): no other film tries. */
let refused = false;

/**
 * A film that plays by itself: muted, inline, looping — the hero's brand film and the short clips
 * under it. The poster is what loads with the page. The film is fetched only once it is near the
 * screen, one file: the vertical cut on a phone, the 16:9 one elsewhere. It plays while it is the
 * film most in view (components/media/stage.ts lets one play at a time) and pauses when it is not.
 * It does not start by itself with reduced motion, with data saver on, or where the browser blocks
 * autoplay: the poster stays and a play button starts it. The button in its top corner pauses it,
 * and a film the visitor paused stays paused through scrolling and rotation until they press play.
 * If the file fails, the poster stays with a way to try again.
 */
export function AutoFilm({
  film,
  label,
  name = "영상",
  sizes,
  portraitSizes = "(max-width: 360px) calc(100vw - 40px), 320px",
  priority = false,
  className = "",
}: {
  film: Film;
  /** What the film shows: the poster's text alternative */
  label: string;
  /** What its play and pause buttons call it, in a word or two */
  name?: string;
  /** `sizes` of the 16:9 poster */
  sizes: string;
  /** `sizes` of the vertical poster shown on phones */
  portraitSizes?: string;
  /** The hero's film: its poster is the page's largest image, the film waits until the page has loaded, and it plays once a strip of it shows. */
  priority?: boolean;
  /** Frame classes: aspect ratio, radius, shadow */
  className?: string;
}) {
  /** The cut to play. Null until the film is near the screen (or for good, where it must not start by itself). */
  const [clip, setClip] = useState<Clip | null>(null);
  const [playing, setPlaying] = useState(false);
  /** The film has drawn a frame: fade it in over the poster. */
  const [drawn, setDrawn] = useState(false);
  /** Waiting for a press: reduced motion, data saver, or autoplay refused. */
  const [held, setHeld] = useState(false);
  const [failed, setFailed] = useState(false);
  /** Counts presses of "다시 시도": a new player is mounted for each. */
  const [attempt, setAttempt] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const me = useRef<Player | null>(null);
  /** The visitor paused it: nothing but their own press starts it again. */
  const stopped = useRef(false);
  /** Mirrors `held` and `failed` for the stage, which asks outside a render. */
  const waiting = useRef(false);
  /** The visitor started it where films do not start by themselves: off screen, it goes back to waiting. */
  const byHand = useRef(false);
  /** The next player was asked for by a press: it takes the stage whatever else is in view. */
  const pressed = useRef(false);
  const near = useRef(false);

  const pick = () => (window.matchMedia(PORTRAIT_QUERY).matches && film.portrait ? film.portrait : film);

  const wait = () => {
    waiting.current = true;
    setHeld(true);
  };

  /**
   * Autoplay refused: back to the poster and a play button, here and for every film after this one.
   * Only a refusal counts. A file that failed to load rejects too, and that is this film's own error (onError).
   */
  const refuse = (error: unknown) => {
    if (!(error instanceof DOMException) || error.name !== "NotAllowedError") return;
    refused = true;
    wait();
  };

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const narrow = window.matchMedia(PORTRAIT_QUERY);
    const reduce = window.matchMedia(REDUCE);
    const quiet = () => reduce.matches || savesData() || refused;
    /** The page has loaded and has been idle: the hero's film may be fetched. The other films never wait for this. */
    let armed = !priority;
    let idle = 0;
    let arrive = 0;
    let dwell = 0;

    const player: Player = {
      play() {
        const node = video.current;
        if (node && node.paused && !stopped.current) node.play().catch(refuse);
      },
      pause: () => video.current?.pause(),
      ready: () => !stopped.current && !waiting.current,
      enough: priority ? GLIMPSE : undefined,
    };
    me.current = player;
    const leave = join(player);

    const mount = () => {
      if (!armed || !near.current || stopped.current || waiting.current) return;
      if (quiet()) wait();
      else setClip((now) => now ?? pick());
    };

    const arm = () => {
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 600));
      const go = () => {
        armed = true;
        mount();
      };
      // Opened at an anchor (an email links to /#demo-video): the page is still on its way there, so wait until it has arrived.
      idle = ric(() => {
        if (window.location.hash.length > 1) arrive = window.setTimeout(go, 1500);
        else go();
      });
    };
    if (priority) {
      if (document.readyState === "complete") arm();
      else window.addEventListener("load", arm, { once: true });
    }

    // Near the screen for a moment: fetch. A film already fetched stays; it only pauses when out of view.
    // A page still moving fast (a fling, a jump to an anchor, a restored scroll position) is asked again once it has slowed.
    const linger = () => {
      const from = window.scrollY;
      dwell = window.setTimeout(() => {
        if (Math.abs(window.scrollY - from) > window.innerHeight * DRIFT) linger();
        else mount();
      }, DWELL_MS);
    };
    const approach = new IntersectionObserver(
      ([entry]) => {
        near.current = entry.isIntersecting;
        window.clearTimeout(dwell);
        if (near.current) linger();
      },
      { rootMargin: NEAR },
    );
    approach.observe(el);

    // How much of it is on screen, for the stage. A frame taller than the screen counts against the screen's height.
    const view = new IntersectionObserver(
      ([entry]) => {
        const room = Math.min(entry.boundingClientRect.height, entry.rootBounds?.height ?? window.innerHeight) || 1;
        const share = entry.isIntersecting ? Math.min(1, entry.intersectionRect.height / room) : 0;
        // Started by hand under reduced motion or data saver: once off screen it waits for a press again.
        if (share === 0 && byHand.current && video.current && !video.current.paused) {
          stopped.current = true;
          byHand.current = false;
        }
        seen(player, share);
      },
      { threshold: STEPS },
    );
    view.observe(el);

    // Rotated or resized across the breakpoint: the cut made for the new shape. The old cut's download stops.
    // It plays on only where it was allowed to play: a film the visitor paused waits for their press.
    const swap = () => {
      const node = video.current;
      if (!node) return;
      const next = pick();
      if (node.getAttribute("src") === next.src) return;
      node.pause();
      node.removeAttribute("src");
      node.load();
      setDrawn(false);
      setPlaying(false);
      if (stopped.current) {
        stopped.current = false;
        wait();
        setClip(null);
      } else setClip(near.current ? next : null);
    };
    // Reduced motion switched on mid-visit: a film already fetched stops and waits for a press, like one not fetched yet.
    const calm = () => {
      if (!reduce.matches || !video.current) return;
      video.current.pause();
      rest(player);
      wait();
    };
    narrow.addEventListener("change", swap);
    reduce.addEventListener("change", calm);
    return () => {
      window.removeEventListener("load", arm);
      narrow.removeEventListener("change", swap);
      reduce.removeEventListener("change", calm);
      approach.disconnect();
      view.disconnect();
      (window.cancelIdleCallback ?? window.clearTimeout)(idle);
      window.clearTimeout(arrive);
      window.clearTimeout(dwell);
      leave();
      me.current = null;
    };
    // `film` and `priority` are static page data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A player was just mounted: the stage decides whether it plays. One the visitor pressed for plays now.
  useEffect(() => {
    if (!clip || !me.current) return;
    if (pressed.current) {
      pressed.current = false;
      giveWay();
      choose(me.current);
    } else settle();
  }, [clip, attempt]);

  const toggle = () => {
    const node = video.current;
    if (!node) {
      // Held back until now: this press is the visitor asking for it.
      stopped.current = false;
      waiting.current = false;
      byHand.current = held;
      pressed.current = true;
      setHeld(false);
      setFailed(false);
      setAttempt((n) => n + 1);
      setClip(pick());
      return;
    }
    if (node.paused) {
      stopped.current = false;
      waiting.current = false;
      if (held) byHand.current = true;
      setHeld(false);
      giveWay();
      if (me.current) choose(me.current);
    } else {
      stopped.current = true;
      node.pause();
      if (me.current) rest(me.current);
    }
  };

  const wide = posterProps(film, sizes);
  const tall = film.portrait ? posterProps(film.portrait, portraitSizes) : null;
  // The hero's poster is the largest image of the first screen at every width; each shape is preloaded only where it shows.
  if (priority) {
    preload(wide.src, { as: "image", imageSrcSet: wide.srcSet, imageSizes: wide.sizes, fetchPriority: "high", media: tall ? LANDSCAPE_QUERY : undefined });
    if (tall) preload(tall.src, { as: "image", imageSrcSet: tall.srcSet, imageSizes: tall.sizes, fetchPriority: "high", media: PORTRAIT_QUERY });
  }

  return (
    <div ref={frame} className={`relative overflow-hidden bg-gray-150 ${className}`}>
      <picture>
        {tall && <source media={PORTRAIT_QUERY} srcSet={tall.srcSet} sizes={tall.sizes} />}
        {/* Art direction: next/image's own props (getImageProps) on a <picture>. */}
        <img
          {...wide}
          alt={label}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          className="absolute inset-0 size-full object-cover"
        />
      </picture>

      {clip && !failed && (
        <video
          ref={video}
          key={`${clip.src}#${attempt}`}
          src={clip.src}
          width={clip.width}
          height={clip.height}
          muted
          loop
          playsInline
          disablePictureInPicture
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => {
            setDrawn(true);
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          // Not the emptied player a swap leaves behind.
          onError={(event) => {
            if (!event.currentTarget.getAttribute("src")) return;
            waiting.current = true;
            setPlaying(false);
            setDrawn(false);
            setFailed(true);
          }}
          className={`absolute inset-0 block size-full object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none ${drawn ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {failed ? (
        <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-900/70 px-5 text-center">
          <p className="m-0 text-[15px] leading-[1.5] font-semibold text-white">영상을 불러오지 못했습니다.</p>
          <button
            type="button"
            onClick={toggle}
            className="inline-flex h-11 cursor-pointer items-center rounded-pill border-0 bg-white px-5 text-[14px] leading-none font-semibold text-gray-900"
          >
            다시 시도
          </button>
        </div>
      ) : held && !playing ? (
        <button
          type="button"
          onClick={toggle}
          className={`group absolute inset-0 grid cursor-pointer place-items-center border-0 bg-transparent p-0 transition-colors duration-160 ease-out hover:bg-gray-900/10 ${INSET_FOCUS}`}
        >
          <span className="sr-only">{name} 재생 (소리 없음)</span>
          <span
            aria-hidden="true"
            className="grid size-[72px] place-items-center rounded-pill bg-white/96 shadow-float transition-transform duration-160 ease-out group-hover:scale-[1.05] group-active:scale-[.97] mobile:size-16"
          >
            <span className="ml-1 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-gray-900" />
          </span>
        </button>
      ) : (
        clip && (
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? `${name} 일시정지` : `${name} 재생`}
            className="absolute top-3 right-3 grid size-11 cursor-pointer place-items-center rounded-pill border-0 bg-gray-900/60 text-white backdrop-blur-sm transition-[background-color,transform] duration-160 ease-out hover:bg-gray-900/80 active:scale-[.96]"
          >
            {playing ? (
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14">
                <rect x="2.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
                <rect x="8.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" className="ml-0.5">
                <path d="M3 1.8v10.4a.6.6 0 0 0 .92.5l8.1-5.2a.6.6 0 0 0 0-1L3.92 1.3A.6.6 0 0 0 3 1.8Z" fill="currentColor" />
              </svg>
            )}
          </button>
        )
      )}
    </div>
  );
}
