/** 병원 정보 단일 소스 — 모든 컴포넌트·SEO 메타데이터가 이 값을 참조한다. */
export const CLINIC = {
  name: "리움한방병원 강동송파",
  shortName: "리움한방병원",
  address: "서울 강동구 강동대로 243 (성내동, 풍원빌딩)",
  addressRegion: "서울특별시",
  addressLocality: "강동구",
  streetAddress: "강동대로 243 (성내동, 풍원빌딩)",
  tel: "02-6416-1010",
  bizNumber: "334-98-01651",
  hours: [
    { label: "평일", value: "09:00 – 18:00" },
    { label: "토요일", value: "09:00 – 13:00" },
    { label: "일 · 공휴일", value: "휴진" },
  ],
  /** 입원 병동 병상 수 */
  beds: 65,
  /** 병실 구성 */
  roomTypes: ["1인실", "2인실", "3인실", "4인실"],
  /** 진료원장 (대표원장 우선) */
  doctors: [
    { name: "도성국", title: "대표원장" },
    { name: "한아람", title: "원장" },
    { name: "최대홍", title: "원장" },
    { name: "강소현", title: "원장" },
    { name: "김수정", title: "원장" },
    { name: "이성덕", title: "원장" },
  ],
  /** 층별 시설 안내 (지하 2층 ~ 지상 6층) */
  floors: [
    { floor: "6층", facilities: "휴라운지, 웰니스스튜디오, 입원병동 (601~603호)" },
    { floor: "5층", facilities: "입원병동 (501~506호)" },
    { floor: "4층", facilities: "입원병동 (401~406호)" },
    { floor: "3층", facilities: "입원병동 (301~306호)" },
    { floor: "2층", facilities: "고압산소치료센터, 입원병동 (201~204호)" },
    { floor: "1층", facilities: "원무과(접수·수납), 상담실, 힐링센터, 면회라운지" },
    { floor: "지하 1층", facilities: "외래진료센터, 검사실(X-ray), 고주파치료센터, 물리치료실, 주사실" },
    { floor: "지하 2층", facilities: "재활치료센터" },
  ],
  reservationUrl: "https://booking.naver.com/booking/13/bizes/1069712",
  // TODO: 암센터 전용 페이지 URL 확정되면 교체 (현재 공식 사이트 루트)
  cancerCenterUrl: "https://www.reumsp.com",
  naverMapSearchUrl:
    "https://map.naver.com/p/search/리움한방병원%20강동송파",
  // 리움한방병원 강동송파점(강동대로 243, 성내동 449-16) 실좌표 — 네이버 지역검색 기준
  geo: { lat: 37.5223977, lng: 127.1329931 },
} as const;

export const TEL_HREF = `tel:${CLINIC.tel.replace(/-/g, "")}`;

/**
 * 사이트 절대 URL (OG 이미지·sitemap·JSON-LD에 사용).
 * 1) 직접 지정한 NEXT_PUBLIC_SITE_URL
 * 2) Vercel이 빌드 시 주입하는 운영 도메인 (환경변수 설정 없이도 동작)
 * 3) 로컬 개발
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
