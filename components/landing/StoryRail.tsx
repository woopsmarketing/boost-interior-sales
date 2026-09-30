import { RAIL } from "@/lib/scenes";

/**
 * Right-edge progress rail for the story scenes (desktop only).
 * Server-rendered anchors; the MotionController shows it while a story scene is
 * in view, marks the current step and adjusts the jump offset for pinned scenes.
 */
export function StoryRail() {
  return (
    <nav
      data-rail
      aria-label="제품 흐름 단계"
      className="invisible fixed top-1/2 right-7 z-15 -translate-y-1/2 opacity-0 transition-[opacity,visibility] duration-400 ease-out data-visible:visible data-visible:opacity-100 mobile:hidden"
    >
      <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
        {RAIL.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-rail-item={item.id}
              className="group flex items-center gap-3 text-[13px] leading-[1.2] font-medium text-muted no-underline transition-colors duration-280 hover:text-ink aria-[current=step]:font-semibold aria-[current=step]:text-ink"
            >
              <span
                aria-hidden="true"
                className="h-[3px] w-2.5 rounded-[2px] bg-gray-300 transition-[width,background-color] duration-280 ease-out group-data-done:bg-gray-400 group-aria-[current=step]:w-[22px] group-aria-[current=step]:bg-accent"
              />
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
