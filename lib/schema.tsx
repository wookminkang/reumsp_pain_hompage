import { CLINIC, SITE_URL } from "@/lib/clinic";
import type { ColumnArticle } from "@/lib/columns/types";

/** 사이트 전역에서 병원 엔티티를 참조하는 안정 식별자 */
export const CLINIC_ID = `${SITE_URL}/#clinic`;

/**
 * JSON-LD 스크립트 렌더러.
 * Next 16 공식 가이드 권장대로 `<`를 이스케이프해 XSS를 차단한다.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** 병원 본체 스키마 — 홈(/)에서만 출력하고, 다른 페이지는 @id로 참조한다. */
export const CLINIC_JSON_LD = {
  "@context": "https://schema.org",
  // 65병상 입원 병동을 갖춘 병원급 의료기관 — numberOfBeds는 Hospital 타입 속성
  "@type": ["MedicalClinic", "Hospital"],
  "@id": CLINIC_ID,
  name: CLINIC.name,
  alternateName: [CLINIC.shortName, "리움한방병원 강동송파점"],
  // 365일 진료·입원 가능(담당자 확인) — 일·공휴일 구체 시간대 미확정이라
  // openingHoursSpecification에는 정규 외래만 두고, 전체 운영 사실은 description으로 명시
  description:
    "서울 강동구·송파구 생활권의 한·양방 협진 한방병원. 365일 진료와 입원이 가능하며, 정규 외래는 평일 09:00~18:00, 토요일 09:00~13:00입니다. 야간·일요일·공휴일 진료와 입원은 전화 확인 후 이용할 수 있습니다.",
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  // 동일 엔티티의 다른 공식 프로필 — AI·검색엔진의 엔티티 통합(정체성 확인) 신호
  sameAs: [CLINIC.cancerCenterUrl, CLINIC.reservationUrl],
  telephone: CLINIC.tel,
  address: {
    "@type": "PostalAddress",
    addressCountry: "KR",
    addressRegion: CLINIC.addressRegion,
    addressLocality: CLINIC.addressLocality,
    streetAddress: CLINIC.streetAddress,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: CLINIC.geo.lat,
    longitude: CLINIC.geo.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  medicalSpecialty: ["PhysicalMedicineAndRehabilitation", "Oncologic"],
  numberOfBeds: CLINIC.beds,
  department: CLINIC.centers.map((center) => ({
    "@type": "MedicalClinic",
    name: center.name,
    description: center.features,
  })),
  employee: CLINIC.doctors.map((doctor) => ({
    "@type": "Person",
    name: doctor.name,
    jobTitle: doctor.title,
  })),
  availableService: [
    { "@type": "MedicalTherapy", name: "추나치료" },
    { "@type": "MedicalTherapy", name: "침·약침 치료" },
    { "@type": "MedicalTherapy", name: "도수치료" },
    { "@type": "MedicalTherapy", name: "수액치료" },
    { "@type": "MedicalTherapy", name: "한약 처방" },
    { "@type": "MedicalTherapy", name: "고압산소치료" },
    { "@type": "MedicalTherapy", name: "고주파온열치료" },
    { "@type": "MedicalTherapy", name: "물리치료" },
    { "@type": "MedicalTherapy", name: "재활치료" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: CLINIC.tel,
    contactType: "reservations",
    url: CLINIC.reservationUrl,
  },
};

/** 공식 홈페이지 WebSite 스키마 — 홈(/)에서 병원 본체와 함께 출력 */
export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: `${CLINIC.name} 공식 홈페이지`,
  alternateName: CLINIC.shortName,
  publisher: { "@id": CLINIC_ID },
  inLanguage: "ko-KR",
};

const columnUrl = (slug: string) => `${SITE_URL}/columns/${slug}`;

/**
 * 칼럼 페이지를 단독으로 파싱하는 크롤러를 위해 @id 참조에 최소 정보를 인라인 병기.
 * 전체 엔티티(병상·의료진·진료시간 등)는 홈(/)의 CLINIC_JSON_LD가 제공한다.
 */
const CLINIC_REF = {
  "@type": ["MedicalClinic", "Hospital"],
  "@id": CLINIC_ID,
  name: CLINIC.name,
  url: SITE_URL,
  telephone: CLINIC.tel,
};

export function articleJsonLd(article: ColumnArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${columnUrl(article.slug)}#article`,
    headline: article.title,
    description: article.description,
    keywords: article.keyword,
    articleSection: article.category,
    ...(article.thumbnail
      ? {
          image: {
            "@type": "ImageObject",
            url: `${SITE_URL}${article.thumbnail.src}`,
            caption: article.thumbnail.alt,
          },
        }
      : {}),
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    inLanguage: "ko-KR",
    author: CLINIC_REF,
    publisher: CLINIC_REF,
    mainEntityOfPage: columnUrl(article.slug),
    // AI·음성 검색이 우선 발췌할 영역 지정 (제목 + 핵심 요약)
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#article-title", "#article-summary"],
    },
  };
}

export function faqJsonLd(article: ColumnArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${columnUrl(article.slug)}#faq`,
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}
