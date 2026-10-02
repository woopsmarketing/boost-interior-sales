# BoostInterior Sales V2.5: 기본 연결 범위 맞추기 (B · C · D)

`prompt` (BOOSTINTERIOR SALES V2.5 — BASIC CONNECTION SCOPE ALIGNMENT · SMALL DELTA ONLY) 결과 보고서.
배포 시각은 2026-10-02 22:30 KST.
[`BOOSTINTERIOR-SALES-V2-4-FINAL-CUSTOMER-CLEANUP-2026-10-02.md`](./BOOSTINTERIOR-SALES-V2-4-FINAL-CUSTOMER-CLEANUP-2026-10-02.md)
이후 작업이다.

V2.4까지는 "카카오톡 상담 · 지도 · 전화 · SNS 등 홈페이지에 필요한 기본 연결 지원"이 Quick Start(49만원)에만
적혀 있었다. 기존 홈페이지 맞춤 개선(120만원부터)과 맞춤 홈페이지 제작(250만원부터)에는 이 줄이 없어서, 비싼 상품이
더 적게 연결해 주는 것처럼 읽혔다. 이제 B · C · D가 같은 줄을 갖는다. 별도 견적은 예약 · 결제 같은 복잡한 외부 시스템
연동뿐이다.

재디자인이 아니다. 레이아웃, 비교표 구조, 토글, badge, 가격, VAT 문구, Founding Partner, Quick Start 수정 지원 문구는
그대로다. 바뀐 화면은 `/pricing` 하나이고 랜딩(`/`)의 글자는 한 글자도 바뀌지 않았다.

---

## Report

```
TASK = BASIC CONNECTION SCOPE ALIGNMENT

B_BASIC_CONNECTIONS = INCLUDED   (V2.4와 같은 문구. 이제 공통 상수에서 읽는다)
C_BASIC_CONNECTIONS = INCLUDED   (새로 추가. 현재 홈페이지에서 연결 가능한 범위라는 단서를 붙였다)
D_BASIC_CONNECTIONS = INCLUDED   (새로 추가)
A                   = 해당 없음   (기존 홈페이지 연동은 홈페이지 작업이 없다. 그대로)

BASIC_CONNECTION_COPY = "카카오톡 상담 · 지도 · 전화 · SNS 등 홈페이지에 필요한 기본 연결 지원"
                        B · C · D의 "보안 연결 · 점검" 항목. 세 상품이 글자까지 같다 (lib/pricing.ts BASIC_CONNECTIONS 하나)
                        compact: "카카오톡 · 지도 · 전화 · SNS 등 기본 연결" (C 안내 문구, FAQ 1문항)

ADVANCED_INTEGRATION = SEPARATE QUOTE
                       B: "예약 · 결제 등 복잡한 외부 시스템 연동은 별도 견적" (그대로)
                       C · D 안내 문구: "… 예약 · 결제 등 복잡한 외부 시스템 연동 … 은 범위를 확인한 뒤 별도 견적을 안내합니다."
                                        ("예약 · 결제 등"을 붙였다. 무엇이 '복잡한 연동'인지 B와 같은 말로 읽힌다)
                       C · D "기본 범위 밖의 작업": "복잡한 외부 시스템 연동 … 범위 확인 후 별도 견적" (그대로)

QUICK_START_EDIT_POLICY = UNCHANGED
                          "홈페이지 내용 수정이 필요한 경우 요청해주시면 반영을 지원합니다."
                          횟수 · 유료 조건 추가 없음. 인기상품 badge, "Quick Start 예시 보기", 제목 · 설명 그대로

PRICING  = UNCHANGED   290,000 / 490,000 / 1,200,000부터 / 2,500,000부터 · 88,000 / 198,000 / 297,000
VAT      = UNCHANGED   전부 VAT 포함. 문구 그대로
FOUNDING = UNCHANGED   lib/partner.ts · Partner.tsx 변경 없음

TYPECHECK = PASS  (next typegen && tsc --noEmit, exit 0)
LINT      = PASS  (eslint, exit 0)
BUILD     = PASS  (next build, 10/10 static pages)
TEST      = PASS  (npm test, 16/16 — 1개 추가)
PRODUCTION QA = PASS  public alias 기준, 배포 후 실행
                반응형 48 상태 · 접근성 124 체크 · 기본 연결 줄 63 체크 · 링크 47개 · 예시 사이트 40 체크
                horizontal overflow 0 · console error 0 · failed request 0 · broken image 0 · broken link 0
                Quick Start demo = 200

GIT    = 6b7775f fix: align basic connection scope across website packages → origin/main
         (파일 3개, force push 없음. `prompt`는 커밋하지 않았다) + 이 보고서 커밋
VERCEL = READY (Production)  6b7775f → GitHub status "Vercel = success"
         https://boost-interior-sales-gz4gongz2-vnfm0580s-projects.vercel.app

HOME    = https://boost-interior-sales.vercel.app
PRICING = https://boost-interior-sales.vercel.app/pricing
DEMO    = https://interior-demo.boostweb.co.kr
```

