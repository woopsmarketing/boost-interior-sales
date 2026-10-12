import { MonthlyPrice, StatusChip } from "@/components/pricing/ProductParts";
import { SetupCards } from "@/components/pricing/SetupCards";
import { SetupPrice } from "@/components/pricing/SetupParts";
import { SubscriptionCard } from "@/components/pricing/Subscriptions";
import { TrialPolicy } from "@/components/pricing/TrialPolicy";
import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { Check } from "@/components/ui/CheckList";
import { Icon } from "@/components/ui/Icon";
import { Notice } from "@/components/ui/Notice";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { BUILD_FROM } from "@/lib/home";
import { ALL_IN_ONE, SETUP_OPTIONS, SITUATIONS, subscription, SUBSCRIPTIONS, VAT_NOTICE, WEBSITE_OPERATION, won } from "@/lib/pricing";
import { ASSURANCES, PRICING_FAQ } from "@/lib/pricing-page";
import {
  FEATURES,
  KAKAO_LABEL,
  KAKAO_NOTE,
  KAKAO_OPEN_CHAT_URL,
  PLANS_ID,
  PRICING_DETAILS_PATH,
  SETUP_ID,
  SITE_NAME,
  TRIAL_ID,
} from "@/lib/site";

const [MARKETING, CONSULTATION, BUNDLE] = SUBSCRIPTIONS;

const PRICE_ROW = "flex min-h-[52px] items-center justify-between gap-3 px-4 text-ink no-underline hover:bg-gray-25 hover:text-ink";

const JUMP =
  "inline-flex min-h-11 items-center gap-1.5 rounded-pill bg-white px-4 text-[14.5px] leading-none font-semibold whitespace-nowrap text-ink no-underline shadow-hairline hover:bg-gray-25 hover:text-ink";

/**
 * /pricing hero — the page's one sentence, that every amount is final, and the jumps to its three
 * parts. The prices themselves start right under it. Up to 1100px the cards stack, and the third
 * price is screens down: there the jumps are the four prices themselves, one row each.
 */
