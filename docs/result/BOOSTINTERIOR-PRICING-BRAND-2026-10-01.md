# BoostInterior 랜딩: 브랜드 분리 + 가격 공개 + Founding Partner

`prompt` (BRAND SEPARATION + PUBLIC PRICING + FOUNDING PARTNER) 결과 보고서, 2026-10-01 KST.
[`BOOSTCHAT-INTERIOR-SALES-HERO-FINAL.md`](./BOOSTCHAT-INTERIOR-SALES-HERO-FINAL.md) 이후 작업이다.
랜딩을 다시 만들지 않았다. Hero 구조, 쇼케이스 회전, 스토리 모션, 86초 영상, 데모/카카오 CTA는 그대로이고,
브랜드 문자열 · 가격 섹션 · 구축 방식 · 초기 파트너 문구만 바뀌었다.

---

## Report

```
TASK = BOOSTINTERIOR BRAND + PRICING UPDATE

CUSTOMER_BRAND = BoostInterior

OLD_CUSTOMER_BRAND_REMOVED = YES  (production HTML · 렌더된 DOM · alt/aria/meta 기준 0건)
                             단, 이 저장소 밖의 세 곳에는 남아 있다 → KNOWN_ISSUES 1~3
                             (86초 영상 엔딩 카드, 라이브 데모 사이트, 이메일용 썸네일)

SETUP_PRICING   = 700000 / 1500000 / 3000000   (기존 홈페이지 연동 / 기존 홈페이지 개선 / 신규 홈페이지 구축)
MONTHLY_PRICING = 88000 / 198000 / 297000      (Core / Growth / Managed)
ANNUAL_PRICING  = NOT PUBLISHED

VAT_POLICY = 표시하지 않음. 저장소에 VAT 포함/별도 근거가 없다.
VAT_DISPLAY_POLICY_REQUIRED = YES   (소유자 결정 필요)

CORE_FEATURES    = 24시간 AI 상담 / 업체 정보 기반 답변 / 상담 전문지식 직접 관리 (관리자 기능) /
                   방문자의 공사 조건 이해 / 관련 시공사례 추천 / 사진 · 포트폴리오 연결 / 상담 내용 기억 /
                   견적 문의 수집 / 상담 기록 확인 / 기본 시스템 운영
GROWTH_FEATURES  = Core 전체 포함 / 방문자 행동 분석 / 방문 페이지 · 클릭 · 체류 · 이탈 흐름 /
                   상담 시작 · 견적 문의 전환 흐름 분석 / 3D Portfolio / 인터랙티브 공간 탐색 /
                   3D Portfolio 프레젠테이션
MANAGED_FEATURES = Growth 전체 포함 / 월 1회 방문 · 상담 데이터 리뷰 / AI 상담 흐름 점검 및 개선 /
                   자주 묻는 질문 · 응답 개선 / 업체 전문 상담지식 업데이트 지원 / 포트폴리오 업데이트 지원 /
                   CTA · 상담 전환 동선 개선 제안 / 월간 개선 포인트 정리 / 우선 지원
                   + "실제 작업 범위는 운영정책과 계약에 따라 정해집니다."

PLANNED_FEATURES = 페이지에서 "예정"으로 표기한 것은 인테리어 플랫폼 입점 혜택(Founding Partner)뿐이다.
                   플랜 기능에는 prompt §24에 따라 "출시 예정 / 준비 중" 배지를 붙이지 않았다.
                   → 아래 "Future-feature truth audit"을 반드시 확인할 것 (3D Portfolio는 데모 사이트에서 아직 "준비 중").

FOUNDING_PARTNER = "Founding Partner · 초기 파트너 모집" / "BoostInterior 초기 파트너를 모집하고 있습니다."
                   혜택 4개(우선 입점 기회, 초기 등록 지원, 기존 포트폴리오 이전 · 세팅 지원, 기본 입점 초기비용 면제)를
                   "플랫폼 출시 시 제공 예정"이라는 텍스트 라벨과 함께 표시.
                   "세부 혜택은 플랫폼 출시 시 운영정책에 따라 안내됩니다." 포함.
                   평생 무료 / 영구 광고 무료 / 최상단 노출 같은 약속 없음. Hero에는 플랫폼 언급 없음.

TYPECHECK = PASS   (next typegen && tsc --noEmit)
LINT      = PASS   (eslint, 0 problems)
BUILD     = PASS   (next build, 9/9 static routes)

GIT_COMMIT = 1e6cba2434645413ce7317127919610c0fc083f5
             feat: reposition landing as BoostInterior with public pricing
             (이 보고서는 뒤따르는 docs 커밋으로 push)
GIT_PUSH   = SUCCESS  (33b6d40..1e6cba2 main -> main, fast-forward, force 없음)
             `prompt` 파일의 로컬 수정은 커밋에 넣지 않았다 (작업 지시문, 랜딩과 무관).

VERCEL = READY  dpl_FCiy1iXuWFFxpiT5XwBymabDYXYT (Production, GitHub 연동 자동 배포, state=success)
         https://boost-interior-sales-irhnd2p3h-vnfm0580s-projects.vercel.app
         public alias가 이 빌드를 제공한다: production HTML의 모든 에셋 URL이 위 dpl id를 달고 있고,
         /opengraph-image.jpg가 로컬 파일과 바이트 단위로 같다.
PRODUCTION_QA = PASS  (6 viewport + reduced motion 2회, 실패 0, public alias 기준)

PRODUCTION_URL =
https://boost-interior-sales.vercel.app
```

