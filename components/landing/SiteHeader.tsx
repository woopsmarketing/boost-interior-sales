import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import {
  KAKAO_LABEL,
  KAKAO_OPEN_CHAT_URL,
  LIVE_ID,
  NAV_DEMO_LABEL,
  NAV_FEATURES,
  NAV_PRICING_LABEL,
  PRICING_DETAILS_PATH,
  PRICING_PATH,
  SITE_NAME,
} from "@/lib/site";
import { SiteMenu, type MenuItem } from "./SiteMenu";

/** The page the header is on: its link is marked, and on the landing the demo link stays in the page. */
export type PageKey = "home" | (typeof NAV_FEATURES)[number]["path"] | typeof PRICING_PATH | typeof PRICING_DETAILS_PATH;

const LINK = "inline-flex min-h-11 items-center text-[15px] leading-none no-underline hover:text-ink";

/**
 * Fixed 64px nav. Turns solid (86% page color + 14px blur) after 40px of scroll —
 * the MotionController toggles `data-solid`.
 * From 1024px the bar lists every page: the three feature pages, 요금 안내 and 실제 데모 (a block of
 * the landing). Below that it keeps the logo, 문의 and a menu button that opens the same list.
 * "요금 안내" stays marked on /pricing/details, which is part of the pricing it links to.
 * 문의 is outlined: the filled button of each page is the one in its hero.
 */
export function SiteHeader({ page = "home" }: { page?: PageKey }) {
  const home = page === "home";
  // On the details page 요금 안내 is the section the visitor is in, not the page itself.
  const pricing = page === PRICING_PATH ? "page" : page === PRICING_DETAILS_PATH ? "true" : undefined;
  const items: MenuItem[] = [
    ...NAV_FEATURES.map((feature) => ({ label: feature.label, href: feature.path, current: page === feature.path ? ("page" as const) : undefined })),
    { label: NAV_PRICING_LABEL, href: PRICING_PATH, current: pricing },
    { label: NAV_DEMO_LABEL, href: `/#${LIVE_ID}` },
  ];
  return (
    <header
      data-nav
      className="fixed inset-x-0 top-0 z-20 border-b border-transparent transition-[background-color,border-color] duration-280 ease-out data-open:border-line data-open:bg-page data-solid:border-line data-solid:bg-page/86 data-solid:backdrop-blur-[14px] data-solid:backdrop-saturate-140"
    >
      <nav aria-label="주요 메뉴" className="relative mx-auto flex h-16 max-w-[1440px] items-center gap-8 px-20 narrow:px-10 mobile:gap-2.5 mobile:px-5">
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
        <ul className="m-0 ml-auto flex list-none items-center gap-6 p-0 max-[1023px]:hidden">
          {items.map((item) => (
            <li key={item.href}>
              {home && item.href.startsWith("/#") ? (
                <a href={item.href.slice(1)} className={`${LINK} font-medium text-muted`}>
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  aria-current={item.current}
                  className={`${LINK} ${item.current ? "font-semibold text-ink" : "font-medium text-muted"}`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        {/* Below 360px the bar keeps the logo and the menu; 문의 is the menu's last row. */}
        <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="nav" variant="secondary" className="max-[1023px]:ml-auto max-[1023px]:h-11 max-[359px]:hidden">
          {KAKAO_LABEL}
        </ButtonLink>
        <div className="max-[359px]:ml-auto">
          <SiteMenu items={items} contact={{ label: KAKAO_LABEL, href: KAKAO_OPEN_CHAT_URL }} />
        </div>
      </nav>
    </header>
  );
}
