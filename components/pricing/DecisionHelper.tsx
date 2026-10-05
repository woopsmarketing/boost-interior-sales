import Link from "next/link";
import type { ReactNode } from "react";
import { SetupPrice } from "@/components/pricing/SetupParts";
import { Check } from "@/components/ui/CheckList";
import { DECISION_SETUP_KEYS, PLANS, SETUP_OPTIONS, won } from "@/lib/pricing";

const PRICE = "text-[20px] leading-none font-bold tracking-[-0.03em] text-ink";

/** One answer: what the owner would say, and the option it leads to. The whole row is the link. */
function Row({ href, need, name, children }: { href: string; need: string; name: string; children: ReactNode }) {
  const Anchor = href.startsWith("/") ? Link : "a";
  return (
    <li>
      <Anchor
        href={href}
        className="group grid items-center gap-x-6 gap-y-2.5 rounded-xl bg-white px-6 py-[18px] no-underline shadow-md transition-shadow duration-160 ease-out hover:shadow-window min-[601px]:grid-cols-[minmax(0,1fr)_auto] mobile:gap-y-2 mobile:px-5 mobile:py-3.5"
      >
        <span className="text-[17px] leading-[1.45] font-semibold tracking-[-0.01em] text-balance text-ink mobile:text-[15.5px]">
          “{need}”
        </span>
        <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 min-[601px]:flex-col min-[601px]:items-end min-[601px]:gap-2">
          <span className="flex items-center gap-1.5 text-[14px] leading-none font-bold whitespace-nowrap text-accent">
            <span aria-hidden="true" className="transition-transform duration-160 ease-out group-hover:translate-x-0.5">
              →
            </span>
            {name}
          </span>
          {children}
        </span>
      </Anchor>
    </li>
  );
}

function Group({ id, when, title, note, children }: { id: string; when: string; title: string; note?: string; children: ReactNode }) {
  return (
    <div role="group" aria-labelledby={id}>
      <p id={id} className="m-0 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="text-[20px] leading-[1.35] font-bold tracking-[-0.02em] text-ink mobile:text-[18px]">{title}</span>
        <span className="text-[13px] leading-[1.4] font-semibold text-muted">{when}</span>
      </p>
      <ul className="mt-4 mb-0 grid list-none gap-2.5 p-0 mobile:mt-3 mobile:gap-2">{children}</ul>
      {note && (
        <p className="mt-3 mb-0 flex gap-2 px-1 text-[14px] leading-[1.6] font-medium text-body">
          <Check className="mt-[5px] size-3.5 text-accent" />
          {note}
        </p>
      )}
    </div>
  );
}

/**
 * 내 상황에 맞는 선택 — the two choices put the way an owner would say them, so the price list is
 * read as "which one is mine" rather than card by card. Every row leads to that option's card on
 * /pricing: `base` is the path to it from another page, and empty on /pricing itself.
 */
export function DecisionHelper({ base = "", className = "" }: { base?: string; className?: string }) {
  const options = DECISION_SETUP_KEYS.map((key) => SETUP_OPTIONS.find((option) => option.key === key)!);
  return (
    <div className={`grid grid-cols-2 items-start gap-x-10 gap-y-9 narrow:grid-cols-1 mobile:gap-y-7 ${className}`}>
      <Group id="decide-setup" title="지금 홈페이지 상황은?" when="초기 구축 · 처음 한 번">
        {options.map((option) => (
          <Row key={option.key} href={`${base}#${option.id}`} need={option.need} name={option.name}>
            <SetupPrice option={option} className="text-[20px]" />
          </Row>
        ))}
      </Group>
      <Group id="decide-plan" title="운영은 어디까지 필요한가요?" when="운영 플랜 · 매월" note={PLANS[0].assurance}>
        {PLANS.map((plan) => (
          <Row key={plan.name} href={`${base}#plan-${plan.name.toLowerCase()}`} need={plan.need} name={plan.name}>
            <span className="flex items-baseline gap-1 whitespace-nowrap">
              <span className="text-[13px] leading-none font-semibold text-body">월</span>
              <span className={PRICE}>{won(plan.price)}</span>
              <span className="text-[12.5px] leading-none font-bold text-ink">원</span>
            </span>
          </Row>
        ))}
      </Group>
    </div>
  );
}