---

## Section order (production)

`main > section` id 순서, production DOM에서 읽은 값:

`top` → `problem` → `talk` `recommend` `viewer` `photos` `memory` `inquiry` → `owner` → `mobile` → `demo-video`
→ `compare` → `why` → `install` `install-paths` → `live` → **`pricing`** → `partner` → `contact`

prompt §21의 13단계와 같다. Pricing은 Live Demo와 Founding Partner 사이에 들어갔고, 별도 `/pricing` route는 만들지 않았다.

## Pricing section structure

`components/landing/Pricing.tsx` (server component, 새 dependency 없음), 데이터는 `lib/pricing.ts` 한 곳.

```
도입 비용
구축 방식과 운영 플랜을 각각 선택합니다.
처음 한 번의 구축비와 매월의 운영 플랜으로 나뉩니다. 두 가지는 서로 독립적으로 고를 수 있습니다.

01  어떻게 구축할까요?            홈페이지 상태에 맞는 구축 방식을 선택합니다.
    [A 기존 홈페이지 연동]  초기 구축비 700,000원    업체 전용 상담 시스템 구축
    [B 기존 홈페이지 개선]  초기 구축비 1,500,000원  홈페이지 개선 + BoostInterior
    [C 신규 홈페이지 구축]  초기 구축비 3,000,000원  홈페이지 제작 + BoostInterior

02  어떤 운영이 필요하신가요?      필요한 운영 수준을 선택합니다.
    [Core    · 시스템 사용]       월 88,000원
    [Growth  · 고급 기능]         월 198,000원
    [Managed · 사람이 함께 운영]   월 297,000원

구축 방식과 운영 플랜은 독립적으로 선택할 수 있습니다.
플랜별 세부 제공 범위와 적용 일정은 도입 상담에서 안내해드립니다.
(예시) 기존 홈페이지 연동 + Core · 신규 홈페이지 구축 + Growth

현재 홈페이지를 확인한 뒤 적합한 구축 방식과 운영 플랜을 안내해드립니다.
도입 상담 → 홈페이지 확인 → 구축 방식 확정 → 계약
[내 홈페이지 기준으로 추천받기 →]  → https://open.kakao.com/o/sAS9ebQi (새 창)
```

- 카드 6장을 한꺼번에 놓지 않고 01 / 02 두 단계로 나눴다. 각 카드에 포함 범위 목록이 있다.
- "챗봇 설치비"라고 쓰지 않았다. A 카드의 표기는 "업체 전용 상담 시스템 구축".
- B에는 "전체를 다시 만들어야 하는 경우에는 신규 홈페이지 구축으로 안내해드립니다.", C에는
  "추가 개발이나 특수 기능은 범위에 따라 별도로 협의합니다."가 붙는다.
- Core / Growth / Managed의 차이는 카드 오른쪽 위 텍스트 태그(시스템 사용 / 고급 기능 / 사람이 함께 운영)와
  "Core 전체 포함" / "Growth 전체 포함" 첫 줄로 구분한다. 색으로만 구분하는 정보는 없다.
- 추천 패키지 / 가장 많이 선택 / BEST 표기 없음. 결제 · 구독 버튼 없음. 연간 가격 없음. VAT 문구 없음.
- 가격은 `700,000` 같은 숫자가 한 텍스트 노드로 들어가고 뒤에 `원`이 붙는다. 스크린 리더는
  "초기 구축비 700,000원", "월 88,000원"으로 읽는다.
