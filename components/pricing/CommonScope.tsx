import { Disclosure } from "@/components/pricing/Disclosure";
import { Letter } from "@/components/pricing/SetupParts";
import { CheckList } from "@/components/ui/CheckList";
import { Icon } from "@/components/ui/Icon";
import { Notice } from "@/components/ui/Notice";
import { COMMON_BOOSTINTERIOR_SCOPE, COMMON_SCOPE_ITEMS, SETUP_OPTIONS } from "@/lib/pricing";
import { COMMON_SCOPE } from "@/lib/pricing-page";

const COUNT = COMMON_SCOPE_ITEMS.length;

/**
 * BoostInterior 기본 구축 — the part all four setup options share, said once and before the
 * comparison: what follows only compares the homepage work. Chips first, the items behind them
 * on demand.
 */
export function CommonScope() {
  return (
    <div
      data-reveal
      role="group"
      aria-labelledby="common-scope-title"
      className="mt-10 rounded-2xl border border-blue-200 bg-white p-12 shadow-window narrow:p-9 mobile:mt-7 mobile:rounded-xl mobile:p-6"
    >
      <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="flex gap-1">
          {SETUP_OPTIONS.map((option) => (
            <Letter key={option.key} option={option} />
          ))}
        </span>
        <span className="text-[13px] leading-[1.4] font-bold text-accent">
          <span className="sr-only">A · B · C · D </span>네 가지 구축 방식 공통
        </span>
      </p>
      <h3
        id="common-scope-title"
        className="mt-4 mb-0 max-w-[860px] text-[30px] leading-[1.3] font-bold tracking-[-0.03em] text-balance text-ink mobile:text-[22px]"
      >
        {COMMON_SCOPE.title}
      </h3>
      <p className="mt-3 mb-0 max-w-[900px] text-[17px] leading-[1.7] text-pretty text-body mobile:text-[16px]">{COMMON_SCOPE.text}</p>

      <ul className="mt-8 mb-0 flex list-none flex-wrap gap-2.5 p-0 mobile:mt-6 mobile:gap-2">
        {COMMON_BOOSTINTERIOR_SCOPE.map((group) => (
          <li
            key={group.label}
            className="inline-flex h-11 items-center gap-2 rounded-pill border border-line bg-sunken pr-4 pl-3 text-[15px] leading-none font-semibold whitespace-nowrap text-ink mobile:h-9 mobile:pr-3.5 mobile:text-[14px]"
          >
            <Icon name={group.icon} className="size-[18px] text-accent" />
            {group.label}
          </li>
        ))}
      </ul>

      <Notice className="mt-5">
        <strong className="font-bold text-ink">{COMMON_SCOPE.portfolio.lead}</strong> {COMMON_SCOPE.portfolio.text}
      </Notice>

      <Disclosure show={`기본 구축 항목 ${COUNT}개 보기`} hide={`기본 구축 항목 ${COUNT}개 접기`} className="mt-7">
        <div className="mt-7 grid gap-x-8 gap-y-6 border-t border-line pt-7 min-[601px]:grid-cols-2 min-[601px]:gap-y-7 min-[1101px]:grid-cols-4">
          {COMMON_BOOSTINTERIOR_SCOPE.map((group) => (
            <div key={group.label}>
              <p className="m-0 text-[13px] leading-[1.4] font-bold tracking-[0.01em] text-muted">{group.label}</p>
              <CheckList items={group.items} className="mt-3" />
            </div>
          ))}
        </div>
      </Disclosure>
    </div>
  );
}
