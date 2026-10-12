import type { ReactNode } from "react";
import { Disclosure } from "@/components/pricing/Disclosure";
import { SetupComparison } from "@/components/pricing/SetupComparison";
import { Letter, SetupPrice } from "@/components/pricing/SetupParts";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Icon } from "@/components/ui/Icon";
import { Notice } from "@/components/ui/Notice";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { CONSULTATION_PAGE } from "@/lib/features";
import {
  CONSULT_SETUP,
  CONSULT_SETUP_ITEMS,
  scopeItems,
  SETUP_OPTIONS,
  subscription,
  VAT_NOTICE,
  WEBSITE_OPERATION,
  won,
  type SetupOption,
} from "@/lib/pricing";
import { INTEGRATION_VALUE, QUICK_EXAMPLE, QUICK_FEATURES, QUICK_VALUE, QUICK_VS_IMPROVEMENT } from "@/lib/pricing-page";
import { CONSULT_SETUP_ID, DEMO_URL, FEATURES, KAKAO_LABEL, KAKAO_OPEN_CHAT_URL, SETUP_ID, SITE_NAME } from "@/lib/site";

const [INTEGRATION, QUICK, IMPROVEMENT, CUSTOM] = SETUP_OPTIONS;
const CONSULTATION = subscription("consultation");

const CARD = "scroll-mt-24 rounded-2xl bg-white p-12 shadow-md narrow:p-9 mobile:rounded-xl mobile:p-6";
const SUBHEAD = "m-0 text-[13px] leading-[1.4] font-bold tracking-[0.01em] text-muted";
const STATEMENT = "mb-0 font-bold tracking-[-0.03em] text-balance text-ink";
const DETAIL_HEAD = "m-0 text-[17px] leading-[1.4] font-bold tracking-[-0.01em] text-ink";

const SCOPE_TOGGLE = { show: "전체 포함 범위 보기", hide: "전체 포함 범위 접기" };

/** Which option a block is about: letter and name on the left, the price on the right. */
function Head({ option }: { option: SetupOption }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <Letter option={option} />
        <h3 id={`${option.id}-title`} className="m-0 text-[20px] leading-[1.3] font-bold tracking-[-0.02em] text-ink mobile:text-[18px]">
          {option.name}
        </h3>
        {option.badge && <Badge>{option.badge}</Badge>}
      </div>
      <SetupPrice option={option} className="text-[28px] mobile:text-[24px]" />
    </div>
  );
}

function Fit({ option, className = "" }: { option: SetupOption; className?: string }) {
  return (
    <div className={`rounded-lg bg-sunken px-5 py-4 ${className}`}>
      <p className={SUBHEAD}>이런 업체에 맞습니다</p>
      <p className="mt-1.5 mb-0 text-[15px] leading-[1.6] font-medium text-ink">{option.fit}</p>
    </div>
  );
}

/** An option's homepage work under its toggle, item by item, and what falls outside it. */
function Scope({ option, columns, className = "" }: { option: SetupOption; columns?: "wide"; className?: string }) {
  return (
    <>
      <h4 className={DETAIL_HEAD}>홈페이지 작업 {scopeItems(option).length}개 항목</h4>
      <CheckList items={scopeItems(option)} columns={columns} className={`mt-5 ${className}`} />
      <p className="mt-5 mb-0 text-[14px] leading-[1.6] text-pretty text-muted">기본 범위 밖의 작업: {option.beyond}</p>
    </>
  );
}

/** One option's block: summary in the open, the full scope under a toggle. */
function Block({ option, className = "", children }: { option: SetupOption; className?: string; children: ReactNode }) {
  return (
    <article id={option.id} data-reveal aria-labelledby={`${option.id}-title`} className={`${CARD} ${className}`}>
      <Head option={option} />
      {children}
    </article>
  );
}

/**
 * AI 상담 초기 세팅 — what connecting AI 상담 to a homepage consists of, said once. It is the whole of
 * 기존 홈페이지 연동, and the part of the other three builds that concerns the consultation.
 * The anchor keeps the name this block had when it was the builds' common scope.
 */
function ConsultSetup() {
  return (
    <div
      id={CONSULT_SETUP_ID}
      data-reveal
      className="mt-10 grid scroll-mt-24 grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-14 gap-y-6 rounded-2xl border border-blue-200 bg-white p-12 shadow-window narrow:grid-cols-1 narrow:p-9 mobile:mt-7 mobile:rounded-xl mobile:p-6"
    >
      <div>
        <p className="m-0 flex items-center gap-2.5 text-[13px] leading-[1.4] font-bold text-accent">
          <Icon name={CONSULTATION.icon} className="size-[18px]" />
          {CONSULTATION.name}을 홈페이지에 연결할 때
        </p>
        <h3 className="mt-2.5 mb-0 text-[26px] leading-[1.35] font-bold tracking-[-0.025em] text-ink mobile:text-[21px]">{CONSULT_SETUP}</h3>
        <p className="mt-3 mb-0 text-[15.5px] leading-[1.7] text-pretty text-body">
          {INTEGRATION.name}은 이 다섯 가지가 작업의 전부입니다. {IMPROVEMENT.name}에도 같은 세팅이 포함되고, {SITE_NAME}로 새로 만드는 홈페이지는 상담창이
          연결된 상태로 제작됩니다.
        </p>
      </div>
      <CheckList items={CONSULT_SETUP_ITEMS} className="[&>li]:text-[16px] [&>li]:font-medium [&>li]:text-ink" />
    </div>
  );
}

