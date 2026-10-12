import { MonthlyPrice } from "@/components/pricing/ProductParts";
import { Badge } from "@/components/ui/Badge";
import { Br } from "@/components/ui/Br";
import { Check } from "@/components/ui/CheckList";
import { Icon } from "@/components/ui/Icon";
import { MoreLink } from "@/components/ui/MoreLink";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { BUILD_FROM, PRODUCT_RESULTS } from "@/lib/home";
import { ALL_IN_ONE, SUBSCRIPTIONS, TODAY as CONDITION, WEBSITE_OPERATION, won } from "@/lib/pricing";
import { FEATURES, PRICING_PATH, VALUE_ID } from "@/lib/site";

const [MARKETING, CONSULTATION, BUNDLE] = SUBSCRIPTIONS;

const CARD = "flex flex-col rounded-xl p-7 mobile:p-6";
const RAISED = "bg-white shadow-md";
const NAME = "m-0 text-[21px] leading-[1.3] font-bold tracking-[-0.02em] text-ink";
const LINE = "mt-2 mb-0 text-[15px] leading-[1.6] text-pretty text-body";
/** Where the product works today, under its price: a price is never shown without it. */
const TODAY = "mt-2 mb-0 text-[13px] leading-[1.5] text-pretty text-muted";

function Results({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 mb-0 grid list-none gap-2 p-0 phone:hidden">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[15px] leading-[1.5] font-medium text-ink">
          <Check className="mt-[5px] size-3.5 text-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * 한눈에 보기 — the four things on offer, right under the hero, so the difference between them is
 * clear without reading further: two subscriptions, the two together, and a homepage built once.
 * Each card says what it leaves in the owner's hands, what it costs, and where to read more.
 */
export function Outputs() {
  const subscriptions = [
    { item: MARKETING, results: PRODUCT_RESULTS.marketing, href: FEATURES.marketing.path },
    { item: CONSULTATION, results: PRODUCT_RESULTS.consultation, href: FEATURES.consultation.path },
  ];
  return (
    <Section id={VALUE_ID} aria-labelledby="value-title" pt="pt-32 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <div data-reveal>
        <SceneHeader
          align="center"
          eyebrow="한눈에 보기"
          titleId="value-title"
          titleClassName="mobile:text-[28px]"
          title={
            <>
              필요한 것만 고르거나, <Br on="phone" />
              함께 쓰거나.
            </>
          }
          sub="AI 마케팅과 AI 상담은 따로 구독할 수 있고, 함께 쓰면 올인원입니다. 홈페이지 제작은 한 번만 내는 별도 서비스입니다."
          subClassName="mobile:text-[16px]"
        />
      </div>

      <ul data-reveal className="mt-12 mb-0 grid list-none grid-cols-4 gap-5 p-0 narrow:grid-cols-2 mobile:mt-8 mobile:gap-4 phone:grid-cols-1">
        {subscriptions.map(({ item, results, href }) => (
          <li key={item.key} className={`${CARD} ${RAISED}`}>
            <span className="grid size-11 place-items-center rounded-md bg-accent-soft text-accent">
              <Icon name={item.icon} className="size-[22px]" />
            </span>
            <h3 className={`mt-5 ${NAME}`}>{item.name}</h3>
            <p className={LINE}>{item.line}</p>
            <Results items={results} />
            <div className="mt-auto pt-6">
              <p className="m-0">
                <MonthlyPrice item={item} className="text-[26px]" />
              </p>
              <p className={TODAY}>{CONDITION[item.key]}</p>
              <MoreLink href={href} size="sm" className="mt-1">
                자세히 알아보기<span className="sr-only">: {item.name}</span>
              </MoreLink>
            </div>
          </li>
        ))}

        <li className={`${CARD} ${RAISED} ring-2 ring-accent`}>
          <div className="flex items-center justify-between gap-3">
            <span className="grid size-11 place-items-center rounded-md bg-accent text-white">
              <Icon name={BUNDLE.icon} className="size-[22px]" />
            </span>
            <Badge>{`월 ${won(ALL_IN_ONE.saving)}원 절약`}</Badge>
          </div>
          <h3 className={`mt-5 ${NAME}`}>{BUNDLE.name}</h3>
          <p className={LINE}>{BUNDLE.line}</p>
          <Results items={PRODUCT_RESULTS["all-in-one"]} />
          <p className="mt-4 mb-0 rounded-lg bg-gray-100 px-3.5 py-3 text-[14px] leading-[1.55] font-semibold text-pretty text-ink">{BUNDLE.caution}</p>
          <div className="mt-auto pt-6">
            <p className="m-0">
              <MonthlyPrice item={BUNDLE} className="text-[26px]" />
            </p>
            <p className={TODAY}>{CONDITION[BUNDLE.key]}</p>
            <MoreLink href={`${PRICING_PATH}#${BUNDLE.id}`} size="sm" className="mt-1">
              요금 자세히 보기<span className="sr-only">: {BUNDLE.name}</span>
            </MoreLink>
          </div>
        </li>

        <li className={`${CARD} ring-1 ring-line-strong`}>
          <span className="grid size-11 place-items-center rounded-md bg-white text-ink shadow-hairline">
            <Icon name="window" className="size-[22px]" />
          </span>
          <h3 className={`mt-5 ${NAME}`}>{FEATURES.website.label}</h3>
          <p className={LINE}>홈페이지가 필요하면 시공사례 중심으로 만들어 드립니다. 월 구독이 아닌 1회 제작입니다.</p>
          <Results items={PRODUCT_RESULTS.website} />
          <div className="mt-auto pt-6">
            <p className="m-0 text-[26px] leading-none font-bold tracking-[-0.035em] whitespace-nowrap text-ink">{BUILD_FROM}</p>
            <p className="mt-2 mb-0 text-[13px] leading-[1.4] font-semibold text-accent">{WEBSITE_OPERATION.label}</p>
            <MoreLink href={FEATURES.website.path} size="sm" className="mt-1">
              자세히 알아보기<span className="sr-only">: {FEATURES.website.label}</span>
            </MoreLink>
          </div>
        </li>
      </ul>
    </Section>
  );
}
