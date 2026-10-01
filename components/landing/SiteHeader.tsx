import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { DEMO_VIDEO_ID, KAKAO_OPEN_CHAT_URL, PRICING_PATH, SITE_NAME } from "@/lib/site";

/** Landing sections. `phone` links stay in the bar at ≤820px, where the rest of the menu is hidden. */
const LINKS = [
  { label: "작동 방식", hash: "#talk" },
  { label: "데모 영상", hash: `#${DEMO_VIDEO_ID}` },
  { label: "설치", hash: "#install" },
  { label: "실제 데모", hash: "#live" },
];

const LINK = "text-[15px] leading-none font-medium no-underline hover:text-ink mobile:py-3 mobile:text-[14px]";

/**
 * Fixed 64px nav. Turns solid (86% page color + 14px blur) after 40px of scroll —
 * the MotionController toggles `data-solid`.
 * On the landing the section links are in-page anchors; on /pricing they lead back to it.
 */
export function SiteHeader({ page = "home" }: { page?: "home" | "pricing" }) {
  const home = page === "home";
  return (
    <header
      data-nav
      className="fixed inset-x-0 top-0 z-20 border-b border-transparent transition-[background-color,border-color] duration-280 ease-out data-solid:border-line data-solid:bg-page/86 data-solid:backdrop-blur-[14px] data-solid:backdrop-saturate-140"
    >
      <nav aria-label="주요 메뉴" className="mx-auto flex h-16 max-w-[1440px] items-center gap-8 px-20 mobile:gap-4 mobile:px-5">
        {home ? (
          <a
            href="#top"
            className="text-[20px] leading-none font-extrabold tracking-[-0.03em] text-accent no-underline hover:text-accent"
          >
            {SITE_NAME}
          </a>
        ) : (
          <Link
            href="/"
            aria-label={`${SITE_NAME} 홈`}
            className="text-[20px] leading-none font-extrabold tracking-[-0.03em] text-accent no-underline hover:text-accent"
          >
            {SITE_NAME}
          </Link>
        )}
        <ul className="m-0 ml-auto flex list-none gap-7 p-0">
          {LINKS.map((link) => (
            <li key={link.hash} className="mobile:hidden">
              {home ? (
                <a href={link.hash} className={`${LINK} text-muted`}>
                  {link.label}
                </a>
              ) : (
                <Link href={`/${link.hash}`} className={`${LINK} text-muted`}>
                  {link.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <Link
              href={PRICING_PATH}
              aria-current={home ? undefined : "page"}
              className={`${LINK} ${home ? "text-muted" : "font-semibold text-ink"}`}
            >
              가격
            </Link>
          </li>
        </ul>
        <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="nav" className="max-[359px]:px-3.5">
          <span className="mobile:hidden">카카오톡 도입 상담</span>
          <span className="hidden mobile:inline">카카오톡 상담</span>
        </ButtonLink>
      </nav>
    </header>
  );
}
