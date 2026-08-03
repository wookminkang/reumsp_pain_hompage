/**
 * GEO(생성형 엔진 최적화) 칼럼 콘텐츠 타입.
 *
 * 레퍼런스 원고 공식을 타입으로 강제한다:
 * - summary: 최상단 핵심 요약 4문장 (튜플로 개수 강제, 각 문장은 구체 숫자를 포함한 자기완결형)
 * - faq: 최소 3개 (FAQPage JSON-LD로 자동 변환되므로 answer는 마크업 없는 평문)
 * - 본문은 Block 유니언으로만 구성 — 자유 HTML을 허용하지 않아 구조 이탈과 XSS를 차단
 */

export type InlineToken =
  | string
  | { text: string; href: string; external?: boolean }
  | { text: string; bold: true };

/** 문단 = 인라인 토큰 배열. 평문 + 링크 + 강조만 허용. */
export type Inline = InlineToken[];

export interface ColumnImage {
  /** /public 기준 경로 (예: "/images/columns/slug-thumbnail.png") */
  src: string;
  /** 대체 텍스트 — 이미지 검색·접근성·GEO 모두에 사용 */
  alt: string;
  caption?: string;
}

export type Block =
  | { type: "paragraph"; content: Inline }
  | { type: "image"; image: ColumnImage }
  | {
      /** 번호 매긴 선택 기준 (H3 목록) — "핵심 기준 N가지" 섹션용 */
      type: "criteria";
      items: { title: string; body: Inline[] }[];
    }
  | { type: "table"; caption: string; headers: string[]; rows: string[][] }
  | { type: "checklist"; title: string; items: string[] }
  | { type: "callout"; tone: "info" | "warning"; title?: string; content: Inline };

export interface ColumnSection {
  /** TOC 앵커 id (영문 kebab-case) */
  id: string;
  /** H2 소제목 — 타깃 키워드를 자연스럽게 포함 */
  heading: string;
  blocks: Block[];
}

export interface Faq {
  question: string;
  /** FAQPage JSON-LD에 그대로 들어가므로 평문으로 작성 (2~4문장 자기완결형) */
  answer: string;
}

export type ColumnCategory = "지역·증상" | "랜드마크" | "치료 정보";

export interface ColumnArticle {
  /** URL 경로 (영문 kebab-case) — 공유 시 percent-encoding 깨짐 방지 */
  slug: string;
  /** "[정확일치 키워드] — [질문형 서브타이틀]" 패턴 */
  title: string;
  /** 정확일치 타깃 키워드 (본문 H1·H2·문단에 반복 배치) */
  keyword: string;
  /** meta description (80~110자, 키워드 포함) */
  description: string;
  /** 핵심 요약 4문장 — AI가 이 박스만 발췌해도 완결되도록 각 문장에 구체 숫자 포함 */
  summary: [string, string, string, string];
  category: ColumnCategory;
  /** 상단 썸네일 (16:9 권장) — Article JSON-LD의 image, og:image로도 사용 */
  thumbnail?: ColumnImage;
  /** ISO 날짜 "YYYY-MM-DD" */
  datePublished: string;
  dateModified: string;
  sections: ColumnSection[];
  /** 최소 3개 — 질문은 검색 질의형, 답변은 자기완결형 평문 */
  faq: [Faq, Faq, Faq, ...Faq[]];
  /** 내부링크 (다른 칼럼 slug) */
  relatedSlugs?: string[];
  /** 공식기관 출처 외부링크 (신뢰 시그널) */
  references?: { label: string; href: string }[];
}