- 제목 위계: h2(섹션) → h3(01 / 02) → h4(카드). 페이지 전체에 h1 1개, 단계 건너뛰기 0.
- 헤더에 `가격` → `#pricing` 링크 추가. 820px 이하에서는 다른 메뉴는 숨고 `가격`만 로고와 카카오 버튼 사이에 남는다.
- 구축 방식 섹션(`#install-paths`)도 2개 → 3개(A 연동 / B 개선 / C 신규)로 맞췄고, 아래에
  "구축 방식별 비용 보기 →" (`#pricing`) 링크를 달았다. 같은 A/B/C가 가격 카드에 다시 나온다.

## Exact copy changes

| 위치 | 이전 | 이후 |
| --- | --- | --- |
| `<title>` · og:title · twitter:title | BoostChat \| 인테리어 홈페이지 AI 상담 | BoostInterior \| 인테리어 업체를 위한 AI 상담·견적 시스템 |
| description (meta · og · twitter) | 고객 조건에 맞는 시공사례를 추천하고, 사진 상담부터 견적 문의까지 연결하는 인테리어 홈페이지 AI 상담 솔루션. | 인테리어·리모델링 홈페이지 방문자의 조건을 이해하고, 관련 시공사례 추천부터 상담·견적 문의까지 연결하는 AI 상담 시스템. |
| application-name · og:site_name | BoostChat | BoostInterior |
| og:image:alt · twitter:image:alt | BoostChat 인테리어 AI 상담 — … | BoostInterior 인테리어 AI 상담 — … |
| OG / Twitter 이미지 안의 eyebrow | BoostChat | BoostInterior |
| Header 로고 | BoostChat | BoostInterior |
| Header 메뉴 | 작동 방식 · 데모 영상 · 설치 · 실제 데모 | + 가격 |
| Footer | BoostChat | BoostInterior · by BoostWorks |
| Hero eyebrow | BoostChat · 인테리어 · 리모델링 업체를 위한 AI 상담 | BoostInterior · 인테리어 · 리모델링 업체를 위한 AI 상담 |
| 스토리 장면 eyebrow (기본값, 8곳) | BoostChat | BoostInterior |
| 관리 화면 장면 eyebrow | BoostChat · 사업자 관리 화면 | BoostInterior · 사업자 관리 화면 |
| Problem | BoostChat은 이 과정을 하나의 대화 안에서 이어줍니다. | BoostInterior는 이 과정을 … |
| Before / After 열 제목 | BoostChat 적용 | BoostInterior 적용 |
| Why | BoostChat은 새로운 홈페이지를 만드는 것보다 먼저, … | BoostInterior는 새로운 홈페이지를 만드는 것보다 먼저, … |
| 구축 방식 A | 기존 디자인은 그대로 두고 BoostChat만 연결합니다. | 기존 디자인은 그대로 두고 BoostInterior만 연결합니다. |
| 구축 방식 B (신규) | — | 홈페이지를 손봐야 한다면 / 상담과 문의로 이어지는 동선까지 함께 개선합니다. |
| 구축 방식 C (이전 B) | 홈페이지 제작 + BoostChat을 함께 구축할 수 있습니다. | 홈페이지 제작과 BoostInterior를 함께 구축합니다. |
| 쇼케이스 aria-label | BoostChat 실제 상담 화면 — n단계 … / BoostChat 상담 흐름 | BoostInterior 실제 상담 화면 — … / BoostInterior 상담 흐름 |
| 영상 aria-label | BoostChat 실제 작동 영상 (1:26) | BoostInterior 실제 작동 영상 (1:26) |
| 캡처 alt 6개 | … BoostChat 상담창 | … BoostInterior 상담창 |
| Partner eyebrow | 초기 파트너 모집 | Founding Partner · 초기 파트너 모집 |
| Partner 제목 | 첫 도입 업체를 모집하고 있습니다. | BoostInterior 초기 파트너를 모집하고 있습니다. |
| Partner 본문 | 초기 파트너에게는 아래 과정을 함께 진행합니다. + 4단계 (홈페이지 확인 → … → 설치) | BoostInterior 초기 도입 업체에는 향후 인테리어 플랫폼 출시 시 우선 입점과 초기 등록 · 세팅 혜택을 제공할 예정입니다. + 혜택 4개 + 운영정책 안내 문구 |