export function PricingHero() {
  const jumps = [
    { label: `월 구독 ${SUBSCRIPTIONS.length}가지`, id: PLANS_ID },
    { label: "무료 체험 정책", id: TRIAL_ID },
    { label: FEATURES.website.label, id: SETUP_ID },
  ];
  return (
    <Section id="top" aria-labelledby="page-title" pt="pt-[124px] mobile:pt-[92px]" pb="pb-0">
      <SceneHeader
        as="h1"
        titleId="page-title"
        eyebrow={`${SITE_NAME} 요금 안내`}
        className="max-w-[900px]"
        titleClassName="mobile:text-[30px]"
        subClassName="mobile:text-[16px]"
        title={
          <>
            필요한 것만 구독하고, <Br />
            홈페이지는 필요할 때 만듭니다.
          </>
        }
        sub={`월 구독은 ${MARKETING.name} · ${CONSULTATION.name} · ${BUNDLE.name} 세 가지입니다. 홈페이지 제작은 처음 한 번의 비용이며, 기본 운영에는 월 이용료가 없습니다.`}
      />
      <ul className="mt-6 mb-0 hidden max-w-[560px] list-none overflow-hidden rounded-xl bg-white p-0 shadow-hairline narrow:block">
        {SUBSCRIPTIONS.map((item) => (
          <li key={item.key} className="border-t border-line first:border-t-0">
            <a href={`#${item.id}`} className={PRICE_ROW}>
              <span className="text-[16px] leading-none font-bold">{item.name}</span>
              <MonthlyPrice item={item} className="text-[19px]" />
            </a>
          </li>
        ))}
        <li className="border-t border-line">
          <a href={`#${SETUP_ID}`} className={PRICE_ROW}>
            <span className="text-[16px] leading-none font-bold">{FEATURES.website.label}</span>
            <span className="text-[16px] leading-none font-bold whitespace-nowrap">
              {BUILD_FROM} <span className="font-medium text-muted">· 1회</span>
            </span>
          </a>
        </li>
      </ul>
      <ul className="mt-7 mb-0 flex list-none flex-wrap gap-2 p-0 narrow:hidden">
        {jumps.map((jump) => (
          <li key={jump.id}>
            <a href={`#${jump.id}`} className={JUMP}>
              {jump.label}
              <span aria-hidden="true" className="text-muted">
                ↓
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 mb-0 text-[14px] leading-[1.6] text-muted">{VAT_NOTICE.all}</p>
    </Section>
  );
}

/**
 * 월 구독 — the three cards. 올인원 is the middle of the decision, so it is the marked one, and the
 * line under the cards does its sum in the open: what the two cost apart, and what is saved.
 * `plan-core` `plan-growth` `plan-managed` `plan-additions` were the anchors of the plans this page
 * had before; links to them land on the cards that replaced them.
 */
export function SubscriptionSummary() {
  return (
    <Section id={PLANS_ID} aria-labelledby="plans-title" pt="pt-16 mobile:pt-10" pb="pb-0" className="scroll-mt-8">
      {["plan-core", "plan-growth", "plan-managed", "plan-additions"].map((id) => (
        <span key={id} id={id} aria-hidden="true" className="block scroll-mt-24" />
      ))}
      <h2 id="plans-title" className="sr-only">
        월 구독 요금
      </h2>
      <div data-reveal className="grid grid-cols-3 items-stretch gap-5 narrow:grid-cols-1 mobile:gap-4">
        {SUBSCRIPTIONS.map((item) => (
          <SubscriptionCard key={item.key} item={item} />
        ))}
      </div>
      <p data-reveal className="mt-5 mb-0 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[15px] leading-[1.6] text-body mobile:text-[14.5px]">
        <span className="font-bold text-ink">{BUNDLE.name} 계산</span>
        <span>
          {MARKETING.name} {won(MARKETING.price)}원 + {CONSULTATION.name} {won(CONSULTATION.price)}원 = 월 {won(ALL_IN_ONE.separate)}원
        </span>
        <span aria-hidden="true" className="text-muted">
          →
        </span>
        <span className="font-bold text-accent">
          {BUNDLE.name} 월 {won(BUNDLE.price)}원, 월 {won(ALL_IN_ONE.saving)}원 절약
        </span>
      </p>
    </Section>
  );
}

/**
 * 무료 체험 — said as what it is: a policy for the day card payment opens. The block has no button
 * that starts anything; the one beside the policy is 문의.
 */
export function TrialSummary() {
  return (
    <Section id={TRIAL_ID} aria-labelledby="trial-title" pt="pt-24 mobile:pt-14" pb="pb-0" className="scroll-mt-8">
      <div
        data-reveal
        className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-14 gap-y-7 rounded-2xl border border-line-strong p-12 narrow:grid-cols-1 narrow:p-9 mobile:rounded-xl mobile:p-6"
      >
        <div>
          <SceneHeader
            size="md"
            eyebrow="무료 체험 정책"
            titleId="trial-title"
            title="무료 체험은 카드 정기결제가 열릴 때 함께 시작됩니다."
            sub="아직 시작할 수 없는 정책이라, 정해진 내용만 그대로 적었습니다."
            subSize="md"
            subClassName="mobile:text-[16px]"
          />
          <ButtonLink href={KAKAO_OPEN_CHAT_URL} external variant="secondary" className="mt-6 max-[480px]:w-full">
            {KAKAO_LABEL}
          </ButtonLink>
          <p className="mt-2.5 mb-0 text-[13px] leading-[1.6] text-muted">{KAKAO_NOTE}</p>
        </div>
        <TrialPolicy others />
      </div>
    </Section>
  );
}

/**
 * 내 상황에 맞는 선택 — the owner finds their own sentence; next to it is what answers it: a
 * subscription, a build, or both. A row for something not released says so instead of pointing at a price.
 */
export function Situations() {
  return (
    <Section id="decide" aria-labelledby="decide-title" pt="pt-28 mobile:pt-16" pb="pb-0" className="scroll-mt-8">
      <div data-reveal>
        <SceneHeader
          size="md"
          eyebrow="내 상황에 맞는 선택"
          titleId="decide-title"
          title="내 상황과 가장 가까운 문장을 찾으세요."
          sub="구독과 홈페이지 제작은 따로 고릅니다. 둘 다 필요한 경우도, 하나만 필요한 경우도 있습니다."
          subSize="md"
          subClassName="mobile:text-[16px]"
        />
      </div>
      <ul data-reveal className="mt-9 mb-0 grid list-none gap-3 p-0 mobile:mt-7 mobile:gap-2.5">
        {SITUATIONS.map((row) => {
          const item = row.subscription && subscription(row.subscription);
          const option = row.setup && SETUP_OPTIONS.find((candidate) => candidate.key === row.setup);
          return (
            <li
              key={row.need}
              className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-x-10 gap-y-3 rounded-xl bg-white px-8 py-6 shadow-md narrow:grid-cols-1 mobile:px-5 mobile:py-5"
            >
              <div>
                <p className="m-0 text-[18px] leading-[1.45] font-semibold tracking-[-0.01em] text-pretty text-ink mobile:text-[16.5px]">“{row.need}”</p>
                <p className="mt-1.5 mb-0 text-[14.5px] leading-[1.55] text-pretty text-muted">{row.note}</p>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {row.status === "planned" && <StatusChip status="planned" />}
                {item && (
                  <a href={`#${item.id}`} className="group flex min-h-11 flex-col justify-center no-underline">
                    <span className="text-[13px] leading-[1.4] font-bold text-accent underline-offset-4 group-hover:underline">월 구독 · {item.name}</span>
                    <MonthlyPrice item={item} className="mt-1 text-[22px]" />
                  </a>
                )}
                {item && option && (
                  <span aria-hidden="true" className="text-[18px] leading-none font-medium text-faint">
                    +
                  </span>
                )}
                {option && (
                  <a href={`#${option.id}`} className="group flex min-h-11 flex-col justify-center no-underline">
                    <span className="text-[13px] leading-[1.4] font-bold text-accent underline-offset-4 group-hover:underline">1회 · {option.name}</span>
                    <SetupPrice option={option} className="mt-1 text-[22px]" />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/**
 * 홈페이지 제작 — the four one-time builds, and the one thing decided about keeping a homepage open:
 * no monthly fee for basic operation. What that covers is confirmed before a contract, and the
 * notice says so.
 */
export function SetupSummary() {
  return (
    <Section id={SETUP_ID} aria-labelledby="setup-title" pt="pt-28 mobile:pt-16" pb="pb-0" className="scroll-mt-8">
      <div data-reveal>
        <SceneHeader
          size="md"
          eyebrow={`${FEATURES.website.label} · 처음 한 번`}
          titleId="setup-title"
          title="홈페이지 상태에 맞춰 하나를 고릅니다."
          sub="새로 만들 수도, 지금 홈페이지를 고쳐 쓸 수도, 그대로 두고 AI 상담만 연결할 수도 있습니다. 월 구독과는 따로 선택합니다."
          subSize="md"
          subClassName="mobile:text-[16px]"
        />
      </div>
      <div data-reveal>
        <SetupCards anchors className="mt-9 mobile:mt-7" />
        <Notice className="mt-4">
          <strong className="font-bold text-ink">{WEBSITE_OPERATION.label}.</strong> {WEBSITE_OPERATION.text} {WEBSITE_OPERATION.separate}
        </Notice>
        <p className="mt-3 mb-0 text-[14px] leading-[1.6] text-muted">{VAT_NOTICE.setup}</p>
      </div>
    </Section>
  );
}

/** What holds whichever product is picked. */
export function Assurances() {
  return (
    <Section id="assurances" aria-labelledby="assurances-title" pt="pt-28 mobile:pt-16" pb="pb-0">
      <h2 id="assurances-title" data-reveal className="m-0 text-[28px] leading-[1.3] font-bold tracking-[-0.03em] text-balance text-ink mobile:text-[22px]">
        무엇을 골라도 같은 네 가지.
      </h2>
      <ul data-reveal className="mt-7 mb-0 grid list-none grid-cols-4 gap-4 p-0 narrow:grid-cols-2 mobile:mt-5 mobile:gap-3 phone:grid-cols-1">
        {ASSURANCES.map((item) => (
          <li key={item.title} className="rounded-xl bg-white p-6 shadow-md mobile:flex mobile:gap-3.5 mobile:p-5">
            <span className="grid size-10 flex-none place-items-center rounded-md bg-accent-soft text-accent">
              <Icon name={item.icon} className="size-5" />
            </span>
            <div>
              <h3 className="mt-4 mb-0 text-[17px] leading-[1.4] font-bold tracking-[-0.01em] text-ink mobile:mt-0 mobile:text-[16px]">{item.title}</h3>
              <p className="mt-1.5 mb-0 text-[14.5px] leading-[1.6] text-pretty text-body">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** The way into /pricing/details, and what is there. */
export function DetailsLink() {
  const contents = ["상품별 제공 기능 · 이용 조건 비교", "홈페이지 제작 방식별 포함 범위", `자주 묻는 질문 ${PRICING_FAQ.length}가지`];
  return (
    <Section id="details" aria-labelledby="details-title" pt="pt-16 mobile:pt-10" pb="pb-0">
      <div
        data-reveal
        className="flex items-center justify-between gap-10 rounded-2xl border border-line-strong px-12 py-10 narrow:flex-col narrow:items-start narrow:gap-7 mobile:rounded-xl mobile:p-6"
      >
        <div>
          <h2 id="details-title" className="m-0 text-[24px] leading-[1.4] font-bold tracking-[-0.025em] text-balance text-ink mobile:text-[20px]">
            무엇이 포함되는지 하나하나 확인하고 싶다면
          </h2>
          <ul className="mt-4 mb-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
            {contents.map((item) => (
              <li key={item} className="flex gap-2 text-[15px] leading-[1.5] text-body">
                <Check />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ButtonLink href={PRICING_DETAILS_PATH} size="lg" variant="dark" arrow className="flex-none max-[480px]:w-full">
          상세 요금 안내 보기
        </ButtonLink>
      </div>
    </Section>
  );
}
