import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { HOW_ID, KAKAO_LABEL, KAKAO_OPEN_CHAT_URL, LIVE_ID, PRICING_PATH, SITE_NAME } from "@/lib/site";

/** Landing sections. They are hidden at ≤820px, where the bar keeps the logo, 가격 and 문의. */
const LINKS = [
  { label: "작동 방식", hash: `#${HOW_ID}` },
  { label: "실제 데모", hash: `#${LIVE_ID}` },
];

const LINK =
  "inline-flex min-h-11 min-w-11 items-center justify-center text-[15px] leading-none font-medium no-underline hover:text-ink mobile:text-[14px]";

/**
 * Fixed 64px nav. Turns solid (86% page color + 14px blur) after 40px of scroll —
 * the MotionController toggles `data-solid`.
 * On the landing the section links are in-page anchors; on the pricing pages they lead back to it.
 * "가격" stays marked on /pricing/details, which is part of the pricing it links to.
 * 문의 is outlined: the filled button of each page is the one in its hero.
 */
export function SiteHeader({ page = "home" }: { page?: "home" | "pricing" | "pricing-details" }) {
  const home = page === "home";
  return (
    <header
      data-nav
      className="fixed inset-x-0 top-0 z-20 border-b border-transparent transition-[background-color,border-color] duration-280 ease-out data-solid:border-line data-solid:bg-page/86 data-solid:backdrop-blur-[14px] data-solid:backdrop-saturate-140"
    >
      <nav aria-label="주요 메뉴" className="mx-auto flex h-16 max-w-[1440px] items-center gap-8 px-20 mobile:gap-3 mobile:px-5">
        {home ? (
          <a
            href="#top"
            className="inline-flex min-h-11 items-center text-[20px] leading-none font-extrabold tracking-[-0.03em] text-accent no-underline hover:text-accent"
          >
            {SITE_NAME}
          </a>
        ) : (
          <Link
            href="/"
            aria-label={`${SITE_NAME} 홈`}
            className="inline-flex min-h-11 items-center text-[20px] leading-none font-extrabold tracking-[-0.03em] text-accent no-underline hover:text-accent"
          >
            {SITE_NAME}
          </Link>
        )}
        <ul className="m-0 ml-auto flex list-none items-center gap-5 p-0 mobile:gap-1">
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
              aria-current={page === "pricing" ? "page" : page === "pricing-details" ? "true" : undefined}
              className={`${LINK} ${home ? "text-muted" : "font-semibold text-ink"}`}
            >
              가격
            </Link>
          </li>
        </ul>
        <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="nav" variant="secondary" className="mobile:h-11 max-[359px]:px-3.5">
          {KAKAO_LABEL}
        </ButtonLink>
      </nav>
    </header>
  );
}
