# BoostInterior Sales V2.4: 고객 문구 최종 정리 · Quick Start 예시 · 초기 파트너 문구

`prompt` (BOOSTINTERIOR SALES V2.4 — FINAL CUSTOMER CLARITY + DEMO + FOUNDING COPY CLEANUP · DELTA UPDATE ONLY)
결과 보고서. 배포 시각은 2026-10-02 21:29 KST.
[`BOOSTINTERIOR-SALES-V2-3-CUSTOMER-LANGUAGE-2026-10-02.md`](./BOOSTINTERIOR-SALES-V2-3-CUSTOMER-LANGUAGE-2026-10-02.md)
이후 작업이다.

재디자인이 아니다. 레이아웃, 카드, 비교표, 토글, badge, 색은 V2.3 그대로다. 바뀐 것은 문구와 Quick Start 블록의
예시 사이트 줄 하나다. 가격 숫자, VAT 문구, BoostInterior 기본 구축 논리(8개 묶음 · 14개 항목, A / B / C / D 공통)는
하나도 바뀌지 않았다. 시공사례 직접 등록 · AI 자동 작성 기능은 만들지 않았고, 페이지 어디에도 지금 되는 것처럼 쓰지 않았다.

---

## Report

```
TASK = FINAL CUSTOMER CLARITY CLEANUP

QUICK_START_DEMO       = https://interior-demo.boostweb.co.kr   (HTTP 200)
QUICK_START_DEMO_LABEL = Quick Start 예시 보기
                         /pricing Quick Start 상세 블록, 새 탭 (기존 데모 링크와 같은 방식: target=_blank, rel=noopener noreferrer,
                         화면 낭독기용 "(새 창에서 열림)")
                         옆에 "도입 상담받기" → 카카오톡 1:1 상담
                         문구: "실제 화면과 BoostInterior 상담 흐름을 확인해보세요."
                               "가상 인테리어 업체를 기준으로 만든 예시 사이트입니다."
                         고객 사례 · 실제 고객 사례 · 실제 구축 고객 · 성공 사례 · 구축 사례 0건

QUICK_START_EDIT_POLICY = REQUEST-BASED SUPPORT
                          "홈페이지 내용 수정이 필요한 경우 요청해주시면 반영을 지원합니다."
                          Quick Start "전체 포함 범위" 안내 문구 + FAQ 1문항 (2곳)
                          CMS · 관리자 · 관리 패널 0건. "직접 수정할 수 있다"는 문구 없음

PORTFOLIO_DIRECT_UPLOAD  = NOT IMPLEMENTED / OUT OF SCOPE   코드 · DB · 저장소 · 관리 화면 · API 추가 없음
AI_PORTFOLIO_AUTO_UPLOAD = NOT IMPLEMENTED / OUT OF SCOPE   페이지에 "시공사례 등록 기능" · "업로드" 0건 (roadmap 문구도 넣지 않았다)

AMBIGUOUS_EXTERNAL_COPY    = "필요한 기본 외부 서비스 연결"
                             → "카카오톡 상담 · 지도 · 전화 · SNS 등 홈페이지에 필요한 기본 연결 지원" (Quick Start)
                             범위 밖: "복잡한 외부 시스템 연동은 별도 견적" (B · C · D. B는 "예약 · 결제 등"을 붙였다)
                             "외부 서비스" 6 → 0
AMBIGUOUS_IMPROVEMENT_COPY = "홈페이지의 기본적인 문제점 개선"
                             → "주요 페이지 오류 등 필요한 범위를 확인해 개선" (C 포함 항목)
                             → "휴대폰 화면 · 주요 페이지 오류 등 필요한 범위 개선" (비교표 C 칸)
                             "기본적인 문제점" 3 → 0, "모든 문제" 0

STRUCTURE_COPY = 기존 시공사례를 AI가 찾아줄 수 있도록 정리
                 칩: "시공사례 AI 검색용 정리"
                 구조화 /pricing 9 → 0, 랜딩 0 → 0. 검색 데이터 · 데이터 구조 0
CASE_TERM      = 시공사례
                 "시공 사례" 랜딩 15 → 0, /pricing 2 → 0 (본문 · alt · aria-label · 공유 이미지 alt 포함)

FOUNDING_PLATFORM_COPY        = 태그 "Platform" → "인테리어 플랫폼" · 제목 "향후 플랫폼 우선 입점"
FOUNDING_EARLY_ACCESS_COPY    = 태그 "Early Access" → "우선 이용" · 제목 "신규 기능 먼저 이용"
                                "방문자 분석, AI 상담 확장, 시공사례, 상담 · 견적 문의 기능 등 새로운 기능이 준비되면
                                 초기 파트너가 먼저 이용할 수 있습니다."
FOUNDING_CREDIT_COPY          = "무료 이용 기간 · Credit" → "무료 이용 혜택". Credit 1 → 0. 금액 · 비율 · 기간은 새로 쓰지 않았다
FOUNDING_PARTNER_BENEFIT_COPY = 태그 "Partner Benefits" → "신규 유료 기능" · 제목 "초기 파트너 전용 할인 · 무료 이용 혜택"
                                머리말 "Founding Partner · 초기 파트너 혜택" → "초기 파트너 혜택" + 작은 글씨 "Founding Partner"
                                혜택 6개 · 순서 · "광고 · 프리미엄 노출 등 추가 상품은 포함되지 않습니다" 그대로

IPHONE_MANUAL_QA       = PASS — owner manually verified
                         제품 소유자가 실제 iPhone에서 production page를 직접 확인했고 정상 작동을 확인함.
                         (prompt로 전달받은 내용. 이번 배포 전의 화면을 본 것이다 — 아래 Device QA)
ANDROID_REAL_DEVICE_QA = NOT RUN
MOBILE_RESPONSIVE_QA   = PASS   근거: Playwright Chromium 반응형 QA PASS + iPhone 직접 확인 PASS

PRICING = UNCHANGED   290,000 / 490,000 / 1,200,000부터 / 2,500,000부터 · 88,000 / 198,000 / 297,000
                      화면에 나오는 횟수가 V2.3과 같다. 150만 · 300만 0
VAT     = UNCHANGED   "부가세(VAT)가 포함" 랜딩 1 / /pricing 4 (V2.3과 같음). VAT 별도 · 부가세 별도 0
COMMON_BOOSTINTERIOR = UNCHANGED   8개 묶음 · 14개 항목, A / B / C / D 동일. 항목 하나와 칩 하나의 말만 바뀌었다 ("구조화")

TYPECHECK = PASS  (next typegen && tsc --noEmit, exit 0)
LINT      = PASS  (eslint, exit 0)
BUILD     = PASS  (next build, 10/10 static pages)
TEST      = PASS  (npm test, 15/15 — 4개 추가)
ACCESSIBILITY = PASS  124 체크, V2.3과 같은 스크립트 · 같은 기대값 (토글 7, 구축표 행 8)
PRODUCTION_QA = PASS  public alias 기준. 반응형 48 상태 · 접근성 124 체크 · 링크 47개 · 예시 사이트 40 체크
                horizontal overflow 0 · console error 0 · failed request 0 · broken image 0 · broken link 0
                Quick Start Demo link = 200

GIT    = 5d2f730 feat: clarify BoostInterior customer copy, link Quick Start example site → origin/main
         (force push 없음) + 이 보고서 커밋
VERCEL = READY (Production)  5d2f730 → GitHub status "Vercel = success"
         https://boost-interior-sales-zcj88daml-vnfm0580s-projects.vercel.app

HOME    = https://boost-interior-sales.vercel.app
PRICING = https://boost-interior-sales.vercel.app/pricing
DEMO    = https://interior-demo.boostweb.co.kr
```

