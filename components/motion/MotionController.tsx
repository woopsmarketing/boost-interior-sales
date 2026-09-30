"use client";

import { useEffect } from "react";
import { motionStyle, type Motion } from "@/lib/motion";

const DESKTOP = "(min-width: 821px)";
const REDUCE = "(prefers-reduced-motion: reduce)";
const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const TILT_MAX_DEG = 1.5;
const HERO_PARALLAX_PX = 700;
const NAV_SOLID_AFTER = 40;

interface Scene {
  el: HTMLElement;
  top: number;
  height: number;
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
 * - [data-scene]          pinned scroll-scrub of [data-motion] layers (desktop + motion allowed)
 * - [data-hero-parallax]  light hero parallax over the first 700px
 * - [data-tilt-stage]     ≤1.5° cursor tilt on fine pointers
 * - [data-rail]           story rail visibility / current step / jump offset
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
      const pinned = desktop.matches && !reduce.matches;
      const cleanup: (() => void)[] = [];

      const nav = document.querySelector<HTMLElement>("[data-nav]");
      const hero = pinned ? document.querySelector<HTMLElement>("[data-hero-parallax]") : null;

      const scenes: Scene[] = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"), (el) => ({
        el,
        top: 0,
        height: 0,
        p: -1,
        layers: Array.from(el.querySelectorAll<HTMLElement>("[data-motion]"), (layer) => ({
          el: layer,
          m: JSON.parse(layer.dataset.motion ?? "{}") as Motion,
        })),
      }));
      // Static layout: show every layer in its finished state (same as the server render).
      if (!pinned) scenes.forEach((s) => s.layers.forEach((l) => apply(l.el, l.m, 1)));

      const rail = document.querySelector<HTMLElement>("[data-rail]");
      const railItems = rail ? Array.from(rail.querySelectorAll<HTMLAnchorElement>("[data-rail-item]")) : [];
      const railScenes = railItems.map((a) => scenes.find((s) => s.el.id === a.dataset.railItem));
      let railCurrent = -2;

      const measure = () => {
        const y = window.scrollY;
        for (const s of scenes) {
          const r = s.el.getBoundingClientRect();
          s.top = r.top + y;
          s.height = r.height;
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

        if (pinned) {
          for (const s of scenes) {
            const range = s.height - vh;
            const p = range > 0 ? Math.min(1, Math.max(0, (y - s.top) / range)) : 0;
            if (p === s.p) continue;
            s.p = p;
            for (const l of s.layers) apply(l.el, l.m, p);
          }
        }

        if (rail) {
          const mid = y + vh / 2;
          const current = railScenes.findIndex((s) => !!s && s.top <= mid && s.top + s.height > mid);
          if (current !== railCurrent) {
            railCurrent = current;
            rail.toggleAttribute("data-visible", current >= 0);
            railItems.forEach((a, i) => {
              if (i === current) a.setAttribute("aria-current", "step");
              else a.removeAttribute("aria-current");
              a.toggleAttribute("data-done", current >= 0 && i < current);
            });
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

      // Story rail: land pinned scenes mid-animation, static scenes at their header.
      if (rail) {
        const onRailClick = (e: MouseEvent) => {
          const a = (e.target as Element).closest<HTMLAnchorElement>("[data-rail-item]");
          const scene = a ? scenes.find((s) => s.el.id === a.dataset.railItem) : undefined;
          if (!scene) return;
          e.preventDefault();
          const top = pinned ? scene.top + window.innerHeight * 0.6 : scene.top - 40;
          window.scrollTo({ top, behavior: reduce.matches ? "auto" : "smooth" });
          history.replaceState(null, "", `#${scene.el.id}`);
        };
        rail.addEventListener("click", onRailClick);
        cleanup.push(() => rail.removeEventListener("click", onRailClick));
      }

      // Cursor tilt — fine pointers, desktop, motion allowed.
      if (pinned && fine.matches) {
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
        const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
          (el) => el.dataset.reveal !== "unpinned" || !pinned,
        );
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
