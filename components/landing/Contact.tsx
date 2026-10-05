import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { DEMO_LABEL, DEMO_URL, KAKAO_NOTE, KAKAO_OPEN_CHAT_URL, KAKAO_RECOMMEND_LABEL } from "@/lib/site";

/**
 * 문의 — the final step. It happens in the KakaoTalk 1:1 open chat and stays there: nothing is
 * collected on this page, and nobody is called.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_minmax(0,520px)] items-center gap-24 px-20 pt-36 pb-30 narrow:grid-cols-1 narrow:gap-10 mobile:gap-7 mobile:px-5 mobile:pt-16 mobile:pb-14"
    >
      <SceneHeader
        eyebrow="문의"
        titleId="contact-title"
        titleClassName="mobile:text-[28px]"
        title={
          <>
            귀사 홈페이지에도 <Br />
            적용할 수 있는지 확인해보세요.
          </>
        }
        sub={
          <>
            업체명과 홈페이지 주소만 보내주세요. <Br />
            현재 홈페이지를 확인한 뒤 맞는 구축 방식과 비용을 안내드립니다.
          </>
        }
        subClassName="mobile:text-[16px]"
      />
      <div className="grid gap-[18px] rounded-xl bg-white p-9 shadow-window mobile:p-6">
        <div className="grid gap-3">
          <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" full arrow>
            {KAKAO_RECOMMEND_LABEL}
          </ButtonLink>
          <ButtonLink href={DEMO_URL} external size="lg" variant="secondary" full>
            {DEMO_LABEL}
          </ButtonLink>
        </div>
        <p className="m-0 text-[13px] leading-[1.6] text-muted">
          {KAKAO_NOTE} 안내도 카카오톡으로 드립니다.
        </p>
      </div>
    </section>
  );
}
