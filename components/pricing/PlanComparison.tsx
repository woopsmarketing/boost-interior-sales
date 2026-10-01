"use client";

import { DisclosureButton, useDisclosure } from "@/components/pricing/Disclosure";
import { Check } from "@/components/ui/CheckList";
import { COMPARISON, COMPARISON_CORE, PLANS, won } from "@/lib/pricing";
import { COMPARISON_ID } from "@/lib/site";

const FULL_ID = "comparison-full";

const ROW_LABEL =
  "border-t border-line px-8 py-3.5 text-[15px] leading-[1.5] font-medium text-body mobile:py-3 mobile:pr-2 mobile:pl-5 mobile:text-[14px]";
const CELL = "border-t border-line px-3 py-3.5 text-center mobile:px-1 mobile:py-3";

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

function Row({ row }: { row: (typeof COMPARISON_CORE)[number] }) {
  return (
    <tr>
      <th scope="row" className={ROW_LABEL}>
        {row.label}
      </th>
      {row.plans.map((on, i) => (
        <td key={PLANS[i].name} className={CELL}>
          <Mark on={on} />
        </td>
      ))}
    </tr>
  );
}

/**
 * 플랜 비교 — where the plan cards hand over: they carry three lines each, this carries the rest.
 * One table at every width: the six rows that decide a plan first, and every feature by category
 * in their place once "전체 기능 비교 보기" is opened.
 */
export function PlanComparison() {
  const { open, toggle, ref } = useDisclosure();
  return (
    <div id={COMPARISON_ID} data-reveal className="mt-16 scroll-mt-24 mobile:mt-12">
      <h3 id="comparison-title" className="m-0 text-[28px] leading-[1.3] font-bold tracking-[-0.03em] text-ink mobile:text-[22px]">
        플랜별 차이 한눈에 보기
      </h3>
      <p className="mt-2 mb-0 text-[16px] leading-[1.6] text-muted mobile:text-[15px]">
        카드에는 핵심만 담았습니다. 세부 기능은 이 표에서 모두 확인할 수 있습니다.
      </p>

      <div className="mt-7 overflow-hidden rounded-xl bg-white shadow-md mobile:mt-5">
        <table aria-labelledby="comparison-title" className="w-full border-collapse text-left">
          <colgroup>
            <col />
            <col span={3} className="w-[17%] mobile:w-[62px]" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="px-8 py-6 text-[13px] leading-[1.4] font-bold text-muted mobile:py-4 mobile:pr-2 mobile:pl-5">
                기능
              </th>
              {PLANS.map((plan) => (
                <th key={plan.name} scope="col" className="px-3 py-6 text-center align-bottom mobile:px-1 mobile:py-4">
                  <span className="block text-[18px] leading-[1.3] font-bold text-ink mobile:text-[12px]">{plan.name}</span>
                  <span className="mt-1 block text-[13px] leading-[1.4] font-medium whitespace-nowrap text-muted mobile:hidden">
                    월 {won(plan.price)}원
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody hidden={open}>
            {COMPARISON_CORE.map((row) => (
              <Row key={row.label} row={row} />
            ))}
          </tbody>
          {COMPARISON.map((group, g) => (
            <tbody
              key={group.category}
              id={`${FULL_ID}-${g}`}
              hidden={!open}
              className="motion-safe:[&_td]:animate-disclose motion-safe:[&_th]:animate-disclose"
            >
              {/* The plan names repeat on every category row: the table head is off screen by the second one. */}
              <tr className="bg-sunken">
                <th
                  scope="rowgroup"
                  className="border-t border-line px-8 py-3 text-[13px] leading-[1.4] font-bold text-accent mobile:py-2.5 mobile:pr-2 mobile:pl-5"
                >
                  {group.category}
                </th>
                {PLANS.map((plan) => (
                  <td
                    key={plan.name}
                    aria-hidden="true"
                    className="border-t border-line px-3 py-3 text-center text-[12px] leading-[1.4] font-bold text-muted mobile:px-1 mobile:py-2.5 mobile:text-[11px]"
                  >
                    {plan.name}
                  </td>
                ))}
              </tr>
              {group.rows.map((row) => (
                <Row key={row.label} row={row} />
              ))}
            </tbody>
          ))}
        </table>
        <DisclosureButton
          ref={ref}
          open={open}
          controls={COMPARISON.map((_, g) => `${FULL_ID}-${g}`).join(" ")}
          show="전체 기능 비교 보기"
          hide="전체 기능 비교 접기"
          variant="bar"
          onClick={toggle}
        />
      </div>
    </div>
  );
}
