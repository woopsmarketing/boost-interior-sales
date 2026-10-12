import type { IconName } from "@/components/ui/Icon";
import {
  ALL_IN_ONE,
  ALLOWANCE_NOTE,
  BASIC_CONNECTIONS_SHORT,
  CONSULT_SETUP,
  monthly,
  SETUP_OPTIONS,
  spoken,
  SUBSCRIBE_NOTE,
  SUBSCRIPTIONS,
  TRIAL,
  WEBSITE_OPERATION,
  won,
} from "@/lib/pricing";

/**
 * Copy for the two pricing pages that is not a price. /pricing: what holds whichever product is
 * picked. /pricing/details: what 기존 홈페이지 연동 is, what Quick Start is, and the questions an owner
 * asks before paying. Prices, features, conditions and the trial policy come from lib/pricing.ts.
 * Contract length, cancellation after the trial and refunds are not decided, so no answer here
 * implies one.
 */

const [MARKETING, CONSULTATION, BUNDLE] = SUBSCRIPTIONS;
const [INTEGRATION, QUICK, IMPROVEMENT] = SETUP_OPTIONS;

/** /pricing: what is the same whichever product an owner picks. */
export const ASSURANCES: readonly { icon: IconName; title: string; text: string }[] = [
  {
    icon: "ticket",
    title: "표시 가격은 부가세 포함",
    text: "월 이용료와 홈페이지 제작비 모두 부가세(VAT)가 포함된 금액입니다. ‘부터’로 적힌 상품은 범위를 확인한 뒤 금액을 먼저 안내드립니다.",
  },
  {
    icon: "window",
    title: WEBSITE_OPERATION.label,
    text: `${WEBSITE_OPERATION.text} 홈페이지를 만들었다고 월 구독이 따라붙지 않습니다.`,
  },
  {
    icon: "layers",
    title: "필요한 것만 구독",
    text: `${MARKETING.name}과 ${CONSULTATION.name}은 따로 구독할 수 있고, 둘 다 필요하면 ${BUNDLE.name}이 월 ${won(ALL_IN_ONE.saving)}원 적습니다.`,
  },
  {
    icon: "chat",
    title: "시작은 문의로",
    text: SUBSCRIBE_NOTE,
  },
];

/** What 기존 홈페이지 연동 is, said before its price is misread as a homepage build. */
export const INTEGRATION_VALUE = {
  title: `${INTEGRATION.name}은 새 홈페이지를 만드는 상품이 아닙니다.`,
  text: `지금 홈페이지는 그대로 두고 ${CONSULTATION.name}을 연결하는 한 번의 작업입니다. 홈페이지 작업 없이 아래 ${CONSULT_SETUP}만 진행합니다.`,
} as const;

/** Quick Start — what the new homepage gives the customer, in their words. Six, so the grid stays 3 × 2. */
export const QUICK_FEATURES: readonly { icon: IconName; label: string; text: string }[] = [
  { icon: "phone", label: "휴대폰에서도 편하게", text: "휴대폰 · 태블릿에서도 보기 편한 화면" },
  { icon: "gallery", label: "시공사례 구성", text: "목록 · 상세 화면과 기존 공개 사례 이전" },
  { icon: "search", label: "조건 검색", text: "공사 유형 · 평형 · 스타일로 찾기" },
  { icon: "form", label: "견적 문의 양식", text: "상담과 견적 문의로 이어지는 동선" },
  { icon: "chat", label: `${CONSULTATION.name} 연결`, text: "구독하면 바로 쓸 수 있는 상담창" },
  { icon: "video", label: `${MARKETING.name} 연결`, text: "구독하면 시공사례로 영상과 글 만들기" },
];

/**
 * Quick Start: the example site. It is a demo built for a made-up interior company, not a customer's
 * homepage, and the copy must never call it a customer case.
 */
export const QUICK_EXAMPLE = {
  title: `${QUICK.name} 예시 사이트`,
  text: "실제 화면과 견적 문의, AI 상담을 직접 확인해보세요.",
  note: "가상 인테리어 업체를 기준으로 만든 예시 사이트입니다. 제작되는 홈페이지의 디자인은 이 예시와 다를 수 있습니다.",
  cta: `${QUICK.name} 예시 보기`,
} as const;

/** Quick Start: who it is for — a quick start with a new homepage, not a cut-down one. */
export const QUICK_VALUE = {
  title: "시공사례가 중심인 새 홈페이지를 빠르게 시작하세요.",
  text: "새 홈페이지가 필요하고, 복잡한 제작 과정 없이 빠르게 시작하고 싶은 업체를 위한 상품입니다. 인테리어 업체에 필요한 기본 기능을 갖춘 홈페이지를 빠르게 제작합니다.",
} as const;

