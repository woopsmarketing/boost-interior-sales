import { Br } from "@/components/ui/Br";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";

const JOURNEY = ["시공사례 찾기", "우리 집과 비슷한지 판단", "공사 범위 고민", "문의 방법 찾기", "견적 작성"];

/** 문제 — the judgments a visitor makes before leaving a quote request. */
export function Problem() {
  return (
    <Section id="problem" aria-labelledby="problem-title">
      <div data-reveal>
        <SceneHeader
          eyebrow="견적 문의 전까지"
          titleId="problem-title"
          title={
            <>
              고객은 견적 문의를 남기기 전까지 <Br />
              생각보다 많은 판단을 해야 합니다.
            </>
          }
        />
      </div>

      <div data-reveal className="mt-18 mobile:mt-10">
        <ol className="m-0 grid list-none grid-cols-5 gap-4 p-0 mobile:grid-cols-1 mobile:gap-0">
          {JOURNEY.map((step, i) => (
            <li
              key={step}
              className={`flex flex-col items-start gap-[18px] mobile:flex-row mobile:items-center mobile:gap-4 mobile:py-3.5 ${
                i ? "mobile:border-t mobile:border-line" : ""
              }`}
            >
              <div className="flex w-full items-center gap-3 mobile:w-auto">
                <span className="font-mono text-[13px] leading-none font-medium text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-line-strong mobile:hidden" />
                {i < JOURNEY.length - 1 && (
                  <span aria-hidden="true" className="-ml-1 text-[14px] text-faint mobile:hidden">
                    →
                  </span>
                )}
              </div>
              <span className="text-[22px] leading-[1.35] font-semibold tracking-[-0.02em] text-ink mobile:text-[18px]">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div data-reveal className="mt-14 mobile:mt-8">
        <p className="m-0 flex items-center gap-4 rounded-pill border border-blue-200 bg-white px-8 py-[22px] shadow-window mobile:rounded-xl mobile:px-[22px] mobile:py-[18px]">
          <span aria-hidden="true" className="size-2.5 flex-none rounded-pill bg-accent" />
          <span className="text-[22px] leading-[1.4] font-semibold tracking-[-0.02em] text-ink mobile:text-[17px]">
            BoostInterior는 이 과정을 <span className="text-accent">하나의 대화</span> 안에서 이어줍니다.
          </span>
        </p>
      </div>
    </Section>
  );
}
