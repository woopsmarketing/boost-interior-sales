/** Questions and answers as native <details>: every answer is in the HTML and it works without JavaScript. */
export function FaqList({ items, className = "" }: { items: readonly { q: string; a: string }[]; className?: string }) {
  return (
    <div className={`grid gap-3 ${className}`}>
      {items.map((item) => (
        <details key={item.q} className="group rounded-xl bg-white shadow-md">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-5 px-7 py-6 text-[18px] leading-[1.5] font-bold tracking-[-0.01em] text-ink mobile:px-5 mobile:py-5 mobile:text-[16px] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden="true"
              className="mt-0.5 flex-none text-[22px] leading-none font-medium text-muted transition-transform duration-160 ease-out group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="m-0 border-t border-line px-7 py-6 text-[16px] leading-[1.75] text-pretty text-body mobile:px-5 mobile:py-5 mobile:text-[15px]">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