Hero 헤드라인 · 서브카피 · CTA 3개, 데모 영상 섹션, Live Demo, Contact 카피는 그대로다.
Partner의 이전 4단계(홈페이지 확인 → 포트폴리오 연동 → 상담창 세팅 → 설치)는 가격 카드 A의 포함 범위와
겹쳐서 뺐다.

내부 식별자는 건드리지 않았다. 이 저장소는 BoostChat API를 호출하지 않으므로 env · route · integration
이름 중 바꿀 것도, 지켜야 할 것도 없었다. 제품명은 `lib/site.ts`의 `SITE_NAME` 하나에서 나온다.

## Brand grep evidence

`curl https://boost-interior-sales.vercel.app/` (322,900 bytes, RSC payload 포함):

```
'BoostChat' = 0     'BoostChat Interior' = 0     'boostchat' = 0     'BOOSTCHAT' = 0
대소문자 무시 /boost ?chat/ = 0
'BoostInterior' = 88
```

렌더된 DOM에서도 0: `outerHTML`, `innerText`, 모든 `alt` / `aria-label` / `title` / `content` 속성,
`document.title` (8회 실행 전부).
소스: `grep -rni boostchat app components lib` = 0건.
남아 있는 곳은 `docs/result/BOOSTCHAT-*.md`(이전 보고서), `design-reference/`(배포되지 않는 디자인 원본), `prompt`뿐이다.

## Pricing grep evidence

같은 production HTML:

```
'700,000' = 2   '1,500,000' = 2   '3,000,000' = 2   '88,000' = 2   '198,000' = 2   '297,000' = 2
   (각각 HTML 1회 + RSC payload 1회)
'19,000' = 0   '49,000' = 0   '99,000' = 0   '19000' = 0   '49000' = 0   '99000' = 0
'VAT' = 0   '부가세' = 0   '연간' = 0   '결제하기' = 0   '구독 시작' = 0
'BEST' = 0   '가장 많이' = 0   '추천 패키지' = 0   '무제한' = 0   '평생' = 0   '최상단' = 0
'출시 예정' = 0   '준비 중' = 0
```

## Screenshot / image brand audit

캡처 PNG와 영상을 직접 열어 확인했다. 옛 이름이 보이는 곳은 세 종류였다.

| 에셋 | 보이던 것 | 조치 | production 결과 |
| --- | --- | --- | --- |
| `layer-chat-welcome / -widget / -memory / -form.png` | 입력창 아래 "Powered by boostchat" 줄 | CSS crop: 채팅창을 입력창 줄까지만 표시 (`CHAT_WINDOW`) | Hero 쇼케이스, 스토리 장면(데스크톱), Live Demo에서 안 보임 |
| `scene-01 / 05 / 06 / 09` (모바일 · reduced motion용 합성 캡처) | 같은 줄 | CSS crop: 아래 98px 잘라냄 | 안 보임 |
| 영상 poster facade (`scene-01`) | 같은 줄 | 위쪽 기준 확대로 같은 영역만 표시 | 안 보임 |
| `layer-dashboard.png`, `scene-07` | 관리 화면 사이드바 맨 위 "BoostChat" 라벨 | CSS crop: 업체명 줄부터 표시 | 안 보임 |
| `layer-phone-chat.png`, `scene-08-mobile.png` | 같은 "Powered by" 줄이 휴대폰 프레임 안에 있음 | crop하면 휴대폰이 잘리므로, 화면 맨 아래를 CSS mask로 페이드 | 안 보임. 대신 휴대폰 아래쪽이 흐려진다 (KNOWN_ISSUES 5) |
| `opengraph-image.jpg`, `twitter-image.jpg` | 랜딩 제목 위 eyebrow "BoostChat" | eyebrow 글자만 같은 폰트 · 크기 · 위치로 "BoostInterior"로 다시 렌더 | 교체됨. 바뀐 영역은 (47,47)–(340,66)뿐이고 제품 캡처 부분은 그대로 |
| `master-sales.mp4` (86초) | 전 구간 채팅창 아래 "Powered by boostchat", 약 80초부터 엔딩 카드 "BoostChat boostchat.co.kr" | **조치 못 함** | **그대로 노출** (KNOWN_ISSUES 1) |
| `images/email/video-thumbnail.webp / .jpg` | `scene-01` 기반이라 "Powered by boostchat"이 작게 있음 | 손대지 않음 (랜딩에서 쓰지 않는 이메일용) | 그대로 (KNOWN_ISSUES 3) |

