import type { ResolvingMetadata } from "next";
import { Block, ClipFigure, FeatureFaq, FeatureHero, FilmFigure, PointCards, Split, StepList, StillFigure } from "@/components/features/Parts";
import { Contact } from "@/components/landing/Contact";
import { FocusView, StageView } from "@/components/landing/ProductStage";
import { PageShell } from "@/components/layout/PageShell";
import { MediaNote } from "@/components/media/MediaNote";
import { MonthlyPrice, StatusChip } from "@/components/pricing/ProductParts";
import { SetupPrice } from "@/components/pricing/SetupParts";
import { SubscriptionPanel } from "@/components/pricing/Subscriptions";
import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { MoreLink } from "@/components/ui/MoreLink";
import { Notice } from "@/components/ui/Notice";
import { BUNDLE_OFFER, CONSULTATION_PAGE } from "@/lib/features";
import { film, short, still } from "@/lib/media";
import { pageMetadata } from "@/lib/page-metadata";
import { INTEGRATION_OPTION, subscription, VAT_SHORT, type Status } from "@/lib/pricing";
import { OWNER_FOCUS, OWNER_STAGE } from "@/lib/scenes";
import {
  BUNDLE_ID,
  DEMO_LABEL,
  DEMO_PROMPT,
  DEMO_URL,
  FEATURES,
  KAKAO_LABEL,
  KAKAO_OPEN_CHAT_URL,
  PRICING_DETAILS_PATH,
  PRICING_PATH,
} from "@/lib/site";

const PAGE = FEATURES.consultation;

export function generateMetadata(_props: PageProps<"/features/ai-consultation">, parent: ResolvingMetadata) {
  return pageMetadata(parent, PAGE);
}

/** The admin capture is from another shoot than the chat above it, and its request is a test one. */
const OWNER_NOTE =
  "관리 화면은 따로 촬영한 테스트 문의 예시이며, 위 상담 화면에서 이어진 문의가 아닙니다. 지역 · 면적 · 공사 범위처럼 정리된 상담 정보는 BoostInterior로 만든 홈페이지에서 시공사례 추천과 함께 쓸 때 들어오고, 기존 홈페이지에서는 연락처 · 문의 내용 · 상담 기록이 들어옵니다.";

/**
 * AI 상담 — the page for an owner who wants to know what the chat answers with and where a request
 * ends up: what the answers are made from, then trying it (the hero already has the demo button, and
 * the 30-second film does not sit right under the hero's clip of the same chat), when it recommends
 * 시공사례 and when it cannot, how a request is left and where it is read, how it gets onto a
 * homepage the owner already has, the price, the questions and the way to ask.
 * Nothing here says the owner is alerted to a new request: the request waits in the admin.
 */
