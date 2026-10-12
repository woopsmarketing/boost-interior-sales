import { SITE_NAME } from "@/lib/site";

const WHO = { owner: "대표님", us: SITE_NAME } as const;

/**
 * How a homepage build goes — "how much of this lands on me?": each step says who does it. No
 * number of days anywhere: none is fixed.
 */
export function BuildSteps({ steps }: { steps: readonly { by: keyof typeof WHO; title: string }[] }) {
  return (
    <ol data-reveal className="m-0 mt-10 list-none border-t border-line-strong p-0 mobile:mt-6">
      {steps.map((step, i) => (
        <li key={step.title} className="flex items-center gap-5 border-b border-line-strong py-5 mobile:gap-4 mobile:py-3.5">
          <span
            aria-hidden="true"
            className={`grid size-9 flex-none place-items-center rounded-pill font-mono text-[14px] leading-none font-medium ${
              step.by === "owner" ? "bg-accent text-white" : "bg-white text-ink shadow-hairline"
            }`}
          >
            {i + 1}
          </span>
          <p className="m-0 flex flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
            <span className="text-[19px] leading-[1.4] font-semibold tracking-[-0.02em] text-ink mobile:text-[16.5px]">{step.title}</span>
            <span
              className={`inline-flex h-[26px] flex-none items-center rounded-pill px-2.5 text-[12px] leading-none font-semibold whitespace-nowrap ${
                step.by === "owner" ? "bg-accent-soft text-blue-700" : "bg-gray-150 text-muted"
              }`}
            >
              {WHO[step.by]}
            </span>
          </p>
        </li>
      ))}
    </ol>
  );
}
