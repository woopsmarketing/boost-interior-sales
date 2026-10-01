import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { KAKAO_OPEN_CHAT_URL, SITE_NAME } from "@/lib/site";

/** Planned, not promised in detail: terms are set by the platform's policy when it launches. */
const BENEFITS = ["우선 입점 기회", "초기 등록 지원", "기존 포트폴리오 이전 · 세팅 지원", "기본 입점 초기비용 면제"];

/** Founding Partner — what early adopters get if the interior platform launches. The only future-facing block on the page. */
export function Partner() {
  return (
    <Section id="partner" aria-labelledby="partner-title" pt="pt-20 mobile:pt-10">
      <div
        data-reveal
        className="rounded-2xl bg-inverse px-20 py-24 text-center text-white mobile:rounded-xl mobile:px-6 mobile:py-12 mobile:text-left"
      >
        <p className="m-0 text-[15px] leading-[1.4] font-bold text-blue-300">Founding Partner · 초기 파트너 모집</p>
        <h2
          id="partner-title"
          className="mt-3 mb-0 text-[52px] leading-[1.2] font-bold tracking-[-0.035em] text-balance narrow:text-[40px] mobile:text-[30px]"
        >
          {SITE_NAME} 초기 파트너를 모집하고 있습니다.
        </h2>
        <p className="mx-auto mt-4 mb-0 max-w-[760px] text-[20px] leading-[1.6] text-pretty text-gray-300 mobile:mx-0 mobile:text-[17px]">
          {SITE_NAME} 초기 도입 업체에는 향후 인테리어 플랫폼 출시 시 우선 입점과 초기 등록 · 세팅 혜택을 제공할
          예정입니다.
        </p>
        <div className="mt-10 mobile:mt-7">
          <p id="partner-benefits" className="m-0 text-[13px] leading-[1.4] font-semibold tracking-[0.02em] text-gray-400">
            플랫폼 출시 시 제공 예정
          </p>
          <ul
            aria-labelledby="partner-benefits"
            className="mt-3.5 mb-0 flex list-none flex-wrap items-center justify-center gap-2.5 p-0 mobile:justify-start"
          >
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="inline-flex min-h-10 items-center rounded-pill border border-white/14 bg-white/8 px-4 py-2 text-[15px] leading-[1.3] font-semibold"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 mb-0 text-[13px] leading-[1.6] text-gray-400">
          세부 혜택은 플랫폼 출시 시 운영정책에 따라 안내됩니다.
        </p>
        <div className="mt-10 mobile:mt-8">
          <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" arrow className="max-[480px]:w-full">
            카카오톡 1:1 도입 상담
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
