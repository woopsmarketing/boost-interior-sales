"use client";

import { useId, useRef, useState, type ReactNode, type Ref } from "react";
import { flushSync } from "react-dom";
import { Icon } from "@/components/ui/Icon";

/**
 * Open / closed state for a "전체 … 보기" toggle. Where the detail opens above its button,
 * closing it would pull the button out from under the pointer, so the page scrolls with it
 * and the button stays where it was pressed.
 */
export function useDisclosure() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const toggle = () => {
    const button = ref.current;
    const before = button?.getBoundingClientRect().top ?? 0;
    flushSync(() => setOpen((value) => !value));
    const moved = (button?.getBoundingClientRect().top ?? 0) - before;
    if (moved < 0) window.scrollBy({ top: moved, behavior: "instant" });
  };
  return { open, toggle, ref };
}

const VARIANTS = {
  /** Stand-alone control inside a card */
  pill: "h-11 rounded-pill border border-line-strong bg-white px-5 hover:bg-gray-25",
  /** Full-width footer of a comparison card */
  bar: "min-h-14 w-full border-t border-line bg-white px-5 py-3 hover:bg-sunken",
} as const;

/** The toggle itself: a real <button> with aria-expanded, so Enter and Space work as expected. */
export function DisclosureButton({
  ref,
  open,
  controls,
  show,
  hide,
  context,
  variant = "pill",
  onClick,
}: {
  ref?: Ref<HTMLButtonElement>;
  open: boolean;
  /** id(s) of what the button shows and hides */
  controls: string;
  show: string;
  hide: string;
  /** Screen-reader prefix when several toggles on the page share a label, e.g. the option's name */
  context?: string;
  variant?: keyof typeof VARIANTS;
  onClick: () => void;
}) {
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-controls={controls}
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center justify-center gap-1.5 text-[15px] leading-[1.4] font-semibold tracking-[-0.01em] text-ink transition-colors duration-160 ease-out ${VARIANTS[variant]}`}
    >
      <span>
        {context && <span className="sr-only">{context} </span>}
        {open ? hide : show}
      </span>
      <Icon
        name="chevron"
        className={`size-[18px] text-muted transition-transform duration-160 ease-out motion-reduce:transition-none ${
          open ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}

/**
 * Summary first, detail on demand: a toggle with its detail right below it. The detail is
 * rendered on the server and stays in the HTML while closed.
 */
export function Disclosure({
  show,
  hide,
  context,
  actions,
  className = "",
  children,
}: {
  show: string;
  hide: string;
  context?: string;
  /** Sits next to the toggle, e.g. a link */
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const { open, toggle, ref } = useDisclosure();
  const id = useId();
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-3 max-[480px]:grid">
        <DisclosureButton ref={ref} open={open} controls={id} show={show} hide={hide} context={context} onClick={toggle} />
        {actions}
      </div>
      <div id={id} hidden={!open} className="motion-safe:animate-disclose">
        {children}
      </div>
    </div>
  );
}
