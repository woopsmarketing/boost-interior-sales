import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Notice } from "@/components/ui/Notice";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { COMMON_BUILD, manwon, PLANS, SETUP_OPTIONS, VAT_NOTICE, won } from "@/lib/pricing";
import { KAKAO_OPEN_CHAT_URL, PRICING_ID, PRICING_PATH } from "@/lib/site";

/** Cards share their row tracks (subgrid), so prices, copy and lists line up across a row. */
const CARD = "grid grid-rows-subgrid gap-y-0 rounded-xl bg-white p-7 shadow-md mobile:p-6";
const AMOUNT = "text-[34px] leading-none font-bold tracking-[-0.035em]";
const UNIT = "ml-0.5 text-[18px] leading-none font-bold";

function Step({
  n,
  id,
  title,
  sub,
  cols,
  children,
}: {
  n: string;
  id: string;
  title: string;
  sub: string;
  cols: string;
  children: ReactNode;
}) {
  return (
    <div data-reveal role="group" aria-labelledby={id} className="mt-16 mobile:mt-12">
      <div className="flex items-baseline gap-4 border-t border-line-strong pt-7 mobile:gap-3 mobile:pt-6">
        <span aria-hidden="true" className="font-mono text-[15px] leading-none font-medium text-accent">
          {n}
        </span>
        <div>
          <h3 id={id} className="m-0 text-[28px] leading-[1.3] font-bold tracking-[-0.03em] text-ink mobile:text-[22px]">
            {title}
          </h3>
          <p className="mt-2 mb-0 text-[17px] leading-[1.6] text-muted mobile:text-[16px]">{sub}</p>
        </div>
      </div>
      <div className={`mt-8 grid items-stretch gap-5 mobile:mt-6 mobile:grid-cols-1 mobile:gap-4 ${cols}`}>{children}</div>
    </div>
  );
}

/**
 * 도입 비용 — the landing's price summary: four ways to build (one-time) and three ways to
 * run (monthly), a few lines each. Every setup card opens with the same line — the common build —
 * and then says what happens to the homepage. The full scope of every option lives on /pricing.
 */
export function Pricing() {
  return (
    <Section id={PRICING_ID} aria-labelledby="pricing-title" pb="pb-30 mobile:pb-16">
      <div data-reveal>
        <SceneHeader
          eyebrow="도입 비용"
          titleId="pricing-title"
          title="구축 방식과 운영 플랜을 각각 선택합니다."
          sub="처음 한 번의 구축비와 매월의 운영 플랜으로 나뉩니다. 두 가지는 서로 독립적으로 고를 수 있습니다."
        />
        <Notice className="mt-7 w-fit font-semibold text-ink mobile:mt-6">{VAT_NOTICE.all}</Notice>
      </div>

      <Step
        n="01"
        id="pricing-setup"
        title="초기 구축"
        sub={`어떤 구축 방식을 선택해도 ${COMMON_BUILD}이 포함됩니다. 달라지는 것은 홈페이지 작업 범위입니다.`}
        cols="grid-cols-4 narrow:grid-cols-2"
      >
        {SETUP_OPTIONS.map((option) => (
          <article key={option.key} aria-labelledby={`setup-${option.key}`} className={`${CARD} row-span-4`}>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className={`grid size-7 flex-none place-items-center rounded-pill text-[13px] leading-none font-bold text-white ${
                  option.key === "A" ? "bg-accent" : "bg-gray-900"
                }`}
              >
                {option.key}
              </span>
              <h4 id={`setup-${option.key}`} className="m-0 text-[18px] leading-[1.3] font-bold tracking-[-0.02em] text-ink">
                {option.name}
              </h4>
            </div>
            <p className="mt-5 mb-0 flex items-baseline whitespace-nowrap text-ink">
              <span className={AMOUNT}>{manwon(option.price)}</span>
              <span className={UNIT}>만원</span>
              {option.from && <span className="ml-1 text-[15px] leading-none font-semibold text-body">부터</span>}
            </p>
            <p className="mt-4 mb-0 text-[15px] leading-[1.6] text-body">{option.summary}</p>
            <div className="mt-5 border-t border-line pt-5">
              <CheckList items={option.highlights} lead={`${COMMON_BUILD} 포함`} />
            </div>
          </article>
        ))}
      </Step>

      <Step n="02" id="pricing-plan" title="운영 플랜" sub="필요한 기능과 운영 수준을 매월 선택합니다." cols="grid-cols-3">
        {PLANS.map((plan) => (
          <article key={plan.name} aria-labelledby={`plan-${plan.name}`} className={`${CARD} row-span-3`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 id={`plan-${plan.name}`} className="m-0 text-[20px] leading-[1.3] font-bold tracking-[-0.02em] text-ink">
                {plan.name}
              </h4>
              <span className="inline-flex h-[26px] items-center rounded-pill bg-accent-soft px-2.5 text-[12px] leading-none font-semibold whitespace-nowrap text-blue-700">
                {plan.role}
              </span>
            </div>
            <p className="mt-5 mb-0 flex items-baseline gap-1.5 whitespace-nowrap text-ink">
              <span className="text-[17px] leading-none font-semibold text-body">월</span>
              <span>
                <span className={AMOUNT}>{won(plan.price)}</span>
                <span className={UNIT}>원</span>
              </span>
            </p>
            <div className="mt-5 border-t border-line pt-5">
              <CheckList items={plan.highlights} lead={plan.base && `${plan.base} 전체 포함`} />
            </div>
          </article>
        ))}
      </Step>

      <div
        data-reveal
        className="mt-12 flex items-center justify-between gap-10 rounded-xl border border-blue-200 bg-white px-10 py-9 shadow-window narrow:flex-col narrow:items-start narrow:gap-6 mobile:mt-8 mobile:p-6"
      >
        <div>
          <p className="m-0 text-[22px] leading-[1.45] font-semibold tracking-[-0.02em] text-balance text-ink mobile:text-[18px]">
            구축 방식마다 무엇이 포함되는지, 플랜은 어떻게 다른지 가격 페이지에서 확인하세요.
          </p>
          <p className="mt-2 mb-0 text-[15px] leading-[1.6] text-muted">
            현재 홈페이지를 확인한 뒤 적합한 구축 방식과 운영 플랜을 안내해드립니다.
          </p>
        </div>
        <div className="flex flex-none flex-wrap gap-3 max-[480px]:grid max-[480px]:w-full">
          <ButtonLink href={PRICING_PATH} size="lg" arrow>
            가격과 포함 범위 자세히 보기
          </ButtonLink>
          <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" variant="secondary">
            내 홈페이지 기준으로 상담받기
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
