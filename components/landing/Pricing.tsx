import type { ReactNode } from "react";
import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { COMBO_EXAMPLES, PLANS, SETUP_OPTIONS, won } from "@/lib/pricing";
import { KAKAO_OPEN_CHAT_URL, PRICING_ID } from "@/lib/site";

const CARD = "flex flex-col rounded-xl bg-white p-8 shadow-md narrow:p-6";
const FLOW = ["도입 상담", "홈페이지 확인", "구축 방식 확정", "계약"];

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-[5px] size-3.5 flex-none text-accent">
      <path d="M3 8.4 6.4 11.6 13 4.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Items({ items, lead }: { items: readonly string[]; lead?: string }) {
  return (
    <ul className="m-0 grid list-none gap-2.5 p-0 mobile:min-[600px]:grid-cols-2 mobile:min-[600px]:gap-x-6">
      {lead && (
        <li className="flex gap-2.5 text-[15px] leading-[1.5] font-bold text-ink mobile:min-[600px]:col-span-2">
          <Check />
          {lead}
        </li>
      )}
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[15px] leading-[1.5] text-body">
          <Check />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** The amount keeps its digits in one text node ("700,000"), so it reads and searches as one number. */
function Price({ label, prefix, amount }: { label?: string; prefix?: string; amount: number }) {
  return (
    <p className="mt-5 mb-0 text-ink">
      {label && <span className="mb-2 block text-[13px] leading-none font-semibold text-muted">{label}</span>}
      <span className="flex items-baseline gap-1.5 whitespace-nowrap">
        {prefix && <span className="text-[17px] leading-none font-semibold text-body">{prefix}</span>}
        <span>
          <span className="text-[clamp(28px,3.1vw,40px)] leading-none font-bold tracking-[-0.035em] mobile:text-[34px]">
            {won(amount)}
          </span>
          <span className="ml-0.5 text-[18px] leading-none font-bold">원</span>
        </span>
      </span>
    </p>
  );
}

function Step({ n, id, title, sub, children }: { n: string; id: string; title: string; sub: string; children: ReactNode }) {
  return (
    <div data-reveal role="group" aria-labelledby={id} className="mt-20 mobile:mt-12">
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
      <div className="mt-8 grid grid-cols-3 items-stretch gap-5 mobile:mt-6 mobile:grid-cols-1 mobile:gap-4">{children}</div>
    </div>
  );
}

/**
 * 도입 비용 — public pricing in two independent steps: how it is built (one-time) and how it
 * is run (monthly). No checkout here; the CTA opens the KakaoTalk 상담, where the fit is confirmed.
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
      </div>

      <Step n="01" id="pricing-setup" title="어떻게 구축할까요?" sub="홈페이지 상태에 맞는 구축 방식을 선택합니다.">
        {SETUP_OPTIONS.map((option) => (
          <article key={option.key} aria-labelledby={`setup-${option.key}`} className={CARD}>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className={`grid size-7 flex-none place-items-center rounded-pill text-[13px] leading-none font-bold text-white ${
                  option.key === "A" ? "bg-accent" : "bg-gray-900"
                }`}
              >
                {option.key}
              </span>
              <h4 id={`setup-${option.key}`} className="m-0 text-[20px] leading-[1.3] font-bold tracking-[-0.02em] text-ink">
                {option.name}
              </h4>
            </div>
            <Price label="초기 구축비" amount={option.price} />
            <p className="mt-4 mb-0 text-[13px] leading-[1.4] font-bold text-accent">{option.scope}</p>
            <p className="mt-1.5 mb-0 text-[16px] leading-[1.6] text-body">{option.summary}</p>
            <div className="mt-6 border-t border-line pt-6">
              <Items items={option.includes} />
            </div>
            {option.note && <p className="mt-auto mb-0 pt-6 text-[13px] leading-[1.6] text-muted">{option.note}</p>}
          </article>
        ))}
      </Step>

      <Step n="02" id="pricing-plan" title="어떤 운영이 필요하신가요?" sub="필요한 운영 수준을 선택합니다.">
        {PLANS.map((plan) => (
          <article key={plan.name} aria-labelledby={`plan-${plan.name}`} className={CARD}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 id={`plan-${plan.name}`} className="m-0 text-[20px] leading-[1.3] font-bold tracking-[-0.02em] text-ink">
                {plan.name}
              </h4>
              <span className="inline-flex h-[26px] items-center rounded-pill bg-accent-soft px-2.5 text-[12px] leading-none font-semibold whitespace-nowrap text-blue-700">
                {plan.role}
              </span>
            </div>
            <Price prefix="월" amount={plan.price} />
            <p className="mt-4 mb-0 text-[16px] leading-[1.6] text-body">{plan.summary}</p>
            <div className="mt-6 border-t border-line pt-6">
              <Items items={plan.features} lead={plan.base && `${plan.base} 전체 포함`} />
            </div>
            {plan.note && <p className="mt-auto mb-0 pt-6 text-[13px] leading-[1.6] text-muted">{plan.note}</p>}
          </article>
        ))}
      </Step>

      <div data-reveal className="mt-10 mobile:mt-6">
        <p className="m-0 text-[15px] leading-[1.6] font-medium text-muted">
          구축 방식과 운영 플랜은 독립적으로 선택할 수 있습니다. <Br />
          플랜별 세부 제공 범위와 적용 일정은 도입 상담에서 안내해드립니다.
        </p>
        <ul aria-label="조합 예시" className="mt-3 mb-0 flex list-none flex-wrap gap-2 p-0">
          {COMBO_EXAMPLES.map(([setup, plan]) => (
            <li
              key={setup}
              className="inline-flex min-h-8 items-center rounded-pill border border-line-strong px-[13px] py-1.5 text-[14px] leading-[1.3] font-medium text-body"
            >
              {setup} + {plan}
            </li>
          ))}
        </ul>
      </div>

      <div
        data-reveal
        className="mt-14 flex items-center justify-between gap-10 rounded-xl border border-blue-200 bg-white px-10 py-9 shadow-window narrow:flex-col narrow:items-start narrow:gap-6 mobile:mt-10 mobile:p-6"
      >
        <div>
          <p className="m-0 text-[22px] leading-[1.45] font-semibold tracking-[-0.02em] text-balance text-ink mobile:text-[18px]">
            현재 홈페이지를 확인한 뒤 적합한 구축 방식과 운영 플랜을 안내해드립니다.
          </p>
          <ol aria-label="도입 순서" className="mt-4 mb-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1.5 p-0">
            {FLOW.map((step, i) => (
              <li key={step} className="flex items-center gap-2 text-[14px] leading-[1.4] font-medium text-muted">
                {step}
                {i < FLOW.length - 1 && (
                  <span aria-hidden="true" className="text-faint">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
        <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" arrow className="flex-none max-[480px]:w-full">
          내 홈페이지 기준으로 추천받기
        </ButtonLink>
      </div>
    </Section>
  );
}
