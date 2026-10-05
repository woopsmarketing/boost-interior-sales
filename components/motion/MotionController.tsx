"use client";

import { useEffect } from "react";
import { motionStyle, type Motion } from "@/lib/motion";

const DESKTOP = "(min-width: 821px)";
const REDUCE = "(prefers-reduced-motion: reduce)";
const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const TILT_MAX_DEG = 1.5;
const HERO_PARALLAX_PX = 700;
const NAV_SOLID_AFTER = 40;
/** A stage starts moving when its top edge is this far down the viewport (share of its height)… */
const ENTER_AT = 0.95;
/** …and is in its finished state once it has travelled this much further up. */
const ENTER_SPAN = 0.6;

interface Scene {
  el: HTMLElement;
  top: number;
  /** last applied progress; -1 forces the first write */
  p: number;
  layers: { el: HTMLElement; m: Motion }[];
}

function apply(el: HTMLElement, m: Motion, p: number) {
  const s = motionStyle(m, p);
  if (s.transform !== undefined) el.style.transform = s.transform;
  if (s.filter !== undefined) el.style.filter = s.filter;
  if (s.opacity !== undefined) el.style.opacity = s.opacity;
}

/**
 * The page's only motion island. Renders nothing; drives server-rendered markup
 * through data attributes and writes styles directly (no React state per frame):
 * - [data-nav]            solid nav after 40px
 * - [data-scene]          [data-motion] layers settle into place while the stage scrolls into view
 *                         (desktop + motion allowed). The stage stays in the page flow: nothing is
 *                         pinned, and scrolling is never held back for the animation.
 * - [data-hero-parallax]  light hero parallax over the first 700px
 * - [data-tilt-stage]     ≤1.5° cursor tilt on fine pointers
 * - [data-reveal]         one-time fade-up for blocks below the fold
 * Re-initialises when the viewport crosses 820px or the motion preference changes.
 */
export function MotionController() {
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP);
    const reduce = window.matchMedia(REDUCE);
    const fine = window.matchMedia(FINE_POINTER);
    const queries = [desktop, reduce, fine];

    let stop = start();
    const restart = () => {
      stop();
      stop = start();
    };
    queries.forEach((q) => q.addEventListener("change", restart));
    return () => {
      stop();
      queries.forEach((q) => q.removeEventListener("change", restart));
    };

    function start() {
      const scrub = desktop.matches && !reduce.matches;
      const cleanup: (() => void)[] = [];

      const nav = document.querySelector<HTMLElement>("[data-nav]");
      const hero = scrub ? document.querySelector<HTMLElement>("[data-hero-parallax]") : null;

      const scenes: Scene[] = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"), (el) => ({
        el,
        top: 0,
        p: -1,
        layers: Array.from(el.querySelectorAll<HTMLElement>("[data-motion]"), (layer) => ({
          el: layer,
          m: JSON.parse(layer.dataset.motion ?? "{}") as Motion,
        })),
      }));
      // Static layout: show every layer in its finished state (same as the server render).
      if (!scrub) scenes.forEach((s) => s.layers.forEach((l) => apply(l.el, l.m, 1)));

      const measure = () => {
        const y = window.scrollY;
        for (const s of scenes) {
          s.top = s.el.getBoundingClientRect().top + y;
          s.p = -1;
        }
      };

      let raf = 0;
      const frame = () => {
        raf = 0;
        const y = window.scrollY;
        const vh = window.innerHeight;

        nav?.toggleAttribute("data-solid", y > NAV_SOLID_AFTER);

        if (hero) {
          const k = Math.min(1, Math.max(0, y / HERO_PARALLAX_PX));
          hero.style.transform = `translate3d(0, ${(-k * 30).toFixed(2)}px, ${(-k * 60).toFixed(2)}px)`;
        }

        if (scrub) {
          for (const s of scenes) {
            const p = Math.min(1, Math.max(0, (y + vh * ENTER_AT - s.top) / (vh * ENTER_SPAN)));
            if (p === s.p) continue;
            s.p = p;
            for (const l of s.layers) apply(l.el, l.m, p);
          }
        }
      };

      const schedule = () => {
        if (!raf) raf = requestAnimationFrame(frame);
      };
      const remeasure = () => {
        measure();
        schedule();
      };

      measure();
      frame();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", remeasure);
      const ro = new ResizeObserver(remeasure);
      ro.observe(document.body);
      cleanup.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", remeasure);
        ro.disconnect();
        if (hero) hero.style.transform = "";
      });

      // Cursor tilt — fine pointers, desktop, motion allowed.
      if (scrub && fine.matches) {
        document.querySelectorAll<HTMLElement>("[data-tilt-stage]").forEach((stage) => {
          const inner = stage.querySelector<HTMLElement>("[data-tilt-inner]");
          if (!inner) return;
          let tiltRaf = 0;
          let nx = 0;
          let ny = 0;
          const move = (e: PointerEvent) => {
            const b = stage.getBoundingClientRect();
            nx = (e.clientX - b.left) / b.width - 0.5;
            ny = (e.clientY - b.top) / b.height - 0.5;
            if (!tiltRaf)
              tiltRaf = requestAnimationFrame(() => {
                tiltRaf = 0;
                const rx = -ny * TILT_MAX_DEG * 2;
                const ry = nx * TILT_MAX_DEG * 2;
                inner.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
              });
          };
          const leave = () => {
            cancelAnimationFrame(tiltRaf);
            tiltRaf = 0;
            inner.style.transform = "";
          };
          stage.addEventListener("pointermove", move);
          stage.addEventListener("pointerleave", leave);
          cleanup.push(() => {
            stage.removeEventListener("pointermove", move);
            stage.removeEventListener("pointerleave", leave);
            leave();
          });
        });
      }

      // Reveal — only blocks still below the fold are hidden, so nothing visible ever blinks
      // and the page stays fully readable if this script never runs.
      if (!reduce.matches) {
        const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
        const io = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              entry.target.setAttribute("data-reveal-state", "shown");
              io.unobserve(entry.target);
            }
          },
          { rootMargin: "0px 0px -12% 0px" },
        );
        const vh = window.innerHeight;
        for (const el of targets) {
          if (el.getBoundingClientRect().top > vh) {
            el.setAttribute("data-reveal-state", "pending");
            io.observe(el);
          }
        }
        cleanup.push(() => {
          io.disconnect();
          targets.forEach((el) => el.removeAttribute("data-reveal-state"));
        });
      }

      return () => cleanup.forEach((fn) => fn());
    }
  }, []);

  return null;
}
