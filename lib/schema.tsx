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
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
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
  medicalSpecialty: ["PhysicalMedicineAndRehabilitation"],
  numberOfBeds: CLINIC.beds,
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
    { "@type": "MedicalTherapy", name: "고압산소치료" },
    { "@type": "MedicalTherapy", name: "고주파치료" },
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

const columnUrl = (slug: string) => `${SITE_URL}/columns/${slug}`;

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
    author: { "@id": CLINIC_ID },
    publisher: { "@id": CLINIC_ID },
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
