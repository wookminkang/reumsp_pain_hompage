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
  // 365일 진료·입원 가능 (2026-08-06 담당자 확인). 일·공휴일·야간 구체 시간대는 미확정 — 전화 확인 안내로 표기.
  hours: [
    { label: "평일", value: "09:00 – 18:00" },
    { label: "토요일", value: "09:00 – 13:00" },
    { label: "일·공휴일", value: "진료·입원 가능 (전화 확인)" },
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
  /** 진료 센터 (분과 진료 체계) */
  centers: [
    {
      name: "통합내과센터",
      features: "수술 직후 회복, 항암·방사선 부작용(오심, 구토, 면역저하 등) 관리",
    },
    { name: "여성암면역센터", features: "유방암, 부인암, 림프부종 관리" },
    {
      name: "암재활·통증센터",
      features: "수술 후 재활, 말초신경병증, 관절운동 회복",
    },
    { name: "한방치료센터", features: "침, 약침, 추나, 한약 등" },
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
  /** 대중교통 안내 */
  transit: [
    {
      mode: "지하철 9호선",
      guide: "올림픽공원역 1·2번 출구 도보 약 10분, 둔촌오륜역 1~4번 출구 도보 약 10분",
    },
    { mode: "지하철 5호선", guide: "둔촌동역 3번 출구 도보 약 10분" },
    {
      mode: "버스 (오륜교회 앞, 서울체육중고등학교)",
      guide: "지선 3220, 3319",
    },
    {
      mode: "버스 (서울성내동우체국)",
      guide: "지선 3214, 3316, 3412, 3413",
    },
    {
      mode: "버스 (한국전력공사 강동송파지사)",
      guide: "지선 3214, 3316, 3412, 3413 / 마을 1, 7(안촌·갈미행), 8",
    },
  ],
  /** 주차 안내 — 네비게이션 주소는 address와 동일 */
  parking: [
    { case: "당일 입·퇴원", benefit: "2시간 주차 무료" },
    { case: "외래진료 (접수부터 수납까지)", benefit: "2시간 주차 무료" },
    { case: "입원환자 면회", benefit: "2시간 주차 무료" },
  ],
  /**
   * 리움 계열 지점 (연계 안내·GEO 브랜드 엔티티 강화용).
   * 2026-08-14 네이버 지역검색·리움 브랜드 페이지 기준 확인.
   * 종로점은 게재 제외(2026-08-14 사용자 지시).
   * 부천 리움한의원은 동명의 무관한 의원이므로 추가 금지.
   */
  network: [
    {
      name: "리움한의원 둔촌포레온",
      type: "한의원",
      focus: "피부·미용·체형 교정 중심",
      address: "서울 강동구 양재대로 1360, 포레온스테이션5 3층",
      url: "https://reumdc.com",
    },
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
 * 사이트 절대 URL (canonical·OG·sitemap·JSON-LD에 사용).
 * Vercel이 apex(reumpainclinic.com)를 www로 308 리다이렉트하므로
 * 실제 서빙 도메인인 www를 canonical로 쓴다. 프리뷰/로컬에서도 canonical이
 * 운영 도메인을 가리키는 것이 SEO상 올바른 동작이다.
 * 특수한 경우에만 NEXT_PUBLIC_SITE_URL로 재정의한다.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.reumpainclinic.com";
