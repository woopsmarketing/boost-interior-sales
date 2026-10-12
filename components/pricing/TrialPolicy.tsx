import { StatusChip } from "@/components/pricing/ProductParts";
import { TRIAL } from "@/lib/pricing";

/**
 * 14일 무료 체험 — the policy as it is decided, and that none of it can be started yet. It carries no
 * button: a "start" button would lead to a card form that does not exist. The way on is the 문의
 * button next to it, on every page that shows this.
 * `others` adds what is not decided for the other two subscriptions.
 */
export function TrialPolicy({ others = false, className = "" }: { others?: boolean; className?: string }) {
  return (
    <div className={className}>
      <p className="m-0 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
        <StatusChip status={TRIAL.status} />
        <span className="text-[17px] leading-[1.4] font-bold tracking-[-0.01em] text-ink">{TRIAL.title}</span>
      </p>
      <ol className="mt-4 mb-0 grid list-none gap-2 p-0">
        {TRIAL.steps.map((step, i) => (
          <li key={step} className="flex gap-3 text-[15px] leading-[1.55] text-body">
            <span aria-hidden="true" className="mt-[3px] font-mono text-[12px] leading-[1.6] font-medium text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <p className="mt-3 mb-0 text-[15px] leading-[1.55] font-semibold text-ink">{TRIAL.cancel}</p>
      <p className="mt-4 mb-0 rounded-lg bg-sunken px-4 py-3 text-[14px] leading-[1.6] text-pretty text-body">{TRIAL.notice}</p>
      {others && <p className="mt-3 mb-0 text-[14px] leading-[1.6] text-pretty text-muted">{TRIAL.others}</p>}
    </div>
  );
}
