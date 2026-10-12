import type { IconName } from "@/components/ui/Icon";
import {
  ALL_IN_ONE,
  ALLOWANCE,
  ENTRY_BUILD,
  spoken,
  INTEGRATION_OPTION,
  manwon,
  monthly,
  SUBSCRIPTIONS,
  TRIAL,
  WEBSITE,
  WEBSITE_OPERATION,
  won,
} from "@/lib/pricing";
import { DEMO_COMPANY, SITE_NAME } from "@/lib/site";

/**
 * Copy for the three feature pages: AI 마케팅, AI 상담, AI 스마트 홈페이지. Each page says how its product
 * works with the product's own screens, where it works today, and what it needs — in that order,
 * and only what was checked against the product. Amounts, "today / not yet" and the trial policy
 * come from lib/pricing.ts.
 * What is left out on purpose: design presets and per-customer design editing (not built), an
 * owner's own homepage address (not supported by the build yet), alerts for a new request (the
 * product does not send them reliably), and any count of videos or answers a month (not decided).
 */

const [MARKETING, CONSULTATION, BUNDLE] = SUBSCRIPTIONS;

interface Step {
  title: string;
  text: string;
}
interface Point {
  icon: IconName;
  title: string;
  text: string;
}
interface Question {
  q: string;
  a: string;
}

// ---------------------------------------------------------------- AI 마케팅

