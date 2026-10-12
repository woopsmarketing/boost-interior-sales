import { AvailabilityList, MonthlyPrice } from "@/components/pricing/ProductParts";
import { TrialPolicy } from "@/components/pricing/TrialPolicy";
import { Badge } from "@/components/ui/Badge";
import { CheckList } from "@/components/ui/CheckList";
import { Icon } from "@/components/ui/Icon";
import { MoreLink } from "@/components/ui/MoreLink";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import {
  ALL_IN_ONE,
  ALLOWANCE_NOTE,
  SUBSCRIBE_NOTE,
  subscription,
  SUBSCRIPTIONS,
  VAT_NOTICE,
  VAT_SHORT,
  won,
  type Subscription,
  type SubscriptionKey,
} from "@/lib/pricing";
import { FEATURES, PLANS_ID, TRIAL_ID } from "@/lib/site";

const CARD = "scroll-mt-24 rounded-2xl bg-white p-12 shadow-md narrow:p-9 mobile:rounded-xl mobile:p-6";
const SUBHEAD = "m-0 text-[13px] leading-[1.4] font-bold tracking-[0.01em] text-muted";

const PAGES: Partial<Record<SubscriptionKey, { path: string; label: string }>> = {
  marketing: FEATURES.marketing,
  consultation: FEATURES.consultation,
};

/** One subscription in full: the amount, everything it carries, where it works today, and what it is not. */
function Detail({ item }: { item: Subscription }) {
  const bundle = item.key === "all-in-one";
  const page = PAGES[item.key];
  return (
    <article id={item.id} data-reveal aria-labelledby={`${item.id}-title`} className={`mt-6 mobile:mt-4 ${CARD}`}>
      {/* The reels of AI 마케팅 had a block of their own on this page ("portfolio-video"): links to it land here. */}
      {item.key === "marketing" && <span id="portfolio-video" aria-hidden="true" className="block scroll-mt-24" />}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="grid size-9 flex-none place-items-center rounded-md bg-accent-soft text-accent">
            <Icon name={item.icon} className="size-5" />
          </span>
          <h3 id={`${item.id}-title`} className="m-0 text-[22px] leading-[1.3] font-bold tracking-[-0.02em] text-ink mobile:text-[20px]">
            {item.name}
          </h3>
          {bundle && <Badge>{`월 ${won(ALL_IN_ONE.saving)}원 절약`}</Badge>}
        </div>
        <p className="m-0 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <MonthlyPrice item={item} className="text-[30px] mobile:text-[26px]" />
          <span className="text-[13px] leading-none font-medium text-muted">{VAT_SHORT}</span>
        </p>
      </div>
      <p className="mt-5 mb-0 max-w-[900px] text-[17px] leading-[1.7] text-pretty text-body mobile:text-[16px]">{item.summary}</p>

      <div className="mt-8 grid grid-cols-2 gap-x-14 gap-y-8 border-t border-line pt-8 narrow:grid-cols-1 mobile:mt-6 mobile:pt-6">
        <div>
          <p className={SUBHEAD}>포함 기능</p>
          {bundle ? (
            <div className="mt-4 grid gap-6">
              {ALL_IN_ONE.parts.map((key) => (
                <CheckList key={key} lead={`${subscription(key).name} 전체`} items={subscription(key).features} />
              ))}
            </div>
          ) : (
            <CheckList items={item.features} className="mt-4" />
          )}
        </div>
        <div>
          <p className={SUBHEAD}>이용 조건</p>
          <AvailabilityList items={item.availability} className="mt-4" />
          <p className="mt-5 mb-0 text-[15px] leading-[1.65] text-pretty text-body">{item.caution}</p>
          {bundle && (
            <p className="mt-3 mb-0 text-[15px] leading-[1.65] text-pretty text-body">
              따로 구독하면 월 {won(ALL_IN_ONE.separate)}원, {item.name}은 월 {won(item.price)}원입니다.
            </p>
          )}
          {page && (
            <MoreLink href={page.path} size="sm" className="mt-2">
              {page.label} 자세히 알아보기
            </MoreLink>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * 월 구독 — each of the three in full, then the trial policy and the two things that hold for all of
 * them: this site takes no payment, and what a month covers is not decided yet.
 */
export function SubscriptionDetails() {
  return (
    <Section id={PLANS_ID} aria-labelledby="plans-title" pt="pt-28 mobile:pt-16" pb="pb-0" className="scroll-mt-8">
      {/* The anchors of the plans this page listed before: links to them land on the subscriptions that replaced them. */}
      {["plan-core", "plan-growth", "plan-managed"].map((id) => (
        <span key={id} id={id} aria-hidden="true" className="block scroll-mt-24" />
      ))}
      <div data-reveal>
        <SceneHeader
          size="md"
          step="02"
          eyebrow="월 구독 · 매월"
          titleId="plans-title"
          title="구독마다 무엇이 들어 있는지."
          sub={VAT_NOTICE.monthly}
          subSize="md"
          subClassName="mobile:text-[16px]"
        />
      </div>
      {SUBSCRIPTIONS.map((item) => (
        <Detail key={item.key} item={item} />
      ))}

      <div id={TRIAL_ID} data-reveal className="mt-6 scroll-mt-24 rounded-2xl border border-line-strong p-12 narrow:p-9 mobile:mt-4 mobile:rounded-xl mobile:p-6">
        <div className="grid grid-cols-2 gap-x-14 gap-y-8 narrow:grid-cols-1">
          <TrialPolicy others />
          <div>
            <p className={SUBHEAD}>구독을 시작하는 방법</p>
            <p className="mt-3 mb-0 text-[15.5px] leading-[1.7] text-pretty text-body">{SUBSCRIBE_NOTE}</p>
            <p className={`mt-7 ${SUBHEAD}`}>한 달에 쓸 수 있는 범위</p>
            <p className="mt-3 mb-0 text-[15.5px] leading-[1.7] text-pretty text-body">{ALLOWANCE_NOTE}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
