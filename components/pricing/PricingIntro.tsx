import Link from "next/link";
import { Letter, SetupPrice } from "@/components/pricing/SetupParts";
import { ButtonLink } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { COMMON_BUILD, PLANS, SETUP_OPTIONS, VAT_NOTICE, won } from "@/lib/pricing";
import {
  COMMON_SCOPE_ID,
  COMPARISON_ID,
  DEMO_LABEL,
  DEMO_URL,
  KAKAO_NOTE,
  KAKAO_OPEN_CHAT_URL,
  KAKAO_RECOMMEND_LABEL,
  PORTFOLIO_VIDEO_ID,
  PRICING_FAQ_ID,
  PRICING_PATH,
  SETUP_COMPARISON_ID,
  SITE_NAME,
} from "@/lib/site";

/** The blocks the summary jumps to. The option and plan rows above them link to their own cards. */
const JUMPS = [
  { label: `공통 ${COMMON_BUILD}`, id: COMMON_SCOPE_ID },
  { label: "구축 방식 비교", id: SETUP_COMPARISON_ID },
  { label: "플랜별 기능 비교", id: COMPARISON_ID },
  { label: "AI Portfolio Video", id: PORTFOLIO_VIDEO_ID },
  { label: "자주 묻는 질문", id: PRICING_FAQ_ID },
];

const TAG =
  "inline-flex h-[26px] items-center rounded-pill bg-accent-soft px-2.5 text-[12px] leading-none font-semibold whitespace-nowrap text-blue-700";
const ROW =
  "group flex min-h-12 items-center justify-between gap-4 border-t border-line py-2.5 no-underline transition-colors duration-160 ease-out";
const NAME = "text-[16px] leading-[1.4] font-bold tracking-[-0.01em] text-ink underline-offset-4 group-hover:underline mobile:text-[15px]";

/** The way back to the page the choice is made on. Said at the top and again at the end. */
export function BackToPricing({ className = "" }: { className?: string }) {
  return (
    <Link
      href={PRICING_PATH}
      className={`group inline-flex min-h-11 items-center gap-1.5 text-[15px] leading-[1.4] font-semibold text-link no-underline ${className}`}
    >
      <span aria-hidden="true" className="transition-transform duration-160 ease-out group-hover:-translate-x-0.5">
        ←
      </span>
      <span className="underline-offset-4 group-hover:underline">가격 한눈에 보기로 돌아가기</span>
    </Link>
  );
}

/** /pricing/details hero — what this page is for, the way back to the summary, and the two ways out. */
export function DetailsHero() {
  return (
    <section
      id="top"
      aria-labelledby="pricing-hero-title"
      className="mx-auto max-w-[1440px] px-20 pt-[116px] pb-4 mobile:px-5 mobile:pt-[84px] mobile:pb-0"
    >
      <p className="mt-0 mb-5 mobile:mb-3">
        <BackToPricing />
      </p>
      <SceneHeader
        as="h1"
        titleId="pricing-hero-title"
        eyebrow={`${SITE_NAME} 상세 가격`}
        className="max-w-[860px]"
        title={
          <>
            구축 방식과 운영 플랜, <br />
            포함 범위를 모두 확인하세요.
          </>
        }
        sub="결정하기 전에 정확한 범위를 확인하는 페이지입니다. 구축 방식마다 무엇이 포함되는지, 플랜은 어떻게 다른지 항목별로 정리했습니다."
        subClassName="mobile:text-[17px]"
      />
      <div className="mt-9 flex flex-wrap gap-3 max-[480px]:grid mobile:mt-7">
        <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" arrow>
          {KAKAO_RECOMMEND_LABEL}
        </ButtonLink>
        <ButtonLink href={DEMO_URL} external size="lg" variant="secondary">
          {DEMO_LABEL}
        </ButtonLink>
      </div>
      <p className="mt-3 mb-0 text-[13px] leading-[1.6] text-muted">{KAKAO_NOTE}</p>
    </section>
  );
}

