import Link from "next/link";
import {
  DEMO_SCREEN_NOTE,
  KAKAO_LABEL,
  KAKAO_OPEN_CHAT_URL,
  LIVE_ID,
  NAV_DEMO_LABEL,
  NAV_FEATURES,
  NAV_PRICING_LABEL,
  OPERATOR,
  PRICING_PATH,
  SITE_NAME,
} from "@/lib/site";

const LINK = "inline-flex min-h-11 min-w-11 items-center text-[14px] leading-none font-medium text-muted no-underline hover:text-ink";

/**
 * Who runs it, and every page of the site once more. Business registration details are not listed:
 * this repo holds none, and nothing is put in their place.
 * `note` — pages with product captures show a made-up company; pages without captures leave it out.
 */
export function SiteFooter({ note = `${DEMO_SCREEN_NOTE} 화면 속 시공사례와 문의도 촬영용 데모 데이터입니다.` }: { note?: string | null }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-20 py-7 narrow:px-10 mobile:px-5 mobile:py-6">
        <p className="m-0 flex items-baseline gap-2">
          <span className="text-[18px] leading-none font-extrabold tracking-[-0.03em] text-accent">{SITE_NAME}</span>
          <span className="text-[13px] leading-none font-medium text-muted">by {OPERATOR}</span>
        </p>
        <ul className="m-0 flex list-none flex-wrap items-center gap-x-6 p-0 mobile:gap-x-5">
          {NAV_FEATURES.map((feature) => (
            <li key={feature.path}>
              <Link href={feature.path} className={LINK}>
                {feature.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href={PRICING_PATH} className={LINK}>
              {NAV_PRICING_LABEL}
            </Link>
          </li>
          <li>
            <Link href={`/#${LIVE_ID}`} className={LINK}>
              {NAV_DEMO_LABEL}
            </Link>
          </li>
          <li>
            <a href={KAKAO_OPEN_CHAT_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
              {KAKAO_LABEL}
              <span className="sr-only"> (새 창에서 열림)</span>
            </a>
          </li>
        </ul>
        {note && <p className="m-0 w-full text-[13px] leading-[1.5] text-muted">{note}</p>}
      </div>
    </footer>
  );
}