---

## Changed files

| 파일 | 변경 |
| --- | --- |
| `lib/pricing.ts` | `BASIC_CONNECTIONS` · `BASIC_CONNECTIONS_SHORT` 상수 추가. B는 같은 문구를 상수로 읽고, C · D의 "보안 연결 · 점검"에 같은 항목 추가. C의 범위 밖 · 안내 문구에 단서 한 줄, C · D 안내 문구에 "예약 · 결제 등" |
| `lib/pricing-page.ts` | FAQ "Quick Start와 맞춤 홈페이지 제작은 무엇이 다른가요?"의 마지막 문장 |
| `tests/pricing.test.mjs` | 기본 연결 테스트 1개 추가 (기존 "scope wording" 테스트에서 연결 부분을 떼어 넓혔다) |

컴포넌트, CSS, `lib/site.ts`, `lib/partner.ts`, `app/*`는 건드리지 않았다. 새 라이브러리 없음. Next.js API를 쓰는 코드는
바꾸지 않았다.

---

## Before / after customer copy

`/pricing`의 문서 전체 글자를 배포 전(V2.4, f9aa783)과 배포 후(6b7775f)로 뽑아 비교했다. 아래가 차이의 전부다.
랜딩(`/`)은 차이 0줄.

### "보안 연결 · 점검" 항목 (펼친 비교표 + 각 상품의 "전체 포함 범위")

| | V2.4 | V2.5 |
| --- | --- | --- |
| B Quick Start | 보안 연결 / **기본 연결 지원** / 오픈 전 기본 점검 | (그대로) |
| C 기존 홈페이지 맞춤 개선 | 흐름 점검 | **기본 연결 지원** / 흐름 점검 |
| D 맞춤 홈페이지 제작 | 보안 연결 | 보안 연결 / **기본 연결 지원** |

"기본 연결 지원" = `카카오톡 상담 · 지도 · 전화 · SNS 등 홈페이지에 필요한 기본 연결 지원`. 세 칸이 같은 문장이다.
항목 수는 C 9 → 10, D 10 → 11, B 11 그대로 ("홈페이지 작업 N개 항목" 제목은 자동으로 바뀐다).

### C 기존 홈페이지 맞춤 개선 — 단서 (prompt §8, 과도한 보장 금지)

기존 홈페이지는 고객이 만든 것이라 연결할 수 있는 범위가 사이트마다 다르다. 항목 자체는 B · D와 같은 문장으로 두고,
단서는 두 곳에 붙였다.

| | V2.4 | V2.5 |
| --- | --- | --- |
| 기본 범위 밖의 작업 (펼친 표) | 추가 페이지 · 특수 기능 · 복잡한 외부 시스템 연동 · 기존 홈페이지 관리 기능 재개발은 범위 확인 후 별도 견적 | (같은 문장)**, 현재 홈페이지 구조상 추가 개발이 필요한 연결은 범위 확인 후 안내** |
| 안내 문구 (카드에 항상 보임) | … 추가 페이지, 특수 기능, 복잡한 외부 시스템 연동은 범위를 확인한 뒤 별도 견적을 안내합니다. | … 추가 페이지, 특수 기능, **예약 · 결제 등** 복잡한 외부 시스템 연동은 범위를 확인한 뒤 별도 견적을 안내합니다. **카카오톡 · 지도 · 전화 · SNS 등 기본 연결은 현재 홈페이지에서 연결 가능한 범위에서 지원하며, 추가 개발이 필요한 경우 범위를 먼저 확인합니다.** |