/**
 * The page in one block: the two kinds of price with every amount under them, each a link to its
 * part of the page, and the jumps to the comparisons and the questions. Both prices include VAT.
 */
export function TwoPrices() {
  return (
    <Section id="two-prices" aria-labelledby="two-prices-title" pt="pt-20 mobile:pt-12" pb="pb-0">
      <div data-reveal className="rounded-2xl bg-white p-12 shadow-md narrow:p-9 mobile:rounded-xl mobile:p-6">
        <p className="m-0 text-[14px] leading-[1.4] font-bold text-accent">한눈에 요약</p>
        <h2
          id="two-prices-title"
          className="mt-2 mb-0 text-[30px] leading-[1.3] font-bold tracking-[-0.03em] text-balance text-ink mobile:text-[22px]"
        >
          비용은 처음 한 번의 구축비와 매월의 운영 플랜, 두 가지입니다.
        </h2>
        <p className="mt-3 mb-0 max-w-[820px] text-[16px] leading-[1.7] text-pretty text-body mobile:text-[15px]">
          구축 방식과 운영 플랜은 서로 독립적으로 선택합니다. 어떤 구축 방식을 골라도 {COMMON_BUILD}은 동일하게 포함됩니다.
        </p>

        <div className="mt-9 grid grid-cols-2 gap-x-14 gap-y-9 narrow:grid-cols-1 mobile:mt-7 mobile:gap-y-7">
          <div role="group" aria-labelledby="summary-setup">
            <p id="summary-setup" className="m-0 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 pb-3.5">
              <span className={TAG}>한 번만</span>
              <span className="text-[15px] leading-[1.4] font-bold text-ink">초기 구축비</span>
              <span className="text-[14px] leading-[1.4] text-muted">우리 업체에 맞게 처음 세팅하는 비용</span>
            </p>
            <ul className="m-0 list-none border-b border-line p-0">
              {SETUP_OPTIONS.map((option) => (
                <li key={option.key}>
                  <a href={`#${option.id}`} className={ROW}>
                    <span className="flex items-center gap-2.5">
                      <Letter option={option} />
                      <span className={NAME}>{option.name}</span>
                    </span>
                    <SetupPrice option={option} className="text-[20px] mobile:text-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div role="group" aria-labelledby="summary-plans">
            <p id="summary-plans" className="m-0 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 pb-3.5">
              <span className={TAG}>매월</span>
              <span className="text-[15px] leading-[1.4] font-bold text-ink">월 운영료</span>
              <span className="text-[14px] leading-[1.4] text-muted">구축된 시스템을 계속 사용하는 비용</span>
            </p>
            <ul className="m-0 list-none border-b border-line p-0">
              {PLANS.map((plan) => (
                <li key={plan.name}>
                  <a href={`#plan-${plan.name.toLowerCase()}`} className={ROW}>
                    <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                      <span className={NAME}>{plan.name}</span>
                      <span className="text-[13px] leading-[1.4] font-medium text-muted">{plan.role}</span>
                    </span>
                    <span className="flex items-baseline gap-1 whitespace-nowrap text-ink">
                      <span className="text-[13px] leading-none font-semibold text-body">월</span>
                      <span className="text-[20px] leading-none font-bold tracking-[-0.035em] mobile:text-[18px]">{won(plan.price)}</span>
                      <span className="text-[12.5px] leading-none font-bold">원</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Notice className="mt-7 w-fit font-semibold text-ink mobile:mt-6">{VAT_NOTICE.all}</Notice>
      </div>

      <nav data-reveal aria-label="이 페이지에서 바로 가기" className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2.5">
        <span className="text-[13px] leading-[1.4] font-bold text-muted">바로 가기</span>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {JUMPS.map((jump) => (
            <li key={jump.id}>
              <a
                href={`#${jump.id}`}
                className="inline-flex h-11 items-center rounded-pill border border-line-strong bg-white px-4 text-[14px] leading-none font-semibold whitespace-nowrap text-ink no-underline transition-colors duration-160 ease-out hover:bg-gray-25 hover:text-ink"
              >
                {jump.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Section>
  );
}