/** 기존 홈페이지 연동 — said first that it builds no homepage: it connects AI 상담 to the one the owner has. */
function Integration() {
  const steps = CONSULTATION_PAGE.installSteps;
  return (
    <Block option={INTEGRATION} className="mt-6 mobile:mt-4">
      <p className={`mt-8 text-[28px] leading-[1.3] mobile:mt-6 mobile:text-[21px] ${STATEMENT}`}>{INTEGRATION_VALUE.title}</p>
      <p className="mt-3 mb-0 max-w-[900px] text-[17px] leading-[1.7] text-pretty text-body mobile:text-[16px]">{INTEGRATION_VALUE.text}</p>
      <CheckList items={INTEGRATION.highlights} className="mt-6" columns="wide" />
      {INTEGRATION.note && <p className="mt-5 mb-0 max-w-[900px] text-[14px] leading-[1.65] text-pretty text-muted">{INTEGRATION.note}</p>}

      <Disclosure show="진행 순서 보기" hide="진행 순서 접기" context={INTEGRATION.name} className="mt-7">
        <div className="mt-7 border-t border-line pt-7">
          <h4 className={DETAIL_HEAD}>
            {won(INTEGRATION.price)}원으로 진행되는 작업 {steps.length}단계
          </h4>
          <ol className="mt-5 mb-0 grid list-none grid-cols-2 gap-x-12 p-0 narrow:grid-cols-1">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4 border-t border-line py-4">
                <span aria-hidden="true" className="pt-1 font-mono text-[13px] leading-none font-medium text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="m-0 text-[16px] leading-[1.4] font-bold tracking-[-0.01em] text-ink">{step.title}</p>
                  <p className="mt-1 mb-0 text-[14px] leading-[1.6] text-pretty text-body">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Fit option={INTEGRATION} className="mt-6" />
          <p className="mt-4 mb-0 text-[14px] leading-[1.6] text-pretty text-muted">기본 범위 밖의 작업: {INTEGRATION.beyond}</p>
        </div>
      </Disclosure>
    </Block>
  );
}

/**
 * Quick Start — six things the new homepage gives the customer, the example site to see them on,
 * and its homepage work item by item on demand.
 */
