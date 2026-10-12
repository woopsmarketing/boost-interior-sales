import type { ResolvingMetadata } from "next";
import { BuildSteps } from "@/components/features/BuildSteps";
import { Browser, Phone } from "@/components/features/Devices";
import { Block, ClipFigure, FeatureFaq, FeatureHero, PointCards, Split, StepList } from "@/components/features/Parts";
import { Contact } from "@/components/landing/Contact";
import { PageShell } from "@/components/layout/PageShell";
import { MediaNote } from "@/components/media/MediaNote";
import { Shot } from "@/components/media/Shot";
import { MonthlyPrice } from "@/components/pricing/ProductParts";
import { SetupCards } from "@/components/pricing/SetupCards";
import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { MoreLink } from "@/components/ui/MoreLink";
import { Notice } from "@/components/ui/Notice";
import { WEBSITE_PAGE } from "@/lib/features";
import { BUILD_FROM } from "@/lib/home";
import { short, still } from "@/lib/media";
import { pageMetadata } from "@/lib/page-metadata";
import { subscription, VAT_NOTICE, VAT_SHORT, WEBSITE, WEBSITE_OPERATION } from "@/lib/pricing";
import {
  DEMO_LABEL,
  DEMO_URL,
  FEATURES,
  KAKAO_LABEL,
  KAKAO_OPEN_CHAT_URL,
  PRICING_DETAILS_PATH,
  SETUP_COMPARISON_ID,
} from "@/lib/site";

const PAGE = FEATURES.website;

export function generateMetadata(_props: PageProps<"/features/website">, parent: ResolvingMetadata) {
  return pageMetadata(parent, PAGE);
}

const HALF_SLOT = "(max-width: 820px) calc(100vw - 40px), (max-width: 1440px) calc((100vw - 192px) / 2), 624px";
const PHONE_SLOT = "(max-width: 640px) 200px, 240px";

/**
 * AI 스마트 홈페이지 — the page for an owner without a homepage, or with one that does not show the work:
 * the demo homepage's own screens (desktop and phone), how a 시공사례 gets onto it, where a request
 * goes, how a build proceeds and who does what, the four one-time prices, and that keeping it open
 * carries no monthly fee. Every screenshot is the live demo as it is; the demo is one button away.
 * It promises no design choice an owner cannot make today, and no address of the owner's own. The
 * name is explained where it is first read (the hero) and asked about first (the FAQ): we build the
 * homepage, and the AI features are subscriptions added to it.
 */
