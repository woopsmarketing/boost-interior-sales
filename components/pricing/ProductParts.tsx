import { STATUS_LABEL, won, type Availability, type Status, type Subscription } from "@/lib/pricing";

const CHIP = {
  light: { now: "bg-accent-soft text-blue-700", planned: "bg-gray-150 text-body", unsupported: "bg-gray-150 text-muted" },
  dark: { now: "bg-white/12 text-blue-300", planned: "bg-white/10 text-gray-300", unsupported: "bg-white/10 text-gray-400" },
} as const satisfies Record<string, Record<Status, string>>;

/** "지금 이용 가능" / "출시 예정" / "현재 미지원" — the words are the status; the colour only sets today apart from not yet. */
export function StatusChip({ status, tone = "light" }: { status: Status; tone?: keyof typeof CHIP }) {
  return (
    <span
      className={`inline-flex h-[24px] flex-none items-center rounded-pill px-2.5 text-[12px] leading-none font-bold whitespace-nowrap ${CHIP[tone][status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

/** Where a product works today and what is not released yet, one row each: the status first, then what it is about. */
export function AvailabilityList({
  items,
  tone = "light",
  className = "",
}: {
  items: readonly Availability[];
  tone?: keyof typeof CHIP;
  className?: string;
}) {
  return (
    <ul className={`m-0 grid list-none gap-2 p-0 ${className}`}>
      {items.map((item) => (
        <li key={item.text} className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <StatusChip status={item.status} tone={tone} />
          <span className={`text-[14px] leading-[1.5] ${tone === "dark" ? "text-gray-300" : "text-body"}`}>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * "월 29,700원" — digits stay in one text node, so the amount reads and searches as one number.
 * `className` sizes the digits; 월 and 원 scale down from it.
 */
export function MonthlyPrice({ item, className = "text-[32px]", tone = "light" }: { item: Subscription; className?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <span className={`inline-flex items-baseline whitespace-nowrap ${dark ? "text-white" : "text-ink"} ${className}`}>
      <span className={`mr-1.5 text-[max(0.5em,14px)] leading-none font-semibold ${dark ? "text-gray-300" : "text-body"}`}>월</span>
      <span className="leading-none font-bold tracking-[-0.035em]">{won(item.price)}</span>
      <span className="ml-0.5 text-[0.62em] leading-none font-bold">원</span>
    </span>
  );
}