export const MARKETING_PAGE = {
  /** From photos to a registered 시공사례, in the order the owner does it. */
  inputSteps: [
    { title: "사진을 올리고 순서를 정합니다", text: "시공사진을 올리고, 보여주고 싶은 순서로 놓습니다. 영상은 사진 두 장부터 만들 수 있습니다." },
    { title: "아는 만큼 적습니다", text: "지역 · 평수 · 공사 내용을 메모하듯 적습니다. 문장으로 다듬지 않아도 됩니다." },
    { title: "AI가 채운 내용을 확인합니다", text: "제목 · 소개 · 본문과 지역 · 면적 · 공사 범위를 AI가 채웁니다. 적지 않은 사실은 지어내지 않도록 만들었고, 다른 곳은 바로 고칩니다." },
  ] satisfies readonly Step[],

  /** What the owner does to get a reel: pick, and take the result. */
  reelSteps: [
    { title: "영상 방식과 스타일을 고릅니다", text: "완공 쇼케이스, Before → After 같은 영상 방식과 스타일 · 속도를 선택합니다. 편집 프로그램은 필요 없습니다." },
    { title: "완성된 영상을 내려받습니다", text: "[마케팅 콘텐츠 만들기]를 누르고 잠시 기다리면 세로 영상(MP4)이 준비됩니다. 영상에는 소리가 들어가지 않습니다." },
  ] satisfies readonly Step[],

  /** What arrives with the video. */
  posts: [
    { icon: "gallery", title: "표지 이미지", text: "영상의 첫 화면으로 쓰는 세로 이미지. 시공사진 위에 제목이 놓입니다." },
    { icon: "chat", title: "인스타그램 본문 · 해시태그", text: "영상과 함께 올릴 소개 글과 해시태그. 복사 버튼으로 가져갑니다." },
    { icon: "form", title: "유튜브 쇼츠 제목 · 설명", text: "쇼츠에 붙일 제목과 설명, 해시태그." },
  ] satisfies readonly Point[],

  blogPoints: ["제목 · 도입 · 소제목 · 본문까지 뼈대가 잡힌 초안", "공간별 설명과 사진이 놓일 자리", "글은 전체 복사 한 번으로 블로그에 붙여 넣기"],
  blogNote: "AI가 쓴 초안입니다. 올리기 전에 내용을 확인하고, 블로그에는 대표님이 올립니다. 사진은 초안에 표시된 자리에 직접 넣습니다.",

  /** Where it works today, in full. The short form is the price list's availability. */
  scope: {
    now: `지금은 ${SITE_NAME}로 만든 홈페이지에 시공사례를 등록한 상태에서, 그 사진으로 영상과 글을 만듭니다. 시공사례를 홈페이지에 게시하지 않고 저장만 해 두어도 만들 수 있습니다.`,
    later: `홈페이지가 없어도 ${MARKETING.name}만 가입해 쓰는 방식을 출시할 예정입니다. 출시 전까지는 홈페이지와 함께 이용합니다.`,
    posting: "어느 경우에도 인스타그램 · 유튜브 · 블로그에 대신 올려 주는 기능은 없습니다. 영상은 내려받고 글은 복사해서, 대표님이 직접 올립니다.",
  },

  faq: [
    {
      q: "영상은 어떤 사진으로 만들어지나요?",
      a: "등록한 시공사례의 사진으로 만듭니다. 사진 두 장부터 만들 수 있고, 올린 순서와 고른 영상 방식에 따라 장면이 구성됩니다. 이 페이지의 샘플 두 편은 제품이 데모 시공사례의 사진으로 만든 그대로입니다.",
    },
    {
      q: "영상에 음악이나 목소리가 들어가나요?",
      a: "아니요. 영상에는 소리가 들어가지 않습니다. 음악은 인스타그램 · 유튜브에 올릴 때 각 앱에서 고를 수 있습니다.",
    },
    {
      q: "인스타그램 · 유튜브 · 블로그에 자동으로 올라가나요?",
      a: `아니요. 자동으로 게시되지는 않습니다. 영상은 MP4 파일로 내려받고 글은 복사해서, 대표님이 원하는 채널에 직접 올립니다. ${SITE_NAME}는 올릴 영상과 글을 준비하는 데까지 돕습니다.`,
    },
    {
      q: `홈페이지 없이 ${MARKETING.name}만 쓸 수 있나요?`,
      a: `아직은 아닙니다. 지금은 ${SITE_NAME}로 만든 홈페이지와 함께 이용하며, 홈페이지 없이 따로 쓰는 방식은 출시 예정입니다. 홈페이지가 없다면 ${ENTRY_BUILD.name}(${spoken(ENTRY_BUILD)})로 함께 시작할 수 있습니다.`,
    },
    {
      q: "한 달에 몇 편까지 만들 수 있나요?",
      a: ALLOWANCE.marketing,
    },
    {
      q: "무료 체험은 언제부터 가능한가요?",
      a: `${TRIAL.title}은 카드 결제와 함께 출시할 예정이며, 날짜는 정해지지 않았습니다. ${TRIAL.notice}`,
    },
  ] satisfies readonly Question[],
} as const;

// ---------------------------------------------------------------- AI 상담

