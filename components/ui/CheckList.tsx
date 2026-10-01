export function Check({ className = "mt-[5px] size-3.5 text-accent" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={`flex-none ${className}`}>
      <path d="M3 8.4 6.4 11.6 13 4.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const COLUMNS = {
  none: { list: "", lead: "" },
  /** Two columns from 600px up */
  wide: { list: "min-[600px]:grid-cols-2 min-[600px]:gap-x-8", lead: "min-[600px]:col-span-2" },
  /** Two columns only between 600px and 1100px, where a card spans the full row */
  narrow: { list: "narrow:min-[600px]:grid-cols-2 narrow:min-[600px]:gap-x-8", lead: "narrow:min-[600px]:col-span-2" },
} as const;

/** Checked scope list. `lead` is the bold first row ("Core 전체 포함"). */
export function CheckList({
  items,
  lead,
  columns = "none",
  className = "",
}: {
  items: readonly string[];
  lead?: string;
  columns?: keyof typeof COLUMNS;
  className?: string;
}) {
  const cols = COLUMNS[columns];
  return (
    <ul className={`m-0 grid list-none gap-2.5 p-0 ${cols.list} ${className}`}>
      {lead && (
        <li className={`flex gap-2.5 text-[15px] leading-[1.5] font-bold text-ink ${cols.lead}`}>
          <Check />
          {lead}
        </li>
      )}
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[15px] leading-[1.5] text-body">
          <Check />
          {item}
        </li>
      ))}
    </ul>
  );
}
