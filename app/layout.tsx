import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CLINIC, SITE_URL } from "@/lib/clinic";

const TITLE = `${CLINIC.name}, 365일 한·양방 협진 통증 치료`;
// 네이버는 앞 80자 내외만 노출 — 엔티티(지역·종별)와 핵심 차별점(365일·입원)을 선두 배치.
// "전문의" 표기는 자격 확인 전 사용 금지(의료법), 담당자 답변 후 복원 검토.
const DESCRIPTION =
  "서울 강동구, 송파 인접의 한·양방 협진 한방병원. 365일 야간·공휴일 진료와 입원(65병상)이 가능합니다. 교통사고 후유증, 허리·목 디스크, 수술 후 재활 통증을 진료원장 6인 체계로 진료하며, 지하철 둔촌동역·올림픽공원역에서 도보 약 10분입니다.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${CLINIC.shortName}` },
  description: DESCRIPTION,
  keywords: [
    "리움한방병원",
    "강동구 한방병원",
    "송파 한방병원",
    "강동구 교통사고 한방병원",
    "허리디스크 한방병원",
    "추나치료",
    "한양방 협진",
    "도수치료",
  ],
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/rss.xml" },
  },
  // 서치어드바이저·서치콘솔 소유확인 — .env.local에 코드 입력 시 메타태그 출력
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION ??
      "ntNZJwU1uNtFa-8-6jCoxKBpRWBN7PyYusPTukoyKRw",
    // 소유확인 코드는 공개 메타값이라 코드에 직접 기록 (env로 재정의 가능)
    other: {
      "naver-site-verification":
        process.env.NAVER_SITE_VERIFICATION ??
        "53f8d023e60070866f1b62d06446c28a96572e5d",
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: CLINIC.name,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a1f23",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      {/* 히어로 배경은 next/image priority가 preload를 처리한다 */}
      <body className="min-h-full bg-white">{children}</body>
    </html>
  );
}
