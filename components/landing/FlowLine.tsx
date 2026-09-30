import type { CSSProperties } from "react";

const FLOW = ["대화", "관련 사례", "사진", "상담", "견적 문의"];

/**
 * Hero flow pills. The active step cycles every 1.8s with a pure CSS animation
 * (no JS, no re-render). Reduced motion: no cycling — the first step stays highlighted.
 */
export function FlowLine() {
  return (
    <ol aria-label="상담 흐름" className="m-0 flex list-none flex-wrap items-center gap-x-3 gap-y-2.5 p-0">
      {FLOW.map((step, i) => {
        const delay = { animationDelay: `${i * 1.8}s` } as CSSProperties;
        const first = i === 0;
        return (
          <li key={step} className="flex items-center gap-3">
            <span
              style={delay}
              className={`inline-flex h-9 items-center gap-2 rounded-pill bg-white pr-3.5 pl-2 text-[14px] leading-none font-semibold text-body shadow-hairline motion-safe:animate-flow-pill ${
                first ? "motion-reduce:bg-ink motion-reduce:text-white motion-reduce:shadow-none" : ""
              }`}
            >
              <span
                style={delay}
                className={`inline-grid size-[22px] place-items-center rounded-pill bg-gray-100 font-mono text-[11px] leading-none font-semibold text-muted motion-safe:animate-flow-badge ${
                  first ? "motion-reduce:bg-accent motion-reduce:text-white" : ""
                }`}
              >
                {i + 1}
              </span>
              {step}
            </span>
            {i < FLOW.length - 1 && (
              <span aria-hidden="true" className="text-[14px] text-faint">
                →
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