### D 맞춤 홈페이지 제작

| | V2.4 | V2.5 |
| --- | --- | --- |
| 안내 문구 | … 추가 페이지, 특수 기능, 복잡한 외부 시스템 연동, 고급 화면 효과 … | … 추가 페이지, 특수 기능, **예약 · 결제 등** 복잡한 외부 시스템 연동, 고급 화면 효과 … |

D의 "기본 범위 밖의 작업"은 그대로다.

### FAQ — Quick Start와 맞춤 홈페이지 제작은 무엇이 다른가요?

| V2.4 | V2.5 |
| --- | --- |
| … BoostInterior 기본 구축은 두 방식 모두 동일하게 포함됩니다. | … **카카오톡 · 지도 · 전화 · SNS 등 기본 연결과** BoostInterior 기본 구축은 두 방식 모두 동일하게 포함됩니다. |

49만원과 250만원의 차이를 묻는 문항이라, 차이가 홈페이지 제작 범위이지 연락수단 연결 유무가 아니라는 점(prompt §14)을
여기에 한 구절로 적었다. 나머지 FAQ 11문항은 그대로다.

### 링크와 개발의 구분 (prompt §5)

고객 문구에는 "기본 연결"과 "복잡한 외부 시스템 연동" 두 말만 쓴다. 카카오톡 링크 · 전화 버튼 · 지도 표시 ·
SNS 링크는 기본이고, 카카오 메시징 API · 콜센터 연동 · DM 자동화 · 지도 기반 기능 개발은 "복잡한 외부 시스템 연동"에
들어간다. 이 표를 페이지에 새로 싣지는 않았다 (카피를 늘리지 않는 작업이라서). 테스트는 B · C · D의 "기본 범위 밖의 작업"에
카카오 · 지도 · 전화 · SNS가 나오면 실패하게 했다.

---

## Not changed

- 접힌 비교표의 8개 행과 값. 연결 행을 새로 만들지 않았다 (prompt §6: 현재 comparison 구조 유지)
- 랜딩 카드의 핵심 3줄, Quick Start 블록의 칩 6개 · 예시 사이트 줄
- SEO · 보안 문구, 시공사례 용어, "AI가 찾아줄 수 있도록 정리", Founding Partner, AI Portfolio Video, 3D, Hero, Story
- 네이버: 기본 연결 문구는 "카카오톡 · 지도 · 전화 · SNS"를 그대로 썼다. 넓히지 않은 이유는 아래 Contact channels

---

## Contact channels · demo (prompt §10 – §12)

- 판매 사이트에 `Contact Channels` · `Launcher` · `BoostChat`이라는 말은 0건이다. 테스트가 `app` · `components` · `lib`
  전체에서 검사한다
- 예시 사이트(`https://interior-demo.boostweb.co.kr`)의 상담창을 production에서 열어 봤다 (1440). 버튼은 상담창 열기 ·
  닫기 · 사업자 정보 보기 · 전송, 링크는 하단 "Powered by boostchat" 하나였다. 카카오톡 · 네이버 · 전화 같은 다른
  문의방법 버튼은 보이지 않았다. 상담창에 문의 채널 기능이 배포됐는지는 이 화면만으로 확인하지 못했다. 이 위젯에 설정이
  안 된 것일 수도 있다
- 그래서 네이버를 기본 연결 문구에 넣지 않았고, "다른 문의방법도 연결 가능" 같은 문장도 새로 쓰지 않았다. 기본 연결
  문구와 충돌하는 내용은 없다. 기본 연결은 홈페이지의 링크와 버튼 이야기이고 상담창 기능을 약속하지 않는다
