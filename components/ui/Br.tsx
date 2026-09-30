const VISIBILITY = {
  /** > 820px (reference `br(mobile)` → " " on mobile) */
  desktop: "mobile:hidden",
  /** ≤ 820px */
  mobile: "hidden mobile:inline",
  /** ≤ 480px — phone-only breaks for the longest headline */
  phone: "hidden max-[480px]:inline",
  /** > 480px */
  wide: "max-[480px]:hidden",
} as const;

/**
 * Line break that only applies within one viewport range.
 * Always write a space before it: a hidden <br> then collapses to that space,
 * and a visible <br> swallows it.
 */
export function Br({ on = "desktop" }: { on?: keyof typeof VISIBILITY }) {
  return <br className={VISIBILITY[on]} />;
}
