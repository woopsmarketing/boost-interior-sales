import { SetupPrice } from "@/components/pricing/SetupParts";
import { Check } from "@/components/ui/CheckList";
import { PLANS, SETUP_OPTIONS, VAT_NOTICE, won } from "@/lib/pricing";
import { STARTER_NOTE } from "@/lib/pricing-page";

const [INTEGRATION] = SETUP_OPTIONS;
const [CORE] = PLANS;

/**
 * The cheapest way in: one setup and one plan, each read from the price list. On /pricing it sits
 * in the hero; on the landing it opens the price summary. `vat` is off where the VAT line is
 * already said right next to the card.
 */
export function Starter({ vat = true, className = "" }: { vat?: boolean; className?: string }) {
  return (
    <div className={`w-full max-w-[560px] rounded-xl bg-white p-8 shadow-window mobile:p-6 ${className}`}>
      <p className="m-0 text-[14px] leading-[1.4] font-bold text-accent">가장 가볍게 시작하면</p>
      <dl className="mt-5 mb-0">
        <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
          <dt>
            <span className="block text-[13px] leading-[1.4] font-semibold text-muted">처음 한 번 · 초기 구축</span>
            <span className="mt-1 block text-[16px] leading-[1.4] font-bold text-ink">{INTEGRATION.name}</span>
          </dt>
          <dd className="m-0">
            <SetupPrice option={INTEGRATION} className="text-[30px] mobile:text-[26px]" />
          </dd>
        </div>
        <div className="flex items-end justify-between gap-4 pt-5">
          <dt>
            <span className="block text-[13px] leading-[1.4] font-semibold text-muted">매월 · 운영 플랜</span>
            <span className="mt-1 block text-[16px] leading-[1.4] font-bold text-ink">{CORE.name}</span>
          </dt>
          <dd className="m-0 flex items-baseline gap-1 whitespace-nowrap text-ink">
            <span className="text-[15px] leading-none font-semibold text-body">월</span>
            <span className="text-[30px] leading-none font-bold tracking-[-0.035em] mobile:text-[26px]">{won(CORE.price)}</span>
            <span className="text-[18px] leading-none font-bold">원</span>
          </dd>
        </div>
      </dl>
      <p className="mt-6 mb-0 flex gap-2 rounded-lg bg-sunken px-4 py-3 text-[14px] leading-[1.6] text-body mobile:mt-5">
        <Check className="mt-[5px] size-3.5 text-accent" />
        {STARTER_NOTE}
      </p>
      {vat && <p className="mt-3 mb-0 text-[13px] leading-[1.6] text-muted">{VAT_NOTICE.all}</p>}
    </div>
  );
}
