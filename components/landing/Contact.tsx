import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { CONTACT_ID, DEMO_LABEL, DEMO_URL, KAKAO_NOTE, KAKAO_OPEN_CHAT_URL, KAKAO_RECOMMEND_LABEL, OPERATOR, SITE_NAME } from "@/lib/site";
import type { ReactNode } from "react";

/**
 * 문의 — the final step of every page. It happens in the KakaoTalk 1:1 open chat and stays there:
 * nothing is collected on this site, nobody is called, and nothing is paid here.
 * The landing asks the general question; a feature page passes its own.
 */
export function Contact({
  title = (
    <>
      우리 업체에는 무엇이 맞는지 <Br />
      확인해보세요.
    </>
  ),
  sub = (
    <>
      업체명과 홈페이지 주소(있다면)만 보내주세요. <Br />
      현재 상황을 확인한 뒤 맞는 상품과 비용을 안내드립니다.
    </>
  ),
}: {
  title?: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <section
      id={CONTACT_ID}
      aria-labelledby="contact-title"
      className="mx-auto grid max-w-[1440px] scroll-mt-4 grid-cols-[minmax(0,1fr)_minmax(0,520px)] items-center gap-24 px-20 pt-36 pb-30 narrow:grid-cols-1 narrow:gap-10 narrow:px-10 mobile:gap-7 mobile:px-5 mobile:pt-16 mobile:pb-14"
    >
      <SceneHeader eyebrow="문의" titleId="contact-title" titleClassName="mobile:text-[28px]" title={title} sub={sub} subClassName="mobile:text-[16px]" />
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
          {SITE_NAME}는 {OPERATOR}가 만들고 운영합니다. {KAKAO_NOTE} 안내도 카카오톡으로 드립니다. 이 사이트에서는 결제하지 않습니다.
        </p>
      </div>
    </section>
  );
}
