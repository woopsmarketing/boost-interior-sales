import type { Film } from "@/lib/film";
import { AutoFilm } from "./AutoFilm";

const WIDE_SIZES = "(max-width: 820px) calc(100vw - 40px), (max-width: 1360px) calc(100vw - 160px), 1200px";

/**
 * The hero's brand film. It is the same player as the short clips further down (AutoFilm): muted,
 * inline, looping, one film playing at a time. What differs is the start: its poster is the first
 * screen's largest image and is fetched with the page, and the film itself waits until the page has
 * loaded and gone idle.
 */
export function HeroFilm({ film, label, className = "" }: { film: Film; label: string; className?: string }) {
  return <AutoFilm film={film} label={label} name="소개 영상" sizes={WIDE_SIZES} priority className={className} />;
}
