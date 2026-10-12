import type { ReactNode } from "react";
import { AutoFilm } from "@/components/media/AutoFilm";
import { FilmPlayer } from "@/components/media/FilmPlayer";
import { CLIP_FRAME, CLIP_PORTRAIT_SLOT, COLUMN_SLOT, FILM_FRAME } from "@/components/media/frames";
import { MediaNote } from "@/components/media/MediaNote";
import { Shot } from "@/components/media/Shot";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { FaqList } from "@/components/ui/FaqList";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import type { Film, Still } from "@/lib/film";

/**
 * What the three feature pages are built from: the page's opening, a block with its statement, a
 * figure-and-text row, steps, points and the questions. A page states its product in these and
 * nothing else, so the three read as one site.
 * The figures own their notes: a clip, a film or a still shown through them always carries, as text
 * right under it, what the screens in it are.
 */

/** The top of a feature page: what the product does (the page's h1), the ways on, and the product on screen. */
export function FeatureHero({
  eyebrow,
  title,
  sub,
  actions,
  facts,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: ReactNode;
  /** The page's buttons */
  actions: ReactNode;
  /** The price line under the buttons */
  facts?: ReactNode;
  /** The figure */
  children: ReactNode;
}) {
  return (
    <Section id="top" aria-labelledby="page-title" pt="pt-[124px] mobile:pt-[92px]" pb="pb-0">
      <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-x-14 gap-y-10 narrow:grid-cols-1 mobile:gap-y-8">
        <div>
          <SceneHeader
            as="h1"
            titleId="page-title"
            eyebrow={eyebrow}
            title={title}
            sub={sub}
            subSize="md"
            titleClassName="min-[1101px]:text-[clamp(34px,3.3vw,48px)] mobile:text-[30px]"
            subClassName="mobile:text-[16px]"
          />
          <div className="mt-8 flex flex-wrap items-center gap-3 max-[480px]:grid mobile:mt-6">{actions}</div>
          {facts}
        </div>
        <div>{children}</div>
      </div>
    </Section>
  );
}

/** One block of a feature page: its statement, then whatever shows it. `id` is the block's anchor. */
export function Block({
  id,
  eyebrow,
  title,
  sub,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  children: ReactNode;
}) {
  const titleId = `${id}-title`;
  return (
    <Section id={id} aria-labelledby={titleId} pt="pt-32 mobile:pt-16" pb="pb-0" className="scroll-mt-8">
      <div data-reveal>
        <SceneHeader size="md" eyebrow={eyebrow} titleId={titleId} title={title} sub={sub} subSize="md" subClassName="mobile:text-[16px]" />
      </div>
      {children}
    </Section>
  );
}

/** A figure and the text that explains it, side by side; stacked in the same order up to 1100px. */
export function Split({ media, children, className = "" }: { media: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`mt-11 grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-center gap-x-16 gap-y-8 narrow:grid-cols-1 mobile:mt-7 ${className}`}>
      <div data-reveal>{media}</div>
      <div data-reveal>{children}</div>
    </div>
  );
}

/** A short clip that plays by itself, and what it shows as text under it. */
export function ClipFigure({
  film,
  label,
  name,
  sizes = COLUMN_SLOT,
  priority = false,
}: {
  film: Film;
  label: string;
  name: string;
  sizes?: string;
  /** The page's first figure: its poster is fetched with the page */
  priority?: boolean;
}) {
  return (
    <figure className="m-0">
      <AutoFilm film={film} label={label} name={name} sizes={sizes} portraitSizes={CLIP_PORTRAIT_SLOT} priority={priority} className={`${CLIP_FRAME} shadow-float`} />
      <figcaption className="mt-3">
        <MediaNote className="phone:text-center">{film.note}</MediaNote>
      </figcaption>
    </figure>
  );
}