- 예시 사이트 link QA는 V2.4와 같은 스크립트로 다시 돌렸다 — 40개 체크 통과 (아래 Production QA)
- 판매 사이트에 예시 사이트를 복제하거나 iframe으로 넣지 않았다. 새 탭 링크 그대로다

---

## Tests

`npm test` 16/16. 추가한 것은 `basic connections: B / C / D include the same ones, only complex integration is quoted separately`.

- B · C · D 각각 "기본 연결" 항목이 정확히 하나이고 `BASIC_CONNECTIONS`와 같다. D에서 빠지면 실패한다 (C · B도 같다)
- 세 상품 모두 "보안 연결 · 점검" 묶음에 있다
- 세 상품 모두 "기본 범위 밖의 작업"에 `복잡한 외부 시스템 연동 … 별도 견적`이 있고, 카카오 · 지도 · 전화 · SNS는 없다
- A(기존 홈페이지 연동)에는 기본 연결 항목이 없다
- C · D 안내 문구에 `예약 · 결제 등 복잡한 외부 시스템 연동 … 별도 견적`
- C의 단서 두 곳 (안내 문구, 기본 범위 밖의 작업)
- FAQ 문장이 두 상수를 읽는다
- `app` · `components` · `lib` 전체에 "외부 서비스", `Contact Channels`, `Launcher` 0건

기존 "scope wording" 테스트는 개선 범위 문구 검사만 남겼다. 나머지 14개 테스트는 손대지 않았고 그대로 통과한다.

---

## Responsive (prompt §17)

Production, Playwright Chromium, 토글 7개를 전부 편 상태. 기본 연결 줄이 화면에 나오는 6곳(펼친 비교표의 B · C · D,
세 상품의 "전체 포함 범위")을 폭마다 쟀다. 63개 체크 통과.

| 폭 | 비교표 형태 | 기본 연결 줄 | 줄 수 (표 / 상품 블록) | overflow |
| --- | --- | --- | --- | --- |
| 1440 | 표, B · C · D 열 | 칸 안, 잘림 없음 | 2 / 2 | 0 |
| 1024 | 표, B · C · D 열 | 칸 안, 잘림 없음 | 4 / 2 | 0 |
| 768 | 선택형 패널 | B · C · D 선택 시 표시, A는 없음 | 1 / 2 | 0 |
| 390 | 선택형 패널 | B · C · D 선택 시 표시, A는 없음 | 2 / 2 | 0 |
| 375 | 선택형 패널 | B · C · D 선택 시 표시, A는 없음 | 2 / 2 | 0 |

1024에서 표의 칸이 가장 좁아 네 줄로 접히지만 칸을 넘지 않는다. C의 "기본 범위 밖의 작업" 칸은 1024에서
일곱 줄이다.

`/pricing` 높이 (V2.4 → V2.5, 접힘 / 펼침):
1440 9,153 → 9,195 / 13,079 → 13,142 · 1024 10,652 → 10,673 / 15,565 → 15,685 · 768 9,863 → 9,904 / 14,215 → 14,334 ·
390 12,410 → 12,493 / 18,204 → 18,397 · 375 12,635 → 12,697 / 18,621 → 18,793.
접힌 상태에서 늘어난 것은 C 카드의 안내 문구 한 문장이다.

---

## Production QA (prompt §18)

Production alias(`https://boost-interior-sales.vercel.app`), 6b7775f 배포 후 실행. V2.4와 같은 스크립트다.

