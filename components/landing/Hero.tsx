import { DepthStage } from "@/components/motion/DepthStage";
import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { DEMO_URL, VIDEOS } from "@/lib/site";
import { FlowLine } from "./FlowLine";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="mx-auto max-w-[1440px] px-20 pt-[148px] pb-20 mobile:px-5 mobile:pt-[104px] mobile:pb-6"
    >
      <SceneHeader
        as="h1"
        size="xl"
        titleId="hero-title"
        eyebrow="BoostChat · 인테리어 · 리모델링 업체를 위한 AI 상담"
        className="max-w-[980px]"
        titleClassName="mobile:text-[clamp(30px,9.2vw,40px)]"
        title={
          <>
            홈페이지까지 찾아온 <Br on="phone" />
            고객, <Br on="wide" />
            견적 문의까지 <Br on="phone" />
            자연스럽게
            <br />
            이어지고 있나요?
          </>
        }
        sub={
          <>
            고객이 원하는 공사를 말하면 관련 시공사례를 찾아주고, <Br />
            사진을 보며 상담한 뒤 견적 문의까지 연결합니다.
          </>
        }
      />

      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href={DEMO_URL} external size="lg" arrow>
          실제 데모 체험하기
        </ButtonLink>
        <ButtonLink href="#talk" size="lg" variant="secondary">
          작동 방식 보기
        </ButtonLink>
      </div>
      <p className="mt-[18px] mb-0 flex items-center gap-2 text-[14px] leading-[1.4] font-medium text-muted">
        <span aria-hidden="true" className="size-1.5 flex-none rounded-pill bg-accent" />
        기존 인테리어 홈페이지에도 설치할 수 있습니다.
      </p>

      <div className="mt-10">
        <FlowLine />
      </div>

      {/* The video's own background is the page color, so it can use the gutters to show the UI larger. */}
      <div className="mt-18 -mr-5 -ml-15 mobile:-mx-5 mobile:mt-9">
        <DepthStage>
          <div data-hero-parallax>
            <HeroVideo
              src={VIDEOS.hero.src}
              mobileSrc={VIDEOS.hero.mobileSrc}
              poster={VIDEOS.hero.poster}
              width={VIDEOS.hero.width}
              height={VIDEOS.hero.height}
              label="BoostChat 작동 미리보기: 방문자가 원하는 공사를 말하면 상담창이 관련 시공 사례를 추천합니다."
            />
          </div>
        </DepthStage>
      </div>
    </section>
  );
}
