import type { ReactNode } from "react";
import { Disclosure } from "@/components/pricing/Disclosure";
import { SetupComparison } from "@/components/pricing/SetupComparison";
import { Letter, SetupPrice } from "@/components/pricing/SetupParts";
import { ButtonLink } from "@/components/ui/Button";
import { Check, CheckList } from "@/components/ui/CheckList";
import { Icon } from "@/components/ui/Icon";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { scopeItems, SETUP_OPTIONS, won, type SetupOption } from "@/lib/pricing";
import {
  INTEGRATION_GROUPS,
  INTEGRATION_PROCESS,
  INTEGRATION_VALUE,
  QUICK_FEATURES,
  QUICK_VALUE,
  QUICK_VS_IMPROVEMENT,
} from "@/lib/pricing-page";
import { DEMO_URL, SITE_NAME } from "@/lib/site";

const [INTEGRATION, QUICK, IMPROVEMENT, CUSTOM] = SETUP_OPTIONS;

const CARD = "scroll-mt-24 rounded-2xl bg-white p-12 shadow-md narrow:p-9 mobile:rounded-xl mobile:p-6";
const SUBHEAD = "m-0 text-[13px] leading-[1.4] font-bold tracking-[0.01em] text-muted";
const STATEMENT = "mb-0 font-bold tracking-[-0.03em] text-balance text-ink";
const DETAIL_HEAD = "m-0 text-[17px] leading-[1.4] font-bold tracking-[-0.01em] text-ink";

const SCOPE_TOGGLE = { show: "전체 포함 범위 보기", hide: "전체 포함 범위 접기" };

