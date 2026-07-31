import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CLINIC, SITE_URL } from "@/lib/clinic";

const TITLE = `${CLINIC.name} 통증 치료 클리닉`;
const DESCRIPTION =
  "국가대표가 찾는 한·양방 협진 통증 치료. 한방재활의학과 전문의 직접진료, 365일 야간·공휴일 진료/입원 가능. 교통사고 후유증, 수술 후 재활, 목·허리·어깨·무릎 통증 치료 — 서울 강동구 리움한방병원 강동송파.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "리움한방병원",
    "강동 한방병원",
    "송파 한방병원",
    "통증 클리닉",
    "교통사고 후유증",
    "추나치료",
    "한양방 협진",
    "도수치료",
  ],
  alternates: { canonical: "/" },
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
      <head>
        {/* LCP 히어로 배경 preload */}
        <link
          rel="preload"
          as="image"
          href="/figma/hero-building.jpg"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full bg-white">{children}</body>
    </html>
  );
}
