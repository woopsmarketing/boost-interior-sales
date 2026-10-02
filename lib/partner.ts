import type { IconName } from "@/components/ui/Icon";

/**
 * Founding Partner benefits. Two are fixed and stated as such: priority listing on the future
 * interior platform, and the platform's basic listing fee waived for 12 months after launch.
 * The rest have no numbers on purpose: discount rates, free-use amounts and release dates
 * are not decided yet, so the copy must not invent any.
 * `tag` is the small line above the title. It is Korean wherever the title needs context; the two
 * features that have an English name (AI Portfolio Video, 3D Portfolio) carry it there, under a Korean title.
 */
export const PARTNER_BENEFITS: readonly { icon: IconName; tag: string; title: string; text: string }[] = [
  {
    icon: "platform",
    tag: "인테리어 플랫폼",
    title: "향후 플랫폼 우선 입점",
    text: "향후 BoostInterior 인테리어 플랫폼에 초기 파트너로 우선 입점합니다. 기존 업체 정보와 시공사례의 초기 이전 · 세팅도 지원합니다.",
  },
  {
    icon: "calendar",
    tag: "플랫폼 입점비",
    title: "기본 입점비 12개월 무료",
    text: "플랫폼 출시 시 초기 파트너는 기본 입점비가 12개월 동안 무료입니다.",
  },
  {
    icon: "video",
    tag: "AI Portfolio Video",
    title: "AI 시공사례 영상 우선 혜택",
    text: "시공사진을 공간의 흐름에 따라 영상으로 보여주는 기능을 초기 파트너가 먼저 사용합니다.",
  },
  {
    icon: "cube",
    tag: "3D Portfolio",
    title: "3D 시공사례 우선 적용",
    text: "공간형 3D 시공사례가 준비되면 초기 파트너에게 먼저 적용 · 사용 기회를 드립니다.",
  },
  {
    icon: "spark",
    tag: "우선 이용",
    title: "신규 기능 먼저 이용",
    text: "방문자 분석, AI 상담 확장, 시공사례, 상담 · 견적 문의 기능 등 새로운 기능이 준비되면 초기 파트너가 먼저 이용할 수 있습니다.",
  },
  {
    icon: "ticket",
    tag: "신규 유료 기능",
    title: "초기 파트너 전용 할인 · 무료 이용 혜택",
    text: "새 유료 기능이 출시되면 초기 파트너에게 전용 할인과 무료 이용 혜택, 전용 프로모션을 드립니다.",
  },
];

/** What the 12-month waiver does not cover, and where the details will come from. */
export const PARTNER_TERMS =
  "무료 혜택은 기본 입점비에 한하며, 광고 · 프리미엄 노출 등 추가 상품은 포함되지 않습니다. 세부 혜택은 플랫폼과 각 기능 출시 시 운영정책에 따라 안내됩니다.";
