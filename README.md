# 리움한방병원 강동송파 — 통증 치료 클리닉 랜딩 (0731)

Figma **mobile_A** 시안(fileKey `VVw5dMcMqWrz7xL5TJX1PT`, node `59:2566`, 393×6551) 기반 모바일 원페이지 랜딩.

## 스택

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4 (`@theme` 디자인 토큰)
- Motion (`motion/react`) — 섹션 스크롤 리빌, 드로어 전환
- GSAP + ScrollTrigger — 히어로 진입/패럴랙스, 연구 차트(막대 성장·카운트업·비교바)
- 폰트: Pretendard Variable (jsdelivr CDN)

## 실행

```bash
npm run dev    # http://localhost:3000
npm run build  # 프로덕션 빌드
```

## 섹션 ↔ Figma 노드 매핑

| 컴포넌트 | 노드 | 비고 |
|---|---|---|
| `site-header` | 59:2928 | 고정 헤더 + Motion 드로어 |
| `hero` | 59:2568 | GSAP 진입 타임라인 + 스크롤 패럴랙스, LCP preload |
| `cancer-center-link` | 59:2580 | 암센터 배너 |
| `athlete-care` | 59:2584 | 국가대표가 찾는 병원 |
| `medical-team` | 59:2605 | `#medical-team` |
| `pain-clinic` | 59:2613 | 진료분야 원형 4종 · `#pain-clinic` |
| `treatment-icons` | 59:2646 | 치료·검사 6종 (시안상 X-ray/혈액검사 동일 아이콘) |
| `collaboration` | 59:2681 | 콜라주 + 협진 카피 · `#collaboration` |
| `research-carousel` | 59:2697 | 카드 3종 스냅 스크롤 + GSAP 차트 |
| `facility-carousel` | 59:2784 | 4슬라이드, 자동전환 4s, 스와이프/도트/화살표 · `#facility` |
| `healthy-meal` | 59:2807 | 식단 |
| `consultation` | 59:2825 | 진료시간 + CTA · `#consultation` |
| `location` | 59:2848 | 네이버맵 폴백 구조 · `#location` |
| `site-footer` | 59:2890 | 실 병원정보 |
| `bottom-cta` | 59:2922 | 하단 고정 바 (main `pb-14`) |

## 데이터 단일 소스

병원명·주소·전화·사업자번호·진료시간·예약 URL·좌표는 전부 [lib/clinic.ts](lib/clinic.ts)에서 관리.

## SEO

- `app/layout.tsx`: metadataBase / OG(`public/og.png` 1200×630) / twitter / robots / canonical
- `app/page.tsx`: JSON-LD `MedicalClinic` (주소·좌표·진료시간·제공 치료)
- `app/sitemap.ts`, `app/robots.ts`
- 배포 도메인 확정 시 `NEXT_PUBLIC_SITE_URL` 환경변수 설정 (기본값: `lib/clinic.ts`의 SITE_URL)

## 네이버 지도

`NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`(네이버 클라우드 플랫폼 Maps JS API)를 `.env.local`에 넣으면
오시는 길에 실제 지도가 렌더링됩니다. 키가 없으면 "네이버지도에서 위치 보기" 링크 폴백.
`.env.example` 참고. 좌표는 `lib/clinic.ts`의 `geo` (풍원빌딩 근사값 — 키 적용 후 마커 위치 확인 필요).

## 남은 작업 (TODO)

- [ ] 네이버맵 클라이언트 ID 발급 후 `.env.local` 설정 + 마커 좌표 검수
- [ ] 지하철 도보 안내 문구 확정 ([components/location.tsx](components/location.tsx))
- [ ] 주차 상세 안내(시간·요금) 확정
- [ ] 암센터 바로가기 정확한 URL 확정 (현재 reumsp.com 루트)
- [ ] 연구 카드 3(Lee 외 2021)의 실제 PubMed 원문 링크 확인 — 현재 검색 링크로 대체
- [ ] 배포 도메인 확정 후 `NEXT_PUBLIC_SITE_URL` 설정 (Vercel 환경변수)

## /main2 — 프리미엄 시안 (비교용)

`app/main2/page.tsx` — OpenAI 생성 이미지(`public/ai/`, gpt-image-1) 기반 다크 럭셔리 버전. `robots: noindex` 처리됨.
구성: `components/main2/` — hero-premium(시네마틱 줌+패럴랙스) → stats-band(카운트업) → 국가대표(공용) → philosophy → specialty-row → hanbang → consultation-premium → 오시는길·푸터(공용).
이미지 재생성: `OPENAI_API_KEY=... python3 scripts/gen-image.py <출력파일> <크기> "<프롬프트>"` (키는 `.env.local`).

## /main3 — 메인1 사진 유지 + 프리미엄 스타일 (비교용)

`app/main3/page.tsx` — 메인1의 사진·콘텐츠는 그대로, 메인2의 프리미엄 타이포/모션을 적용한 버전. `robots: noindex`.
전용 컴포넌트: `components/main3/` — hero3(건물 사진 + 시네마틱 타이포), medical-team3(크림+카드), pain-clinic3(딥네이비+골드 링). 나머지 섹션은 메인1/메인2 컴포넌트 재사용.

## 에셋

`public/figma/` — Figma export 원본을 시맨틱 이름으로 정리 (총 ~20MB, 사진 1200px 리사이즈, 히어로만 1600px).
일부 파일은 확장자 .png지만 JPEG 바이트 (sips 경고, 렌더링 무관).
