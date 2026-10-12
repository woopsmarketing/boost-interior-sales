import { MonthlyPrice } from "@/components/pricing/ProductParts";
import { Br } from "@/components/ui/Br";
import { Icon } from "@/components/ui/Icon";
import { MoreLink } from "@/components/ui/MoreLink";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { BUNDLE_FLOW, BUNDLE_SAVING } from "@/lib/home";
import { subscription, VAT_SHORT } from "@/lib/pricing";
import { BUNDLE_ID, PRICING_PATH } from "@/lib/site";

/**
 * 올인원 — why the two subscriptions are worth taking together: content brings a visitor, and the
 * consultation turns the visit into a request. The flow is four steps in the order they happen; the
 * price next to it says what the two cost apart, what is saved, and — because the name invites it —
 * that a new homepage is not part of it.
 */
export function AllInOne() {
  const bundle = subscription("all-in-one");
  return (
    <Section id={BUNDLE_ID} aria-labelledby="bundle-title" pt="pt-36 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <div data-reveal className="rounded-2xl bg-inverse px-12 py-14 text-white narrow:px-9 mobile:rounded-xl mobile:px-5 mobile:py-9">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(320px,400px)] items-end gap-x-14 gap-y-8 narrow:grid-cols-1">
          <SceneHeader
            tone="dark"
            size="md"
            eyebrow={`${bundle.name} · 함께 쓰면`}
            titleId="bundle-title"
            title={
              <>
                만든 콘텐츠가 방문자를 부르고, <Br />
                AI 상담이 문의로 이어 줍니다.
              </>
            }
            sub={bundle.summary}
            subSize="md" subClassName="mobile:text-[15.5px]"
          />
          <div className="rounded-xl bg-white/8 p-7 ring-1 ring-white/12 mobile:p-5">
            <p className="m-0 text-[14px] leading-none font-bold text-blue-300">{bundle.name}</p>
            <p className="mt-3 mb-0 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <MonthlyPrice item={bundle} tone="dark" className="text-[36px] mobile:text-[32px]" />
              <span className="text-[13px] leading-none font-medium text-gray-400">{VAT_SHORT}</span>
            </p>
            <p className="mt-3 mb-0 text-[15px] leading-[1.5] font-semibold text-white">{BUNDLE_SAVING}</p>
            <p className="mt-2 mb-0 text-[13.5px] leading-[1.6] text-pretty text-gray-400">{bundle.caution}</p>
            <MoreLink href={`${PRICING_PATH}#${bundle.id}`} tone="dark" size="sm" className="mt-2">
              요금 자세히 보기
            </MoreLink>
          </div>
        </div>

        <ol className="mt-12 mb-0 grid list-none grid-cols-4 gap-4 border-t border-white/12 p-0 pt-10 narrow:grid-cols-2 mobile:mt-8 mobile:gap-3 mobile:pt-7 phone:grid-cols-1">
          {BUNDLE_FLOW.map((step, i) => (
            <li key={step.title} className="flex gap-3.5 phone:items-center">
              <span className="grid size-10 flex-none place-items-center rounded-md bg-white/10 text-blue-300">
                <Icon name={step.icon} className="size-5" />
              </span>
              <div>
                <p className="m-0 flex items-center gap-2 text-[12.5px] leading-none font-bold text-blue-300">
                  <span aria-hidden="true" className="font-mono font-medium text-gray-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step.by}
                </p>
                <p className="mt-2 mb-0 text-[16px] leading-[1.45] font-semibold tracking-[-0.01em] text-white mobile:text-[15.5px]">{step.title}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