---

## Changed files

| 파일 | 변경 |
| --- | --- |
| `lib/pricing.ts` | 공통 구축의 칩 1개 · 항목 1개("구조화"), B의 기본 연결 항목 · 범위 밖 · 안내 문구, C의 개선 항목 · 범위 밖 · 안내 문구, D의 범위 밖 · 안내 문구, 비교표 C 칸 1개 |
| `lib/pricing-page.ts` | "구조화" 4곳, `QUICK_EXAMPLE` 추가(예시 사이트 줄의 문구), FAQ 1문항 추가 · 3문항 수정 |
| `lib/partner.ts` | 혜택 6개의 태그 · 제목 · 설명 |
| `components/pricing/SetupSection.tsx` | Quick Start 블록에 예시 사이트 줄(문구 3줄 + 버튼 2개). 토글 옆에 있던 "BoostInterior 실제 데모 보기" 링크는 이 줄로 옮겼다 |
| `components/pricing/Disclosure.tsx` | 토글 옆 링크 자리(`actions`)를 쓰는 곳이 없어져서 뺐다. 토글의 모양과 동작은 그대로 |
| `components/landing/Partner.tsx` | 머리말, 태그 글꼴(영문 고정폭 → 본문 글꼴) |
| `components/pricing/PricingClosing.tsx` | 머리말 |
| `components/pricing/PlanSection.tsx` | AI Portfolio Video 설명 한 문장 |
| `lib/scenes.tsx`, `lib/assets.ts` | "시공 사례" → "시공사례" (장면 제목 1, 이미지 alt 9) |
| `app/opengraph-image.alt.txt`, `app/twitter-image.alt.txt` | 공유 이미지 alt의 "시공 사례" → "시공사례" |
| `tests/pricing.test.mjs` | 기대 문구 갱신, 테스트 4개 추가 |

새 라이브러리 없음. `lib/site.ts`, `app/*.tsx`, `globals.css`는 건드리지 않았다. Next.js API를 쓰는 코드는 바꾸지 않았다
(기존 `ButtonLink`만 사용). DB · 저장소 · 관리 화면 · API는 추가하지 않았다.

---

## Before / after customer copy

### Quick Start 상세 블록

| | V2.3 | V2.4 |
| --- | --- | --- |
| 칩 6개 아래 | (없음) | **Quick Start 예시 사이트** — "실제 화면과 BoostInterior 상담 흐름을 확인해보세요." / "가상 인테리어 업체를 기준으로 만든 예시 사이트입니다." / 버튼 **Quick Start 예시 보기 →** · **도입 상담받기** |
| 토글 옆 | BoostInterior 실제 데모 보기 → | (위 줄로 옮김. 토글만 남는다) |
| 포함 항목 | 필요한 기본 외부 서비스 연결 | 카카오톡 상담 · 지도 · 전화 · SNS 등 홈페이지에 필요한 기본 연결 지원 |
| 안내 문구 | 인테리어 업체에 맞춰 미리 준비된 기본 구성으로 제작해 빠르게 시작합니다. 브랜드와 구성부터 새로 설계하려면 맞춤 홈페이지 제작이 적합합니다. | (같은 두 문장) + **홈페이지 내용 수정이 필요한 경우 요청해주시면 반영을 지원합니다.** |
| 기본 범위 밖의 작업 (펼친 표) | 브랜드와 구성부터 새로 설계하려면 맞춤 홈페이지 제작 | **예약 · 결제 등 복잡한 외부 시스템 연동은 별도 견적**, 브랜드와 구성부터 새로 설계하려면 맞춤 홈페이지 제작 |

