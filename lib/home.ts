import type { IconName } from "@/components/ui/Icon";
import {
  ALL_IN_ONE,
  ENTRY_BUILD,
  spoken,
  INTEGRATION_OPTION,
  manwon,
  monthly,
  SUBSCRIPTIONS,
  TRIAL,
  VAT_SHORT,
  WEBSITE,
  WEBSITE_OPERATION,
  won,
} from "@/lib/pricing";
import { SITE_NAME } from "@/lib/site";

/**
 * Copy for the landing that is not a price: what each product gives an owner, in a few lines each,
 * and the questions asked first. The landing only introduces; how each product works is on its own
 * page. Every amount, every "today / not yet" and the trial policy are read from lib/pricing.ts.
 * Nothing here states a result, a customer count or a delivery time: none is measured or decided.
 * Nothing here says a post goes up by itself either: the product makes the video and the text, and
 * the owner uploads them.
 */

const [MARKETING, CONSULTATION, BUNDLE] = SUBSCRIPTIONS;

/** "49만원부터" — what a homepage build starts at: the lowest of the options that build one. */
export const BUILD_FROM = `${manwon(ENTRY_BUILD.price)}만원부터`;

/** Under the hero's buttons: the three monthly prices and what a homepage build starts at, as the price list has them. */
export const ENTRY_PRICE = [...SUBSCRIPTIONS.map((item) => `${item.name} ${monthly(item)}`), `${WEBSITE.name} ${BUILD_FROM}`, VAT_SHORT] as const;

/**
 * 02 — what each product leaves in the owner's hands. Named, never counted: reels and shorts take
 * the same one video, so a number here would count it twice.
 */
export const PRODUCT_RESULTS: Readonly<Record<"marketing" | "consultation" | "website" | "all-in-one", readonly string[]>> = {
  marketing: ["릴스 · 쇼츠용 세로 영상", "표지 이미지", "게시글 · 해시태그", "블로그 초안"],
  consultation: ["방문자 질문에 AI 응대", "견적 문의 접수", "관리 화면에서 문의 확인"],
  website: ["시공사례 중심 홈페이지", "조건 검색", "견적 문의 양식"],
  "all-in-one": [`${MARKETING.name} 전체`, `${CONSULTATION.name} 전체`],
};

/** 03 — AI 마케팅 in three steps: what the owner does, and what the product does with it. */
export const MARKETING_STEPS: readonly { title: string; text: string }[] = [
  { title: "시공사진을 올리고 아는 만큼 적습니다", text: "지역 · 평수 · 공사 내용을 메모하듯 적으면 됩니다." },
  { title: "AI가 시공사례로 정리합니다", text: "제목 · 소개 · 본문과 공사 정보를 채웁니다. 적지 않은 사실은 지어내지 않도록 만들었습니다." },
  { title: "영상과 글이 함께 준비됩니다", text: "[마케팅 콘텐츠 만들기]를 누르면 세로 영상과 표지 이미지, 채널별 글이 만들어집니다." },
];

/**
 * 04 — the two reels the product made from the demo 시공사례, as they came out. `facts` are read off the
 * product's own result screen (photo count) and the files (length).
 */
export const REEL_SAMPLES = {
  showcase: { title: "완공 쇼케이스", facts: "사진 13장 → 32초 영상" },
  beforeAfter: { title: "Before → After", facts: "사진 6장 → 약 14초 영상" },
} as const;

/** 04 — how a finished video leaves the product. The product posts nothing by itself. */
export const REEL_TAKE = "완성된 영상은 MP4 파일로 내려받아 인스타그램 릴스 · 유튜브 쇼츠에 직접 올립니다. 영상에는 소리가 들어가지 않습니다.";

/** 05 — what comes with the video, and what the blog draft already has when it arrives. */
export const POST_KINDS: readonly { icon: IconName; title: string; text: string }[] = [
  { icon: "chat", title: "인스타그램 본문 · 해시태그", text: "영상과 함께 올릴 소개 글" },
  { icon: "form", title: "유튜브 쇼츠 제목 · 설명", text: "쇼츠에 붙일 제목과 설명" },
  { icon: "book", title: "네이버 블로그 초안", text: "제목 · 소제목 · 본문과 사진 자리가 잡힌 글" },
];
export const POST_TAKE = "AI가 쓴 초안입니다. 읽어보고 다듬은 뒤, 복사해서 원하는 채널에 직접 올립니다.";

