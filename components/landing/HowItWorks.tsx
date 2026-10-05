import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Check } from "@/components/ui/CheckList";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { HOW_STEPS } from "@/lib/home";
import { STEP_VISUALS } from "@/lib/scenes";
import { DEMO_LABEL, DEMO_URL, HOW_ID, PRICING_PATH } from "@/lib/site";
import { FocusView, StageView } from "./ProductStage";

const COUNT = HOW_STEPS.length;
/** "STEP 1" — the same marker the owner's screen carries as step 4. */
export const stepMark = (i: number) => `STEP ${i + 1}`;

/**
 * 작동 방식 — the whole flow in four steps. The overview names all four at once; the three the
 * visitor goes through follow, each with the real screen it happens on and, as small print, what
 * the longer walkthrough used to spend a scene on. Step 4, the owner's side, is the next section.
 */
export function HowItWorks() {
  const visitor = HOW_STEPS.filter((step) => STEP_VISUALS[step.id]);
  return (
    <Section id={HOW_ID} aria-labelledby="how-title" pt="pt-36 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <div data-reveal>
        <SceneHeader
          eyebrow={`작동 방식 · ${COUNT}단계`}
          titleId="how-title"
          title="방문자가 말하면, 정리된 견적 문의로 들어옵니다."
          titleClassName="mobile:text-[28px]"
        />
      </div>

      {/* All four at a glance. The steps below repeat the titles, so phones go straight to them. */}
      <ol data-reveal className="mt-10 mb-0 grid list-none grid-cols-4 gap-4 p-0 narrow:grid-cols-2 mobile:hidden">
        {HOW_STEPS.map((step, i) => (
          <li key={step.id}>
            <a
              href={`#${step.id}`}
              className="group flex h-full flex-col gap-3 rounded-xl border border-line-strong px-6 py-5 no-underline transition-[background-color,border-color] duration-160 ease-out hover:border-blue-200 hover:bg-white"
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-[13px] leading-none font-medium text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden="true" className="h-px flex-1 bg-line-strong" />
                {i < COUNT - 1 && (
                  <span aria-hidden="true" className="-ml-1 text-[14px] leading-none text-faint">
                    →
                  </span>
                )}
              </span>
              <span className="text-[18px] leading-[1.4] font-bold tracking-[-0.02em] text-balance text-ink">{step.title}</span>
            </a>
          </li>
        ))}
      </ol>

      <div className="mt-20 grid gap-20 mobile:mt-10 mobile:gap-12">
        {visitor.map((step) => {
          const i = HOW_STEPS.indexOf(step);
          const { stage, focus } = STEP_VISUALS[step.id];
          return (
            <article
              key={step.id}
              id={step.id}
              aria-labelledby={`${step.id}-title`}
              className="grid scroll-mt-24 items-center gap-x-16 gap-y-10 split:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] narrow:gap-x-10 mobile:gap-y-6"
            >
              <div data-reveal>
                <p className="m-0 flex items-center gap-2.5 font-mono text-[13px] leading-none font-medium text-accent">
                  {stepMark(i)}
                  <span className="text-muted">/ {COUNT}</span>
                </p>
                <h3
                  id={`${step.id}-title`}
                  className="mt-4 mb-0 text-[clamp(26px,2.5vw,36px)] leading-[1.25] font-bold tracking-[-0.03em] text-balance text-ink mobile:text-[23px]"
                >
                  {step.title}
                </h3>
                <p className="mt-4 mb-0 text-[18px] leading-[1.65] tracking-[-0.01em] text-pretty text-muted mobile:mt-3 mobile:text-[16px]">
                  {step.text}
                </p>
                <ul className="mt-6 mb-0 grid list-none gap-2.5 p-0 mobile:mt-4 mobile:gap-2">
                  {step.proofs.map((proof) => (
                    <li key={proof} className="flex gap-2.5 text-[16px] leading-[1.5] font-medium text-body mobile:text-[15px]">
                      <Check className="mt-[5px] size-4 text-accent" />
                      {proof}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <StageView stage={stage} frameWidth={760} className="max-w-[760px] mobile:hidden" />
                <FocusView focus={focus} className="hidden mobile:block" />
              </div>
            </article>
          );
        })}
      </div>

      <div
        data-reveal
        className="mt-20 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 rounded-xl border border-line-strong px-9 py-7 mobile:mt-10 mobile:gap-y-4 mobile:px-5 mobile:py-5"
      >
        <p className="m-0 text-[19px] leading-[1.5] font-semibold tracking-[-0.02em] text-pretty text-ink mobile:text-[16px]">
          여기까지가 방문자가 보는 화면입니다. 직접 눌러보면 더 빠릅니다.
        </p>
        <div className="flex items-center gap-x-5 max-[480px]:w-full">
          <ButtonLink href={DEMO_URL} external variant="dark" arrow className="max-[480px]:flex-1 max-[480px]:px-4">
            {DEMO_LABEL}
          </ButtonLink>
          <Link
            href={PRICING_PATH}
            className="group inline-flex min-h-11 flex-none items-center gap-1.5 text-[16px] leading-[1.4] font-semibold whitespace-nowrap text-link no-underline"
          >
            <span className="underline-offset-4 group-hover:underline">가격 보기</span>
            <span aria-hidden="true" className="transition-transform duration-160 ease-out group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
