/**
 * The films that play by themselves share one stage: at most one of them plays at a time — the one
 * most in view — and none plays while a film the visitor started is running or the tab is hidden.
 * Each AutoFilm joins with what it can do (play, pause) and reports how much of it is on screen;
 * the stage decides. Nothing here fetches a file: a film that is told to play and has no player yet
 * simply does nothing until it has one.
 */

export interface Player {
  /** Start, if it has a player and the visitor has not stopped it. */
  play(): void;
  pause(): void;
  /** False while the visitor has paused it or it waits for a press: the stage then skips it. */
  ready(): boolean;
  /** Share of it that has to be on screen before it may play, where that is not `ENOUGH`. */
  enough?: number;
}

/** Share of the film that has to be on screen before it may play. */
const ENOUGH = 0.5;
/**
 * The page's first film sits under the headline, and a laptop's first screen ends partway down it:
 * it plays as soon as this much of it shows, so the first screen is not a still with a play button.
 */
export const GLIMPSE = 0.15;
/** How much more of another film has to be on screen before it takes over from the one playing. */
const LEAD = 0.15;

const share = new Map<Player, number>();
/** The film the visitor started by hand. It keeps the stage while it is on screen at all. */
let chosen: Player | null = null;
let playing: Player | null = null;
/** A click-to-play film is running. */
let busy = false;

function pick(): Player | null {
  if (busy || document.hidden) return null;
  if (chosen && (share.get(chosen) ?? 0) > 0 && chosen.ready()) return chosen;
  let best: Player | null = null;
  let most = 0;
  // Map keeps the order the films joined in, which is the order of the page: on a tie the upper one wins.
  for (const [player, ratio] of share) {
    if (ratio >= (player.enough ?? ENOUGH) && ratio > most && player.ready()) {
      best = player;
      most = ratio;
    }
  }
  // Two films about equally in view: the one already playing keeps going, so a slow scroll does not flip between them.
  const current = playing ? (share.get(playing) ?? 0) : 0;
  if (playing && best !== playing && current >= ENOUGH && most < current + LEAD && playing.ready()) return playing;
  return best;
}

/** Re-decide who plays. Safe to call at any time and as often as needed. */
export function settle() {
  const next = pick();
  if (playing && playing !== next) playing.pause();
  playing = next;
  next?.play();
}

export function join(player: Player) {
  share.set(player, 0);
  return () => {
    share.delete(player);
    if (chosen === player) chosen = null;
    if (playing === player) playing = null;
    settle();
  };
}

/** How much of the film is on screen, 0–1. */
export function seen(player: Player, ratio: number) {
  if (!share.has(player)) return;
  share.set(player, ratio);
  if (chosen === player && ratio === 0) chosen = null;
  settle();
}

/** The visitor pressed play on this one: it plays now, whatever else is on screen. */
export function choose(player: Player) {
  chosen = player;
  settle();
}

/** The visitor paused this one: it gives up the stage, and no other film takes its place under the visitor's eyes. */
export function rest(player: Player) {
  if (chosen === player) chosen = null;
  if (playing === player) playing = null;
}

/** A film the visitor started is running (true) or has stopped (false). */
export function hold(on: boolean) {
  if (busy === on) return;
  busy = on;
  settle();
}

if (typeof document !== "undefined") document.addEventListener("visibilitychange", settle);