export const CONSULTATION_PAGE = {
  /** What the answers are made from: the product's 상담 자료 screen, and 사업 정보 for the company's basic facts. */
  sources: [
    { icon: "book", title: "업체 기본정보", text: "상호 · 지역 · 공사 분야 · 운영 시간처럼 늘 같은 답이 필요한 정보." },
    { icon: "form", title: "자주 묻는 질문", text: "방문자가 자주 묻는 질문과 우리 업체의 답을 적어 둡니다." },
    { icon: "sliders", title: "직접 적은 안내", text: "A/S 기준, 상담 가능한 지역처럼 따로 알려 두고 싶은 내용." },
    { icon: "window", title: "홈페이지 내용", text: "홈페이지 주소를 넣으면 그 내용을 읽어 답변에 씁니다." },
  ] satisfies readonly Point[],
  sourcesNote: "답변은 등록한 내용을 바탕으로 하므로, 등록한 만큼 답할 수 있습니다. 견적 금액과 공사 일정은 AI가 정하지 않습니다.",

  /** 시공사례 추천: what it takes, and what happens without it. */
  cases: {
    needs: `추천에 쓰이는 것은 ${SITE_NAME} 홈페이지에 게시한 시공사례입니다. 평형과 공사 범위가 비슷한 사례를 카드로 보여주고, 상담창 안에서 사진을 넘겨 볼 수 있습니다.`,
    none: "게시한 시공사례가 없으면 추천하지 않습니다. 없는 사례를 만들어 보여주지 않고, 등록된 사례가 없다고 답합니다.",
    existing: "기존 홈페이지의 시공사례를 카드로 추천하는 기능은 현재 지원하지 않습니다. 기존 홈페이지에서는 업체 정보와 자주 묻는 질문을 바탕으로 한 상담과 견적 문의 접수를 이용합니다.",
  },

  /** What one inquiry asks for, as the chat's form has it. */
  inquiryFields: ["이름", "연락처", "문의 내용", "개인정보 수집 · 이용 동의"],
  inquiryNote: "문의는 방문자가 직접 남길 때만 접수됩니다. 상담 기록은 30일, 문의는 접수 후 90일 동안 보관된 뒤 삭제됩니다.",

  /** Connecting it to a homepage the owner already has. No number of days: none is fixed. */
  installSteps: [
    { title: "홈페이지 주소를 보내주세요", text: "지금 홈페이지에 상담창을 설치할 수 있는지 먼저 확인합니다." },
    { title: "상담창을 설치합니다", text: "홈페이지에 설치 코드 한 줄을 넣으면 화면 오른쪽 아래에 상담 버튼이 생깁니다. 디자인과 구성은 그대로입니다." },
    { title: "업체 정보와 자주 묻는 질문을 등록합니다", text: "AI가 답할 내용을 관리 화면의 ‘사업 정보’와 ‘상담 자료’에 넣습니다. 등록한 만큼 답할 수 있습니다." },
    { title: "문의가 들어오는지 점검하고 엽니다", text: "휴대폰을 포함해 상담과 견적 문의가 실제로 작동하는지 확인한 뒤 오픈합니다." },
  ] satisfies readonly Step[],
  installPrice: `이 작업을 저희가 진행하는 상품이 ${INTEGRATION_OPTION.name}(${won(INTEGRATION_OPTION.price)}원, 1회)입니다. ${SITE_NAME}로 만든 홈페이지는 상담창이 연결된 상태로 제작됩니다.`,

  faq: [
    {
      q: "기존 홈페이지에도 설치할 수 있나요?",
      a: `네. 홈페이지에 설치 코드를 넣을 수 있고, 보안 연결(주소가 https로 시작)을 쓰는 홈페이지라면 상담창을 붙일 수 있습니다. 홈페이지 주소를 보내주시면 설치할 수 있는지 먼저 확인합니다. ${INTEGRATION_OPTION.name}(${manwon(INTEGRATION_OPTION.price)}만원, 1회)은 설치와 초기 세팅을 저희가 진행하는 상품입니다.`,
    },
    {
      q: "시공사례 추천은 누구나 쓸 수 있나요?",
      a: `${SITE_NAME}로 만든 홈페이지에 시공사례를 게시한 경우에 쓸 수 있습니다. 기존 홈페이지에서는 현재 지원하지 않으며, 게시한 시공사례가 없으면 추천 대신 등록된 사례가 없다고 답합니다.`,
    },
    {
      q: "AI가 틀린 답을 하면 어떻게 하나요?",
      a: "AI는 등록한 업체 정보와 자주 묻는 질문을 바탕으로 답합니다. 답이 마음에 들지 않으면 관리 화면의 ‘사업 정보’와 ‘상담 자료’에서 내용을 고치거나 더하면 됩니다. 상담 기록은 관리 화면에서 확인할 수 있습니다.",
    },
    {
      q: "견적 금액도 AI가 알려주나요?",
      a: "아니요. 견적 금액과 공사 일정은 AI가 정하지 않습니다. 방문자가 남긴 조건과 연락처를 정리해 두고, 금액과 일정은 대표님이 직접 상담해 정합니다.",
    },
    {
      q: "새 문의가 들어오면 어떻게 알 수 있나요?",
      a: `${SITE_NAME} 관리 화면의 ‘상담 요청’에서 확인합니다. 문의마다 연락처와 문의 내용, 그 문의가 나온 상담 기록을 함께 볼 수 있습니다. 지금은 관리 화면에 들어와 확인하는 방식입니다.`,
    },
    {
      q: "한 달에 상담할 수 있는 건수가 정해져 있나요?",
      a: ALLOWANCE.consultation,
    },
  ] satisfies readonly Question[],
} as const;

