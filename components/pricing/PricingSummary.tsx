import Link from "next/link";
import { DecisionHelper } from "@/components/pricing/DecisionHelper";
import { PortfolioSample } from "@/components/pricing/PortfolioSample";
import { Letter, SetupPrice } from "@/components/pricing/SetupParts";
import { Starter } from "@/components/pricing/Starter";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Check, CheckList } from "@/components/ui/CheckList";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { COMMON_BOOSTINTERIOR_SCOPE, COMMON_BUILD, planAdditions, PLANS, SETUP_OPTIONS, VAT_NOTICE, won } from "@/lib/pricing";
import { ASSURANCES, PORTFOLIO_VIDEO, PRICING_FAQ } from "@/lib/pricing-page";
import {
  COMPARISON_ID,
  DEMO_LABEL,
  DEMO_URL,
  KAKAO_LABEL,
  KAKAO_OPEN_CHAT_URL,
  KAKAO_RECOMMEND_LABEL,
  PRICING_DETAILS_PATH,
  SITE_NAME,
} from "@/lib/site";

const CARD = "grid scroll-mt-24 grid-rows-subgrid gap-y-0 rounded-xl bg-white shadow-md mobile:p-6";
const ROLE_TAG =
  "inline-flex h-[26px] items-center rounded-pill bg-accent-soft px-2.5 text-[12px] leading-none font-semibold whitespace-nowrap text-blue-700";
const MORE = "group inline-flex min-h-11 items-center gap-1.5 text-[15px] leading-[1.4] font-semibold text-link no-underline";