export default function ConsultationPage() {
  const product = subscription("consultation");
  const answer = short("CLIP-04");
  const form = short("CLIP-07");
  const walk = film("VIDEO-05");
  const cards = still("UI-06");
  const { sources, sourcesNote, cases, inquiryFields, inquiryNote, installSteps, installPrice, faq } = CONSULTATION_PAGE;
  const caseRows: readonly { status?: Status; label: string; text: string }[] = [
    { status: "now", label: "추천에 쓰이는 자료", text: cases.needs },
    { label: "게시한 시공사례가 없을 때", text: cases.none },
    { status: "unsupported", label: "기존 홈페이지의 시공사례", text: cases.existing },
  ];
  return (
    <PageShell page={PAGE.path}>
      <FeatureHero
        eyebrow={product.name}
        title={
          <>
            방문자의 질문에 AI가 답하고, <Br />
            견적 문의까지 받아 둡니다.
          </>
        }
        sub="방문자가 원하는 공사를 말하면 우리 업체 정보로 답하고, 남긴 견적 문의는 관리 화면에 정리됩니다. 기존 홈페이지에도 상담창을 설치해 쓸 수 있습니다."
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
          <p className="mt-7 mb-0 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-t border-line-strong pt-6 mobile:mt-6 mobile:pt-5">
            <MonthlyPrice item={product} className="text-[28px]" />
            <span className="text-[13px] leading-none font-medium text-muted">{VAT_SHORT}</span>
            <a href="#price" className="text-[14px] leading-[1.4] font-semibold text-link underline-offset-4 hover:underline">
              포함 기능 보기
            </a>
          </p>
        }
      >
        <ClipFigure film={answer} priority label="방문자의 질문에 AI 상담이 비슷한 시공사례를 카드로 추천하는 상담창" name="AI 상담 영상" />
      </FeatureHero>

      <Block
        id="sources"
        eyebrow="답변의 근거"
        title={
          <>
            AI는 등록한 <Br on="phone" />
            우리 업체 정보로 답합니다.
          </>
        }
        sub="관리 화면의 ‘사업 정보’와 ‘상담 자료’에 넣은 내용이 답변의 바탕이 됩니다."
      >
        <PointCards points={sources} columns={4} className="mt-10 mobile:mt-7" />
        <div data-reveal>
          <Notice className="mt-4">{sourcesNote}</Notice>
        </div>
      </Block>

      <Block
        id="try"
        eyebrow="직접 해보기"
        title={
          <>
            가입 없이, <Br on="phone" />
            방문자가 되어 물어보세요.
          </>
        }
        sub="데모 홈페이지의 오른쪽 아래 상담 버튼을 눌러 원하는 공사를 말해보세요."
      >
        <Split media={<FilmFigure film={walk} label="방문자의 질문부터 시공사례 추천, 상담 요청 양식까지 이어지는 AI 상담 과정" caption="질문부터 견적 문의 양식까지, 30초로 이어서 보기" />}>
          <div className="rounded-xl bg-white p-8 shadow-window mobile:p-6">
            <p className="m-0 text-[13px] leading-[1.4] font-bold text-accent">이렇게 물어보세요</p>
            <p className="mt-3 mb-0 text-[22px] leading-[1.45] font-bold tracking-[-0.02em] text-pretty text-ink mobile:text-[19px]">“{DEMO_PROMPT}”</p>
            <p className="mt-3 mb-0 text-[15px] leading-[1.65] text-pretty text-body">
              조건이 비슷한 시공사례를 추천받고, 상담창 안에서 견적 문의 양식까지 열어볼 수 있습니다.
            </p>
            <ButtonLink href={DEMO_URL} external full arrow className="mt-6">
              {DEMO_LABEL}
            </ButtonLink>
          </div>
        </Split>
      </Block>

      <Block
        id="cases"
        eyebrow="시공사례 추천"
        title={
          <>
            비슷한 시공사례를 <Br on="phone" />
            카드로 보여줍니다.
          </>
        }
      >
        <Split media={<StillFigure still={cards} />}>
          <ul className="m-0 grid list-none gap-0 p-0">
            {caseRows.map((row) => (
              <li key={row.label} className="border-t border-line-strong py-5 first:border-t-0 first:pt-0 mobile:py-4">
                <p className="m-0 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                  <span className="text-[17px] leading-[1.4] font-bold tracking-[-0.01em] text-ink mobile:text-[16px]">{row.label}</span>
                  {row.status && <StatusChip status={row.status} />}
                </p>
                <p className="mt-1.5 mb-0 text-[15.5px] leading-[1.65] text-pretty text-body mobile:text-[15px]">{row.text}</p>
              </li>
            ))}
          </ul>
        </Split>
      </Block>

      <Block
        id="inquiry"
        eyebrow="견적 문의 접수"
        title={
          <>
            상담하던 창에서, <Br on="phone" />
            견적 문의를 남깁니다.
          </>
        }
        sub="다른 페이지로 옮겨 가지 않고 상담창 안에서 양식이 열립니다. 앞서 나눈 상담 기록은 문의와 함께 관리 화면에서 볼 수 있습니다."
      >
        <Split media={<ClipFigure film={form} label="상담창 안에서 열리는 상담 요청 양식" name="상담 요청 양식 영상" />}>
          <p className="m-0 text-[15px] leading-[1.4] font-bold text-ink">문의 한 건에 받는 정보</p>
          <ul className="mt-3.5 mb-0 flex list-none flex-wrap gap-2 p-0">
            {inquiryFields.map((field) => (
              <li key={field} className="inline-flex min-h-9 items-center rounded-pill bg-white px-3.5 py-1.5 text-[14.5px] leading-[1.3] font-semibold text-body shadow-hairline">
                {field}
              </li>
            ))}
          </ul>
          <p className="mt-6 mb-0 border-t border-line-strong pt-5 text-[14.5px] leading-[1.65] text-pretty text-muted">{inquiryNote}</p>
        </Split>
      </Block>

      <Block
        id="admin"
        eyebrow="관리 화면"
        title={
          <>
            들어온 문의는 <Br on="phone" />
            ‘상담 요청’에 정리됩니다.
          </>
        }
        sub="연락처와 문의 내용, 그 문의가 나온 상담 기록을 함께 확인합니다."
      >
        <StageView stage={OWNER_STAGE} frameWidth={1280} className="mt-10 mobile:hidden" />
        <div data-reveal className="mt-7 hidden mobile:block">
          <FocusView focus={OWNER_FOCUS} />
        </div>
        <MediaNote className="mt-6 mobile:mt-4">{OWNER_NOTE}</MediaNote>
      </Block>

      <Block
        id="install"
        eyebrow="기존 홈페이지에 연결"
        title={
          <>
            지금 홈페이지는 그대로 두고, <br />
            상담창만 더합니다.
          </>
        }
      >
        <div className="mt-11 grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-start gap-x-16 gap-y-8 narrow:grid-cols-1 mobile:mt-7">
          <div data-reveal>
            <StepList steps={installSteps} />
          </div>
          <aside data-reveal aria-label={INTEGRATION_OPTION.name} className="rounded-xl bg-white p-8 shadow-window mobile:p-6">
            <p className="m-0 text-[13px] leading-[1.4] font-bold text-accent">{INTEGRATION_OPTION.name}</p>
            <p className="mt-3 mb-0 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <SetupPrice option={INTEGRATION_OPTION} className="text-[32px]" />
              <span className="text-[13px] leading-none font-medium text-muted">1회 · {VAT_SHORT}</span>
            </p>
            <p className="mt-4 mb-0 text-[15px] leading-[1.65] text-pretty text-body">{installPrice}</p>
            <MoreLink href={`${PRICING_DETAILS_PATH}#${INTEGRATION_OPTION.id}`} size="sm" className="mt-2">
              포함 범위 보기
            </MoreLink>
          </aside>
        </div>
      </Block>

      <SubscriptionPanel item={product}>
        <p className="mt-7 mb-0 border-t border-line pt-6 text-[15px] leading-[1.6] font-semibold text-pretty text-ink">{BUNDLE_OFFER}</p>
        <MoreLink href={`${PRICING_PATH}#${BUNDLE_ID}`} size="sm">
          올인원 요금 보기
        </MoreLink>
      </SubscriptionPanel>

      <FeatureFaq
        items={faq}
        title={
          <>
            {product.name}, <Br on="mobile" />
            시작 전에 확인할 것들.
          </>
        }
      />

      <Contact
        title={
          <>
            우리 홈페이지에도 <br />
            붙일 수 있는지 확인해보세요.
          </>
        }
        sub={
          <>
            홈페이지 주소만 보내주세요. <Br />
            설치할 수 있는지 먼저 확인하고, 방법과 비용을 안내드립니다.
          </>
        }
      />
    </PageShell>
  );
}