제목, 설명 두 문장, 칩 6개, 인기상품 badge, 항목 수(11개)는 그대로다.

예시 사이트 줄은 연한 파란 배경의 한 줄이다. 1440 · 1024에서는 문구 왼쪽 · 버튼 오른쪽, 768 이하에서는 문구 아래에 버튼,
480 이하에서는 버튼 두 개가 한 줄씩 꽉 찬다. 버튼은 기존 `ButtonLink` 그대로다 (파란 버튼 + 흰 버튼, 높이 48px).

### 기존 홈페이지 맞춤 개선 (C)

| | V2.3 | V2.4 |
| --- | --- | --- |
| 포함 항목 | 홈페이지의 기본적인 문제점 개선 | 주요 페이지 오류 등 필요한 범위를 확인해 개선 |
| 비교표 "휴대폰 화면 · 검색 노출 · 속도" 칸 | 휴대폰 화면 · 기본적인 문제점 개선 | 휴대폰 화면 · 주요 페이지 오류 등 필요한 범위 개선 |
| 범위 밖 · 안내 문구 | … 외부 서비스 연결 … | … 복잡한 외부 시스템 연동 … |

prompt §11의 문장은 "휴대폰 화면, 주요 페이지 오류, 상담·견적 문의 동선 등 필요한 범위를 확인해 개선"이다. C에는 이미
"휴대폰 화면 개선"과 "상담 · 견적 문의 버튼과 동선 개선"이 따로 있어서, 막연했던 항목 하나만 "주요 페이지 오류 등 필요한
범위를 확인해 개선"으로 바꿨다. 항목 수는 9개 그대로다. C의 요약 · 카드 핵심은 §12의 일곱 가지를 이미 담고 있어서 그대로 뒀다
(현재 홈페이지 유지 / 보기 불편한 화면 / 모바일 화면 / 시공사례 구성 / 상담·견적 문의 동선 + BoostInterior 기본 구축).

### 맞춤 홈페이지 제작 (D)

범위 밖 · 안내 문구의 "외부 서비스 연결" → "복잡한 외부 시스템 연동". 그 밖은 그대로다.

### "구조화" (전부 /pricing)

| 위치 | V2.3 | V2.4 |
| --- | --- | --- |
| 공통 구축 칩 (펼친 표의 공통 구축 줄에도 나온다) | 기존 시공사례 전체 구조화 | 시공사례 AI 검색용 정리 |
| 공통 구축 항목 | 기존 시공사례 구조화 | 기존 시공사례를 AI가 찾아줄 수 있도록 정리 |
| 건수 안내 | … 기존 시공사례 전체를 초기 구축 대상으로 수집 · 구조화합니다. | … 기존 시공사례 전체를 수집해 AI가 찾아줄 수 있도록 정리합니다. |
| 29만원 4단계의 2번 제목 | 기존 시공사례 전체 구조화 | 기존 시공사례 전체 정리 (설명: "…AI가 조건에 맞게 찾아줄 수 있도록 정리합니다." 그대로) |
| 29만원 7단계의 4번 | 시공사례 구조화 — … AI 상담에 필요한 형태로 정리합니다. | 시공사례 정리 — 지역 · 평형 · 공간 · 스타일 · 공사범위 등으로 AI가 찾아줄 수 있도록 정리합니다. |
| FAQ "29만원은 단순히…" | … 기존 시공사례 전체 수집과 구조화, … | … 기존 시공사례 전체를 수집해 AI가 찾아줄 수 있도록 정리하는 작업, … |

### Founding Partner (랜딩 블록 · /pricing 요약 띠)

| | V2.3 | V2.4 |
| --- | --- | --- |
| 머리말 | Founding Partner · 초기 파트너 혜택 | **초기 파트너 혜택** `Founding Partner`(13px, 회색) |
| 1 | `Platform` 플랫폼 우선 입점 — … 기존 업체 정보와 포트폴리오의 초기 이전 · 세팅도 지원합니다. | `인테리어 플랫폼` **향후 플랫폼 우선 입점** — … 기존 업체 정보와 시공사례의 초기 이전 · 세팅도 지원합니다. |
| 2 | `12 Months` 기본 입점비 12개월 무료 | `플랫폼 입점비` 기본 입점비 12개월 무료 (설명 그대로) |
| 3 | `Video` AI Portfolio Video 우선 혜택 — 시공사진을 영상 포트폴리오로 보여주는 기능을 초기 파트너가 먼저 사용합니다. | `AI Portfolio Video` **AI 시공사례 영상 우선 혜택** — 시공사진을 공간의 흐름에 따라 영상으로 보여주는 기능을 초기 파트너가 먼저 사용합니다. |
| 4 | `3D` 3D Portfolio 우선 적용 — 공간형 3D Portfolio가 준비되면 … | `3D Portfolio` **3D 시공사례 우선 적용** — 공간형 3D 시공사례가 준비되면 … |
| 5 | `Early Access` 신규 기능 우선 이용 — 방문자 분석, AI 상담 확장, 포트폴리오 · 전환 기능 등 새로운 기능을 먼저 경험합니다. | `우선 이용` **신규 기능 먼저 이용** — 방문자 분석, AI 상담 확장, 시공사례, 상담 · 견적 문의 기능 등 새로운 기능이 준비되면 초기 파트너가 먼저 이용할 수 있습니다. |
| 6 | `Partner Benefits` 초기 파트너 전용 할인 · 무료 이용 혜택 — 새 유료 기능이 출시되면 전용 할인과 무료 이용 기간 · Credit, 전용 프로모션 혜택을 드립니다. | `신규 유료 기능` 초기 파트너 전용 할인 · 무료 이용 혜택 — 새 유료 기능이 출시되면 초기 파트너에게 전용 할인과 무료 이용 혜택, 전용 프로모션을 드립니다. |

