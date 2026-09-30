import { ButtonLink } from "@/components/ui/Button";
import { DEMO_VIDEO_ID, KAKAO_OPEN_CHAT_URL } from "@/lib/site";

const LINKS = [
  { label: "작동 방식", href: "#talk" },
  { label: "데모 영상", href: `#${DEMO_VIDEO_ID}` },
  { label: "설치", href: "#install" },
  { label: "실제 데모", href: "#live" },
];

/**
 * Fixed 64px nav. Turns solid (86% page color + 14px blur) after 40px of scroll —
 * the MotionController toggles `data-solid`.
 */
export function SiteHeader() {
  return (
    <header
      data-nav
      className="fixed inset-x-0 top-0 z-20 border-b border-transparent transition-[background-color,border-color] duration-280 ease-out data-solid:border-line data-solid:bg-page/86 data-solid:backdrop-blur-[14px] data-solid:backdrop-saturate-140"
    >
      <nav aria-label="주요 메뉴" className="mx-auto flex h-16 max-w-[1440px] items-center gap-8 px-20 mobile:px-5">
        <a
          href="#top"
          className="text-[20px] leading-none font-extrabold tracking-[-0.03em] text-accent no-underline hover:text-accent"
        >
          BoostChat
        </a>
        <ul className="m-0 ml-auto flex list-none gap-7 p-0 mobile:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-[15px] leading-none font-medium text-muted no-underline hover:text-ink">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <ButtonLink href={KAKAO_OPEN_CHAT_URL} external size="nav" className="mobile:ml-auto">
          <span className="mobile:hidden">카카오톡 도입 상담</span>
          <span className="hidden mobile:inline">카카오톡 상담</span>
        </ButtonLink>
      </nav>
    </header>
  );
}