export default function WebsitePage() {
  const publish = short("CLIP-06");
  const home = still("SITE-01");
  const list = still("SITE-02");
  const detail = still("SITE-03");
  const form = still("SITE-04");
  const phones = [still("SITE-05"), still("SITE-06"), still("SITE-07")];
  const { pages, demoNote, caseSteps, search, inquiry, buildSteps, limits, faq } = WEBSITE_PAGE;
  const addOns = [
    { item: subscription("consultation"), href: FEATURES.consultation.path },
    { item: subscription("marketing"), href: FEATURES.marketing.path },
  ];
  return (
    <PageShell page={PAGE.path}>
      <FeatureHero
        eyebrow={`${PAGE.label} · 선택 서비스`}
        title={
          <>
            시공사례가 중심인 <Br />
            인테리어 업체 홈페이지.
          </>
        }
        sub={`${WEBSITE.line} 한 번의 제작비로 저희가 만들고, 이미 홈페이지가 있다면 그대로 두고 AI 상담만 연결할 수 있습니다.`}
        actions={
          <>
            <ButtonLink href={DEMO_URL} external size="lg" arrow>
              {DEMO_LABEL}
            </ButtonLink>
            <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" variant="secondary">
              {KAKAO_LABEL}
            </ButtonLink>
          </>
        }
        facts={
          <div className="mt-7 border-t border-line-strong pt-6 mobile:mt-6 mobile:pt-5">
            <p className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
              <span className="text-[28px] leading-none font-bold tracking-[-0.035em] whitespace-nowrap text-ink">{BUILD_FROM}</span>
              <span className="text-[13px] leading-none font-medium text-muted">1회 · {VAT_SHORT}</span>
            </p>
            <p className="mt-3 mb-0 text-[16px] leading-[1.5] font-bold text-accent">{WEBSITE_OPERATION.label}</p>
          </div>
        }
      >
        <figure className="m-0">
          <div className="relative pr-[7%] pb-[7%]">
            <Browser still={home} sizes="(max-width: 820px) calc(100vw - 64px), (max-width: 1100px) calc(100vw - 220px), 680px" />
            <Phone still={phones[0]} sizes="(max-width: 820px) 24vw, 170px" className="absolute right-0 bottom-0 w-[23%] rounded-[18px] border-[4px] min-[821px]:rounded-[28px] min-[821px]:border-[6px]" />
          </div>
          <figcaption className="mt-3">
            <MediaNote>{home.note}</MediaNote>
          </figcaption>
        </figure>
      </FeatureHero>

      <Block
        id="screens"
        eyebrow="화면 구성"
        title={
          <>
            필요한 화면을 <Br on="phone" />
            갖춘 채로 시작합니다.
          </>
        }
        sub={demoNote}
      >
        <ul data-reveal aria-label="홈페이지에 들어가는 화면" className="mt-8 mb-0 flex list-none flex-wrap gap-2 p-0 mobile:mt-6">
          {pages.map((page) => (
            <li key={page} className="inline-flex h-9 items-center rounded-pill bg-white px-4 text-[14.5px] leading-none font-semibold whitespace-nowrap text-body shadow-hairline">
              {page}
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-6">
          <ButtonLink href={DEMO_URL} external variant="secondary" arrow className="max-[480px]:w-full">
            {DEMO_LABEL}
          </ButtonLink>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 mobile:mt-6 mobile:grid-cols-1 mobile:gap-7">
          <figure data-reveal className="m-0">
            <Browser still={list} sizes={HALF_SLOT} />
            <figcaption className="mt-3">
              <p className="mt-0 mb-1 text-[15px] leading-[1.5] font-semibold text-ink">시공사례 목록 · 조건 검색</p>
              <MediaNote>{list.note}</MediaNote>
            </figcaption>
          </figure>
          <figure data-reveal className="m-0">
            <Browser still={detail} sizes={HALF_SLOT} />
            <figcaption className="mt-3">
              <p className="mt-0 mb-1 text-[15px] leading-[1.5] font-semibold text-ink">시공사례 상세</p>
              <MediaNote>{detail.note}</MediaNote>
            </figcaption>
          </figure>
        </div>
        <PointCards points={search} className="mt-8 mobile:mt-6" />
        <div data-reveal className="mt-4 rounded-xl bg-sunken p-7 ring-1 ring-line mobile:p-5">
          <h3 className="m-0 text-[17px] leading-[1.4] font-bold tracking-[-0.01em] text-ink">디자인과 구성</h3>
          {limits.map((line) => (
            <p key={line} className="mt-2 mb-0 max-w-[920px] text-[15px] leading-[1.7] text-pretty text-body">
              {line}
            </p>
          ))}
        </div>
      </Block>

      <Block
        id="mobile"
        eyebrow="휴대폰 화면"
        title={
          <>
            휴대폰에서도, <Br on="phone" />
            같은 내용을 보기 편하게.
          </>
        }
        sub="데모 홈페이지를 휴대폰 너비로 연 화면입니다. 첫 화면, 시공사례 목록, 시공사례 상세."
      >
        <ul
          data-reveal
          className="mt-10 mb-0 flex list-none justify-center gap-8 p-0 mobile:mt-7 mobile:gap-5 phone:-mx-5 phone:snap-x phone:snap-mandatory phone:scroll-pl-5 phone:justify-start phone:gap-4 phone:overflow-x-auto phone:px-5 phone:pb-8 phone:[scrollbar-width:none]"
        >
          {phones.map((phone) => (
            <li key={phone.id} className="w-[240px] flex-none mobile:w-[200px] phone:snap-start">
              <Phone still={phone} sizes={PHONE_SLOT} />
            </li>
          ))}
        </ul>
        <MediaNote className="mt-6 text-center phone:mt-0 phone:text-left">{phones[0].note}</MediaNote>
      </Block>

      <Block
        id="cases"
        eyebrow="시공사례 올리기"
        title={
          <>
            사진을 올리면, <Br on="phone" />
            홈페이지의 시공사례가 됩니다.
          </>
        }
        sub="시공사례는 관리 화면에서 올리고, 확인한 뒤 게시합니다."
      >
        <Split media={<ClipFigure film={publish} label="시공사례의 내용을 확인하고 게시하는 관리 화면" name="시공사례 게시 영상" />}>
          <StepList steps={caseSteps} />
        </Split>
      </Block>

      <Block
        id="inquiry"
        eyebrow="견적 문의"
        title={
          <>
            견적 문의는 <Br on="phone" />
            한곳에 모입니다.
          </>
        }
        sub={inquiry}
      >
        <div className="mt-11 grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-x-16 gap-y-8 narrow:grid-cols-1 mobile:mt-7">
          <figure data-reveal className="m-0 mx-auto w-full max-w-[460px]">
            <div className="overflow-hidden rounded-xl bg-white shadow-float">
              <Shot still={form} sizes="(max-width: 500px) calc(100vw - 40px), 460px" />
            </div>
            <figcaption className="mt-3">
              <MediaNote>{form.note}</MediaNote>
            </figcaption>
          </figure>
          <div data-reveal>
            <h3 className="m-0 text-[20px] leading-[1.4] font-bold tracking-[-0.02em] text-ink mobile:text-[18px]">AI 기능은 필요할 때 더합니다</h3>
            <p className="mt-2 mb-0 text-[15.5px] leading-[1.65] text-pretty text-body">{WEBSITE_OPERATION.addOn}</p>
            <ul className="mt-5 mb-0 grid list-none gap-3 p-0">
              {addOns.map(({ item, href }) => (
                <li key={item.key} className="rounded-xl bg-white p-5 shadow-md">
                  <p className="m-0 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="text-[17px] leading-[1.4] font-bold tracking-[-0.01em] text-ink">{item.name}</span>
                    <MonthlyPrice item={item} className="text-[20px]" />
                  </p>
                  <p className="mt-1.5 mb-0 text-[14.5px] leading-[1.6] text-pretty text-body">{item.line}</p>
                  <MoreLink href={href} size="sm">
                    {item.name} 자세히 알아보기
                  </MoreLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Block>

      <Block
        id="process"
        eyebrow="제작 과정"
        title={
          <>
            자료를 보내주시면, <br />
            제작과 점검은 저희가 진행합니다.
          </>
        }
      >
        <BuildSteps steps={buildSteps} />
      </Block>

      <Block
        id="prices"
        eyebrow="제작 비용 · 처음 한 번"
        title={
          <>
            홈페이지 상태에 맞는 <Br on="phone" />
            방식을 고릅니다.
          </>
        }
        sub="새로 만들 수도, 지금 홈페이지를 고쳐 쓸 수도, 그대로 두고 AI 상담만 연결할 수도 있습니다."
      >
        <div data-reveal>
          <SetupCards className="mt-10 mobile:mt-7" />
          <Notice className="mt-4">
            <strong className="font-bold text-ink">{WEBSITE_OPERATION.label}.</strong> {WEBSITE_OPERATION.text} {WEBSITE_OPERATION.separate}
          </Notice>
          <p className="mt-3 mb-0 flex flex-wrap items-center justify-between gap-x-8 gap-y-1 text-[14px] leading-[1.6] text-muted">
            {VAT_NOTICE.setup}
            <MoreLink href={`${PRICING_DETAILS_PATH}#${SETUP_COMPARISON_ID}`} size="sm">
              네 가지 방식 항목별 비교
            </MoreLink>
          </p>
          <ButtonLink href={KAKAO_OPEN_CHAT_URL} external arrow className="mt-6 max-[480px]:w-full">
            {KAKAO_LABEL}
          </ButtonLink>
        </div>
      </Block>

      <FeatureFaq
        items={faq}
        title={
          <>
            {PAGE.label}, <Br on="mobile" />
            시작 전에 확인할 것들.
          </>
        }
      />

      <Contact
        title={
          <>
            우리 업체에는 <Br />
            어떤 방식이 맞을까요?
          </>
        }
        sub={
          <>
            업체명과 지금 홈페이지 주소(있다면)만 보내주세요. <Br />
            맞는 방식과 범위, 비용을 먼저 안내드립니다.
          </>
        }
      />
    </PageShell>
  );
}
