import { Br } from "@/components/ui/Br";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { PROBLEM } from "@/lib/home";

function FlowColumn({
  title,
  lead,
  steps,
  on = false,
}: {
  title: string;
  lead: string;
  steps: readonly string[];
  on?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-10 narrow:p-8 mobile:px-5 mobile:py-5 ${
        on ? "border-blue-200 bg-white shadow-window" : "border-line-strong bg-transparent"
      }`}
    >
      <h3 className={`m-0 text-[15px] leading-[1.4] font-bold ${on ? "text-accent" : "text-muted"}`}>{title}</h3>
      <p className={`mt-1.5 mb-0 text-[15px] leading-[1.4] font-medium ${on ? "text-body" : "text-muted"}`}>{lead}</p>
      <ol className="mt-6 mb-0 list-none p-0 mobile:mt-4">
        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          const dot = on
            ? last
              ? "size-3.5 mt-[7px] bg-accent"
              : "size-2.5 mt-[9px] border-2 border-accent bg-white"
            : last
              ? "size-3.5 mt-[7px] bg-gray-400"
              : "size-2.5 mt-[9px] border-2 border-gray-400 bg-page";
          const text = on
            ? last
              ? "font-bold text-accent"
              : "font-medium text-ink"
            : last
              ? "font-bold text-muted"
              : "font-medium text-muted";
          return (
            <li key={step} className="flex items-stretch gap-4">
              <div aria-hidden="true" className="flex w-3.5 flex-none flex-col items-center">
                <span className={`flex-none rounded-pill ${dot}`} />
                {!last && (
                  <span
                    className={`my-1 w-0 flex-1 border-l-2 ${on ? "border-solid border-blue-200" : "border-dashed border-gray-300"}`}
                  />
                )}
              </div>
              <span className={`pt-1 text-[20px] leading-[1.4] tracking-[-0.02em] mobile:text-[16px] ${last ? "" : "pb-[18px] mobile:pb-2.5"} ${text}`}>
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * 왜 필요한가 — one section for the problem and the difference: what a visitor has to do alone on a
 * homepage today, next to the same visit with BoostInterior. No statistic and no promised result.
 */
export function Problem() {
  const { before, after } = PROBLEM;
  return (
    <Section id="problem" aria-labelledby="problem-title" pt="pt-36 mobile:pt-16" pb="pb-0">
      <div data-reveal>
        <SceneHeader
          eyebrow="왜 필요한가"
          titleId="problem-title"
          titleClassName="mobile:text-[28px]"
          title={
            <>
              고객은 견적 문의를 남기기 전까지 <Br />
              생각보다 많은 판단을 해야 합니다.
            </>
          }
          sub="홈페이지를 새로 만들지 않아도, 지금 홈페이지에 상담까지의 흐름을 연결할 수 있습니다."
          subClassName="mobile:text-[16px]"
        />
      </div>
      <div data-reveal className="mt-12 grid grid-cols-2 items-stretch gap-8 narrow:gap-5 mobile:mt-6 mobile:grid-cols-1 mobile:gap-3">
        <FlowColumn title={before.title} lead={before.lead} steps={before.items} />
        <FlowColumn title={after.title} lead={after.lead} steps={after.items} on />
      </div>
    </Section>
  );
}
