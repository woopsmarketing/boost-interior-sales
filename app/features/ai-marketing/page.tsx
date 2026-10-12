import type { ResolvingMetadata } from "next";
import { Block, ClipFigure, FeatureFaq, FeatureHero, Split, StepList, StillFigure } from "@/components/features/Parts";
import { ReelSamples } from "@/components/features/ReelSamples";
import { Contact } from "@/components/landing/Contact";
import { PageShell } from "@/components/layout/PageShell";
import { AvailabilityList, MonthlyPrice, StatusChip } from "@/components/pricing/ProductParts";
import { SubscriptionPanel } from "@/components/pricing/Subscriptions";
import { TrialPolicy } from "@/components/pricing/TrialPolicy";
import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { Icon } from "@/components/ui/Icon";
import { MoreLink } from "@/components/ui/MoreLink";
import { BUNDLE_OFFER, MARKETING_PAGE } from "@/lib/features";
import { short, still } from "@/lib/media";
import { pageMetadata } from "@/lib/page-metadata";
import { subscription, TRIAL, VAT_SHORT } from "@/lib/pricing";
import { BUNDLE_ID, FEATURES, KAKAO_LABEL, KAKAO_OPEN_CHAT_URL, PRICING_PATH } from "@/lib/site";

const PAGE = FEATURES.marketing;

export function generateMetadata(_props: PageProps<"/features/ai-marketing">, parent: ResolvingMetadata) {
  return pageMetadata(parent, PAGE);
}

const HALF_SLOT = "(max-width: 820px) calc(100vw - 40px), (max-width: 1440px) calc((100vw - 192px) / 2), 624px";

/**
 * AI 마케팅 — the page for an owner who wants to know what comes out and what it takes: the two
 * reels the product made first, then the way there in the product's own screens (photos and a memo,
 * the video's settings and the result, the cover and the posts, the blog draft), where it works
 * today, the price with the trial policy, the questions and the way to ask.
 * `#reels` and `#posts` are linked from the landing.
 */
