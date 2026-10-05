import { VIDEO, VIDEO_FROM } from "@/lib/pricing";
import { PORTFOLIO_VIDEO_SAMPLE } from "@/lib/site";

/**
 * A real AI Portfolio Video result, wherever the feature is explained. While there is no sample this
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
        aria-label={`${VIDEO.name} 실제 예시`}
        className="block h-auto w-full max-w-[720px] rounded-lg bg-gray-900"
      />
      <figcaption className="mt-3 text-[13px] leading-[1.6] text-muted">
        {VIDEO.name} 실제 예시 · {VIDEO_FROM} 제공
      </figcaption>
    </figure>
  );
}
