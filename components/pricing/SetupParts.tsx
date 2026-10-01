import { won, type SetupOption } from "@/lib/pricing";

/** A–D marker, same as the landing's install paths. A is the accent: it is where most owners start. */
export function Letter({ option }: { option: SetupOption }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-7 flex-none place-items-center rounded-pill text-[13px] leading-none font-bold text-white ${
        option.key === "A" ? "bg-accent" : "bg-gray-900"
      }`}
    >
      {option.key}
    </span>
  );
}

/**
 * "290,000원" / "1,200,000원부터" — digits stay in one text node, so the amount reads and searches
 * as one number. `className` sizes the digits; 원 and 부터 scale down from it.
 */
export function SetupPrice({ option, className = "text-[24px]" }: { option: SetupOption; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap items-baseline text-ink ${className}`}>
      <span className="whitespace-nowrap">
        <span className="leading-none font-bold tracking-[-0.035em]">{won(option.price)}</span>
        <span className="ml-0.5 text-[0.62em] leading-none font-bold">원</span>
      </span>
      {option.from && <span className="ml-1 text-[0.54em] leading-none font-semibold text-body">부터</span>}
    </span>
  );
}
