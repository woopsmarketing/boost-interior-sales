import { Check, CheckList } from "@/components/ui/CheckList";
import { Icon } from "@/components/ui/Icon";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { COMPARISON, PLANS, won } from "@/lib/pricing";
import { PORTFOLIO_VIDEO_SAMPLE } from "@/lib/site";

const ROLE_TAG =
  "inline-flex h-[26px] items-center rounded-pill bg-accent-soft px-2.5 text-[12px] leading-none font-semibold whitespace-nowrap text-blue-700";

/** Included / not included, said in words for screen readers and as a mark for the eye. */
function Mark({ on }: { on: boolean }) {
  return on ? (
    <>
      <Check className="mx-auto size-4 text-accent" />
      <span className="sr-only">포함</span>
    </>
  ) : (
    <>
      <span aria-hidden="true" className="mx-auto block h-px w-3 bg-gray-300" />
      <span className="sr-only">미포함</span>
    </>
  );
}

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
          완성된 시공사진을 단순한 갤러리로 끝내지 않고, 공간을 따라 이동하는 형태의 영상 포트폴리오로 보여줄 수 있도록
          지원합니다.
        </p>
        <p className="mt-3 mb-0 text-[14px] leading-[1.6] font-semibold text-ink">
          시공 포트폴리오 영상 제작 · 건수 제한 없음
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

function Comparison() {
  return (
    <div data-reveal className="mt-16 mobile:mt-12">
      <h3 id="comparison-title" className="m-0 text-[28px] leading-[1.3] font-bold tracking-[-0.03em] text-ink mobile:text-[22px]">
        플랜별 차이 한눈에 보기
      </h3>

      {/* Desktop: one table, grouped by category. */}
      <div className="mt-7 overflow-hidden rounded-xl bg-white shadow-md mobile:hidden">
        <table aria-labelledby="comparison-title" className="w-full border-collapse text-left">
          <colgroup>
            <col />
            <col className="w-[17%]" />
            <col className="w-[17%]" />
            <col className="w-[17%]" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="px-8 py-6 text-[13px] leading-[1.4] font-bold text-muted">
                기능
              </th>
              {PLANS.map((plan) => (
                <th key={plan.name} scope="col" className="px-3 py-6 text-center align-bottom">
                  <span className="block text-[18px] leading-[1.3] font-bold text-ink">{plan.name}</span>
                  <span className="mt-1 block text-[13px] leading-[1.4] font-medium whitespace-nowrap text-muted">
                    월 {won(plan.price)}원
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          {COMPARISON.map((group) => (
            <tbody key={group.category}>
              <tr>
                <th
                  scope="colgroup"
                  colSpan={4}
                  className="border-t border-line bg-sunken px-8 py-3 text-[13px] leading-[1.4] font-bold text-accent"
                >
                  {group.category}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="border-t border-line px-8 py-3.5 text-[15px] leading-[1.5] font-medium text-body">
                    {row.label}
                  </th>
                  {row.plans.map((on, i) => (
                    <td key={PLANS[i].name} className="border-t border-line px-3 py-3.5 text-center">
                      <Mark on={on} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      {/* Mobile: one collapsible list per category. */}
      <div className="mt-5 hidden gap-3 mobile:grid">
        {COMPARISON.map((group, g) => (
          <details key={group.category} open={g === 0} className="group rounded-xl bg-white shadow-md">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[16px] leading-[1.4] font-bold text-ink [&::-webkit-details-marker]:hidden">
              {group.category}
              <span aria-hidden="true" className="text-[20px] leading-none font-medium text-muted transition-transform duration-160 ease-out group-open:rotate-45">
                +
              </span>
            </summary>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th scope="col" className="sr-only">
                    기능
                  </th>
                  {PLANS.map((plan) => (
                    <th
                      key={plan.name}
                      scope="col"
                      className="w-[58px] border-t border-line bg-sunken px-1 py-2 text-center text-[11px] leading-none font-bold text-muted"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {group.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row" className="border-t border-line py-3 pr-2 pl-5 text-[14px] leading-[1.5] font-medium text-body">
                      {row.label}
                    </th>
                    {row.plans.map((on, i) => (
                      <td key={PLANS[i].name} className="border-t border-line px-1 py-3 text-center">
                        <Mark on={on} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        ))}
      </div>
    </div>
  );
}

/** 운영 플랜 — the three monthly plans in full, then what separates them, category by category. */
export function PlanSection() {
  return (
    <Section id="plans" aria-labelledby="plans-title" pt="pt-32 mobile:pt-20" pb="pb-0" className="scroll-mt-8">
      <div data-reveal>
        <SceneHeader
          step="02"
          eyebrow="운영 플랜 · 매월"
          titleId="plans-title"
          title="필요한 기능과 운영 수준을 선택합니다."
          sub="Core는 시스템, Growth는 성장 기능, Managed는 사람이 함께하는 운영입니다."
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
              <CheckList items={plan.features} lead={plan.base && `${plan.base} 전체 포함`} columns="narrow" />
            </div>
            {plan.note && <p className="m-0 self-end pt-6 text-[13px] leading-[1.6] text-muted">{plan.note}</p>}
          </article>
        ))}
      </div>

      <PortfolioVideo />
      <Comparison />
    </Section>
  );
}
