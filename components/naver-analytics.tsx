"use client";

import Script from "next/script";
import { useEffect } from "react";

// 네이버 검색광고 > 도구 > 전환추적 공통 스크립트 계정 ID
const NAVER_WA = "s_1fb45e1c178";

type Wcs = {
  inflow: () => void;
  cnv: (type: string, value: string) => string;
};

declare global {
  interface Window {
    wcs?: Wcs;
    wcs_add?: Record<string, string>;
    wcs_do?: (nasa?: Record<string, string>) => void;
  }
}

function setAccount() {
  window.wcs_add = window.wcs_add || {};
  window.wcs_add.wa = NAVER_WA;
}

/**
 * 네이버 공통 스크립트 + 전환 스크립트.
 * 네이버 예약(booking.naver.com)·전화(tel:) 링크 클릭을 "신청/예약"(4) 전환으로 보낸다.
 * 버튼마다 onClick을 달지 않고 문서 전체 클릭을 위임받아, 새 예약 버튼이 생겨도 자동 적용된다.
 */
export default function NaverAnalytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest?.('a[href*="booking.naver.com"], a[href^="tel:"]')) return;
      if (!window.wcs || !window.wcs_do) return;
      setAccount();
      window.wcs_do({ cnv: window.wcs.cnv("4", "1") });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <Script
      src="https://wcs.naver.net/wcslog.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (!window.wcs || !window.wcs_do) return;
        setAccount();
        window.wcs.inflow();
        window.wcs_do();
      }}
    />
  );
}