/**
 * 06 — the consultation in four steps: three the visitor takes, one on the owner's side. The ids are
 * anchors the landing has carried since V3.
 */
export const HOW_STEPS: readonly { id: string; title: string; text: string }[] = [
  {
    id: "talk",
    title: "방문자가 원하는 공사를 말합니다",
    text: "상담창에서 지역 · 평수 · 공사 범위를 평소 말투로 묻습니다.",
  },
  {
    id: "recommend",
    title: "AI가 우리 업체 정보로 답합니다",
    text: `등록한 업체 정보와 자주 묻는 질문으로 답하고, ${SITE_NAME} 홈페이지에 게시한 시공사례가 있으면 비슷한 사례를 카드로 추천합니다.`,
  },
  {
    id: "inquiry",
    title: "상담창 안에서 견적 문의를 남깁니다",
    text: "다른 페이지로 옮겨 가지 않고, 상담창 안에서 이름 · 연락처 · 문의 내용을 남깁니다.",
  },
  {
    id: "owner",
    title: "대표님은 들어온 문의를 확인합니다",
    text: "연락처와 문의 내용이 그 문의가 나온 상담 기록과 함께 관리 화면의 ‘상담 요청’에 들어옵니다.",
  },
];

/** 07 — what a homepage made here has. Each line is on the demo homepage, which the section links to. */
export const WEBSITE_POINTS = [
  "시공사례 목록과 상세 화면",
  "공사 유형 · 평형 · 스타일로 찾는 조건 검색",
  "휴대폰에서도 보기 편한 화면",
  "견적 문의 양식",
] as const;

/** 08 — how the two subscriptions feed each other, in the order it happens. */
export const BUNDLE_FLOW: readonly { icon: IconName; by: string; title: string }[] = [
  { icon: "gallery", by: "대표님", title: "시공사진을 올립니다" },
  { icon: "video", by: MARKETING.name, title: "영상과 글이 준비됩니다" },
  { icon: "window", by: "방문자", title: "콘텐츠를 보고 홈페이지에 옵니다" },
  { icon: "chat", by: CONSULTATION.name, title: "질문에 답하고 견적 문의를 받습니다" },
];

/** "개별 구독 합계 월 49,500원보다 월 9,900원 절약" — computed from the price list. */
export const BUNDLE_SAVING = `개별 구독 합계 월 ${won(ALL_IN_ONE.separate)}원보다 월 ${won(ALL_IN_ONE.saving)}원 절약`;

/**
 * 11 — the questions asked before a decision, answered only with what the product does today and
 * what the price list already says. The one about posting is answered with a plain no: the product
 * prepares the content, it does not upload it. The one about the trial repeats the price list's own
 * notice, so it cannot promise more than that.
 */