/** Which option a block is about: letter and name on the left, the price on the right. */
function Head({ option }: { option: SetupOption }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
      <div className="flex items-center gap-2.5">
        <Letter option={option} />
        <h3 id={`${option.id}-title`} className="m-0 text-[20px] leading-[1.3] font-bold tracking-[-0.02em] text-ink mobile:text-[18px]">
          {option.name}
        </h3>
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

/** One option's block: summary in the open, the full scope under a toggle. */
function Block({ option, className = "", children }: { option: SetupOption; className?: string; children: ReactNode }) {
  return (
    <article id={option.id} data-reveal aria-labelledby={`${option.id}-title`} className={`${CARD} ${className}`}>
      <Head option={option} />
      {children}
    </article>
  );
}

/** 기존 홈페이지 연동 — why 290,000원 is a build, not an install: four things it produces, in order. */
function Integration() {
  return (
    <Block option={INTEGRATION} className="mt-6 mobile:mt-4">
      <p className={`mt-8 text-[30px] leading-[1.3] mobile:mt-6 mobile:text-[22px] ${STATEMENT}`}>{INTEGRATION_VALUE.title}</p>
      <p className="mt-3 mb-0 max-w-[900px] text-[17px] leading-[1.7] text-pretty text-body mobile:text-[16px]">
        {INTEGRATION_VALUE.text}
      </p>

      <ol className="mt-8 mb-0 grid list-none grid-cols-4 gap-3 p-0 narrow:grid-cols-2 mobile:mt-6 mobile:grid-cols-1 mobile:gap-2.5">
        {INTEGRATION_GROUPS.map((group, i) => (
          <li key={group.title} className="rounded-lg border border-line bg-sunken p-5 mobile:flex mobile:gap-4 mobile:p-4">
            <div className="flex items-center justify-between mobile:flex-none mobile:flex-col mobile:justify-start mobile:gap-2">
              <span className="grid size-10 place-items-center rounded-md bg-white text-accent shadow-sm">
                <Icon name={group.icon} className="size-5" />
              </span>
              <span aria-hidden="true" className="font-mono text-[13px] leading-none font-medium text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div>
              <p className="mt-4 mb-0 text-[17px] leading-[1.4] font-bold tracking-[-0.01em] text-ink mobile:mt-0 mobile:text-[16px]">
                {group.title}
              </p>
              <p className="mt-1.5 mb-0 text-[14px] leading-[1.6] text-pretty text-body">{group.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-5 mb-0 flex gap-2.5 rounded-lg border border-blue-200 bg-accent-soft px-5 py-4 text-[15px] leading-[1.6] text-body">
        <Check className="mt-[5px] size-3.5 text-accent" />
        <span>
          <strong className="font-bold text-ink">포트폴리오 건수 제한 없음.</strong> 현재 홈페이지에 공개된 기존 포트폴리오
          전체가 초기 구축 대상입니다. 홈페이지에 없는 별도 자료의 정리는 범위를 확인한 뒤 안내해드립니다.
        </span>
      </p>

      <Disclosure {...SCOPE_TOGGLE} context={INTEGRATION.name} className="mt-7">
        <div className="mt-7 border-t border-line pt-7">
          <h4 className={DETAIL_HEAD}>포함 항목 {scopeItems(INTEGRATION).length}개</h4>
          <div className="mt-5 grid gap-x-8 gap-y-6 min-[601px]:grid-cols-2 min-[601px]:gap-y-7 min-[1101px]:grid-cols-4">
            {INTEGRATION_GROUPS.map((group) => (
              <div key={group.title}>
                <p className={SUBHEAD}>{group.title}</p>
                <CheckList items={group.items} className="mt-3" />
              </div>
            ))}
          </div>

          <h4 className={`mt-10 mobile:mt-8 ${DETAIL_HEAD}`}>
            {won(INTEGRATION.price)}원으로 진행되는 작업 {INTEGRATION_PROCESS.length}단계
          </h4>
          <ol className="mt-5 mb-0 grid list-none grid-cols-2 gap-x-12 p-0 narrow:grid-cols-1">
            {INTEGRATION_PROCESS.map((step, i) => (
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
        </div>
      </Disclosure>
    </Block>
  );
}

/** Quick Website — six things the standard structure already covers; the 14-item scope on demand. */
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

      <Disclosure
        {...SCOPE_TOGGLE}
        context={QUICK.name}
        className="mt-7"
        actions={
          <ButtonLink href={DEMO_URL} external variant="ghost" size="md" arrow className="h-11 px-4 text-[15px]">
            {SITE_NAME} 실제 데모 보기
          </ButtonLink>
        }
      >
        <div className="mt-7 border-t border-line pt-7">
          <h4 className={DETAIL_HEAD}>포함 항목 {scopeItems(QUICK).length}개</h4>
          <CheckList
            items={scopeItems(QUICK)}
            className="mt-5 min-[600px]:grid-cols-2 min-[600px]:gap-x-8 min-[1101px]:grid-cols-3"
          />
          <Fit option={QUICK} className="mt-6" />
          {QUICK.note && <p className="mt-4 mb-0 text-[13px] leading-[1.6] text-muted">{QUICK.note}</p>}
        </div>
      </Disclosure>
    </Block>
  );
}

/** Quick Website vs 기존 홈페이지 맞춤 개선 — answered between the two prices it is about. */
function QuickVsImprovement() {
  const { question, quick, improvement } = QUICK_VS_IMPROVEMENT;
  return (
    <aside
      data-reveal
      aria-labelledby="quick-vs-improvement"
      className="mt-6 rounded-2xl border border-blue-200 bg-white p-12 shadow-window narrow:p-9 mobile:mt-4 mobile:rounded-xl mobile:p-6"
    >
      <p className="m-0 text-[13px] leading-[1.4] font-bold text-accent">자주 묻는 질문</p>
      <h3
        id="quick-vs-improvement"
        className="mt-2 mb-0 text-[26px] leading-[1.35] font-bold tracking-[-0.025em] text-balance text-ink mobile:text-[20px]"
      >
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

/** 맞춤 개선 / Custom Website — priced per site, so: what it is, the main work, and what is quoted separately. */
function Tailored({ option }: { option: SetupOption }) {
  return (
    <Block option={option} className="row-span-5 grid grid-rows-subgrid gap-y-0">
      <p className={`mt-7 text-[22px] leading-[1.4] mobile:mt-5 mobile:text-[19px] ${STATEMENT}`}>{option.scope}</p>
      <p className="mt-2 mb-0 text-[16px] leading-[1.65] text-pretty text-body">{option.summary}</p>
      <CheckList items={option.highlights} className="mt-6" />
      <div className="mt-6">
        {option.note && <p className="m-0 text-[13px] leading-[1.6] text-muted">{option.note}</p>}
        <Disclosure {...SCOPE_TOGGLE} context={option.name} className="mt-6">
          <div className="mt-6 border-t border-line pt-6">
            <h4 className={DETAIL_HEAD}>포함 항목 {scopeItems(option).length}개</h4>
            <CheckList items={scopeItems(option)} columns="wide" className="mt-5" />
            <Fit option={option} className="mt-6" />
          </div>
        </Disclosure>
      </div>
    </Block>
  );
}

/**
 * 초기 구축 — the four ways to build. The comparison answers "which one" at a glance; the blocks
 * under it answer "why this price", each with its full scope one toggle away.
 */
export function SetupSection() {
  return (
    <Section id="setup" aria-labelledby="setup-title" pt="pt-28 mobile:pt-16" pb="pb-0" className="scroll-mt-8">
      <div data-reveal>
        <SceneHeader
          step="01"
          eyebrow="초기 구축 · 한 번"
          titleId="setup-title"
          title="홈페이지 상태에 맞는 구축 방식을 선택합니다."
          sub="지금 홈페이지를 그대로 쓸 수도, 새로 만들 수도, 고쳐 쓸 수도 있습니다."
        />
      </div>

      <SetupComparison />

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
