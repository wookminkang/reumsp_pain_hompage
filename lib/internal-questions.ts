/**
 * 담당자 확인 질문지 데이터 — docs/pending-questions.md와 동일 내용.
 * 답변 확정 시 docs 문서의 "답변 기록"에 옮겨 적고 사이트 표기를 일괄 수정한다.
 */
export interface QuestionItem {
  id: string;
  question: string;
  note?: string;
}

export interface QuestionSection {
  title: string;
  warning?: string;
  items: QuestionItem[];
}

export const QUESTION_SECTIONS: QuestionSection[] = [
  {
    title: "1. 진료 시간 (최우선)",
    warning:
      "현재 홈페이지에 '365일 야간·공휴일 진료/입원 가능'과 '일·공휴일 휴진'이 함께 표기되어 있어 통일이 필요합니다.",
    items: [
      {
        id: "hours-sunday",
        question: "일요일·공휴일에도 외래 접수가 가능한가요? 가능하다면 접수 시간은?",
        note: "예: 일·공휴일 09:00~13:00",
      },
      {
        id: "hours-night",
        question: "야간 진료는 몇 시까지인가요? 매일인가요, 특정 요일인가요?",
      },
      {
        id: "hours-365",
        question:
          "'365일 진료'의 정확한 의미는? (a) 외래도 365일 (b) 외래는 월~토, 입원 병동·응급 대응만 365일",
      },
      {
        id: "hours-lunch",
        question: "점심시간(진료 휴게)이 있나요? 있다면 몇 시부터 몇 시까지?",
      },
    ],
  },
  {
    title: "2. 의료진",
    warning:
      "현재 '진료원장 6인: 도성국 대표원장, 한아람·최대홍·강소현·김수정·이성덕 원장'으로 게재 중입니다. 틀리면 즉시 수정이 필요합니다.",
    items: [
      {
        id: "doctors-list",
        question: "진료원장 인원수와 성함·직함이 정확한가요? (추가·퇴사·표기 오류)",
      },
      {
        id: "doctors-specialty",
        question: "각 원장님의 전문의 자격과 전문 진료 분야는?",
        note: "예: 한방재활의학과 전문의 등",
      },
      {
        id: "doctors-review",
        question:
          "칼럼에 '감수: OOO 원장' 표기를 위해 감수 담당 원장님을 지정할 수 있나요?",
      },
      {
        id: "doctors-profile",
        question: "의료진 프로필(약력·학회 활동)을 홈페이지에 게재할 수 있나요?",
      },
    ],
  },
  {
    title: "3. 병상·병실",
    warning:
      "현재 '입원 병동 64개 병상, 1인실·2인실·3인실·4인실 구비(2층~6층)'로 게재 중입니다.",
    items: [
      {
        id: "beds-total",
        question:
          "총 병상 수 확인 완료 — 64개 병상 운영 (2026-08-20 담당자 확인, 사이트 전체 반영됨)",
      },
      {
        id: "rooms-count",
        question:
          "입원실(병실)은 총 몇 개인가요? 층별 안내로 계산하면 25실(6층 3실, 5층 6실, 4층 6실, 3층 6실, 2층 4실)인데 맞나요?",
      },
      {
        id: "rooms-types",
        question: "병실 타입별 개수는? (1인실 O개, 2인실 O개, 3인실 O개, 4인실 O개)",
      },
      {
        id: "rooms-floors",
        question:
          "층별 호실 범위가 정확한가요? (6층 601~603 / 5층 501~506 / 4층 401~406 / 3층 301~306 / 2층 201~204)",
      },
    ],
  },
  {
    title: "4. 진료·서비스",
    items: [
      {
        id: "service-herb",
        question: "첩약 건강보험 시범사업 참여 기관인가요?",
      },
      {
        id: "service-shuttle",
        question: "셔틀 운행 또는 보호자 동행 서비스가 있나요? (아산병원 통원 환자 대상)",
      },
      {
        id: "service-partnership",
        question: "서울아산병원 등과 공식 진료협력(협력의료기관) 관계가 있나요?",
        note: "공식 협약이 있으면 홈페이지에 표기 가능, 없으면 언급 금지 유지",
      },
      {
        id: "service-insurance",
        question: "고압산소치료·고주파온열치료(BSD-2000)의 건강보험 적용 여부는?",
      },
    ],
  },
  {
    title: "5. 비급여 고지",
    items: [
      {
        id: "nonpay-list",
        question:
          "비급여 진료비용 고지 페이지(가격표)가 준비되어 있나요? 항목·금액 리스트를 주시면 페이지로 만들 수 있습니다.",
        note: "병원급 의료기관은 홈페이지 게재 의무가 있습니다",
      },
    ],
  },
  {
    title: "6. 운영·계정",
    items: [
      {
        id: "ops-dns",
        question: "reumpainclinic.com 도메인의 DNS 관리 계정은 누가 갖고 있나요?",
      },
      {
        id: "ops-place",
        question:
          "네이버 스마트플레이스 관리 계정 접근이 가능한가요? '통증치료클리닉' 부속 플레이스의 홈페이지 필드에 reumpainclinic.com 등록을 요청드립니다.",
        note: "본 플레이스 홈페이지는 현재 reumsp.com으로 등록 확인됨",
      },
      {
        id: "ops-place-url",
        question:
          "네이버 지도의 플레이스 상세 URL(map.naver.com/p/entry/place/... 형태)을 알 수 있나요?",
      },
      {
        id: "ops-sns",
        question: "병원 공식 블로그·유튜브·인스타그램 계정이 있나요?",
      },
    ],
  },
];
