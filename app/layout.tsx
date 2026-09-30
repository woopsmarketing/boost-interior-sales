import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

/**
 * Pretendard Variable v1.3.9 (SIL OFL 1.1), self-hosted. Subset to Pretendard's own
 * subset glyph list (KS X 1001 Hangul + Latin + symbols) to cut 2.0MB → 0.6MB.
 * Regenerate if copy ever needs rarer Hangul — see docs/result report.
 */
const pretendard = localFont({
  src: "./fonts/PretendardVariable.subset.woff2",
  variable: "--font-pretendard",
  weight: "45 930",
  display: "swap",
});

/** Mono is only used for step counters / timecodes. Self-hosted at build by next/font. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f1f2f4",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
