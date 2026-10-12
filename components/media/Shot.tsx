import Image from "next/image";
import type { Still } from "@/lib/film";

/**
 * One still of the asset pack, whole and uncropped: the stills carry their own labels and margins.
 * `sizes` is the slot it is shown in; next/image picks a file that fits it.
 */
export function Shot({
  still,
  sizes,
  alt = still.alt,
  className = "",
}: {
  still: Still;
  sizes: string;
  /** Empty where the text next to it already says what the still shows */
  alt?: string;
  className?: string;
}) {
  return (
    <Image
      src={still.src}
      width={still.width}
      height={still.height}
      alt={alt}
      sizes={sizes}
      quality={85}
      className={`block h-auto w-full ${className}`}
    />
  );
}
