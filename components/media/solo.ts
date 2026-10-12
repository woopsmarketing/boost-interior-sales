import { hold } from "./stage";

/**
 * One film the visitor started plays at a time: starting another pauses the one before it. Every
 * click-to-play player on the page goes through here. While one of them runs, the films that play
 * by themselves (components/media/stage.ts) wait.
 */
let current: HTMLVideoElement | null = null;

/** Call when a film starts playing. */
export function solo(video: HTMLVideoElement) {
  if (current && current !== video) current.pause();
  current = video;
  hold(true);
}

/** Call when a film pauses or ends: the films that play by themselves may go on. */
export function idle(video: HTMLVideoElement) {
  if (current === video) hold(false);
}

/** The visitor pressed play on a film that plays by itself: the one they started before stops for it. */
export function giveWay() {
  if (!current) return;
  current.pause();
  hold(false);
}

/** Call when a player goes away, or fails. */
export function release(video: HTMLVideoElement) {
  if (current !== video) return;
  current = null;
  hold(false);
}
