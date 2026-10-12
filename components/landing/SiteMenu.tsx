"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

/** From here up the bar shows its links and this menu is hidden (`min-[1024px]:hidden` below). */
const WIDE_QUERY = "(min-width: 1024px)";

export interface MenuItem {
  label: string;
  href: string;
  /** `aria-current` of the link: the page itself, or ("true") the section the page belongs to. */
  current?: "page" | "true";
}

/**
 * The menu below 1024px, where the bar has no room for its links: one button, and under it every
 * page the bar links to in full-width rows a thumb can hit, with 문의 last.
 * It closes on a choice, on Escape, on a press outside it, when the keyboard focus moves on past its
 * last row, and when the window grows wide enough for the bar's own links. While it is open the bar
 * is solid, so the rows never sit on top of the page's own text.
 */
export function SiteMenu({ items, contact }: { items: readonly MenuItem[]; contact: { label: string; href: string } }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    const bar = root.current?.closest("header");
    bar?.toggleAttribute("data-open", open);
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onPress = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onFocus = (event: FocusEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const wide = window.matchMedia(WIDE_QUERY);
    const onWide = () => {
      if (wide.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPress);
    document.addEventListener("focusin", onFocus);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPress);
      document.removeEventListener("focusin", onFocus);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <div ref={root} className="min-[1024px]:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className="grid size-11 cursor-pointer place-items-center rounded-pill border border-line-strong bg-white text-ink transition-colors duration-160 ease-out hover:bg-gray-25"
      >
        <span className="sr-only">{open ? "메뉴 닫기" : "메뉴 열기"}</span>
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {open ? (
            <path d="M4 4l10 10M14 4 4 14" />
          ) : (
            <path d="M2.5 5h13M2.5 9h13M2.5 13h13" />
          )}
        </svg>
      </button>

      <div
        id={id}
        hidden={!open}
        className="absolute inset-x-0 top-16 max-h-[calc(100dvh-64px)] overflow-y-auto border-b border-line bg-page px-5 pt-2 pb-5 shadow-md"
      >
        <ul className="m-0 list-none p-0">
          {items.map((item) => (
            <li key={item.href} className="border-b border-line">
              <Link
                href={item.href}
                aria-current={item.current}
                onClick={() => setOpen(false)}
                className={`flex min-h-[52px] items-center justify-between text-[17px] leading-none no-underline hover:text-ink ${
                  item.current ? "font-bold text-accent" : "font-semibold text-ink"
                }`}
              >
                {item.label}
                <span aria-hidden="true" className="text-[15px] text-faint">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={contact.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="mt-4 flex h-[52px] items-center justify-center rounded-pill bg-accent text-[16px] leading-none font-semibold text-white no-underline hover:bg-accent-hover hover:text-white"
        >
          {contact.label}
          <span className="sr-only"> (새 창에서 열림)</span>
        </a>
      </div>
    </div>
  );
}
