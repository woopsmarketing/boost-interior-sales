import type { ReactNode } from "react";
import { AvailabilityList, MonthlyPrice, StatusChip } from "@/components/pricing/ProductParts";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Icon } from "@/components/ui/Icon";
import { MoreLink } from "@/components/ui/MoreLink";
import { Section } from "@/components/ui/Section";
import { ALL_IN_ONE, ALLOWANCE_NOTE, SUBSCRIBE_NOTE, TRIAL, VAT_SHORT, won, type Subscription, type SubscriptionKey } from "@/lib/pricing";
import { FEATURES, KAKAO_LABEL, KAKAO_NOTE, KAKAO_OPEN_CHAT_URL, PRICING_DETAILS_PATH, PRICING_PATH, TRIAL_ID } from "@/lib/site";

/** Where each subscription is explained. 올인원 is the other two together: its conditions are on the details page. */
const MORE: Record<SubscriptionKey, { href: string; label: string }> = {
  marketing: { href: FEATURES.marketing.path, label: `${FEATURES.marketing.label} 자세히 알아보기` },
  consultation: { href: FEATURES.consultation.path, label: `${FEATURES.consultation.label} 자세히 알아보기` },
  "all-in-one": { href: `${PRICING_DETAILS_PATH}#all-in-one`, label: "이용 조건 자세히 보기" },
};

/**
 * One subscription as a card (/pricing): what it is for, the monthly amount, everything it carries,
 * where it works today, and what its name must not be read as. The button is 문의 — this site takes
 * no payment and starts no trial.
 */
export function SubscriptionCard({ item }: { item: Subscription }) {
  const bundle = item.key === "all-in-one";
  const more = MORE[item.key];
  return (
    <article
      id={item.id}
      aria-labelledby={`${item.id}-title`}
      className={`flex scroll-mt-24 flex-col rounded-2xl bg-white p-8 shadow-md mobile:rounded-xl mobile:p-6 ${bundle ? "ring-2 ring-accent" : ""}`}
    >
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
        <span className="grid size-9 flex-none place-items-center rounded-md bg-accent-soft text-accent">
          <Icon name={item.icon} className="size-5" />
        </span>
        <h3 id={`${item.id}-title`} className="m-0 text-[22px] leading-[1.3] font-bold tracking-[-0.025em] text-ink">
          {item.name}
        </h3>
        {bundle && <Badge>{`월 ${won(ALL_IN_ONE.saving)}원 절약`}</Badge>}
      </div>
      <p className="mt-3 mb-0 min-h-[3.1em] text-[15.5px] leading-[1.55] text-pretty text-body narrow:min-h-0">{item.line}</p>

      <p className="mt-5 mb-0 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <MonthlyPrice item={item} className="text-[38px] mobile:text-[34px]" />
        <span className="text-[13px] leading-none font-medium text-muted">{VAT_SHORT}</span>
      </p>
      <p className="mt-2.5 mb-0 min-h-[1.5em] text-[14px] leading-[1.5] font-semibold text-accent narrow:min-h-0">
        {bundle ? `따로 구독하면 월 ${won(ALL_IN_ONE.separate)}원` : ""}
      </p>
      {/* The name says "all": what it leaves out is said next to the price, not in the small print. */}
      {bundle && <p className="mt-3 mb-0 rounded-lg bg-gray-100 px-4 py-3 text-[14.5px] leading-[1.55] font-semibold text-pretty text-ink">{item.caution}</p>}

      <CheckList items={item.features} className="mt-5 border-t border-line pt-6" />

      <div className="mt-6 border-t border-line pt-5">
        <AvailabilityList items={item.availability} />
        {item.key === TRIAL.product && (
          <a
            href={`#${TRIAL_ID}`}
            className="mt-2 flex min-h-11 flex-wrap items-center gap-x-2.5 gap-y-1 text-[14px] leading-[1.5] text-link underline-offset-4 hover:underline"
          >
            <StatusChip status={TRIAL.status} />
            <span>{TRIAL.label} · 정책 보기</span>
          </a>
        )}
        {!bundle && <p className="mt-3 mb-0 text-[13.5px] leading-[1.6] text-pretty text-muted">{item.caution}</p>}
      </div>

      <div className="mt-auto pt-7">
        <ButtonLink href={KAKAO_OPEN_CHAT_URL} external full variant={bundle ? "primary" : "secondary"}>
          {KAKAO_LABEL}
        </ButtonLink>
        <MoreLink href={more.href} size="sm" className="mt-2">
          {more.label}
        </MoreLink>
      </div>
    </article>
  );
}

/**
 * A subscription's price on its own feature page: the amount, where it works today, everything it
 * carries, and — as `children` — what belongs next to it there (the trial policy, the 올인원 offer).
 */
export function SubscriptionPanel({ item, children }: { item: Subscription; children?: ReactNode }) {
  return (
    <Section id="price" aria-labelledby="price-title" pt="pt-32 mobile:pt-16" pb="pb-0" className="scroll-mt-8">
      <div
        data-reveal
        className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-14 gap-y-9 rounded-2xl bg-white p-12 shadow-md narrow:grid-cols-1 narrow:p-9 mobile:rounded-xl mobile:p-6"
      >
        <div>
          <p className="m-0 text-[15px] leading-[1.4] font-bold text-accent">요금</p>
          <h2 id="price-title" className="mt-2 mb-0 text-[30px] leading-[1.3] font-bold tracking-[-0.03em] text-ink mobile:text-[24px]">
            {item.name}
          </h2>
          <p className="mt-5 mb-0 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <MonthlyPrice item={item} className="text-[44px] mobile:text-[36px]" />
            <span className="text-[13px] leading-none font-medium text-muted">{VAT_SHORT}</span>
          </p>
          <AvailabilityList items={item.availability} className="mt-6" />
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 max-[480px]:grid">
            <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" arrow>
              {KAKAO_LABEL}
            </ButtonLink>
            <MoreLink href={`${PRICING_PATH}#${item.id}`}>요금 전체 보기</MoreLink>
          </div>
          <p className="mt-2 mb-0 text-[13px] leading-[1.6] text-pretty text-muted">
            {SUBSCRIBE_NOTE} {KAKAO_NOTE}
          </p>
        </div>
        <div>
          <h3 className="m-0 text-[17px] leading-[1.4] font-bold tracking-[-0.01em] text-ink">포함 기능</h3>
          <CheckList items={item.features} className="mt-4" />
          <p className="mt-5 mb-0 text-[14px] leading-[1.6] text-pretty text-body">{item.caution}</p>
          <p className="mt-1.5 mb-0 text-[14px] leading-[1.6] text-pretty text-muted">{ALLOWANCE_NOTE}</p>
          {children}
        </div>
      </div>
    </Section>
  );
}