export default function MarketingPage() {
  const product = subscription("marketing");
  const result = short("CLIP-02");
  const draft = short("CLIP-01");
  const blog = short("CLIP-03");
  const photos = still("UI-01");
  const polished = still("UI-02");
  /** The settings dialog, then the finished video: one screen per step of `reelSteps`. */
  const reelShots = [still("UI-03"), still("UI-04")];
  const kit = still("HERO-B");
  const { inputSteps, reelSteps, posts, blogPoints, blogNote, scope, faq } = MARKETING_PAGE;
  return (
    <PageShell page={PAGE.path}>
      <FeatureHero
        eyebrow={product.name}
        title={
          <>
            시공사진을 올리면, <Br />
            <span className="whitespace-nowrap">릴스 · 쇼츠</span> 영상과 글이 준비됩니다.
          </>
        }
        sub="시공사진과 공사 정보를 올리면 세로 영상과 표지 이미지, 채널별 글이 함께 만들어집니다. 영상은 내려받고 글은 복사해서, 원하는 채널에 직접 올립니다."
        actions={
          <>
            <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" arrow>
              {KAKAO_LABEL}
            </ButtonLink>
            <ButtonLink href="#samples" size="lg" variant="secondary">
              제품이 만든 영상 보기
            </ButtonLink>
          </>
        }
        facts={
          <div className="mt-7 border-t border-line-strong pt-6 mobile:mt-6 mobile:pt-5">
            <p className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
              <MonthlyPrice item={product} className="text-[28px]" />
              <span className="text-[13px] leading-none font-medium text-muted">{VAT_SHORT}</span>
              <a href="#price" className="text-[14px] leading-[1.4] font-semibold text-link underline-offset-4 hover:underline">
                {TRIAL.label}
              </a>
            </p>
            <AvailabilityList items={product.availability} className="mt-4" />
          </div>
        }
      >
        <ClipFigure
          film={result}
          priority
          label="사진 13장으로 만든 완공 쇼케이스 영상과 사진 6장으로 만든 Before → After 영상의 결과 화면"
          name="영상 결과 화면"
        />
      </FeatureHero>

      <ReelSamples />

      <Block
        id="input"
        eyebrow="01 · 시공사진 등록"
        title={
          <>
            사진과 메모만 <Br on="phone" />
            준비하면 됩니다.
          </>
        }
        sub="시공사례 한 건을 등록하는 과정입니다. 영상과 글은 모두 이 시공사례에서 만들어집니다."
      >
        <Split media={<ClipFigure film={draft} label="시공사진과 메모가 AI 시공사례 초안으로 정리되는 제품 화면" name="시공사례 초안 영상" />}>
          <StepList steps={inputSteps} />
        </Split>
        <div className="mt-10 grid grid-cols-2 gap-6 mobile:mt-7 mobile:grid-cols-1 mobile:gap-7">
          <div data-reveal>
            <StillFigure still={photos} sizes={HALF_SLOT} caption="사진을 올리고 순서를 정하는 화면" />
          </div>
          <div data-reveal>
            <StillFigure still={polished} sizes={HALF_SLOT} caption="AI가 제목 · 소개 · 본문과 공사 정보를 채운 화면" />
          </div>
        </div>
      </Block>

      <Block
        id="reels"
        eyebrow="02 · 릴스 · 쇼츠 영상"
        title={
          <>
            방식을 고르면, <Br on="phone" />
            세로 영상이 완성됩니다.
          </>
        }
        sub="영상을 편집할 줄 몰라도 됩니다. 고르고, 기다리고, 내려받습니다."
      >
        <ol className="m-0 mt-11 grid list-none grid-cols-2 gap-x-6 gap-y-9 p-0 mobile:mt-7 mobile:grid-cols-1">
          {reelSteps.map((step, i) => (
            <li key={step.title} data-reveal>
              <p className="m-0 flex gap-4">
                <span aria-hidden="true" className="mt-[3px] font-mono text-[13px] leading-[1.6] font-medium text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[19px] leading-[1.45] font-bold tracking-[-0.02em] text-ink mobile:text-[17px]">{step.title}</span>
                  <span className="mt-1.5 block text-[16px] leading-[1.65] text-pretty text-body mobile:text-[15px]">{step.text}</span>
                </span>
              </p>
              <StillFigure still={reelShots[i]} sizes={HALF_SLOT} className="mt-5" />
            </li>
          ))}
        </ol>
      </Block>

      <Block
        id="posts"
        eyebrow="03 · 표지 이미지 · 게시글"
        title={
          <>
            영상과 함께 올릴 <Br on="phone" />
            표지와 글도 같이.
          </>
        }
        sub="영상이 만들어질 때 표지 이미지와 채널별 글이 함께 준비됩니다."
      >
        <Split media={<StillFigure still={kit} />}>
          <ul className="m-0 grid list-none gap-0 p-0">
            {posts.map((post) => (
              <li key={post.title} className="flex gap-4 border-t border-line-strong py-5 first:border-t-0 first:pt-0 mobile:py-4">
                <span className="grid size-10 flex-none place-items-center rounded-md bg-accent-soft text-accent">
                  <Icon name={post.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="m-0 text-[18px] leading-[1.45] font-bold tracking-[-0.02em] text-ink mobile:text-[16.5px]">{post.title}</h3>
                  <p className="mt-1 mb-0 text-[15px] leading-[1.6] text-pretty text-body">{post.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Split>
      </Block>

      <Block
        id="blog"
        eyebrow="04 · 네이버 블로그 초안"
        title={
          <>
            블로그 글은, <Br on="phone" />
            뼈대가 잡힌 초안으로.
          </>
        }
      >
        <Split media={<ClipFigure film={blog} label="시공 정보로 네이버 블로그 초안이 만들어진 제품 화면" name="블로그 초안 영상" />}>
          <CheckList items={blogPoints} className="[&>li]:text-[17px] [&>li]:font-semibold [&>li]:text-ink mobile:[&>li]:text-[16px]" />
          <p className="mt-6 mb-0 border-t border-line-strong pt-5 text-[14.5px] leading-[1.65] text-pretty text-muted">{blogNote}</p>
        </Split>
      </Block>

      <Block id="scope" eyebrow="이용 조건" title="지금은 이렇게 이용합니다.">
        <ul data-reveal className="m-0 mt-10 grid list-none grid-cols-3 gap-4 p-0 narrow:grid-cols-1 mobile:mt-7 mobile:gap-3">
          <li className="rounded-xl bg-white p-6 shadow-md mobile:p-5">
            <StatusChip status="now" />
            <p className="mt-3.5 mb-0 text-[15.5px] leading-[1.65] text-pretty text-body">{scope.now}</p>
          </li>
          <li className="rounded-xl bg-white p-6 shadow-md mobile:p-5">
            <StatusChip status="planned" />
            <p className="mt-3.5 mb-0 text-[15.5px] leading-[1.65] text-pretty text-body">{scope.later}</p>
          </li>
          <li className="rounded-xl bg-white p-6 shadow-md mobile:p-5">
            <p className="m-0 text-[13px] leading-[24px] font-bold text-ink">게시는 대표님이 직접</p>
            <p className="mt-3.5 mb-0 text-[15.5px] leading-[1.65] text-pretty text-body">{scope.posting}</p>
          </li>
        </ul>
      </Block>

      <SubscriptionPanel item={product}>
        <TrialPolicy className="mt-7 border-t border-line pt-7" />
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
            우리 업체도 쓸 수 있는지 <br />
            확인해보세요.
          </>
        }
        sub={
          <>
            업체명과 홈페이지 주소(있다면)만 보내주세요. <Br />
            지금 이용할 수 있는 방식과 비용을 안내드립니다.
          </>
        }
      />
    </PageShell>
  );
}
