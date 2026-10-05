import { Br } from "@/components/ui/Br";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { ONBOARDING_PREP, ONBOARDING_STEPS } from "@/lib/home";
import { KAKAO_LABEL, KAKAO_OPEN_CHAT_URL, PRICING_ID, SITE_NAME } from "@/lib/site";

const WHO = { owner: "대표님", us: SITE_NAME } as const;

/**
 * 도입 과정 — "how much of this lands on me?": five steps, one of them the owner's, and the one
 * thing to have ready. No number of days anywhere: none is fixed.
 */
export function Onboarding() {
  return (
    <Section id="install" aria-labelledby="install-title" pt="pt-36 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <div data-reveal>
        <SceneHeader
          eyebrow="도입 과정"
          titleId="install-title"
          titleClassName="mobile:text-[28px]"
          title={
            <>
              홈페이지 주소를 보내주시면, <Br />
              연결과 점검은 저희가 진행합니다.
            </>
          }
          sub="기존 홈페이지는 그대로 두고 연결할 수 있습니다."
          subClassName="mobile:text-[16px]"
        />
      </div>

      <div className="mt-12 grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-start gap-12 narrow:grid-cols-1 narrow:gap-8 mobile:mt-6 mobile:gap-6">
        <ol data-reveal className="m-0 list-none border-t border-line-strong p-0">
          {ONBOARDING_STEPS.map((step, i) => (
            <li key={step.title} className="flex items-center gap-5 border-b border-line-strong py-5 mobile:gap-4 mobile:py-3.5">
              <span
                aria-hidden="true"
                className={`grid size-9 flex-none place-items-center rounded-pill font-mono text-[14px] leading-none font-medium ${
                  step.by === "owner" ? "bg-accent text-white" : "bg-white text-ink shadow-hairline"
                }`}
              >
                {i + 1}
              </span>
              <p className="m-0 flex flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
                <span className="text-[20px] leading-[1.4] font-semibold tracking-[-0.02em] text-ink mobile:text-[17px]">{step.title}</span>
                <span
                  className={`inline-flex h-[26px] flex-none items-center rounded-pill px-2.5 text-[12px] leading-none font-semibold whitespace-nowrap mobile:sr-only ${
                    step.by === "owner" ? "bg-accent-soft text-blue-700" : "bg-gray-150 text-muted"
                  }`}
                >
                  {WHO[step.by]}
                </span>
              </p>
            </li>
          ))}
          {/* Phones drop the tag on each row; the numbers' two colours say the same, and this names them. */}
          <li aria-hidden="true" className="hidden items-center gap-x-5 pt-3.5 text-[13px] leading-none font-semibold text-muted mobile:flex">
            <span className="flex items-center gap-2">
              <span className="size-3 rounded-pill bg-accent" />
              {WHO.owner}이 하실 일
            </span>
            <span className="flex items-center gap-2">
              <span className="size-3 rounded-pill bg-white shadow-hairline" />
              {WHO.us}가 진행
            </span>
          </li>
        </ol>

        <aside data-reveal aria-labelledby="install-prep" className="rounded-xl bg-white p-9 shadow-window mobile:p-6">
          <span className="grid size-11 place-items-center rounded-md bg-accent-soft text-accent mobile:hidden">
            <Icon name="window" className="size-[22px]" />
          </span>
          <h3 id="install-prep" className="mt-5 mb-0 text-[24px] mobile:mt-0 leading-[1.35] font-bold tracking-[-0.025em] text-balance text-ink mobile:text-[20px]">
            {ONBOARDING_PREP.title}
          </h3>
          <p className="mt-3 mb-0 text-[16px] leading-[1.7] text-pretty text-body mobile:text-[15px]">{ONBOARDING_PREP.text}</p>
          <p className="mt-5 mb-0 border-t border-line pt-5 text-[15px] leading-[1.6] text-muted mobile:mt-4 mobile:pt-4">
            {ONBOARDING_PREP.none}
            <a
              href={`#${PRICING_ID}`}
              className="flex min-h-11 w-fit items-center font-semibold whitespace-nowrap text-link underline-offset-4 hover:underline"
            >
              구축 방식 보기 ↓
            </a>
          </p>
          <ButtonLink href={KAKAO_OPEN_CHAT_URL} external variant="secondary" full className="mt-3">
            {KAKAO_LABEL}
          </ButtonLink>
        </aside>
      </div>
    </Section>
  );
}