/** "포함 범위 자세히 →" — a text link into /pricing/details. */
function More({ href, children, className = "" }: { href: string; children: string; className?: string }) {
  return (
    <Link href={href} className={`${MORE} ${className}`}>
      <span className="underline-offset-4 group-hover:underline">{children}</span>
      <span aria-hidden="true" className="transition-transform duration-160 ease-out group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

/** /pricing hero — the whole choice in one line, the cheapest way in, and the two ways out. */
export function SummaryHero() {
  return (
    <section
      id="top"
      aria-labelledby="pricing-hero-title"
      className="mx-auto max-w-[1440px] px-20 pt-[148px] pb-4 mobile:px-5 mobile:pt-[104px] mobile:pb-0"
    >
      {/* Side by side only where the two-line title still fits next to the card. */}
      <div className="grid items-center gap-x-14 gap-y-10 min-[1280px]:grid-cols-[minmax(0,1fr)_minmax(380px,440px)] mobile:gap-y-8">
        <div>
          <SceneHeader
            as="h1"
            titleId="pricing-hero-title"
            eyebrow={`${SITE_NAME} 가격`}
            title={
              <>
                필요한 만큼만 구축하고, <br />
                필요한 만큼만 운영하세요.
              </>
            }
            sub="홈페이지 상태에 맞는 구축 방식 하나, 필요한 기능에 맞는 운영 플랜 하나. 두 가지만 고르면 됩니다."
            subClassName="mobile:text-[17px]"
          />
          <div className="mt-9 flex flex-wrap gap-3 max-[480px]:grid">
            <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" arrow>
              {KAKAO_RECOMMEND_LABEL}
            </ButtonLink>
            <ButtonLink href={DEMO_URL} external size="lg" variant="secondary">
              {DEMO_LABEL}
            </ButtonLink>
          </div>
        </div>
        <Starter className="min-[1280px]:max-w-none" />
      </div>
    </section>
  );
}

/**
 * 내 상황에 맞는 선택 — before the cards: the owner finds their own sentence, and it leads to the
 * one setup card and the one plan card that are theirs.
 */
export function Decision() {
  return (
    <Section id="decide" aria-labelledby="decide-title" pt="pt-24 mobile:pt-14" pb="pb-0" className="scroll-mt-8">
      <div data-reveal>
        <SceneHeader
          size="md"
          eyebrow="내 상황에 맞는 선택"
          titleId="decide-title"
          title="내 상황과 가장 가까운 문장을 고르세요."
          sub="문장을 누르면 아래의 해당 가격으로 이동합니다."
          subClassName="text-[18px] mobile:text-[16px]"
        />
      </div>
      <div data-reveal>
        <DecisionHelper className="mt-9 mobile:mt-7" />
      </div>
      <p data-reveal className="mt-6 mb-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] leading-[1.6] text-muted">
        잘 모르겠다면 홈페이지 주소만 보내주세요. 확인 후 맞는 구축 방식을 안내드립니다.
        <a
          href={KAKAO_OPEN_CHAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={MORE}
        >
          <span className="underline-offset-4 group-hover:underline">{KAKAO_LABEL}</span>
          <span aria-hidden="true" className="transition-transform duration-160 ease-out group-hover:translate-x-0.5">
            →
          </span>
          <span className="sr-only"> (새 창에서 열림)</span>
        </a>
      </p>
    </Section>
  );
}

/**
 * 초기 구축 — one card per situation: which option it is, what it costs, what happens to the
 * homepage. What all four share is said once, above them; the full scope is on /pricing/details.
 */
export function SetupSummary() {
  return (
    <Section id="setup" aria-labelledby="setup-title" pt="pt-28 mobile:pt-16" pb="pb-0" className="scroll-mt-8">
      <div data-reveal>
        <SceneHeader
          size="md"
          step="01"
          eyebrow="초기 구축 · 한 번"
          titleId="setup-title"
          title="지금 홈페이지 상태에 맞춰 하나를 고르세요."
          sub={`어떤 방식을 골라도 ${COMMON_BUILD}은 똑같이 들어갑니다. 가격은 홈페이지 작업 범위만큼 달라집니다.`}
          subClassName="text-[18px] mobile:text-[16px]"
        />
      </div>

      <div
        data-reveal
        className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-xl border border-blue-200 bg-accent-soft px-6 py-5 mobile:mt-7 mobile:px-5"
      >
        <p className="m-0 flex items-center gap-2 text-[15px] leading-[1.4] font-bold text-ink">
          <Check className="size-4 text-accent" />
          4가지 모두 {COMMON_BUILD} 포함
        </p>
        <ul aria-label={`${COMMON_BUILD} 항목`} className="m-0 flex list-none flex-wrap gap-2 p-0">
          {COMMON_BOOSTINTERIOR_SCOPE.map((group) => (
            <li
              key={group.label}
              className="inline-flex h-8 items-center gap-1.5 rounded-pill bg-white pr-3 pl-2.5 text-[13px] leading-none font-semibold whitespace-nowrap text-ink"
            >
              <Icon name={group.icon} className="size-4 text-accent" />
              {group.label}
            </li>
          ))}
        </ul>
      </div>

      <div data-reveal className="mt-5 grid grid-cols-4 gap-5 narrow:grid-cols-2 mobile:grid-cols-1 mobile:gap-4">
        {SETUP_OPTIONS.map((option) => (
          <article key={option.key} id={option.id} aria-labelledby={`${option.id}-title`} className={`${CARD} row-span-5 p-7`}>
            <p className="m-0 text-[14px] leading-[1.45] font-bold text-muted">{option.situation}</p>
            <div className="mt-4 flex items-center gap-2.5">
              <Letter option={option} />
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                <h3 id={`${option.id}-title`} className="m-0 text-[18px] leading-[1.3] font-bold tracking-[-0.02em] text-ink">
                  {option.name}
                </h3>
                {option.badge && <Badge>{option.badge}</Badge>}
              </div>
            </div>
            <p className="mt-5 mb-0">
              <SetupPrice option={option} className="text-[30px]" />
            </p>
            <div className="mt-5 border-t border-line pt-5">
              <p className="m-0 text-[16px] leading-[1.45] font-bold tracking-[-0.01em] text-ink">{option.website}</p>
              <CheckList items={option.highlights.filter((item) => item !== option.website)} className="mt-3" />
            </div>
            <More href={`${PRICING_DETAILS_PATH}#${option.id}`} className="mt-3 self-end justify-self-start">
              포함 범위 자세히
            </More>
          </article>
        ))}
      </div>
    </Section>
  );
}

/** 운영 플랜 — what each plan adds, three lines each. Every feature is compared on /pricing/details. */
export function PlanSummary() {
  return (
    <Section id="plans" aria-labelledby="plans-title" pt="pt-28 mobile:pt-16" pb="pb-0" className="scroll-mt-8">
      <div data-reveal>
        <SceneHeader
          size="md"
          step="02"
          eyebrow="운영 플랜 · 매월"
          titleId="plans-title"
          title="필요한 기능만큼 매월 고르세요."
          sub="Core는 핵심 기능, Growth는 방문자 분석과 시공사진 영상, Managed는 매달 함께 확인하고 개선하는 운영 지원입니다."
          subClassName="text-[18px] mobile:text-[16px]"
        />
      </div>

      <div data-reveal className="mt-9 grid grid-cols-3 gap-5 narrow:grid-cols-1 mobile:mt-7 mobile:gap-4">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            id={`plan-${plan.name.toLowerCase()}`}
            aria-labelledby={`plan-${plan.name}`}
            className={`${CARD} row-span-3 p-8`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 id={`plan-${plan.name}`} className="m-0 text-[22px] leading-[1.3] font-bold tracking-[-0.02em] text-ink">
                {plan.name}
              </h3>
              <span className={ROLE_TAG}>{plan.role}</span>
            </div>
            <p className="mt-5 mb-0 flex items-baseline gap-1.5 whitespace-nowrap text-ink">
              <span className="text-[17px] leading-none font-semibold text-body">월</span>
              <span>
                <span className="text-[clamp(30px,3.1vw,38px)] leading-none font-bold tracking-[-0.035em]">{won(plan.price)}</span>
                <span className="ml-0.5 text-[18px] leading-none font-bold">원</span>
              </span>
            </p>
            <div className="mt-6 border-t border-line pt-6">
              <CheckList items={plan.highlights} lead={plan.base && `${plan.base} 전체 포함`} />
              {plan.assurance && (
                <p className="mt-5 mb-0 rounded-lg bg-accent-soft px-4 py-3 text-[14px] leading-[1.6] font-semibold text-pretty text-blue-700">
                  {plan.assurance}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>

      <p data-reveal className="mt-3 mb-0 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-[14px] leading-[1.6] text-muted">
        {VAT_NOTICE.monthly}
        <More href={`${PRICING_DETAILS_PATH}#${COMPARISON_ID}`}>플랜별 전체 기능 비교</More>
      </p>
    </Section>
  );
}

/** What is the same whichever option and plan is picked — the doubts a price list leaves open. */
export function Assurances() {
  return (
    <Section id="assurances" aria-labelledby="assurances-title" pt="pt-28 mobile:pt-16" pb="pb-0">
      <h2
        id="assurances-title"
        data-reveal
        className="m-0 text-[28px] leading-[1.3] font-bold tracking-[-0.03em] text-balance text-ink mobile:text-[22px]"
      >
        어떤 조합을 골라도 같습니다.
      </h2>
      <ul
        data-reveal
        className="mt-7 mb-0 grid list-none grid-cols-4 gap-5 p-0 narrow:grid-cols-2 mobile:mt-5 mobile:grid-cols-1 mobile:gap-3"
      >
        {ASSURANCES.map((item) => (
          <li key={item.title} className="rounded-xl bg-white p-7 shadow-md mobile:flex mobile:gap-4 mobile:p-5">
            <span className="grid size-10 flex-none place-items-center rounded-md bg-accent-soft text-accent">
              <Icon name={item.icon} className="size-5" />
            </span>
            <div>
              <p className="mt-4 mb-0 text-[17px] leading-[1.4] font-bold tracking-[-0.01em] text-ink mobile:mt-0 mobile:text-[16px]">
                {item.title}
              </p>
              <p className="mt-1.5 mb-0 text-[14px] leading-[1.6] text-pretty text-body">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

const ADDITION_ICONS: Record<string, IconName> = { "방문자 분석": "search", "AI Portfolio Video": "video", "운영 지원": "sliders" };

/**
 * What the two higher plans add, item by item, read from the comparison: Growth's price difference
 * is the analysis and the video, Managed's is the monthly work done together. A real AI Portfolio
 * Video sample plays inside the Growth card once there is one; until then nothing stands in for it.
 */
export function PlanAdditions() {
  const upgrades = PLANS.slice(1).map((plan, i) => ({ plan, below: PLANS[i], groups: planAdditions(plan.name) }));
  return (
    <Section id="plan-additions" aria-labelledby="plan-additions-title" pt="pt-28 mobile:pt-16" pb="pb-0" className="scroll-mt-8">
      <h2
        id="plan-additions-title"
        data-reveal
        className="m-0 text-[28px] leading-[1.3] font-bold tracking-[-0.03em] text-balance text-ink mobile:text-[22px]"
      >
        플랜을 올리면 이것이 더해집니다.
      </h2>
      <div data-reveal className="mt-7 grid grid-cols-2 items-start gap-5 narrow:grid-cols-1 mobile:mt-5 mobile:gap-4">
        {upgrades.map(({ plan, below, groups }) => (
          <article key={plan.name} aria-labelledby={`adds-${plan.name}`} className="rounded-xl bg-white p-8 shadow-md mobile:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 id={`adds-${plan.name}`} className="m-0 text-[22px] leading-[1.3] font-bold tracking-[-0.02em] text-ink mobile:text-[20px]">
                {plan.name}
              </h3>
              <span className={ROLE_TAG}>
                {below.name}보다 월 {won(plan.price - below.price)}원 추가
              </span>
            </div>
            <p className="mt-3 mb-0 text-[16px] leading-[1.6] text-pretty text-body mobile:text-[15px]">{plan.summary}</p>
            {groups.map((group) => (
              <div key={group.category} className="mt-6 border-t border-line pt-6">
                <p className="m-0 flex items-center gap-3 text-[17px] leading-[1.4] font-bold tracking-[-0.01em] text-ink">
                  <span className="grid size-9 flex-none place-items-center rounded-md bg-accent-soft text-accent">
                    <Icon name={ADDITION_ICONS[group.category] ?? "spark"} className="size-5" />
                  </span>
                  {group.category}
                </p>
                {group.category === "AI Portfolio Video" ? (
                  <>
                    <p className="mt-3 mb-0 text-[15px] leading-[1.65] text-pretty text-body">{PORTFOLIO_VIDEO.text}</p>
                    <p className="mt-2.5 mb-0 text-[14px] leading-[1.6] font-semibold text-ink">
                      {PORTFOLIO_VIDEO.terms}
                      <span className="font-normal text-muted"> — {PORTFOLIO_VIDEO.source}</span>
                    </p>
                    <PortfolioSample className="mt-5" />
                  </>
                ) : (
                  <CheckList items={group.labels} className="mt-4" />
                )}
              </div>
            ))}
            {plan.name === "Managed" && plan.note && <p className="mt-5 mb-0 text-[13px] leading-[1.6] text-muted">{plan.note}</p>}
          </article>
        ))}
      </div>
    </Section>
  );
}

/** The way into /pricing/details, and what is there. */
export function DetailsLink() {
  const contents = ["구축 방식별 전체 포함 범위", "운영 플랜별 전체 기능 비교", `자주 묻는 질문 ${PRICING_FAQ.length}가지`];
  return (
    <Section id="details" aria-labelledby="details-title" pt="pt-16 mobile:pt-10" pb="pb-0">
      <div
        data-reveal
        className="flex items-center justify-between gap-10 rounded-2xl border border-line-strong px-12 py-10 narrow:flex-col narrow:items-start narrow:gap-7 mobile:rounded-xl mobile:p-6"
      >
        <div>
          <h2
            id="details-title"
            className="m-0 text-[24px] leading-[1.4] font-bold tracking-[-0.025em] text-balance text-ink mobile:text-[20px]"
          >
            무엇이 포함되는지 하나하나 확인하고 싶다면
          </h2>
          <ul className="mt-4 mb-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
            {contents.map((item) => (
              <li key={item} className="flex gap-2 text-[15px] leading-[1.5] text-body">
                <Check />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ButtonLink href={PRICING_DETAILS_PATH} size="lg" variant="dark" arrow className="flex-none max-[480px]:w-full">
          상세 가격 안내 보기
        </ButtonLink>
      </div>
    </Section>
  );
}
