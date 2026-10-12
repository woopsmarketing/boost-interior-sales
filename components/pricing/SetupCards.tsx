import { Letter, SetupPrice } from "@/components/pricing/SetupParts";
import { Badge } from "@/components/ui/Badge";
import { CheckList } from "@/components/ui/CheckList";
import { MoreLink } from "@/components/ui/MoreLink";
import { SETUP_OPTIONS, subscription, VAT_SHORT, type SetupOption } from "@/lib/pricing";
import { PRICING_DETAILS_PATH } from "@/lib/site";

/** "AI 마케팅 · AI 상담 · 올인원" — the subscriptions that work today on the homepage an option leaves. */
const usable = (option: SetupOption) => option.subscriptions.map((key) => subscription(key).name).join(" · ");

/**
 * AI 스마트 홈페이지 — the four one-time builds as cards: what happens to the homepage, the amount, the
 * work that matters most and which subscriptions can be used on the result today. The full scope of
 * each is on /pricing/details. `anchors` (/pricing) gives each card its option's id.
 */
export function SetupCards({ anchors = false, className = "" }: { anchors?: boolean; className?: string }) {
  return (
    <ul className={`m-0 grid list-none grid-cols-4 gap-4 p-0 narrow:grid-cols-2 mobile:gap-3 phone:grid-cols-1 ${className}`}>
      {SETUP_OPTIONS.map((option) => (
        <li
          key={option.key}
          id={anchors ? option.id : undefined}
          className={`flex scroll-mt-24 flex-col rounded-xl bg-white p-6 shadow-md mobile:p-5 ${option.badge ? "ring-2 ring-accent" : ""}`}
        >
          <p className="m-0 flex min-h-[22px] items-center">{option.badge && <Badge>{option.badge}</Badge>}</p>
          <div className="mt-3 flex items-start gap-2.5">
            <Letter option={option} />
            <h3 className="m-0 pt-[3px] text-[18px] leading-[1.35] font-bold tracking-[-0.02em] text-ink">{option.name}</h3>
          </div>
          <p className="mt-4 mb-0 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <SetupPrice option={option} className="text-[26px]" />
            <span className="text-[12.5px] leading-none font-medium whitespace-nowrap text-muted">1회 · {VAT_SHORT}</span>
          </p>
          <p className="mt-4 mb-0 text-[15px] leading-[1.5] font-bold text-ink">{option.website}</p>
          <p className="mt-1.5 mb-0 text-[14.5px] leading-[1.6] text-pretty text-body">{option.summary}</p>
          <CheckList items={option.highlights} className="mt-5 border-t border-line pt-5" />
          <p className="mt-5 mb-0 rounded-lg bg-sunken px-4 py-3 text-[13.5px] leading-[1.55] text-body">
            <span className="block text-[12.5px] font-bold text-muted">지금 함께 쓸 수 있는 구독</span>
            <span className="mt-0.5 block font-semibold text-ink">{usable(option)}</span>
          </p>
          <div className="mt-auto pt-3">
            <MoreLink href={`${PRICING_DETAILS_PATH}#${option.id}`} size="sm">
              포함 범위 보기
            </MoreLink>
          </div>
        </li>
      ))}
    </ul>
  );
}