/** Quick Start vs 기존 홈페이지 맞춤 개선 — the one comparison owners get stuck on. */
export const QUICK_VS_IMPROVEMENT = {
  question: `새 홈페이지가 ${spoken(QUICK)}인데, 기존 홈페이지 개선은 왜 ${spoken(IMPROVEMENT)}인가요?`,
  quick: {
    name: QUICK.name,
    line: "미리 준비된 구성으로 빠르게 제작",
    text: "인테리어 업체에 필요한 화면과 기능을 미리 준비해 두었기 때문에 제작 과정이 단순하고 빠릅니다. 그래서 합리적인 가격으로 제공할 수 있습니다.",
  },
  improvement: {
    name: IMPROVEMENT.name,
    line: "현재 홈페이지에 맞춰 직접 수정",
    text: "현재 홈페이지의 제작 방식, 디자인, 주소, 내용, 페이지 구성을 유지하면서 업체마다 다른 문제를 하나씩 직접 고쳐야 하므로 맞춤 작업 범위가 커집니다.",
  },
} as const;

/**
 * /pricing/details: the questions asked right before a decision. Each answer is the price list's
 * own words wherever it has them, so a question cannot promise more than the list does.
 */
export const PRICING_FAQ: readonly { q: string; a: string }[] = [
  {
    q: "표시 가격에 부가세가 포함되어 있나요?",
    a: "네. 월 이용료와 홈페이지 제작비 모두 부가세(VAT)가 포함된 최종 금액입니다. 시작 가격(부터)인 상품은 범위를 확인한 뒤 금액을 먼저 안내드립니다.",
  },
  {
    q: "월 구독과 홈페이지 제작비는 어떻게 다른가요?",
    a: `${MARKETING.name} · ${CONSULTATION.name} · ${BUNDLE.name}은 쓰는 동안 매월 내는 구독이고, 홈페이지 제작비는 처음 한 번 내는 비용입니다. 둘은 따로 선택합니다. 홈페이지만 만들 수도 있고, 기존 홈페이지에 ${CONSULTATION.name}만 구독할 수도 있습니다. ${MARKETING.name}은 지금 BoostInterior로 만든 홈페이지와 함께 이용합니다.`,
  },
  {
    q: `${BUNDLE.name}에 홈페이지 제작도 포함되나요?`,
    a: `아니요. ${BUNDLE.name}(${monthly(BUNDLE)})은 ${MARKETING.name}과 ${CONSULTATION.name}을 함께 쓰는 월 구독입니다. 따로 구독하면 월 ${won(ALL_IN_ONE.separate)}원이므로 월 ${won(ALL_IN_ONE.saving)}원이 적습니다. 홈페이지 신규 제작은 포함되지 않으며, 필요하면 제작비는 별도입니다.`,
  },
  {
    q: "홈페이지 기본 운영에 월 이용료가 없다는 것은 무슨 뜻인가요?",
    a: `${WEBSITE_OPERATION.text} ${WEBSITE_OPERATION.separate}`,
  },
  {
    q: `${CONSULTATION.name}만 구독해도 ${INTEGRATION.name}이 필요한가요?`,
    a: `기존 홈페이지에 ${CONSULTATION.name}을 연결하려면 상담창 설치와 업체 정보 · 자주 묻는 질문 등록이 필요합니다. 이 작업을 저희가 진행하는 상품이 ${INTEGRATION.name}(${won(INTEGRATION.price)}원, 1회)입니다. BoostInterior로 만든 홈페이지는 상담창이 연결된 상태로 제작되므로 이 상품이 필요하지 않습니다.`,
  },
  {
    q: `기존 홈페이지에서도 ${MARKETING.name}과 시공사례 추천을 쓸 수 있나요?`,
    a: `지금은 아닙니다. ${MARKETING.name}과 시공사례를 카드로 추천하는 기능은 BoostInterior로 만든 홈페이지에서 제공합니다. 기존 홈페이지에서는 업체 정보와 자주 묻는 질문을 바탕으로 한 ${CONSULTATION.name}과 견적 문의 접수를 이용할 수 있습니다. 홈페이지 없이 ${MARKETING.name}만 따로 쓰는 방식은 출시 예정입니다.`,
  },
  {
    q: "무료 체험은 어떻게 진행되나요?",
    a: `${TRIAL.title}의 출시 예정 정책은 이렇습니다. ${TRIAL.steps.join(" ")} ${TRIAL.cancel} ${TRIAL.notice} ${TRIAL.others}`,
  },
  {
    q: "결제는 어떻게 하나요?",
    a: `${SUBSCRIBE_NOTE} 카드 정기결제는 출시 예정입니다.`,
  },
  {
    q: "한 달에 만들 수 있는 영상이나 상담 건수가 정해져 있나요?",
    a: ALLOWANCE_NOTE,
  },
  {
    q: "카카오톡 · 지도 · 전화 연결도 홈페이지 제작에 포함되나요?",
    a: `네. ${BASIC_CONNECTIONS_SHORT}은 홈페이지를 만들거나 고치는 세 가지 방식에 모두 같은 범위로 포함됩니다. 예약 · 결제처럼 따로 개발해야 하는 연동은 범위를 확인한 뒤 별도 견적을 안내합니다.`,
  },
];