제목 여섯 개는 prompt §24의 목록과 글자까지 같다. 블록 제목, 소개 문장, 조건 문구("무료 혜택은 기본 입점비에 한하며,
광고 · 프리미엄 노출 등 추가 상품은 포함되지 않습니다…"), 버튼은 그대로다.

태그(제목 위 작은 글씨)는 영문 고정폭 글꼴이었다. 한글을 넣으면 기기마다 다른 글꼴로 바뀌어 보여서 본문 글꼴로 바꿨다.
크기(12px) · 색 · 위치는 그대로다. 영문이 남은 태그는 기능 이름 두 개(AI Portfolio Video, 3D Portfolio)이고,
둘 다 한글 제목 바로 위의 보조 표기다 (§22).

### 그 밖의 /pricing 문구

| 위치 | V2.3 | V2.4 |
| --- | --- | --- |
| FAQ (신규, 12문항이 됨) | (없음) | **Quick Start로 만든 홈페이지는 나중에 수정할 수 있나요?** — 네. 홈페이지 내용 수정이 필요한 경우 요청해주시면 반영을 지원합니다. |
| FAQ | 3D Portfolio도 제공하나요? — 3D Portfolio는 현재 … | 3D 시공사례도 제공하나요? — 3D 시공사례(3D Portfolio)는 현재 … |
| AI Portfolio Video 설명 블록 · FAQ | … 보여주는 영상 포트폴리오입니다. | … 보여주는 AI 시공사례 영상입니다. |

월 플랜의 카드 · 가격 · 비교표 22행은 한 글자도 바뀌지 않았다. 기능 이름 "AI Portfolio Video"도 그대로다.

### 랜딩

Founding Partner 블록(위 표)과 "시공 사례" → "시공사례" 두 가지다. 화면에 보이는 글자는 스토리 장면 제목 하나
("조건에 맞는 우리 업체 시공사례를 바로 보여줍니다.")이고, 나머지는 이미지 alt 9개와 공유 이미지 alt다.

---

## Audit results

Production alias, 1440px. 접힌 토글 안의 글자, alt, aria-label, title, meta까지 포함한 텍스트(script · style 제외).
배포 전(V2.3, d5bda27)과 배포 후(5d2f730)를 같은 스크립트로 셌다.

### Founding Partner (§34)

| 단어 | `/` | `/pricing` |
| --- | --- | --- |
| Platform | 1 → 0 | 0 |
| Early Access | 1 → 0 | 0 |
| Partner Benefits | 1 → 0 | 0 |
| Credit | 1 → 0 | 0 |
| 12 Months | 1 → 0 | 0 |
| 전환 기능 | 1 → 0 | 0 |
| 포트폴리오 | 3 → 0 | 2 → 0 |
| Founding Partner | 1 → 1 (작은 보조 표기) | 2 → 2 (보조 표기 1, FAQ "초기 파트너(Founding Partner)" 1) |

### "구조화" · "시공사례" (§35 · §36)

| 단어 | `/` | `/pricing` |
| --- | --- | --- |
| 구조화 | 0 | 9 → 0 |
| 검색 데이터 · 데이터 구조 | 0 | 0 |
| AI가 찾아줄 수 있도록 정리 | 0 | 0 → 4 |
| 시공사례 AI 검색용 정리 | 0 | 0 → 4 |
| 시공 사례 | 15 → 0 | 2 → 0 |
| 시공사례 | 11 → 31 | 57 → 65 |

### Quick Start 예시 (§37) · 수정 정책 · 막연했던 문구

| 문구 | `/` | `/pricing` |
| --- | --- | --- |
| Quick Start 예시 보기 | 0 | 0 → 1 |
| 가상 인테리어 업체를 기준으로 만든 예시 사이트 | 0 | 0 → 1 |
| 고객 사례 · 실제 고객 사례 · 실제 구축 고객 · 성공 사례 · 구축 사례 · 실제 고객 홈페이지 | 0 | 0 |
| 요청해주시면 반영을 지원합니다 | 0 | 0 → 2 |
| 시공사례 등록 기능 · 업로드 | 0 | 0 |
| 외부 서비스 | 0 | 6 → 0 |
| 기본적인 문제점 · 모든 문제 | 0 | 3 → 0 · 0 |
| 복잡한 외부 시스템 연동 | 0 | 0 → 5 |

/pricing의 "직접 수정" 1건은 "49만원 vs 120만원" 답의 "현재 홈페이지에 맞춰 직접 수정"이다. 우리가 고친다는 뜻이고
V2.3부터 있던 문구다.

### 개발 용어 (§33)

SEO · HTTPS · SSL · CMS · UX · CTA · Responsive · Performance · Conversion · Widget · Integration · QA: 두 페이지 모두 0건 (V2.3과 같음).
위젯 · 도메인 · 반응형 · 성능 · 스크립트 · 백엔드 · 인터랙션 · 정보구조 · 자연어 · 섹션 · 템플릿 · 관리자 · 관리 패널: 0건.

남은 것과 그 이유:

- `/` "전환" 1건: "화면 자동 전환 일시정지"(Hero 미리보기 버튼의 aria-label. 화면이 넘어간다는 뜻이다)
- "Portfolio": `/` 4건, `/pricing` 11건. 전부 기능 이름이다 — AI Portfolio Video(2 / 9), 3D Portfolio(1 / 1),
  Growth의 역할 태그 "분석 + Portfolio Video"(1 / 1). 월 플랜 문구는 §29에 따라 그대로 뒀다

### 가격 · VAT · 공통 구축 (불변 확인)

| 값 | `/` | `/pricing` |
| --- | --- | --- |
| 290,000 · 490,000 · 1,200,000 · 2,500,000 | 랜딩은 만원 표기: 29만원 · 49만원 · 120만원부터 · 250만원부터 각 1 | 6 / 4 / 4 / 3 |
| 88,000 · 198,000 · 297,000 | 1 / 1 / 1 | 7 / 2 / 2 |
| 700,000 · 1,500,000 · 3,000,000 · 150만 · 300만 | 0 | 0 |
| 부가세(VAT)가 포함 | 1 | 4 |
| VAT 별도 · 부가세 별도 · 별도 부과 | 0 | 0 |
| BoostInterior 기본 구축 | 5 | 22 |
| 동일하게 포함 | 0 | 9 |
| 인기상품 | 1 | 3 |
| BoostChat | 0 | 0 |

모든 숫자가 배포 전과 같다.

---

## Quick Start 예시 사이트 QA (§28)

`https://interior-demo.boostweb.co.kr`, Playwright Chromium, 1440 × 900 · 390 × 844 · 375 × 667 — 40개 체크 통과.
/pricing의 "Quick Start 예시 보기"를 실제로 눌러서 열린 새 탭을 검사했다.

| 항목 | 결과 |
| --- | --- |
| HTTP | 200 |
| Quick Start CTA에서 이동 | 세 폭 모두 버튼이 보이고, 누르면 새 탭으로 예시 사이트가 열린다 |
| 모바일 레이아웃 | 390 · 375에서 horizontal overflow 0 |
| 이미지 | 15개, broken 0 |
| BoostInterior 상담창 | 스크립트 · 상담창 로드. 버튼을 누르면 열리고 첫 인사가 나온다 (1440: 372 × 560, 390 · 375: 화면 전체) |
| 주요 버튼 | "대표 프로젝트 보기" → 시공사례 상세, "상담 문의" → 견적 문의 양식(입력 7칸) |
| footer 고지 | 보임: "부스트 인테리어는 BoostInterior 기능 시연을 위한 가상 인테리어 브랜드입니다. 포트폴리오·후기는 데모용 예시이고, 사진은 AI로 생성한 예시 이미지입니다." |
| console error · failed request | 0 · 0 (페이지 이동으로 취소된 미리 불러오기 요청은 세지 않았다) |

예시 사이트에서 확인된 것 가운데 문구와 관련 있는 두 가지는 아래 Known issues 1 · 2에 적었다.

---

## Screenshots

Production alias에서 Playwright Chromium으로 찍었다. `assets/v2-4-final-customer-cleanup/`.

| | 1440 | 390 |
| --- | --- | --- |
| `/pricing` BEFORE (V2.3, d5bda27) | [before-pricing-1440.jpg](./assets/v2-4-final-customer-cleanup/before-pricing-1440.jpg) · 8,926px | [before-pricing-390.jpg](./assets/v2-4-final-customer-cleanup/before-pricing-390.jpg) · 12,059px |
| `/pricing` AFTER 접힘 (5d2f730) | [after-pricing-1440.jpg](./assets/v2-4-final-customer-cleanup/after-pricing-1440.jpg) · 9,153px | [after-pricing-390.jpg](./assets/v2-4-final-customer-cleanup/after-pricing-390.jpg) · 12,410px |
| `/pricing` AFTER 펼침 (토글 7개 전부) | [after-pricing-expanded-1440.jpg](./assets/v2-4-final-customer-cleanup/after-pricing-expanded-1440.jpg) · 13,079px | [after-pricing-expanded-390.jpg](./assets/v2-4-final-customer-cleanup/after-pricing-expanded-390.jpg) · 18,204px |
| `/` BEFORE | [before-home-1440.jpg](./assets/v2-4-final-customer-cleanup/before-home-1440.jpg) · 18,622px | [before-home-390.jpg](./assets/v2-4-final-customer-cleanup/before-home-390.jpg) · 16,236px |
| `/` AFTER | [after-home-1440.jpg](./assets/v2-4-final-customer-cleanup/after-home-1440.jpg) · 18,646px | [after-home-390.jpg](./assets/v2-4-final-customer-cleanup/after-home-390.jpg) · 16,258px |
| Quick Start 블록 | [quick-start-block-1440.png](./assets/v2-4-final-customer-cleanup/quick-start-block-1440.png) | [quick-start-block-390.png](./assets/v2-4-final-customer-cleanup/quick-start-block-390.png) · [펼침](./assets/v2-4-final-customer-cleanup/quick-start-expanded-390.png) |
| Founding Partner (랜딩) | [founding-landing-1440.png](./assets/v2-4-final-customer-cleanup/founding-landing-1440.png) | [founding-landing-390.png](./assets/v2-4-final-customer-cleanup/founding-landing-390.png) |
| Founding Partner (/pricing 띠) | [founding-pricing-1440.png](./assets/v2-4-final-customer-cleanup/founding-pricing-1440.png) | |
| 공통 구축 · C 블록 · 펼친 비교표 | [common-scope-1440.png](./assets/v2-4-final-customer-cleanup/common-scope-1440.png) · [improvement-block-1440.png](./assets/v2-4-final-customer-cleanup/improvement-block-1440.png) · [setup-table-expanded-1440.png](./assets/v2-4-final-customer-cleanup/setup-table-expanded-1440.png) | |
| 예시 사이트 | [demo-site-1440.jpg](./assets/v2-4-final-customer-cleanup/demo-site-1440.jpg) | [demo-site-390.jpg](./assets/v2-4-final-customer-cleanup/demo-site-390.jpg) · [상담창](./assets/v2-4-final-customer-cleanup/demo-site-consult-390.png) |

`/` full page는 reduced motion으로 찍었다 (스토리 장면이 스크롤에 고정되는 구간이라 V2.3과 같은 방식).
블록 단위 캡처는 화면 위에 고정된 메뉴를 숨기고 찍었다.

### 길이

| | V2.3 | V2.4 | 차이 |
| --- | --- | --- | --- |
| `/pricing` 1440 접힘 | 8,926 | 9,153 | +227 (+2.5%) |
| `/pricing` 390 접힘 | 12,059 | 12,410 | +351 (+2.9%) |
| `/pricing` 1440 펼침 | 12,763 | 13,079 | +316 |
| `/pricing` 390 펼침 | 17,809 | 18,204 | +395 |
| `/` 1440 | 18,622 | 18,646 | +24 |
| `/` 390 | 16,236 | 16,258 | +22 |

/pricing이 늘어난 곳은 Quick Start의 예시 사이트 줄(여백 포함 1440에서 약 140px, 390에서 약 310px. 토글 옆에 있던 링크 한 줄이 빠져서 390의 실제 증가는 그보다 작다)과 FAQ 한 문항이다.

### Visual review (prompt §47)

스크린샷을 직접 보고 판단한 것이다. 실제 고객에게 물어본 결과가 아니다.

| 기준 | 판단 |
| --- | --- |
| 1. Quick Start에 예시 사이트가 있다는 것이 보이는가 | 칩 6개 바로 아래, 블록 안에서 유일하게 색이 다른 줄이다. "Quick Start 예시 사이트"라는 작은 제목과 파란 버튼 "Quick Start 예시 보기 →"가 접힌 상태에서 보인다. 390px에서는 버튼이 줄 전체 폭이다 |
| 2. 예시 사이트가 고객 사례처럼 오해되지 않는가 | 버튼과 제목이 "예시"이고, 바로 아래에 "가상 인테리어 업체를 기준으로 만든 예시 사이트입니다."가 있다. 사례 · 고객 홈페이지라는 말은 없다. 예시 사이트 footer에도 가상 브랜드 고지가 보인다 |
| 3. "구조화" 같은 개발 말이 사라졌는가 | 0건. 칩은 "시공사례 AI 검색용 정리", 문장은 "AI가 찾아줄 수 있도록 정리"다. "AI 검색용"은 prompt §13이 정한 짧은 표기다 |
| 4. Founding Partner를 일반 사장님도 이해할 수 있는가 | 카드 여섯 장의 제목이 전부 한글이다. 영문은 작은 보조 표기 셋(Founding Partner, AI Portfolio Video, 3D Portfolio)뿐이다. Credit · Early Access · Platform은 없다 |
| 5. "시공사례" 표기가 일관적인가 | "시공 사례" 0건 (본문, alt, 공유 이미지 alt) |
| 6. C가 "무슨 문제든 다 고쳐주는 상품"처럼 보이지 않는가 | "기본적인 문제점 개선"이 없어지고 "주요 페이지 오류 등 필요한 범위를 확인해 개선"이 됐다. 카드에는 "기존 홈페이지 진단 후 범위 확정"이 첫 줄이고, 안내 문구가 "진단한 뒤 범위와 비용을 먼저 안내"라고 말한다 |
| 7. 외부 연결의 예가 구체적인가 | "카카오톡 상담 · 지도 · 전화 · SNS 등 홈페이지에 필요한 기본 연결 지원". 범위 밖은 "예약 · 결제 등 복잡한 외부 시스템 연동은 별도 견적" |

---

## Responsive / production QA

Production alias(`https://boost-interior-sales.vercel.app`), Playwright Chromium, 5d2f730 배포 후 실행. V2.3과 같은 스크립트다.
`/pricing`은 폭마다 접힌 상태 → 토글 7개 전부 연 상태 → (820px 이하) 상품 4개를 차례로 선택 → 다시 접은 상태를 검사했다.

| Viewport | `/` | `/pricing` |
| --- | --- | --- |
| 1440 × 900 | pass | pass |
| 1280 × 800 | pass | pass |
| 1024 × 768 | pass | pass |
| 768 × 1024 | pass | pass |
| 390 × 844 | pass | pass |
| 375 × 667 | pass | pass |
| 1440 × 900 reduced motion | pass | pass |
| 390 × 844 reduced motion | pass | pass |

"pass"의 기준 (48개 상태 모두): horizontal overflow 0, 화면 밖으로 나간 요소 0, console error 0, failed request 0,
HTTP 4xx / 5xx 0, broken image 0, 보이는 금액이 전부 한 줄이고 잘리지 않음, 자기 칸보다 넓은 글자 0,
(데스크톱) 접었다 다시 접으면 높이가 처음과 같음.

§41이 따로 보라고 한 것:

- **Founding Partner 문구 길이** — 1440(3열) · 1024 · 768(2열) · 390 · 375(1열)에서 카드 밖으로 나가는 글자 0. 가장 긴 제목
  "초기 파트너 전용 할인 · 무료 이용 혜택"은 390 · 375에서 두 줄이다 (V2.3에서도 같은 제목이 두 줄이었다)
- **Quick Start 예시 버튼** — 1440: 212 × 48, 390: 262 × 48, 375: 247 × 48. 글자 줄바꿈 없음
- **긴 문구의 줄바꿈** — 비교표 C 칸 "휴대폰 화면 · 주요 페이지 오류 등 필요한 범위 개선"은 1440에서 두 줄이다. 같은 표의
  Quick Start 칸("보기 좋게 구성 · 기존 공개 시공사례 이전")도 두 줄이라 줄 높이가 맞는다
- **공통 구축 칩** — "시공사례 AI 검색용 정리"는 390 · 375에서 한 줄

링크: `/` 27개(in-page anchor 17), `/pricing` 20개(in-page anchor 6 — Quick Start 블록의 "도입 상담받기"로 1개 늘었다).
anchor 대상 누락 0. `/`, `/pricing`, 카카오 오픈채팅, 예시 사이트 모두 HTTP 200.

### Device QA (§27 · §42 · §43)

```
OWNER_IPHONE_CHECK  = PASS   제품 소유자가 실제 iPhone에서 production page를 직접 확인했고 정상 작동을 확인함.
ANDROID_REAL_DEVICE = NOT RUN
```

- iPhone 결과는 소유자가 prompt로 알려준 것이다. 이 작업에서 실행한 검사가 아니고, Playwright 결과와 별개다
- 그 확인은 V2.4 배포 전(V2.3 화면)에 이뤄졌다. 이번에 새로 생긴 Quick Start 예시 사이트 줄과 바뀐 Founding Partner 문구는
  실제 iPhone에서 아직 본 사람이 없다. Playwright Chromium의 390 · 375 폭으로만 확인했다
- 실제 Android 기기에서는 확인하지 않았다. 390 · 375 반응형 검사는 데스크톱 Chromium의 화면 폭이고 Android 기기 테스트가 아니다

### Accessibility

Production, 1440 · 390 · 각각 reduced motion — 124개 체크 통과. V2.3과 같은 스크립트, 같은 기대값(토글 7, 구축표 행 8)이다.

- 토글 7개: `<button type="button" aria-expanded>`, `aria-controls` 대상 존재, Enter · Space, focus 유지, 닫을 때 버튼 이동 0px
- 구축 비교표: caption, 열 머리 5개, 접힌 상태 행 머리 8개. 플랜 비교표 표시 칸 84개 전부에 "포함" / "미포함" 텍스트
- 모바일 상품 선택: `aria-pressed`, 키보드로 세 번째를 고르면 영역 이름이 "기존 홈페이지 맞춤 개선 구축 범위"
- badge: 텍스트가 DOM에 있고 제목 · 링크 이름에 섞이지 않는다
- 새 버튼 두 개는 링크(`<a>`)이고 이름이 "Quick Start 예시 보기 (새 창에서 열림)", "도입 상담받기 (새 창에서 열림)"이다
- Founding Partner 머리말의 "Founding Partner"와 카드 태그는 회색(gray-400) 글씨다. V2.3의 태그와 같은 색 · 같은 배경이다

### Tests

`npm test` 15개. 기존 11개는 기대 문구 하나("시공사례 구조화" → "기존 시공사례를 AI가 찾아줄 수 있도록 정리")와
"포트폴리오" 검사(예외였던 "영상 포트폴리오"도 이제 실패)만 바꿨고, 4개를 추가했다 (11–14번. 기존의 보장 표현 검사가 15번이 됐다).

11. "시공 사례" 0건(소스 전체 + 공유 이미지 alt 두 파일), 구조화 · 데이터 구조 · 검색 데이터 · 포트폴리오 0건
12. 범위 문구: Quick Start의 기본 연결에 카카오톡 · 지도 · 전화 · SNS가 있고, "외부 서비스" · "기본적인 문제점" · "모든 문제" 0건,
    B · C · D의 범위 밖에 "복잡한 외부 시스템 연동 … 별도 견적"
13. Quick Start: 수정 요청 문구, "Quick Start 예시 보기", 가상 업체 고지가 있고, 고객 사례 · 성공 사례 · 구축 사례 · 실제 고객 홈페이지 0건,
    고객이 직접 등록 · 업로드 · 수정한다는 문구와 "시공사례 등록 기능" 0건
14. Founding Partner: 제목 6개가 §24의 목록과 같고, Platform · Early Access · Partner Benefits · Credit · 전환 · 포트폴리오 0건,
    영문은 BoostInterior와 기능 이름 둘뿐, 금액 · 비율 없음, "광고 · 프리미엄 노출 … 포함되지 않습니다" 유지

---

## Known issues / 소유자 결정이 필요한 것

1. **예시 사이트에는 카카오톡 · 지도 · 전화 · SNS 연결이 하나도 없다** — 확인한 다섯 페이지(홈, 소개, 포트폴리오, 3D 포트폴리오, 견적 문의)에 카카오톡
   버튼, 지도, 전화 링크, SNS 링크가 0개다 (가상 브랜드라 연락처가 이메일뿐이다). Quick Start 문구는 "…등 홈페이지에 필요한
   기본 연결 지원"이라 틀린 말은 아니지만, 고객이 "예시 보기"를 눌러도 그 연결이 어떤 모습인지는 볼 수 없다.
   예시 사이트에 가상의 카카오톡 버튼 · 지도 · 전화 · 인스타그램 링크를 넣으면 문구와 예시가 맞는다.
2. **예시 사이트의 견적 문의 양식은 접수되지 않는다** — /contact에 "온라인 접수는 아직 연결되어 있지 않습니다. 버튼을 누르면
   … 메일 작성 창이 메일 앱에서 열립니다."라고 적혀 있다. Quick Start 칩은 "상담·견적 문의 연결"이다. 상담창 쪽 견적 문의는
   열리지만, 예시의 문의 페이지는 실제 납품물이 그렇게 나가는 것처럼 보일 수 있다.
3. **예시 사이트의 표기는 맞추지 않았다** — "포트폴리오", "3D 포트폴리오"(메뉴 · "준비하고 있습니다" 페이지), "다른 시공 사례".
   별도 저장소이고 §35가 Sales site 기준이라고 해서 손대지 않았다.
4. **수정 지원의 조건은 페이지에 없다** — 횟수, 비용, 기간, 월 플랜과의 관계를 정해 주지 않아서 승인된 한 문장만 넣었다.
   고객이 "무료로 계속"이라고 읽을 수 있다. 조건이 있으면 그 문장 뒤에 한 줄을 붙이면 된다 (`lib/pricing.ts` B의 `note`,
   `lib/pricing-page.ts`의 FAQ).
5. **prompt에 없던 판단**
   - FAQ 한 문항을 추가했다 ("Quick Start로 만든 홈페이지는 나중에 수정할 수 있나요?"). 수정 정책이 접힌 안내 문구에만 있으면
     찾기 어렵다. 12문항이 됐다.
   - AI Portfolio Video 설명의 "영상 포트폴리오" → "AI 시공사례 영상" (설명 블록, FAQ). §30이 허용한 표현이고,
     이걸로 /pricing의 "포트폴리오"가 0건이 됐다. 월 플랜의 다른 문구는 그대로다.
   - C · D의 "외부 서비스 연결(별도 견적)" → "복잡한 외부 시스템 연동". B가 카카오톡 · 지도 같은 기본 연결을 포함한다고 쓰는데
     120만원 · 250만원 상품이 "외부 서비스 연결은 별도"라고 하면 앞뒤가 안 맞는다.
   - D의 포함 항목에는 기본 연결을 넣지 않았다. D에 포함되는지 정해 준 적이 없어서 범위를 지어내지 않았다. 지금 D는
     "보안 연결" 한 줄이고 B는 세 줄이라, 펼친 표에서 250만원 상품의 그 칸이 49만원 상품보다 짧아 보인다.
   - Founding Partner 태그 여섯 개의 말(인테리어 플랫폼 / 플랫폼 입점비 / 우선 이용 / 신규 유료 기능)과 글꼴 변경.
   - 29만원 4단계의 2번 제목은 "기존 시공사례 전체 정리"로 썼다 (바로 아래 설명에 "AI가 조건에 맞게 찾아줄 수 있도록"이 있다).
   되돌리려면 `lib/pricing.ts` · `lib/pricing-page.ts` · `lib/partner.ts`의 해당 문자열만 바꾸면 된다.
6. **"가상 인테리어 업체…" 고지를 버튼 옆에 넣었다** — §26은 생략해도 된다고 했다. 한 줄(13px)이고 페이지가 지저분해지지 않아서
   넣었다.
7. **랜딩에는 "Quick Start 예시 보기"가 없다** — §7이 Quick Start 상세 블록이라고 해서 /pricing에만 넣었다. 랜딩의 데모 버튼
   세 개와 /pricing 위 · 아래의 버튼 두 개는 "실제 데모 체험하기" / "실제 데모 보기" 그대로다 (§6의 허용 표현).
   같은 사이트를 두 이름(실제 데모, Quick Start 예시)으로 부르게 됐다.
8. **그대로 둔 영어** — Core / Growth / Managed, AI Portfolio Video(월 플랜 9곳), Growth의 역할 태그 "분석 + Portfolio Video",
   Before / After. 월 플랜은 §29에 따라 건드리지 않았다.
9. **/pricing이 조금 길어졌다** — 390px 접힌 상태 12,059 → 12,410px (+2.9%).
10. **주소창의 `#quick-website`, `#custom-website`** — V2.3과 같다. 기존에 공유된 링크가 깨지지 않도록 유지했다.
11. **`prompt` 파일** — 변경을 커밋하지 않았다 (이전 작업들과 같은 방식).
12. **QA 스크립트** — 반응형 / 접근성 / 링크 / 텍스트 감사 / 예시 사이트 검사 스크립트는 세션 scratchpad에 있고 저장소에는
    넣지 않았다. 저장소에 들어간 것은 `tests/pricing.test.mjs`와 스크린샷 22장(약 8.8MB)이다.
13. V2.3에서 넘어온 것은 그대로다: Growth의 방문자 분석을 고객이 볼 화면 미확인, 관리 화면 사이드바의 BoostChat 표기,
    AI Portfolio Video 샘플 없음, 랜딩 C 카드 요약의 줄바꿈("상담· / 견적 문의 동선").

---

## Future Work

이번 커밋에는 관련 구현이 없다. 페이지에도 쓰지 않았다.

```
FUTURE_PORTFOLIO_MANAGEMENT = 고객이 직접 시공사례 등록 / 수정
FUTURE_AI_PORTFOLIO_UPLOAD  = 사진 + 지역 · 동네 등 최소 정보 입력
                              → AI가 시공사례 설명 작성
                              → 등록 / 업로드 지원
```

1. 고객 시공사례 직접 등록 · 수정
2. 사진 + 최소 정보 → AI 시공사례 작성 → 등록 지원

기능이 나오면 바꿀 문구: Quick Start의 수정 안내 문장과 FAQ("요청해주시면 반영을 지원합니다"), 그리고
`tests/pricing.test.mjs` 13번의 "시공사례 등록 기능" · "직접 등록" 검사.
