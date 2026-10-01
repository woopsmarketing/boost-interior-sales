import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { COMMON_BUILD, PLANS, SETUP_OPTIONS, VAT_NOTICE, won } from "@/lib/pricing";
import { DEMO_URL, KAKAO_OPEN_CHAT_URL, SITE_NAME } from "@/lib/site";

const [INTEGRATION] = SETUP_OPTIONS;
const [CORE] = PLANS;

const KINDS = [
  {
    when: "한 번만",
    name: "초기 구축비",
    meaning: "우리 업체에 맞게 처음 세팅하는 비용",
    what: `${COMMON_BUILD} + 홈페이지 작업`,
    price: `${won(INTEGRATION.price)}원부터`,
  },
  {
    when: "매월",
    name: "월 운영료",
    meaning: "구축된 시스템을 계속 사용하는 비용",
    what: "AI 상담 및 선택한 기능 운영",
    price: `월 ${won(CORE.price)}원부터`,
  },
];

/** /pricing hero — what the page answers, and the two ways out: 상담 and the live demo. */
export function PricingHero() {
  return (
    <section
      id="top"
      aria-labelledby="pricing-hero-title"
      className="mx-auto max-w-[1440px] px-20 pt-[148px] pb-4 mobile:px-5 mobile:pt-[104px] mobile:pb-0"
    >
      <SceneHeader
        as="h1"
        titleId="pricing-hero-title"
        eyebrow={`${SITE_NAME} Pricing`}
        className="max-w-[860px]"
        title={
          <>
            필요한 만큼만 구축하고, <br />
            필요한 만큼만 운영하세요.
          </>
        }
        sub={
          <>
            {SITE_NAME}는 초기 구축과 월 운영을 분리합니다. <Br />
            현재 홈페이지 상태에 맞는 구축 방식을 선택하고, 필요한 기능과 운영 수준에 맞는 플랜을 선택할 수 있습니다.
          </>
        }
        subClassName="mobile:text-[17px]"
      />
      <div className="mt-9 flex flex-wrap gap-3 max-[480px]:grid">
        <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" arrow>
          내 홈페이지 기준으로 추천받기
        </ButtonLink>
        <ButtonLink href={DEMO_URL} external size="lg" variant="secondary">
          실제 데모 보기
        </ButtonLink>
      </div>
    </section>
  );
}

/** Why there are two prices: a one-time setup, plus a monthly plan for running what was set up. Both include VAT. */
export function TwoPrices() {
  return (
    <Section id="two-prices" aria-labelledby="two-prices-title" pt="pt-24 mobile:pt-14" pb="pb-0">
      <div data-reveal>
        <SceneHeader
          size="md"
          eyebrow="비용 구조"
          titleId="two-prices-title"
          title="비용은 두 가지로 나뉩니다."
          sub="처음 한 번 구축하고, 구축된 시스템을 매월 사용합니다."
          subClassName="text-[18px] mobile:text-[16px]"
        />
      </div>
      <div
        data-reveal
        className="mt-10 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-5 mobile:mt-7 mobile:grid-cols-1 mobile:gap-3"
      >
        {KINDS.map((kind, i) => (
          <div key={kind.name} className="contents">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="grid size-11 place-items-center self-center justify-self-center rounded-pill bg-gray-900 text-[22px] leading-none font-medium text-white mobile:size-9 mobile:text-[18px]"
              >
                +
              </span>
            )}
            <div className="rounded-xl bg-white p-9 shadow-md mobile:p-6">
              <p className="m-0 flex items-center gap-2.5">
                <span className="inline-flex h-[26px] items-center rounded-pill bg-accent-soft px-2.5 text-[12px] leading-none font-semibold whitespace-nowrap text-blue-700">
                  {kind.when}
                </span>
                <span className="text-[15px] leading-none font-bold text-muted">{kind.name}</span>
              </p>
              <p className="mt-5 mb-0 text-[26px] leading-[1.35] font-bold tracking-[-0.025em] text-balance text-ink mobile:text-[21px]">
                {kind.meaning}
              </p>
              <p className="mt-5 mb-0 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line pt-5">
                <span className="text-[16px] leading-[1.5] text-body">{kind.what}</span>
                <span className="text-[16px] leading-[1.5] font-bold whitespace-nowrap text-ink">{kind.price}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div data-reveal className="mt-5 mobile:mt-3">
        <Notice className="w-fit font-semibold text-ink">{VAT_NOTICE.all}</Notice>
      </div>
      <p data-reveal className="mt-5 mb-0 max-w-[820px] text-[15px] leading-[1.7] text-muted">
        예를 들어 {INTEGRATION.name}({won(INTEGRATION.price)}원, 한 번)으로 구축하고 {CORE.name}(월 {won(CORE.price)}원)로
        운영할 수 있습니다. 구축 방식과 운영 플랜은 서로 독립적으로 선택합니다.
      </p>
    </Section>
  );
}
