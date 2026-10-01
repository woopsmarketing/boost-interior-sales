import type { ReactNode } from "react";
import { Check } from "@/components/ui/CheckList";

/** A fact that holds for everything around it (VAT, the portfolio policy), set apart from the body copy. */
export function Notice({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`mb-0 flex gap-2.5 rounded-lg border border-blue-200 bg-accent-soft px-5 py-4 text-[15px] leading-[1.6] text-body ${className}`}
    >
      <Check className="mt-[5px] size-3.5 text-accent" />
      <span>{children}</span>
    </p>
  );
}
