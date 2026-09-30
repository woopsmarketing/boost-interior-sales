import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { DEMO_URL, KAKAO_OPEN_CHAT_URL } from "@/lib/site";

/** 도입 상담 — final CTA. 상담 happens in the KakaoTalk 1:1 open chat; nothing is collected on this page. */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_minmax(0,520px)] items-start gap-24 px-20 pt-40 pb-30 narrow:grid-cols-1 narrow:gap-12 mobile:gap-10 mobile:px-5 mobile:pt-24 mobile:pb-16"
    >
      <SceneHeader
        eyebrow="도입 상담"
        titleId="contact-title"
        title={
          <>
            귀사 홈페이지에도 <Br />
            적용할 수 있는지 확인해보세요.
          </>
        }
        sub={
          <>
            현재 홈페이지를 간단히 확인한 뒤 <Br />
            적용 가능한 방식을 안내해드립니다.
          </>
        }
      />
      <div className="grid gap-[18px] rounded-xl bg-white p-9 shadow-window mobile:p-6">
        <p className="m-0 text-[17px] leading-[1.6] text-body">
          업체명과 홈페이지 주소를 남겨주시면 확인 후 카카오톡으로 답변드립니다.
        </p>
        <div className="grid gap-3">
          <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="lg" full arrow>
            카카오톡 1:1 도입 상담
          </ButtonLink>
          <ButtonLink href={DEMO_URL} external size="lg" variant="secondary" full>
            실제 데모 체험하기
          </ButtonLink>
        </div>
        <p className="m-0 text-[13px] leading-[1.6] text-muted">BoostWorks 카카오톡 1:1 오픈채팅 상담방으로 연결됩니다.</p>
      </div>
    </section>
  );
}