function Quick() {
  return (
    <Block option={QUICK} className="mt-6 mobile:mt-4">
      <p className={`mt-8 text-[26px] leading-[1.35] mobile:mt-6 mobile:text-[20px] ${STATEMENT}`}>{QUICK_VALUE.title}</p>
      <p className="mt-3 mb-0 max-w-[900px] text-[17px] leading-[1.7] text-pretty text-body mobile:text-[16px]">{QUICK_VALUE.text}</p>

      <ul className="mt-8 mb-0 grid list-none grid-cols-3 gap-3 p-0 mobile:mt-6 mobile:grid-cols-2 mobile:gap-2.5">
        {QUICK_FEATURES.map((feature) => (
          <li key={feature.label} className="flex items-center gap-3 rounded-lg border border-line bg-sunken p-4 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-2.5 mobile:p-3.5">
            <span className="grid size-9 flex-none place-items-center rounded-md bg-white text-accent shadow-sm">
              <Icon name={feature.icon} className="size-5" />
            </span>
            <span>
              <span className="block text-[15px] leading-[1.3] font-bold text-ink">{feature.label}</span>
              <span className="mt-0.5 block text-[13px] leading-[1.45] text-body">{feature.text}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-lg bg-accent-soft px-6 py-5 mobile:px-5">
        <div>
          <p className={SUBHEAD}>{QUICK_EXAMPLE.title}</p>
          <p className="mt-1.5 mb-0 text-[16px] leading-[1.6] font-semibold text-pretty text-ink">{QUICK_EXAMPLE.text}</p>
          <p className="mt-0.5 mb-0 text-[13px] leading-[1.6] text-muted">{QUICK_EXAMPLE.note}</p>
        </div>
        <div className="flex flex-none flex-wrap gap-3 max-[480px]:grid max-[480px]:w-full">
          <ButtonLink href={DEMO_URL} external size="md" arrow>
            {QUICK_EXAMPLE.cta}
          </ButtonLink>
          <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="md" variant="secondary">
            {KAKAO_LABEL}
          </ButtonLink>
        </div>
      </div>

      <Disclosure {...SCOPE_TOGGLE} context={QUICK.name} className="mt-7">
        <div className="mt-7 border-t border-line pt-7">
          <Scope option={QUICK} className="min-[600px]:grid-cols-2 min-[600px]:gap-x-8 min-[1101px]:grid-cols-3" />
          <Fit option={QUICK} className="mt-6" />
          {QUICK.note && <p className="mt-4 mb-0 text-[13px] leading-[1.6] text-muted">{QUICK.note}</p>}
        </div>
      </Disclosure>
    </Block>
  );
}

/** Quick Start vs 기존 홈페이지 맞춤 개선 — answered between the two prices it is about. */
function QuickVsImprovement() {
  const { question, quick, improvement } = QUICK_VS_IMPROVEMENT;
  return (
    <aside
      data-reveal
      aria-labelledby="quick-vs-improvement"
      className="mt-6 rounded-2xl border border-blue-200 bg-white p-12 shadow-window narrow:p-9 mobile:mt-4 mobile:rounded-xl mobile:p-6"
    >
      <p className="m-0 text-[13px] leading-[1.4] font-bold text-accent">자주 묻는 질문</p>
      <h3 id="quick-vs-improvement" className="mt-2 mb-0 text-[26px] leading-[1.35] font-bold tracking-[-0.025em] text-balance text-ink mobile:text-[20px]">
        {question}
      </h3>
      <div className="mt-7 grid grid-cols-2 gap-5 mobile:mt-5 mobile:grid-cols-1 mobile:gap-3">
        {[
          { ...quick, option: QUICK },
          { ...improvement, option: IMPROVEMENT },
        ].map(({ name, line, text, option }) => (
          <div key={name} className="rounded-xl bg-sunken p-7 mobile:p-5">
            <p className="m-0 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <span className="text-[15px] leading-[1.4] font-bold text-muted">{name}</span>
              <span className="text-[15px] leading-[1.4] font-bold whitespace-nowrap text-ink">
                {won(option.price)}원{option.from ? "부터" : ""}
              </span>
            </p>
            <p className="mt-3 mb-0 text-[20px] leading-[1.4] font-bold tracking-[-0.02em] text-ink mobile:text-[18px]">{line}</p>
            <p className="mt-2 mb-0 text-[15px] leading-[1.7] text-pretty text-body">{text}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

/** 맞춤 개선 / 맞춤 홈페이지 제작 — priced per site, so: what it is, the main work, and what is quoted separately. */
function Tailored({ option }: { option: SetupOption }) {
  return (
    <Block option={option} className="row-span-5 grid grid-rows-subgrid gap-y-0">
      <p className={`mt-7 text-[22px] leading-[1.4] mobile:mt-5 mobile:text-[19px] ${STATEMENT}`}>{option.website}</p>
      <p className="mt-2 mb-0 text-[16px] leading-[1.65] text-pretty text-body">{option.summary}</p>
      <CheckList items={option.highlights} className="mt-6" />
      <div className="mt-6">
        {option.note && <p className="m-0 text-[13px] leading-[1.6] text-muted">{option.note}</p>}
        <Disclosure {...SCOPE_TOGGLE} context={option.name} className="mt-6">
          <div className="mt-6 border-t border-line pt-6">
            <Scope option={option} columns="wide" />
            <Fit option={option} className="mt-6" />
          </div>
        </Disclosure>
      </div>
    </Block>
  );
}

/**
 * AI 스마트 홈페이지 — the four one-time builds. What connecting AI 상담 consists of comes first, once;
 * the comparison then answers "which one" by what happens to the homepage, and the blocks under it
 * answer "why this price", each with its full scope one toggle away.
 */
export function SetupSection() {
  return (
    <Section id={SETUP_ID} aria-labelledby="setup-title" pt="pt-28 mobile:pt-16" pb="pb-0" className="scroll-mt-8">
      <div data-reveal>
        <SceneHeader
          size="md"
          step="03"
          eyebrow={`${FEATURES.website.label} · 처음 한 번`}
          titleId="setup-title"
          title="홈페이지 상태에 맞는 방식을 선택합니다."
          sub="지금 홈페이지를 그대로 쓸 수도, 새로 만들 수도, 고쳐 쓸 수도 있습니다. 월 구독과는 따로 선택합니다."
          subSize="md"
          subClassName="mobile:text-[16px]"
        />
      </div>

      <ConsultSetup />
      <SetupComparison />
      <div data-reveal>
        <Notice className="mt-4">
          <strong className="font-bold text-ink">{WEBSITE_OPERATION.label}.</strong> {WEBSITE_OPERATION.text} {WEBSITE_OPERATION.separate}
        </Notice>
        <p className="mt-3 mb-0 text-[14px] leading-[1.6] text-muted">{VAT_NOTICE.setup}</p>
      </div>

      <Integration />
      <Quick />
      <QuickVsImprovement />
      <div className="mt-6 grid grid-cols-2 gap-6 narrow:grid-cols-1 mobile:mt-4 mobile:gap-4">
        <Tailored option={IMPROVEMENT} />
        <Tailored option={CUSTOM} />
      </div>
    </Section>
  );
}
