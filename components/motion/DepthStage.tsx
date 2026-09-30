import type { CSSProperties, ReactNode } from "react";

/**
 * 2.5D stage: CSS perspective (1800px) with preserve-3d children.
 * Cursor tilt (≤1.5°) is applied by the MotionController on fine pointers only.
 */
export function DepthStage({
  children,
  perspective,
  className = "",
}: {
  children: ReactNode;
  perspective?: number;
  className?: string;
}) {
  const style: CSSProperties | undefined = perspective ? { perspective: `${perspective}px` } : undefined;
  // The tilted inner plane must not be a hit target: children pushed back in Z (hero parallax)
  // would sit behind it and their controls (hero pause/play) would stop receiving clicks.
  return (
    <div data-tilt-stage className={`perspective-stage relative h-full ${className}`} style={style}>
      <div
        data-tilt-inner
        className="preserve-3d pointer-events-none relative h-full w-full transition-transform duration-700 ease-out *:pointer-events-auto"
      >
        {children}
      </div>
    </div>
  );
}
