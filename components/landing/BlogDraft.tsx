import { AutoFilm } from "@/components/media/AutoFilm";
import { CLIP_FRAME, CLIP_PORTRAIT_SLOT, COLUMN_SLOT } from "@/components/media/frames";
import { MediaNote } from "@/components/media/MediaNote";
import { Br } from "@/components/ui/Br";
import { Icon } from "@/components/ui/Icon";
import { MoreLink } from "@/components/ui/MoreLink";
import { SceneHeader } from "@/components/ui/SceneHeader";
import { Section } from "@/components/ui/Section";
import { POST_KINDS, POST_TAKE } from "@/lib/home";
import { short } from "@/lib/media";
import { BLOG_ID, FEATURES } from "@/lib/site";

/**
 * 게시글 · 블로그 초안 — what is written along with the video: the post for each channel and a blog
 * draft, with a short clip of a draft being made. They are drafts and the owner posts them: both
 * are said here, and nothing says a post goes up by itself.
 */
export function BlogDraft() {
  const draft = short("CLIP-03");
  return (
    <Section id={BLOG_ID} aria-labelledby="blog-title" pt="pt-36 mobile:pt-16" pb="pb-0" className="scroll-mt-4">
      <div data-reveal>
        <SceneHeader
          eyebrow="게시글 · 블로그 초안"
          titleId="blog-title"
          titleClassName="mobile:text-[28px]"
          title={
            <>
              영상과 함께 올릴 글도, <Br />
              같이 준비됩니다.
            </>
          }
          sub="채널마다 다른 글을 매번 새로 쓰지 않아도 됩니다. 읽어보고 다듬어서 올리면 됩니다."
          subClassName="mobile:text-[16px]"
        />
      </div>

      <div className="mt-12 grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-center gap-x-16 gap-y-8 narrow:grid-cols-1 mobile:mt-7">
        <div data-reveal>
          <AutoFilm
            film={draft}
            label="시공 정보로 네이버 블로그 초안이 만들어진 제품 화면"
            name="블로그 초안 영상"
            sizes={COLUMN_SLOT}
            portraitSizes={CLIP_PORTRAIT_SLOT}
            className={`${CLIP_FRAME} shadow-float`}
          />
          <MediaNote className="mt-3 phone:text-center">{draft.note}</MediaNote>
        </div>
        <div data-reveal>
          <ul className="m-0 grid list-none gap-0 p-0">
            {POST_KINDS.map((kind) => (
              <li key={kind.title} className="flex gap-4 border-t border-line-strong py-5 first:border-t-0 first:pt-0 mobile:py-4">
                <span className="grid size-10 flex-none place-items-center rounded-md bg-accent-soft text-accent">
                  <Icon name={kind.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="m-0 text-[18px] leading-[1.45] font-bold tracking-[-0.02em] text-ink mobile:text-[16.5px]">{kind.title}</h3>
                  <p className="mt-1 mb-0 text-[15px] leading-[1.6] text-pretty text-body">{kind.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-2 mb-0 border-t border-line-strong pt-5 text-[14px] leading-[1.6] text-pretty text-muted">{POST_TAKE}</p>
          <MoreLink href={`${FEATURES.marketing.path}#posts`} className="mt-2">
            만들어지는 글 자세히 보기
          </MoreLink>
        </div>
      </div>
    </Section>
  );
}