// ---------------------------------------------------------------- AI 스마트 홈페이지

export const WEBSITE_PAGE = {
  /** The pages a homepage made here has. Each one is on the demo homepage. */
  pages: ["홈", "시공사례 목록", "시공사례 상세", "업체 소개", "견적 문의"],
  demoNote: `가상 인테리어 업체 ‘${DEMO_COMPANY}’를 기준으로 만든 예시 사이트입니다. 버튼을 눌러 직접 둘러볼 수 있습니다. 제작되는 홈페이지의 디자인은 이 예시와 다를 수 있습니다.`,

  /** From photos to a 시공사례 on the homepage, in the order the owner does it. */
  caseSteps: [
    { title: "사진을 올리고 아는 만큼 적습니다", text: "관리 화면에서 시공사진을 올리고 지역 · 평수 · 공사 내용을 적습니다." },
    { title: "내용을 확인하고 고칩니다", text: "홈페이지에 보일 모습을 미리 확인하고, 다른 곳은 바로 수정합니다." },
    { title: "홈페이지에 게시합니다", text: "게시하면 홈페이지의 시공사례 목록에 실립니다. 게시한 뒤에도 고치거나 내릴 수 있습니다." },
  ] satisfies readonly Step[],

  /** What a visitor can do with the 시공사례. Read off the demo homepage. */
  search: [
    { icon: "search", title: "조건으로 찾기", text: "제목 · 지역 · 키워드 검색과 공사 유형 · 평형 · 스타일 · 평당 공사비 조건, 정렬." },
    { icon: "gallery", title: "공간별로 보기", text: "거실 · 주방 · 욕실처럼 공간별로 사진을 모아 보고, 크게 넘겨 봅니다." },
    { icon: "layers", title: "공사 정보 한눈에", text: "지역 · 면적 · 공사 유형 같은 정보가 사진과 함께 정리됩니다." },
  ] satisfies readonly Point[],

  inquiry: `홈페이지의 견적 문의 양식으로 들어온 문의는 ${SITE_NAME} 관리 화면의 ‘상담 요청’에 모입니다. ${CONSULTATION.name}을 함께 쓰면 상담창에서 남긴 문의도 같은 곳에 들어옵니다.`,

  /** How a build goes, and who does each step. No number of days: none is fixed. */
  buildSteps: [
    { by: "owner", title: "업체 정보와 시공사진을 보내주세요" },
    { by: "us", title: "구축 방식과 범위를 확인해 안내합니다" },
    { by: "us", title: "홈페이지를 만들고 시공사례를 넣습니다" },
    { by: "owner", title: "화면을 확인하고 수정할 곳을 알려주세요" },
    { by: "us", title: "문의가 들어오는지 점검한 뒤 오픈합니다" },
  ] as readonly { by: "owner" | "us"; title: string }[],

  /** What the page does not offer yet, said before it is asked. */
  limits: [
    "지금 제작하는 홈페이지는 인테리어 업체에 맞춰 준비된 기본 구성과 디자인으로 만듭니다. 업체명과 연락처, 게시한 시공사례가 업체 것으로 들어갑니다. 소개 문구와 대표 이미지를 업체에 맞게 바꾸는 범위는 제작 전에 안내드립니다.",
    "색상 · 로고 · 첫 화면 구성을 업체가 고르거나 바꾸는 기능은 아직 제공하지 않습니다. 브랜드와 구성부터 새로 설계하려면 맞춤 홈페이지 제작으로 안내드립니다.",
  ],

  faq: [
    {
      // The name could be read as AI making the homepage: the first answer says who makes it.
      q: `${WEBSITE.name}는 AI가 홈페이지를 만들어 주는 건가요?`,
      a: `아니요. ${WEBSITE.made} ${WEBSITE.name}는 ${SITE_NAME}가 제작하는 인테리어 업체 홈페이지의 이름으로, 제작한 홈페이지에 ${CONSULTATION.name}과 ${MARKETING.name}을 월 구독으로 더해 쓸 수 있다는 뜻입니다. 두 기능은 구독할 때만 이용하며, 홈페이지만 만들 수도 있습니다.`,
    },
    {
      q: "홈페이지를 만들면 매달 내는 비용이 있나요?",
      a: `${WEBSITE_OPERATION.text} ${WEBSITE_OPERATION.separate}`,
    },
    {
      q: "홈페이지 주소는 어떻게 되나요?",
      a: "제작한 홈페이지에는 기본 주소가 함께 제공됩니다. 이미 쓰고 계신 주소나 새로 구매한 주소를 연결하는 것은 지금 기본 제공 범위가 아니며, 가능한지는 상담에서 먼저 확인해 안내드립니다. 주소의 구매 · 갱신 비용은 제작비에 포함되지 않습니다.",
    },
    {
      q: "시공사례는 얼마나 올릴 수 있나요?",
      a: "올릴 수 있는 건수의 기준은 계약 전에 먼저 안내드립니다. 시공사례는 관리 화면에서 사진을 올리고 내용을 확인해 게시하며, 게시한 뒤에도 고치거나 내릴 수 있습니다.",
    },
    {
      q: "디자인을 우리 업체에 맞게 바꿀 수 있나요?",
      a: `${ENTRY_BUILD.name}는 준비된 기본 구성과 디자인에 업체명 · 연락처 · 시공사례를 넣어 만듭니다. 소개 문구와 대표 이미지를 바꾸는 범위는 제작 전에 안내드립니다. 색상이나 첫 화면 구성을 고르는 기능은 아직 제공하지 않습니다. 브랜드에 맞춘 디자인이 필요하면 맞춤 홈페이지 제작으로 범위와 비용을 먼저 안내드립니다.`,
    },
    {
      q: `${MARKETING.name}과 ${CONSULTATION.name}은 꼭 함께 써야 하나요?`,
      a: `아니요. 홈페이지만 만들 수도 있습니다. ${MARKETING.name}(${monthly(MARKETING)})과 ${CONSULTATION.name}(${monthly(CONSULTATION)}), 둘을 함께 쓰는 ${BUNDLE.name}(${monthly(BUNDLE)})은 필요할 때 월 구독으로 추가합니다.`,
    },
    {
      q: "지금 쓰는 홈페이지를 그대로 두고 싶어요.",
      a: `그렇다면 새로 만들 필요가 없습니다. ${INTEGRATION_OPTION.name}(${manwon(INTEGRATION_OPTION.price)}만원, 1회)으로 지금 홈페이지에 ${CONSULTATION.name}을 연결할 수 있습니다.`,
    },
  ] satisfies readonly Question[],
} as const;

/** "개별 구독 합계보다 월 9,900원 절약" — on the two subscription pages, where 올인원 is offered next to the price. */
export const BUNDLE_OFFER = `${MARKETING.name}과 ${CONSULTATION.name}을 함께 쓰면 ${BUNDLE.name} ${monthly(BUNDLE)}. 따로 구독할 때보다 월 ${won(ALL_IN_ONE.saving)}원이 적습니다.`;