/** A whole film, played on a press, and what it shows as text under it. */
export function FilmFigure({ film, label, caption, sizes = COLUMN_SLOT }: { film: Film; label: string; caption?: string; sizes?: string }) {
  return (
    <figure className="m-0">
      <FilmPlayer film={film} label={label} sizes={sizes} className={`${FILM_FRAME} shadow-float`} />
      <figcaption className="mt-3 phone:text-center">
        {caption && <p className="mt-0 mb-1 text-[15px] leading-[1.5] font-semibold text-ink">{caption}</p>}
        <MediaNote>{film.note}</MediaNote>
      </figcaption>
    </figure>
  );
}

/** A still, whole, and what it shows as text under it. */
export function StillFigure({
  still,
  caption,
  sizes = COLUMN_SLOT,
  className = "",
}: {
  still: Still;
  caption?: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={`m-0 ${className}`}>
      <div className="overflow-hidden rounded-xl bg-white shadow-float">
        <Shot still={still} sizes={sizes} />
      </div>
      <figcaption className="mt-3">
        {caption && <p className="mt-0 mb-1 text-[15px] leading-[1.5] font-semibold text-ink">{caption}</p>}
        <MediaNote>{still.note}</MediaNote>
      </figcaption>
    </figure>
  );
}

/** Numbered steps, in the order they are taken. */
export function StepList({ steps, className = "" }: { steps: readonly { title: string; text: string }[]; className?: string }) {
  return (
    <ol className={`m-0 grid list-none gap-0 p-0 ${className}`}>
      {steps.map((step, i) => (
        <li key={step.title} className="flex gap-5 border-t border-line-strong py-5 first:border-t-0 first:pt-0 mobile:gap-4 mobile:py-4">
          <span aria-hidden="true" className="mt-[3px] font-mono text-[13px] leading-[1.6] font-medium whitespace-nowrap text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="m-0 text-[19px] leading-[1.45] font-bold tracking-[-0.02em] text-ink mobile:text-[17px]">{step.title}</h3>
            <p className="mt-1.5 mb-0 text-[16px] leading-[1.65] text-pretty text-body mobile:text-[15px]">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

const COLUMNS = {
  3: "grid-cols-3 narrow:grid-cols-1",
  4: "grid-cols-4 narrow:grid-cols-2 phone:grid-cols-1",
} as const;

/** A few things of the same kind, one card each. */
export function PointCards({
  points,
  columns = 3,
  className = "",
}: {
  points: readonly { icon: IconName; title: string; text: string }[];
  columns?: keyof typeof COLUMNS;
  className?: string;
}) {
  return (
    <ul data-reveal className={`m-0 grid list-none gap-4 p-0 mobile:gap-3 ${COLUMNS[columns]} ${className}`}>
      {points.map((point) => (
        <li key={point.title} className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md narrow:flex-row mobile:gap-3.5 mobile:p-5">
          <span className="grid size-10 flex-none place-items-center rounded-md bg-accent-soft text-accent">
            <Icon name={point.icon} className="size-5" />
          </span>
          <div>
            <h3 className="m-0 text-[17px] leading-[1.4] font-bold tracking-[-0.01em] text-ink mobile:text-[16px]">{point.title}</h3>
            <p className="mt-1.5 mb-0 text-[15px] leading-[1.6] text-pretty text-body mobile:text-[14.5px]">{point.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** The questions about this product. The ones about price and conditions are on /pricing/details. */
export function FeatureFaq({ items, title }: { items: readonly { q: string; a: string }[]; title: ReactNode }) {
  return (
    <Section id="faq" aria-labelledby="faq-title" pt="pt-32 mobile:pt-16" pb="pb-0" className="scroll-mt-8">
      <div className="grid grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-start gap-14 narrow:grid-cols-1 narrow:gap-9 mobile:gap-6">
        <div data-reveal>
          <SceneHeader size="md" eyebrow="자주 묻는 질문" titleId="faq-title" title={title} />
        </div>
        <div data-reveal>
          <FaqList items={items} />
        </div>
      </div>
      <FaqJsonLd items={items} />
    </Section>
  );
}
