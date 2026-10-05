import { Br } from "@/components/ui/Br";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { HOW_STEPS, OWNER_FIELDS, OWNER_SUMMARY } from "@/lib/home";
import { OWNER_FOCUS, OWNER_STAGE } from "@/lib/scenes";
import { SITE_NAME } from "@/lib/site";
import { stepMark } from "./HowItWorks";
import { FocusView, StageView } from "./ProductStage";

const DEMO_NOTE = "화면 속 문의는 촬영용 데모 데이터입니다.";

/**
 * 대표님 화면 — step 4, and what the owner pays for: one inquiry as it arrives in the admin, with
 * the conditions the visitor gave during the chat already filled in. The screen is the real one;
 * the fields named under it are the fields on it.
 */
export function OwnerResult() {
  const step = HOW_STEPS.findIndex((item) => item.id === "owner");
  return (
    <Section id="owner" aria-labelledby="owner-title" pt="pt-28 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <div data-reveal>
        <SceneHeader
          step={`${stepMark(step)} / ${HOW_STEPS.length}`}
          eyebrow={`대표님 화면 · ${SITE_NAME} 관리 화면`}
          titleId="owner-title"
          titleClassName="mobile:text-[28px]"
          title={
            <>
              결국 대표님에게는 <Br />
              이렇게 정리되어 들어옵니다.
            </>
          }
          sub="고객에게 처음부터 다시 묻기 전에, 어떤 공사를 원하는지 먼저 확인하고 연락할 수 있습니다."
          subClassName="mobile:text-[16px]"
        />
      </div>

      <StageView stage={OWNER_STAGE} frameWidth={1280} className="mt-12 mobile:hidden" />

      {/* Phones: the request's summary as text, then its fields at a size that reads. */}
      <div data-reveal className="mt-7 hidden mobile:block">
        <figure className="m-0 rounded-xl bg-white p-5 shadow-md">
          <figcaption className="text-[13px] leading-[1.4] font-bold text-accent">고객이 무엇을 원하는지</figcaption>
          <blockquote className="mt-2 mb-0 text-[16px] leading-[1.6] font-medium text-ink">{OWNER_SUMMARY}</blockquote>
        </figure>
        <FocusView focus={OWNER_FOCUS} className="mt-4" />
      </div>

      <div
        data-reveal
        className="mt-10 flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-t border-line-strong pt-7 mobile:mt-6 mobile:pt-5"
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <p className="m-0 text-[15px] leading-[1.4] font-bold text-ink">문의 한 건에 담기는 정보</p>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {OWNER_FIELDS.map((field) => (
              <li
                key={field}
                className="inline-flex h-8 items-center rounded-pill bg-white px-3 text-[14px] leading-none font-semibold whitespace-nowrap text-body shadow-hairline"
              >
                {field}
              </li>
            ))}
          </ul>
        </div>
        <p className="m-0 text-[13px] leading-[1.5] text-muted">{DEMO_NOTE}</p>
      </div>
    </Section>
  );
}
