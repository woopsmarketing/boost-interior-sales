import { MonthlyPrice, StatusChip } from "@/components/pricing/ProductParts";
import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { BUILD_FROM, BUNDLE_SAVING } from "@/lib/home";
import { SUBSCRIPTIONS, TODAY, TRIAL, VAT_NOTICE, WEBSITE_OPERATION } from "@/lib/pricing";
import { FEATURES, KAKAO_NOTE, KAKAO_OPEN_CHAT_URL, KAKAO_RECOMMEND_LABEL, PRICING_ID, PRICING_PATH } from "@/lib/site";

const ROW = "flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line px-8 py-5 first:border-t-0 mobile:px-5 mobile:py-4";
const NAME = "m-0 text-[19px] leading-[1.35] font-bold tracking-[-0.02em] text-ink mobile:text-[17px]";
const LINE = "mt-1 mb-0 text-[14.5px] leading-[1.55] text-pretty text-body";

/**
 * 요금 — the landing does not repeat the product cards. It lists the four prices once, one row each,
 * says what the trial will be and that it is not open yet, and hands over to /pricing; the full
 * conditions are one page further, from there.
 */
export function Pricing() {
  return (
    <Section id={PRICING_ID} aria-labelledby="pricing-title" pt="pt-36 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <div className="grid items-start gap-x-14 gap-y-9 split:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] mobile:gap-y-7">
        <div data-reveal>
          <SceneHeader
            eyebrow="요금"
            titleId="pricing-title"
            titleClassName="mobile:text-[28px]"
            title={
              <>
                월 구독 세 가지, <Br />
                홈페이지 제작은 따로.
              </>
            }
            sub="구독은 매월, 홈페이지 제작비는 처음 한 번입니다. 홈페이지 기본 운영에는 월 이용료가 없습니다."
            subClassName="mobile:text-[16px]"
          />
          <p className="mt-6 mb-0 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[15px] leading-[1.5] text-body mobile:mt-5">
            <StatusChip status={TRIAL.status} />
            <span className="font-semibold text-ink">{TRIAL.title}</span>
          </p>
          <p className="mt-2 mb-0 text-[14px] leading-[1.6] text-pretty text-muted">{TRIAL.notice}</p>
        </div>

        <div data-reveal>
          <ul className="m-0 list-none rounded-xl bg-white p-0 shadow-md">
            {SUBSCRIPTIONS.map((item) => (
              <li key={item.key} className={ROW}>
                <div className="min-w-0 flex-1 basis-[240px]">
                  <h3 className={NAME}>{item.name}</h3>
                  <p className={LINE}>{item.key === "all-in-one" ? BUNDLE_SAVING : item.line}</p>
                  <p className="mt-1 mb-0 text-[13px] leading-[1.5] text-pretty text-muted">{TODAY[item.key]}</p>
                </div>
                <MonthlyPrice item={item} className="text-[26px] mobile:text-[24px]" />
              </li>
            ))}
            <li className={ROW}>
              <div className="min-w-0 flex-1 basis-[240px]">
                <h3 className={NAME}>{FEATURES.website.label}</h3>
                <p className={LINE}>1회 제작 · {WEBSITE_OPERATION.label}</p>
              </div>
              <p className="m-0 text-[26px] leading-none font-bold tracking-[-0.035em] whitespace-nowrap text-ink mobile:text-[24px]">{BUILD_FROM}</p>
            </li>
          </ul>
          <p className="mt-3 mb-0 text-[13px] leading-[1.6] text-muted">{VAT_NOTICE.all}</p>
        </div>
      </div>

      <div
        data-reveal
        className="mt-10 flex items-center justify-between gap-10 rounded-xl border border-blue-200 bg-white px-10 py-8 shadow-window narrow:flex-col narrow:items-start narrow:gap-6 mobile:mt-8 mobile:p-6"
      >
        <p className="m-0 text-[22px] leading-[1.45] font-semibold tracking-[-0.02em] text-ink mobile:text-[18px]">
          무엇부터 시작할지 모르겠다면 홈페이지 주소만 보내주세요.
          <span className="mt-1 block text-[16px] leading-[1.6] font-normal tracking-normal text-muted mobile:text-[15px]">
            홈페이지가 없어도 괜찮습니다. 확인 후 맞는 상품을 안내드립니다.
          </span>
        </p>
        <div className="flex-none max-[480px]:w-full">
          <div className="flex flex-wrap gap-3 max-[480px]:grid">
            <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" arrow>
              {KAKAO_RECOMMEND_LABEL}
            </ButtonLink>
            <ButtonLink href={PRICING_PATH} size="lg" variant="secondary">
              요금 자세히 보기
            </ButtonLink>
          </div>
          <p className="mt-3 mb-0 text-[13px] leading-[1.6] text-muted">{KAKAO_NOTE}</p>
        </div>
      </div>
    </Section>
  );
}
