import type { ReactNode } from "react";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader, type PageKey } from "@/components/landing/SiteHeader";
import { MotionController } from "@/components/motion/MotionController";

/**
 * What every page of the site has around its content: the skip link, the header, the footer and the
 * one motion island. `footerNote` is null on a page that shows no product capture.
 */
export function PageShell({ page, footerNote, children }: { page: PageKey; footerNote?: string | null; children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-pill bg-ink text-[14px] font-semibold text-white no-underline focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:px-4 focus:py-2.5 focus:text-white"
      >
        본문으로 건너뛰기
      </a>
      <SiteHeader page={page} />
      <main id="main">{children}</main>
      <SiteFooter note={footerNote} />
      <MotionController />
    </>
  );
}
