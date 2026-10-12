import { Shot } from "@/components/media/Shot";
import type { Still } from "@/lib/film";
import { DEMO_URL } from "@/lib/site";

/** The demo homepage's address without the scheme, as a browser's bar shows it. */
const HOST = new URL(DEMO_URL).host;

/**
 * A screenshot of the demo homepage in a browser window. The bar is drawn here; everything under it
 * is the screenshot, untouched.
 */
export function Browser({ still, sizes, className = "" }: { still: Still; sizes: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl bg-white shadow-float ring-1 ring-gray-900/6 ${className}`}>
      <div aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-line bg-gray-25 px-3.5 mobile:h-7 mobile:px-2.5">
        <span className="size-2.5 rounded-pill bg-gray-300 mobile:size-2" />
        <span className="size-2.5 rounded-pill bg-gray-300 mobile:size-2" />
        <span className="size-2.5 rounded-pill bg-gray-300 mobile:size-2" />
        <span className="ml-3 inline-flex h-5 min-w-0 flex-1 items-center rounded-pill bg-white px-3 text-[11px] leading-none text-muted shadow-hairline mobile:h-4 mobile:text-[10px]">
          <span className="truncate">{HOST}</span>
        </span>
      </div>
      <Shot still={still} sizes={sizes} />
    </div>
  );
}

/** A screenshot of the demo homepage taken at a phone's width, in a phone's outline. */
export function Phone({ still, sizes, className = "" }: { still: Still; sizes: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[28px] border-[6px] border-gray-900 bg-gray-900 shadow-device ${className}`}>
      <Shot still={still} sizes={sizes} className="rounded-[22px]" />
    </div>
  );
}
