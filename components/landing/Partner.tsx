import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { KAKAO_OPEN_CHAT_URL } from "@/lib/site";

const STEPS = ["홈페이지 확인", "포트폴리오 연동", "상담창 세팅", "설치"];

/** 초기 파트너 모집 — early adopter offer. */
export function Partner() {
  return (
    <Section id="partner" aria-labelledby="partner-title" pt="pt-20 mobile:pt-10">
      <div
        data-reveal
        className="rounded-2xl bg-inverse px-20 py-24 text-center text-white mobile:rounded-xl mobile:px-6 mobile:py-12 mobile:text-left"
      >
        <p className="m-0 text-[15px] leading-[1.4] font-bold text-blue-300">초기 파트너 모집</p>
        <h2
          id="partner-title"
          className="mt-3 mb-0 text-[52px] leading-[1.2] font-bold tracking-[-0.035em] text-balance mobile:text-[30px]"
        >
          첫 도입 업체를 모집하고 있습니다.
        </h2>
        <p className="mt-4 mb-0 text-[20px] leading-[1.6] text-gray-300">초기 파트너에게는 아래 과정을 함께 진행합니다.</p>
        <ol className="mt-10 mb-0 flex list-none flex-wrap items-center justify-center gap-x-3 gap-y-2.5 p-0 mobile:mt-7 mobile:justify-start">
          {STEPS.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className="inline-flex h-10 items-center gap-2 rounded-pill border border-white/14 bg-white/8 pr-4 pl-2 text-[15px] leading-none font-semibold">
                <span className="inline-grid size-6 place-items-center rounded-pill bg-accent font-mono text-[11px] leading-none font-semibold">
                  {i + 1}
                </span>
                {step}
              </span>
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" className="text-gray-500">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-12 mobile:mt-8">
          <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" arrow>
            카카오톡 1:1 도입 상담
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
