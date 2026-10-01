import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Check, CheckList } from "@/components/ui/CheckList";
import { Icon } from "@/components/ui/Icon";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { manwon, SETUP_OPTIONS, won, type SetupOption } from "@/lib/pricing";
import { INTEGRATION_GROUPS, INTEGRATION_PROCESS, QUICK_FEATURES, QUICK_VS_IMPROVEMENT } from "@/lib/pricing-page";
import { DEMO_URL, SITE_NAME } from "@/lib/site";

const [INTEGRATION, QUICK, IMPROVEMENT, CUSTOM] = SETUP_OPTIONS;

const SUBHEAD = "m-0 text-[13px] leading-[1.4] font-bold tracking-[0.01em] text-muted";

function Letter({ option }: { option: SetupOption }) {
  return (
    <span
      aria-hidden="true"
      className={`grid size-7 flex-none place-items-center rounded-pill text-[13px] leading-none font-bold text-white ${
        option.key === "A" ? "bg-accent" : "bg-gray-900"
      }`}
    >
      {option.key}
    </span>
  );
}

/** "290,000원" / "1,500,000원부터" — digits stay in one text node, so the amount reads and searches as one number. */
function Amount({ option, className = "" }: { option: SetupOption; className?: string }) {
  return (
    <p className={`m-0 flex flex-wrap items-baseline text-ink ${className}`}>
      <span className="whitespace-nowrap">
        <span className="text-[clamp(32px,3.4vw,44px)] leading-none font-bold tracking-[-0.035em]">{won(option.price)}</span>
        <span className="ml-0.5 text-[20px] leading-none font-bold">원</span>
      </span>
      {option.from && <span className="ml-1.5 text-[17px] leading-none font-semibold text-body">부터</span>}
    </p>
  );
}

/** One setup option in full: who it is for and the price on the left, the scope on the right. */
function Detail({ option, scope, children }: { option: SetupOption; scope?: ReactNode; children?: ReactNode }) {
  const titleId = `${option.id}-title`;
  return (
    <article
      id={option.id}
      data-reveal
      aria-labelledby={titleId}
      className="mt-6 scroll-mt-24 rounded-2xl bg-white p-12 shadow-md narrow:p-9 mobile:mt-4 mobile:rounded-xl mobile:p-6"
    >
      <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-14 narrow:grid-cols-1 narrow:gap-9 mobile:gap-7">
        <div>
          <div className="flex items-center gap-2.5">
            <Letter option={option} />
            <h3 id={titleId} className="m-0 text-[24px] leading-[1.3] font-bold tracking-[-0.025em] text-ink mobile:text-[21px]">
              {option.name}
            </h3>
          </div>
          <Amount option={option} className="mt-6" />
          <p className="mt-5 mb-0 text-[13px] leading-[1.4] font-bold text-accent">{option.scope}</p>
          <p className="mt-1.5 mb-0 text-[17px] leading-[1.65] text-pretty text-body mobile:text-[16px]">{option.summary}</p>
          <div className="mt-6 rounded-lg bg-sunken px-5 py-4">
            <p className={SUBHEAD}>이런 업체에 맞습니다</p>
            <p className="mt-1.5 mb-0 text-[15px] leading-[1.6] font-medium text-ink">{option.fit}</p>
          </div>
        </div>
        <div>
          {scope ?? (
            <>
              <p className={SUBHEAD}>포함 범위</p>
              <CheckList items={option.includes} columns="wide" className="mt-4" />
            </>
          )}
          {option.note && <p className="mt-6 mb-0 text-[13px] leading-[1.6] text-muted">{option.note}</p>}
        </div>
      </div>
      {children}
    </article>
  );
}

/** The 290,000원 scope, grouped by what the work produces rather than as one long list. */
function IntegrationScope() {
  return (
    <>
      <p className={SUBHEAD}>포함 범위</p>
      <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-7 max-[600px]:grid-cols-1 max-[600px]:gap-y-6">
        {INTEGRATION_GROUPS.map((group) => (
          <div key={group.title}>
            <h4 className="m-0 flex items-center gap-2.5 text-[16px] leading-[1.4] font-bold text-ink">
              <span className="grid size-8 flex-none place-items-center rounded-md bg-accent-soft text-accent">
                <Icon name={group.icon} className="size-[18px]" />
              </span>
              {group.title}
            </h4>
            <CheckList items={group.items} className="mt-3" />
          </div>
        ))}
      </div>
    </>
  );
}

