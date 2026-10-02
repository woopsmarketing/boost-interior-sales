/** Compact label beside a product name ("인기상품"). The words are in the DOM; the colour only adds emphasis. */
export function Badge({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span
      className={`inline-flex h-[22px] flex-none items-center rounded-pill bg-accent px-2 text-[12px] leading-none font-bold whitespace-nowrap text-white ${className}`}
    >
      {children}
    </span>
  );
}
