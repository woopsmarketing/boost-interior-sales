/**
 * Frames and slots the landing's films share.
 * A film with a vertical cut is 16:9 until the phone breakpoint, where the vertical cut plays in a
 * phone-shaped frame (the `phone` variant and PORTRAIT_QUERY in lib/film.ts are the same query).
 */
export const FILM_FRAME = "aspect-video rounded-xl phone:mx-auto phone:aspect-[9/16] phone:max-w-[320px]";

/**
 * A short clip that plays by itself: 16:9, and its vertical cut on a phone in a frame a little
 * narrower than a full film's, so the text it belongs to stays on the screen with it.
 */
export const CLIP_FRAME = "aspect-video rounded-xl phone:mx-auto phone:aspect-[9/16] phone:max-w-[280px]";
/** `sizes` of a clip's vertical poster. */
export const CLIP_PORTRAIT_SLOT = "(max-width: 320px) calc(100vw - 40px), 280px";

/** `sizes` of a 16:9 poster in the wider column of a two-column row (7 of 12), which stacks at 1100px. */
export const COLUMN_SLOT = "(max-width: 820px) calc(100vw - 40px), (max-width: 1100px) calc(100vw - 160px), 720px";

/**
 * Keyboard focus on a control that fills a film's frame. The frame clips what is outside it, so the
 * ring is drawn inside: white, on a dark band so it shows on a light poster and a dark one alike.
 */
export const INSET_FOCUS =
  "rounded-[inherit] focus-visible:outline-white focus-visible:-outline-offset-4 focus-visible:shadow-[inset_0_0_0_6px_rgba(16,24,40,.6)]";
