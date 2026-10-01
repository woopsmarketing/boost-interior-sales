import type { ReactNode } from "react";

/**
 * Thin 1.5px line icons in the product's own style (24px grid, round caps).
 * Decorative: the label next to an icon always carries the meaning.
 */
const PATHS = {
  /** Storefront — platform listing */
  platform: (
    <>
      <path d="M4 10v9h16v-9" />
      <path d="M3 6.5 4.5 4h15L21 6.5V8a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V6.5Z" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  /** Calendar — 12 months */
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),
  /** Play in a frame — portfolio video */
  video: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m10 9.5 5 2.5-5 2.5v-5Z" />
    </>
  ),
  /** Cube — 3D portfolio */
  cube: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </>
  ),
  /** Spark — early access */
  spark: (
    <>
      <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5l-1.9-5.7-5.6-1.9L10.1 9 12 3.5Z" />
      <path d="M18.5 16.5v4M16.5 18.5h4" />
    </>
  ),
  /** Ticket — partner discount / credit */
  ticket: (
    <>
      <path d="M3.5 9V6.5h17V9a3 3 0 0 0 0 6v2.5h-17V15a3 3 0 0 0 0-6Z" />
      <path d="M14 6.5v2M14 11v2M14 15.5v2" />
    </>
  ),
  /** Phone outline — responsive */
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  /** Magnifier — SEO / search */
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  /** Bolt — speed */
  bolt: <path d="M13 2.5 5 13.5h6l-1 8 8-11h-6l1-8Z" />,
  /** Sliders — CMS */
  sliders: (
    <>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </>
  ),
  /** Image tiles — portfolio */
  gallery: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </>
  ),
  /** Speech bubble — AI 상담 */
  chat: (
    <>
      <path d="M20.5 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.6A8 8 0 1 1 20.5 11.5Z" />
      <path d="M9 11.5h.01M12.5 11.5h.01M16 11.5h.01" />
    </>
  ),
  /** Window — homepage */
  window: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18M6.5 6.8h.01M9 6.8h.01" />
    </>
  ),
  /** Stacked layers — structured data */
  layers: (
    <>
      <path d="m12 3.5 8.5 4.5L12 12.5 3.5 8 12 3.5Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />
    </>
  ),
  /** Shield with check — install & QA */
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.4 3.1 7.9 7.5 9.5 4.4-1.6 7.5-5.1 7.5-9.5V6L12 3Z" />
      <path d="m9 12 2.2 2.2L15.2 10" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof PATHS;

export function Icon({ name, className = "size-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`flex-none ${className}`}
    >
      {PATHS[name]}
    </svg>
  );
}