- 가짜 UI는 만들지 않았고, 제품 캡처 PNG 파일은 한 픽셀도 수정하지 않았다. 덮어 칠한 곳도 없다.
  전부 CSS로 보이는 영역만 줄였다 (`lib/assets.ts`의 `crop`, `PHONE_FADE`).
- OG 이미지는 제품 캡처가 아니라 랜딩 화면 합성물이라, 랜딩의 eyebrow 글자만 바꿨다.
- 채팅창 crop으로 baked shadow가 같이 잘려서, 스토리 장면의 채팅창은 CSS `shadow-float`을 쓴다.
- 브랜드가 없는 최신 실제 캡처는 저장소에 없었다. 새로 촬영하면 crop을 지우고 파일만 바꾸면 된다.

## Future-feature truth audit

prompt 안에 서로 다른 지시가 있었다. §7 · §8은 "아직 구현 전이면 준비 중 / 출시 예정으로 표기",
§24는 "이번 랜딩에서는 출시 예정 · 준비 중으로 약하게 표시하지 않는다. 판매 상품 구성으로 표현한다"이다.
더 뒤에 있고 "판매 정책"으로 명시된 §24를 따랐다. 그래서 플랜 카드에는 배지가 없다.

이 저장소에서 확인할 수 있는 근거는 다음과 같다.

| 기능 | 랜딩 표기 | 확인된 근거 |
| --- | --- | --- |
| AI 상담, 조건 이해, 시공사례 추천, 사진 뷰어, 맥락 기억, 견적 문의, 상담 요청 관리 화면 | Core | 실제 캡처와 86초 영상에 그대로 나온다. 확인됨 |
| 상담 전문지식 직접 관리 (관리자 기능) | Core | 관리 화면 캡처 사이드바에 "상담 자료" 메뉴가 보인다. 그 화면 자체는 확인하지 못했다 |
| 방문자 행동 분석 (방문 페이지 · 클릭 · 체류 · 이탈, 전환 흐름) | Growth | 이 저장소와 캡처에서 근거를 찾지 못했다. **미확인** |
| 3D Portfolio, 인터랙티브 공간 탐색, 프레젠테이션 | Growth | 라이브 데모 `/3d-portfolio`가 현재 "공간을 더 입체적으로 확인할 수 있는 3D 포트폴리오를 준비하고 있습니다."라고 표시한다. **아직 제공 전** |
| 월간 리뷰 · 업데이트 지원 등 | Managed | 사람이 하는 서비스. "실제 작업 범위는 운영정책과 계약에 따라 정해집니다." 명시 |
| 인테리어 플랫폼 입점 혜택 | Founding Partner | "플랫폼 출시 시 제공 예정" 라벨 + 운영정책 문구. 미래 계획으로 표기됨 |

판단해야 할 지점: 랜딩의 "실제 데모 체험하기"가 여는 데모 사이트는 3D 포트폴리오를 "준비하고 있습니다"라고
말하는데, 랜딩은 Growth 월 198,000원의 구성 항목으로 배지 없이 적고 있다. 고객이 둘을 같이 볼 수 있다.

- 완충 장치로 가격 카드 아래에 한 줄을 넣었다: "플랜별 세부 제공 범위와 적용 일정은 도입 상담에서 안내해드립니다."
  기능별 배지는 아니므로 §24와 충돌하지 않는다.
