/**
 * Scroll-scrub math shared by the server render (final state) and the
 * client MotionController (per-frame). Ported from Scenes.jsx: `seg` eases a
 * progress window [start, end] with an ease-out cubic, `lerp` maps it.
 */

/** [from, to, start, end] — value goes from→to while progress moves start→end. */
export type Track = readonly [from: number, to: number, start: number, end: number];
export type Value = number | Track;

export interface Motion {
  /** translate X/Y — % of the element's own box (like the reference `tf`) unless unit is "px" */
  x?: Value;
  y?: Value;
  unit?: "%" | "px";
  /** translateZ in px */
  z?: Value;
  s?: Value;
  /** rotateY in deg */
  ry?: Value;
  /** filter blur in px */
  blur?: Value;
  brightness?: Value;
  opacity?: Value;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
export const seg = (p: number, a: number, b: number) => ease(clamp01((p - a) / (b - a)));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function read(v: Value | undefined, p: number, fallback: number) {
  if (v === undefined) return fallback;
  if (typeof v === "number") return v;
  return lerp(v[0], v[1], seg(p, v[2], v[3]));
}

const n = (v: number) => Math.round(v * 1000) / 1000;

export interface MotionStyle {
  transform?: string;
  filter?: string;
  opacity?: string;
}

/** Resolve a motion spec at progress p (0…1) into CSS declarations. */
export function motionStyle(m: Motion, p: number): MotionStyle {
  const out: MotionStyle = {};
  if (m.x !== undefined || m.y !== undefined || m.z !== undefined || m.s !== undefined || m.ry !== undefined) {
    const u = m.unit ?? "%";
    let t = `translate3d(${n(read(m.x, p, 0))}${u}, ${n(read(m.y, p, 0))}${u}, ${n(read(m.z, p, 0))}px)`;
    if (m.s !== undefined) t += ` scale(${n(read(m.s, p, 1))})`;
    if (m.ry !== undefined) t += ` rotateY(${n(read(m.ry, p, 0))}deg)`;
    out.transform = t;
  }
  if (m.blur !== undefined || m.brightness !== undefined) {
    const f: string[] = [];
    if (m.blur !== undefined) f.push(`blur(${n(read(m.blur, p, 0))}px)`);
    if (m.brightness !== undefined) f.push(`brightness(${n(read(m.brightness, p, 1))})`);
    out.filter = f.join(" ");
  }
  if (m.opacity !== undefined) out.opacity = String(n(read(m.opacity, p, 1)));
  return out;
}

/**
 * Props for an element whose style is scrubbed by scroll progress.
 * Server-renders the finished (p = 1) state so content is complete without JS;
 * the MotionController takes over on desktop when motion is allowed.
 */
export function motionProps(m: Motion) {
  return { "data-motion": JSON.stringify(m), style: motionStyle(m, 1) };
}