| 검사 | 결과 |
| --- | --- |
| 반응형 (`/` · `/pricing`, 1440 · 1280 · 1024 · 768 · 390 · 375 + reduced motion 2, 접힘 / 펼침 / 상품 선택 / 다시 접힘) | 48 상태 통과. horizontal overflow 0, 가격 줄바꿈 0, 잘림 0, 글자 넘침 0, broken image 0 |
| console error / failed request | 0 / 0 (전 상태) |
| 접근성 (토글 7개, 키보드, 선택형 패널, reduced motion) | 124 체크 통과. 기대값 V2.4와 같음 |
| 기본 연결 줄 (5개 폭) | 63 체크 통과 |
| 링크 (`/` 27개, `/pricing` 20개) | 페이지 안 anchor 누락 0. 외부 · 내부 URL 4종 모두 200 |
| Quick Start demo | `https://interior-demo.boostweb.co.kr` 200. 1440 · 390 · 375에서 "Quick Start 예시 보기" → 새 탭, 이미지 · 상담창 · 대표 프로젝트 · 상담 문의 폼까지 40 체크 통과 |

실제 기기(iPhone · Android)에서는 이번 배포를 확인하지 않았다. Chromium의 390 · 375 폭으로만 봤다.

---

## Screenshots

Production alias에서 Playwright Chromium으로 찍었다. `assets/v2-5-connection-scope/`.

| | BEFORE (V2.4) | AFTER (V2.5) |
| --- | --- | --- |
| 펼친 구축 비교표 1440 | [before](./assets/v2-5-connection-scope/before-setup-table-expanded-1440.png) | [after](./assets/v2-5-connection-scope/after-setup-table-expanded-1440.png) |
| 펼친 구축 비교표 1024 | | [after](./assets/v2-5-connection-scope/after-setup-table-expanded-1024.png) |
| 선택형 패널, C 선택 | [390](./assets/v2-5-connection-scope/before-setup-panel-expanded-C-390.png) | [768](./assets/v2-5-connection-scope/after-setup-panel-expanded-C-768.png) · [390](./assets/v2-5-connection-scope/after-setup-panel-expanded-C-390.png) |
| 선택형 패널, D 선택 | | [390](./assets/v2-5-connection-scope/after-setup-panel-expanded-D-390.png) · [375](./assets/v2-5-connection-scope/after-setup-panel-expanded-D-375.png) |
| C 블록, 전체 포함 범위 | | [1440](./assets/v2-5-connection-scope/after-improvement-expanded-1440.png) |
| D 블록, 전체 포함 범위 | | [390](./assets/v2-5-connection-scope/after-custom-expanded-390.png) |

---

## Open items

1. **예시 사이트에 기본 연결이 보이지 않는다.** Quick Start 예시 사이트(`/` · `/contact`)에서 연락 링크는 `mailto:` 하나뿐이다.
   카카오톡 · 지도 · 전화 · SNS 링크가 없다. 판매 페이지는 Quick Start에 이 연결이 포함된다고 쓰고 바로 옆에서 이 예시를
   보여주므로, 예시 사이트에 가상의 카카오톡 · 전화 · 지도 · SNS 연결을 넣는 편이 맞다. 판매 사이트 저장소 밖의 일이라
   이번에 손대지 않았다.
2. **D의 "보안 연결 · 점검"은 아직 B보다 한 줄 짧다.** B에는 "오픈 전 기본 점검"이 있고 D에는 없다 (B 3줄, D 2줄).
   이번 작업 범위는 기본 연결이라 넣지 않았다. D에도 같은 점검을 약속해도 되는지 정해 주면 한 줄로 끝난다.
3. **C · D의 "기본 범위 밖의 작업" 칸에는 "예약 · 결제 등"을 붙이지 않았다.** 가운뎃점으로 이어진 목록이라
   "특수 기능 · 예약 · 결제 등 복잡한 …"처럼 읽기 어려워진다. 쉼표로 이어지는 안내 문구에만 붙였다.
4. **네이버.** 상담창의 문의 채널 기능이 네이버를 지원하고 배포된 것이 확인되면, 기본 연결 문구를
   "카카오톡 · 네이버 · 전화 · SNS"로 넓힐지 정하면 된다. `BASIC_CONNECTIONS` 한 곳만 고치면 B · C · D가 함께 바뀐다.
5. **QA 스크립트**는 세션 scratchpad에 있고 저장소에는 넣지 않았다. 저장소에 들어간 것은 `tests/pricing.test.mjs`와
   스크린샷 10장(약 2.2MB)이다.
