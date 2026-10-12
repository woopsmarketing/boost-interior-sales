import type { Film } from "@/lib/film";
import { FilmPlayer } from "./FilmPlayer";
import { MediaNote } from "./MediaNote";

/**
 * A reel the product made, as it came out: played on a press, kept in the page, with what its
 * photos are as body-size text under it. Nothing inside the reel says so, so the note is not
 * optional here (the pack asks for 14px or more).
 */
export function ReelCard({
  reel,
  title,
  facts,
  sizes,
  className = "",
}: {
  reel: Film;
  /** The reel's kind, as the product names it */
  title: string;
  /** "사진 13장 → 32초 영상" */
  facts: string;
  sizes: string;
  className?: string;
}) {
  return (
    <figure className={`m-0 ${className}`}>
      <FilmPlayer film={reel} label={`제품이 만든 ${title} 영상`} sizes={sizes} inline rewind cue="bottom" className="aspect-[9/16] rounded-xl ring-1 ring-white/10" />
      <figcaption className="mt-4">
        <p className="m-0 text-[12px] leading-none font-bold tracking-[0.02em] text-blue-300">제품이 만든 영상</p>
        <p className="mt-2 mb-0 text-[16px] leading-[1.4] font-bold text-white mobile:text-[15px]">{title}</p>
        <p className="mt-0.5 mb-0 text-[14px] leading-[1.5] text-gray-300 mobile:text-[13px]">{facts}</p>
        <MediaNote tone="dark" size="body" className="mt-2">
          {reel.note}
        </MediaNote>
      </figcaption>
    </figure>
  );
}
