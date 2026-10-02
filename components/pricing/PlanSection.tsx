import { PlanComparison } from "@/components/pricing/PlanComparison";
import { CheckList } from "@/components/ui/CheckList";
import { Icon } from "@/components/ui/Icon";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { PLANS, VAT_NOTICE, won } from "@/lib/pricing";
import { COMPARISON_ID, PORTFOLIO_VIDEO_SAMPLE } from "@/lib/site";

const ROLE_TAG =
  "inline-flex h-[26px] items-center rounded-pill bg-accent-soft px-2.5 text-[12px] leading-none font-semibold whitespace-nowrap text-blue-700";

/** What AI Portfolio Video is, in customer terms. A real sample plays here once one exists. */
function PortfolioVideo() {
  const sample = PORTFOLIO_VIDEO_SAMPLE;
  return (
    <div
      data-reveal
      className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-6 rounded-xl border border-line-strong p-8 mobile:mt-4 mobile:grid-cols-1 mobile:gap-4 mobile:p-6"
    >
      <span className="grid size-12 place-items-center rounded-md bg-white text-accent shadow-sm">
        <Icon name="video" />
      </span>
      <div>
        <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-[20px] leading-[1.35] font-bold tracking-[-0.02em] text-ink mobile:text-[18px]">
            AI Portfolio Video
          </span>
          <span className={ROLE_TAG}>Growth부터</span>
        </p>
        <p className="mt-2.5 mb-0 max-w-[820px] text-[16px] leading-[1.7] text-pretty text-body mobile:text-[15px]">
          시공사진을 공간의 흐름에 따라 보여주는 영상 포트폴리오입니다. 완성된 시공사진을 사진 목록으로만 두지 않고,
          공간을 따라 이동하는 영상으로 보여줄 수 있도록 지원합니다.
        </p>
        <p className="mt-3 mb-0 text-[14px] leading-[1.6] font-semibold text-ink">
          시공사례 영상 제작 · 건수 제한 없음
          <span className="font-normal text-muted"> — 업체가 제공하는 실제 시공 자료 기준</span>
        </p>
        {sample && (
          <video
            src={sample.src}
            poster={sample.poster}
            width={sample.width}
            height={sample.height}
            controls
            playsInline
            preload="none"
            aria-label="AI Portfolio Video 실제 예시"
            className="mt-6 block h-auto w-full max-w-[720px] rounded-lg bg-gray-900"
          />
        )}
      </div>
    </div>
  );
}

/**
 * 운영 플랜 — the cards say what each plan is in three lines; the comparison right under them is
 * where the features are checked: six rows first, every feature on demand.
 */
export function PlanSection() {
  return (
    <Section id="plans" aria-labelledby="plans-title" pt="pt-32 mobile:pt-20" pb="pb-0" className="scroll-mt-8">
      <div data-reveal>
        <SceneHeader
          step="02"
          eyebrow="운영 플랜 · 매월"
          titleId="plans-title"
          title="필요한 기능과 운영 수준을 선택합니다."
          sub="Core는 핵심 기능, Growth는 방문자 분석과 시공사진 영상(AI Portfolio Video), Managed는 사람이 함께하는 운영입니다."
        />
      </div>

      <div data-reveal className="mt-12 grid grid-cols-3 items-stretch gap-5 narrow:grid-cols-1 mobile:mt-7 mobile:gap-4">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            id={`plan-${plan.name.toLowerCase()}`}
            aria-labelledby={`plan-${plan.name}`}
            className="row-span-5 grid scroll-mt-24 grid-rows-subgrid gap-y-0 rounded-xl bg-white p-8 shadow-md mobile:p-6"
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
                <span className="text-[clamp(30px,3.1vw,40px)] leading-none font-bold tracking-[-0.035em]">
                  {won(plan.price)}
                </span>
                <span className="ml-0.5 text-[18px] leading-none font-bold">원</span>
              </span>
            </p>
            <p className="mt-4 mb-0 text-[16px] leading-[1.6] text-pretty text-body">{plan.summary}</p>
            <div className="mt-6 border-t border-line pt-6">
              <CheckList items={plan.highlights} lead={plan.base && `${plan.base} 전체 포함`} />
            </div>
            {plan.note && <p className="m-0 self-end pt-6 text-[13px] leading-[1.6] text-muted">{plan.note}</p>}
          </article>
        ))}
      </div>

      <p
        data-reveal
        className="mt-5 mb-0 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-[14px] leading-[1.6] text-muted"
      >
        {VAT_NOTICE.monthly}
        <a
          href={`#${COMPARISON_ID}`}
          className="group inline-flex items-center gap-1.5 text-[15px] leading-[1.4] font-semibold text-link no-underline"
        >
          <span className="underline-offset-4 group-hover:underline">전체 기능 비교</span>
          <span aria-hidden="true" className="transition-transform duration-160 ease-out group-hover:translate-y-0.5">
            ↓
          </span>
        </a>
      </p>

      <PlanComparison />
      <PortfolioVideo />
    </Section>
  );
}