- "현재 제공 중", "바로 사용 가능" 같은 표현은 어디에도 쓰지 않았다. 3D나 분석 화면의 가짜 스크린샷도 없다.
- 결제 버튼이 없고 계약은 상담을 거치므로, §24의 조건("계약 시에는 판매한 플랜의 기능을 실제 사용 가능한
  상태로 제공")은 소유자가 상담 단계에서 지킬 수 있다.
- Growth 기능이 계약 시점에 준비되지 않을 가능성이 있다면 `lib/pricing.ts`의 해당 항목에 표기를 추가하는
  것이 안전하다. 항목 문자열만 바꾸면 된다.

## Responsive evidence

Playwright 1.63 (Chromium), public alias `https://boost-interior-sales.vercel.app` 기준. 같은 스위트가
push 전 로컬 `next start`에서도 전부 통과했다.

| Viewport | 결과 | 가로 overflow | 옛 브랜드 | Kakao 링크 | Demo 링크 | Hero | `가격` 점프 | 86초 영상 | Console / 실패 요청 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1440×900 | PASS | 0 | 0 | 5 | 3 | 쇼케이스 회전 + hover 정지 | OK | 재생됨 (87s) | 0 / 0 |
| 1280×800 | PASS | 0 | 0 | 5 | 3 | 쇼케이스 회전 + hover 정지 | OK | 재생됨 | 0 / 0 |
| 1024×768 | PASS | 0 | 0 | 5 | 3 | 쇼케이스 회전 + hover 정지 | OK | 재생됨 | 0 / 0 |
| 768×1024 | PASS | 0 | 0 | 5 | 3 | 정적 휴대폰 캡처 | OK | 재생됨 | 0 / 0 |
| 390×844 | PASS | 0 | 0 | 5 | 3 | 정적 휴대폰 캡처 | OK | 재생됨 | 0 / 0 |
| 375×667 | PASS | 0 | 0 | 5 | 3 | 정적 휴대폰 캡처 | OK | 재생됨 | 0 / 0 |
| 1440×900 reduced motion | PASS | 0 | 0 | 5 | 3 | 1단계 고정, 회전 없음 | OK | 재생됨 | 0 / 0 |
| 390×844 reduced motion | PASS | 0 | 0 | 5 | 3 | 정적 휴대폰 캡처 | OK | 재생됨 | 0 / 0 |

각 실행에서 확인한 것:

- Kakao 링크 5개(헤더, Hero, Pricing, Partner, Contact)가 정확히 `https://open.kakao.com/o/sAS9ebQi`,
  Demo 링크 3개(Hero, Live Demo, Contact)가 `https://interior-demo.boostweb.co.kr`. 모두 새 창,
  `rel="noopener noreferrer"`, sr-only "(새 창에서 열림)".
- 페이지 안의 모든 `#anchor` 링크에 대상이 있다 (`#pricing`, `#demo-video` 포함).
- 가격 카드 6장, 가격 숫자는 줄바꿈 없이 카드 안에 들어온다. Pricing · Partner 안에 화면 밖으로 나가는 요소 0.
- 새 가격 6개가 보이는 텍스트와 HTML 양쪽에 있고, 옛 SaaS 가격은 없다.
- 헤더 `가격` 클릭 → 가격 섹션 제목이 화면 안에 들어온다.
- `#demo-video` 직접 진입 → 재생 버튼 → `master-sales.mp4`가 실제로 재생된다.
- h1 1개, 제목 단계 건너뛰기 0, 깨진 이미지 0, 섹션 19개 전부 존재.

눈으로 확인한 화면 (1440 / 1024 / 768 / 390 / 375 + reduced motion 1440):

- 1440 · 1280 · 1024: 가격 카드 3열. 1024에서 `3,000,000원`이 카드 안에 한 줄로 들어온다
  (숫자 크기 `clamp(28px, 3.1vw, 40px)`).
- 768: 카드 1열, 카드 안 포함 범위 목록은 2열.
- 390 · 375: 카드 1열, 목록 1열. `내 홈페이지 기준으로 추천받기`와 Partner CTA는 480px 이하에서 전체 폭.
- 375: Hero eyebrow가 두 줄로 균형 있게 나뉜다 ("BoostInterior · 인테리어 ·" / "리모델링 업체를 위한 AI 상담").
  이름이 길어져 한 줄에 안 들어가서 `text-balance`를 추가했다.
- Partner의 "플랫폼 출시 시 제공 예정" 라벨과 혜택 pill 4개는 어느 폭에서도 잘리지 않고 줄바꿈된다.

## Changed files

커밋 `1e6cba2` (26 files, +606 / −147):

| 파일 | 내용 |
| --- | --- |
| `lib/site.ts` | `SITE_NAME` / `SITE_TITLE` / `SITE_DESCRIPTION` 교체, `PRICING_ID` 추가 |
| `lib/pricing.ts` (신규) | 구축 방식 3개, 월 플랜 3개, 조합 예시. 가격의 단일 출처 |
| `components/landing/Pricing.tsx` (신규) | 가격 섹션 |
| `app/page.tsx` | Live Demo와 Partner 사이에 `<Pricing />` |
| `components/landing/SiteHeader.tsx` | 로고 이름, `가격` 링크 (모바일에서도 표시) |
| `components/landing/SiteFooter.tsx` | BoostInterior · by BoostWorks |
| `components/landing/InstallPaths.tsx` | 구축 방식 3개 + 비용 보기 링크 |
| `components/landing/Partner.tsx` | Founding Partner 문구와 혜택 |
| `components/landing/Hero.tsx` | eyebrow 이름, 모바일 휴대폰 캡처 페이드 |
| `components/landing/Problem.tsx`, `Why.tsx`, `BeforeAfter.tsx` | 제품명 |
| `components/landing/HeroShowcase.tsx` | aria-label 이름, 채팅창 crop을 `lib/assets.ts`와 공유 |
| `components/landing/DemoVideoPlayer.tsx` | aria-label 이름, poster crop |
| `components/landing/LiveDemo.tsx`, `StoryScene.tsx`, `MobileScene.tsx`, `components/motion/ProductLayer.tsx` | 캡처 crop / 페이드 적용 |
| `components/ui/SceneHeader.tsx` | 기본 eyebrow = `SITE_NAME`, eyebrow 줄바꿈 균형 |
| `lib/assets.ts` | alt 문구, `Crop` / `cropStyles` / crop 값 / `PHONE_FADE` |
| `lib/scenes.tsx` | 관리 화면 eyebrow, 채팅창 레이어 그림자 |
| `app/opengraph-image.jpg`, `app/twitter-image.jpg`, `*.alt.txt` | eyebrow 글자와 alt |
| `app/globals.css` | 주석 한 줄 |

Hero 쇼케이스 회전 로직(5초, hover / focus / offscreen 정지, reduced motion), 스토리 모션, MotionController,
영상 `#demo-video` / `master-sales.mp4`, 데모 · 카카오 URL은 수정하지 않았다.

## Known issues

1. **86초 영상에 옛 이름이 그대로 있다.** `master-sales.mp4`는 전 구간 채팅창 아래 "Powered by boostchat"이
   보이고, 약 80초부터 엔딩 카드에 "BoostChat boostchat.co.kr"이 나온다. 영상은 crop으로 해결할 수 없고
   가짜 편집도 하지 않았다. 랜딩에서 옛 이름이 가장 크게 보이는 곳이다. 엔딩 카드를 BoostInterior로 바꿔
   다시 export하면 파일만 교체하면 된다 (길이가 달라지면 `lib/site.ts`의 `VIDEOS.master`도 수정).
2. **라이브 데모 사이트는 아직 BoostChat이다.** `interior-demo.boostweb.co.kr`의 위젯은
   `boostchat.co.kr/widget/…` iframe이고, 하단에 "부스트 인테리어는 BoostChat 기능 시연을 위한 가상 인테리어
   브랜드입니다."라고 적혀 있다. 랜딩의 1순위 CTA가 여기로 간다. 이 저장소 밖이라 수정하지 않았다.
3. **이메일용 영상 썸네일**(`public/images/email/video-thumbnail.*`)에 "Powered by boostchat"이 작게 남아 있다.
   아웃바운드 메일에서 쓰는 URL이라 건드리지 않았다.
4. **VAT 표시 정책 미정** (`VAT_DISPLAY_POLICY_REQUIRED = YES`). 연간 가격도 정책 확정 전이라 넣지 않았다.
5. **휴대폰 캡처 아래쪽이 흐려진다.** "Powered by" 줄을 숨기려고 휴대폰 화면 하단(입력창 부근)을 mask로
   페이드했다. Hero 모바일, 모바일 장면(데스크톱 두 대 · 합성 캡처)에 적용된다. 원래 모습이 더 낫다면
   `lib/assets.ts`의 `PHONE_FADE` / `PHONE_COMPOSITE_FADE` 두 줄을 빈 문자열로 바꾸면 되돌아간다.
6. **3D Portfolio · 방문자 행동 분석의 제공 상태**는 위 truth audit 참고. 소유자 확인이 필요하다.
7. JSON-LD / structured data는 원래 없었고 이번에도 추가하지 않았다.
8. Production 도메인(`boost-interior-sales.vercel.app`), 저장소 이름, 이전 보고서 파일명
   (`BOOSTCHAT-INTERIOR-SALES-*.md`)은 그대로다.
9. 이전 보고서에서 넘어온 것: 실제 iOS / Android 기기 미검증(Playwright Chromium만), favicon은 placeholder "B",
   캡처는 1× PNG.