function IntegrationExtras() {
  return (
    <>
      <div className="mt-10 rounded-xl border border-blue-200 bg-accent-soft px-8 py-7 mobile:mt-7 mobile:px-5 mobile:py-5">
        <p className="m-0 text-[20px] leading-[1.45] font-bold tracking-[-0.02em] text-ink mobile:text-[17px]">
          스크립트 하나만 설치하는 비용이 아닙니다.
        </p>
        <p className="mt-2 mb-0 text-[16px] leading-[1.7] text-pretty text-body mobile:text-[15px]">
          현재 홈페이지의 업체 정보와 시공사례를 {SITE_NAME}가 실제 상담에 사용할 수 있도록 업체 전용 시스템으로 구축합니다.
        </p>
        <p className="mt-4 mb-0 flex gap-2.5 border-t border-blue-200 pt-4 text-[15px] leading-[1.6] text-body">
          <Check className="mt-[5px] size-3.5 text-accent" />
          <span>
            <strong className="font-bold text-ink">포트폴리오 건수 제한 없음.</strong> 현재 홈페이지에 공개된 기존 포트폴리오
            전체가 초기 구축 대상입니다. 홈페이지에 없는 별도 자료의 정리는 범위를 확인한 뒤 안내해드립니다.
          </span>
        </p>
      </div>

      <div className="mt-10 mobile:mt-8">
        <h4 className="m-0 text-[20px] leading-[1.4] font-bold tracking-[-0.02em] text-ink mobile:text-[18px]">
          {won(INTEGRATION.price)}원으로 진행되는 작업
        </h4>
        <ol className="mt-5 mb-0 grid list-none grid-cols-4 gap-3 p-0 narrow:grid-cols-2 mobile:grid-cols-1 mobile:gap-0">
          {INTEGRATION_PROCESS.map((step, i) => (
            <li
              key={step.title}
              className={`rounded-lg border border-line bg-sunken p-5 mobile:flex mobile:gap-4 mobile:rounded-none mobile:border-0 mobile:bg-transparent mobile:px-0 mobile:py-4 ${
                i ? "mobile:border-t" : ""
              }`}
            >
              <span className="font-mono text-[13px] leading-none font-medium text-accent mobile:pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="mt-3 mb-0 text-[17px] leading-[1.4] font-bold tracking-[-0.01em] text-ink mobile:mt-0 mobile:text-[16px]">
                  {step.title}
                </p>
                <p className="mt-1.5 mb-0 text-[14px] leading-[1.6] text-pretty text-body">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

function QuickExtras() {
  return (
    <div className="mt-10 mobile:mt-7">
      <h4 className="m-0 text-[20px] leading-[1.4] font-bold tracking-[-0.02em] text-balance text-ink mobile:text-[18px]">
        싸게 만들어서가 아니라, 표준화해서 빠르게 제작하기 때문에 {manwon(QUICK.price)}만원입니다.
      </h4>
      <p className="mt-1.5 mb-0 text-[15px] leading-[1.6] text-muted">
        인테리어 업체 홈페이지에 필요한 것은 표준 구조에 이미 들어 있습니다.
      </p>
      <ul className="mt-5 mb-0 grid list-none grid-cols-6 gap-3 p-0 narrow:grid-cols-3 mobile:grid-cols-2">
        {QUICK_FEATURES.map((feature) => (
          <li key={feature.label} className="rounded-lg border border-line bg-sunken px-4 py-5 mobile:px-3.5 mobile:py-4">
            <span className="grid size-9 place-items-center rounded-md bg-white text-accent shadow-sm">
              <Icon name={feature.icon} className="size-5" />
            </span>
            <p className="mt-3.5 mb-0 text-[15px] leading-[1.3] font-bold text-ink">{feature.label}</p>
            <p className="mt-1 mb-0 text-[13px] leading-[1.5] text-body">{feature.text}</p>
          </li>
        ))}
      </ul>
      <div className="mt-7">
        <ButtonLink href={DEMO_URL} external variant="secondary" arrow className="max-[480px]:w-full">
          {SITE_NAME} 실제 데모 보기
        </ButtonLink>
      </div>
    </div>
  );
}

/** 49만원 vs 150만원부터 — answered next to the two prices it is about. */
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

/** 초기 구축 — the four ways to build, each with its full scope. The first one gets the most room. */
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

      <nav data-reveal aria-label="구축 방식 바로가기" className="mt-10 mobile:mt-7">
        <ul className="m-0 grid list-none grid-cols-4 gap-4 p-0 narrow:grid-cols-2 mobile:grid-cols-1 mobile:gap-3">
          {SETUP_OPTIONS.map((option) => (
            <li key={option.key}>
              <a
                href={`#${option.id}`}
                className="group flex h-full flex-col rounded-xl border border-line-strong p-6 no-underline transition-colors duration-160 ease-out hover:border-accent hover:bg-white mobile:flex-row mobile:items-center mobile:justify-between mobile:gap-4 mobile:p-5"
              >
                <span className="flex items-center gap-2.5">
                  <Letter option={option} />
                  <span className="text-[16px] leading-[1.35] font-bold tracking-[-0.01em] text-ink">{option.name}</span>
                </span>
                <span className="mt-4 flex items-baseline whitespace-nowrap text-ink mobile:mt-0">
                  <span className="text-[24px] leading-none font-bold tracking-[-0.03em] mobile:text-[18px]">
                    {won(option.price)}
                  </span>
                  <span className="ml-0.5 text-[15px] leading-none font-bold">원</span>
                  {option.from && <span className="ml-1 text-[13px] leading-none font-semibold text-body">부터</span>}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 mobile:mt-6">
        <Detail option={INTEGRATION} scope={<IntegrationScope />}>
          <IntegrationExtras />
        </Detail>
        <Detail option={QUICK}>
          <QuickExtras />
        </Detail>
        <QuickVsImprovement />
        <Detail option={IMPROVEMENT} />
        <Detail option={CUSTOM} />
      </div>
    </Section>
  );
}
