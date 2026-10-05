import { PORTFOLIO_VIDEO_SAMPLE } from "@/lib/site";

/**
 * A real AI Portfolio Video result, wherever Growth is explained. While there is no sample this
 * renders nothing at all: no empty frame and no stand-in video.
 */
export function PortfolioSample({ className = "" }: { className?: string }) {
  const sample = PORTFOLIO_VIDEO_SAMPLE;
  if (!sample) return null;
  return (
    <figure className={`m-0 ${className}`}>
      <video
        src={sample.src}
        poster={sample.poster}
        width={sample.width}
        height={sample.height}
        controls
        playsInline
        preload="none"
        aria-label="AI Portfolio Video 실제 예시"
        className="block h-auto w-full max-w-[720px] rounded-lg bg-gray-900"
      />
      <figcaption className="mt-3 text-[13px] leading-[1.6] text-muted">
        AI Portfolio Video 실제 예시 · Growth 플랜부터 제공
      </figcaption>
    </figure>
  );
}
