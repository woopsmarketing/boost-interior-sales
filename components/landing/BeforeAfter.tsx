import { Br } from "@/components/ui/Br";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";

const BEFORE = ["방문", "시공사례 탐색", "내 조건과 맞는지 판단", "문의 방법 찾기", "견적 양식"];
const AFTER = ["방문", "원하는 공사 말하기", "관련 사례 추천", "사진 확인", "상담", "견적 문의"];

function FlowColumn({ title, steps, on = false }: { title: string; steps: string[]; on?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-10 mobile:p-6 ${
        on ? "border-blue-200 bg-white shadow-window" : "border-line-strong bg-transparent"
      }`}
    >
      <h3 className={`m-0 text-[15px] leading-[1.4] font-bold ${on ? "text-accent" : "text-muted"}`}>{title}</h3>
      <ol className="mt-6 mb-0 list-none p-0">
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
              <div aria-hidden="true" className="flex w-3.5 flex-col items-center">
                <span className={`flex-none rounded-pill ${dot}`} />
                {!last && (
                  <span
                    className={`my-1 w-0 flex-1 border-l-2 ${on ? "border-solid border-blue-200" : "border-dashed border-gray-300"}`}
                  />
                )}
              </div>
              <span className={`pt-1 pb-[18px] text-[20px] leading-[1.4] tracking-[-0.02em] mobile:text-[17px] ${text}`}>
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** 비교 — existing homepage flow vs. with BoostChat. */
export function BeforeAfter() {
  return (
    <Section id="compare" aria-labelledby="compare-title">
      <div data-reveal>
        <SceneHeader
          eyebrow="Before / After"
          titleId="compare-title"
          title={
            <>
              홈페이지를 새로 만드는 것이 아니라, <Br />
              상담까지의 흐름을 연결합니다.
            </>
          }
        />
      </div>
      <div data-reveal className="mt-16 grid grid-cols-2 items-start gap-8 mobile:mt-8 mobile:grid-cols-1 mobile:gap-4">
        <FlowColumn title="기존 홈페이지" steps={BEFORE} />
        <FlowColumn title="BoostChat 적용" steps={AFTER} on />
      </div>
    </Section>
  );
}