export const HOME_FAQ: readonly { q: string; a: string }[] = [
  {
    q: `${MARKETING.name}, ${CONSULTATION.name}, ${BUNDLE.name}은 어떻게 다른가요?`,
    a: `${MARKETING.name}(${monthly(MARKETING)})은 시공사진으로 릴스 · 쇼츠 영상과 게시글, 블로그 초안을 만듭니다. ${CONSULTATION.name}(${monthly(CONSULTATION)})은 홈페이지 방문자의 질문에 답하고 견적 문의를 받아 둡니다. ${BUNDLE.name}(${monthly(BUNDLE)})은 두 가지를 함께 쓰는 구독으로, 따로 구독할 때보다 월 ${won(ALL_IN_ONE.saving)}원이 적습니다.`,
  },
  {
    q: "홈페이지가 없어도 시작할 수 있나요?",
    a: `지금은 ${MARKETING.name}과 ${CONSULTATION.name} 모두 홈페이지와 함께 이용합니다. 홈페이지가 없다면 ${ENTRY_BUILD.name}(${spoken(ENTRY_BUILD)})로 새 홈페이지를 만들면서 시작할 수 있습니다. 홈페이지 없이 ${MARKETING.name}만 따로 쓰는 방식은 출시 예정입니다.`,
  },
  {
    q: "기존 홈페이지에도 적용할 수 있나요?",
    a: `${CONSULTATION.name}은 적용할 수 있습니다. ${INTEGRATION_OPTION.name}(${manwon(INTEGRATION_OPTION.price)}만원, 1회)으로 지금 홈페이지의 디자인과 구성은 그대로 두고 상담창을 설치합니다. 다만 시공사례를 카드로 추천하는 기능과 ${MARKETING.name}은 ${SITE_NAME}로 만든 홈페이지에서 제공하며, 기존 홈페이지에서는 현재 지원하지 않습니다. 홈페이지 주소를 보내주시면 가능한 범위를 먼저 안내드립니다.`,
  },
  {
    q: `${BUNDLE.name}에 홈페이지 제작도 포함되나요?`,
    a: `아니요. ${BUNDLE.name}은 ${MARKETING.name}과 ${CONSULTATION.name}을 함께 쓰는 월 구독이며, 홈페이지 신규 제작은 포함되지 않습니다. 홈페이지가 필요하면 제작비는 별도입니다.`,
  },
  {
    q: "홈페이지를 만들면 매달 내는 비용이 있나요?",
    a: `${WEBSITE_OPERATION.text} ${WEBSITE_OPERATION.separate} ${WEBSITE_OPERATION.addOn}`,
  },
  {
    q: "인스타그램 · 유튜브 · 블로그에 자동으로 올라가나요?",
    a: `아니요. 자동으로 게시되지는 않습니다. 영상은 MP4 파일로 내려받고 글은 복사해서, 대표님이 원하는 채널에 직접 올립니다. ${SITE_NAME}는 올릴 영상과 글을 준비하는 데까지 돕습니다.`,
  },
  {
    q: "무료로 써볼 수 있나요?",
    a: `${TRIAL.title}을 도입할 예정입니다. ${TRIAL.notice} 지금 바로 확인하고 싶다면, 가입 없이 열리는 실제 데모에서 방문자가 되어 AI 상담을 써볼 수 있습니다.`,
  },
  {
    q: "AI 상담은 견적 금액도 알려주나요?",
    a: "아니요. 견적 금액과 공사 일정은 AI가 정하지 않습니다. AI 상담은 등록한 업체 정보로 질문에 답하고, 방문자가 남긴 조건과 연락처를 정리해 둡니다. 금액과 일정은 대표님이 문의를 확인한 뒤 직접 상담해 정합니다.",
  },
  {
    q: "문의는 어디에서 확인하나요?",
    a: `${SITE_NAME} 관리 화면의 ‘상담 요청’에서 확인합니다. AI 상담에서 남긴 견적 문의가 들어오고, 그 문의가 나온 상담 기록도 함께 볼 수 있습니다. 지금은 관리 화면에 들어와 확인하는 방식입니다. 상담 기록은 30일, 문의는 접수 후 90일 동안 보관된 뒤 삭제됩니다.`,
  },
  {
    q: "시작하려면 어떻게 하나요?",
    a: "카카오톡으로 업체명과 홈페이지 주소(있다면)를 보내주세요. 현재 상황을 확인한 뒤 맞는 상품과 비용을 안내드립니다. 지금은 이 사이트에서 결제하지 않습니다.",
  },
];

/**
 * What every screen on the landing is, said once in full next to the film that shows them all: real
 * product screens, edited; the two sample reels as the product made them; and a made-up company
 * whose cases, requests and photos are examples.
 */
export const SCREENS_NOTE =
  "이 페이지의 제품 화면은 작동하는 제품을 촬영해 편집했고, 샘플 영상 두 편은 제품이 만든 그대로입니다. 화면 속 업체와 시공사례, 문의는 데모용 예시이고, 사진은 AI로 만든 예시 이미지입니다.";
