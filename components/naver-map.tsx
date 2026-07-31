"use client";

import Script from "next/script";
import { useCallback, useRef, useState } from "react";
import { CLINIC } from "@/lib/clinic";

const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

type NaverMaps = {
  Map: new (el: HTMLElement, options: unknown) => unknown;
  LatLng: new (lat: number, lng: number) => unknown;
  Marker: new (options: unknown) => unknown;
  Point: new (x: number, y: number) => unknown;
  Position: { TOP_RIGHT: unknown };
};

declare global {
  interface Window {
    naver?: { maps: NaverMaps };
    /** 네이버 지도 인증 실패 시 SDK가 호출하는 전역 콜백 */
    navermap_authFailure?: () => void;
  }
}

/** 지도를 못 띄울 때 보여줄 대체 링크 (네이버지도 앱/웹으로 이동) */
function MapFallback({ reason }: { reason?: string }) {
  return (
    <a
      href={CLINIC.naverMapSearchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-[186px] w-full flex-col items-center justify-center gap-1 rounded-[14px] border border-dashed border-[#c9cdc8] bg-white/50"
    >
      <span className="text-[14px] font-semibold text-black/80">
        네이버지도에서 위치 보기 →
      </span>
      {reason && <span className="text-[12px] text-black/40">{reason}</span>}
    </a>
  );
}

/**
 * 네이버 다이나믹 지도.
 * NEXT_PUBLIC_NAVER_MAP_CLIENT_ID가 있으면 SDK를 로드해 병원 위치 마커를 표시하고,
 * 키가 없거나 인증에 실패하면 네이버지도 링크로 폴백한다.
 */
export default function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  const initMap = useCallback(() => {
    const naver = window.naver;
    if (!naver || !mapRef.current) return;

    const center = new naver.maps.LatLng(CLINIC.geo.lat, CLINIC.geo.lng);
    const map = new naver.maps.Map(mapRef.current, {
      center,
      zoom: 17,
      // 확대/축소 UI는 숨기되 조작(핀치·더블클릭·더블탭)은 그대로 동작시킨다.
      // 휠 줌만 끈다 — 페이지를 스크롤하다 지도에서 멈추는 것을 막기 위함.
      zoomControl: false,
      scrollWheel: false,
      pinchZoom: true,
      disableDoubleClickZoom: false,
      disableDoubleTapZoom: false,
      draggable: true,
    });

    new naver.maps.Marker({
      position: center,
      map,
      title: CLINIC.name,
      icon: {
        content: `<div style="transform:translate(-50%,-100%);white-space:nowrap;display:flex;flex-direction:column;align-items:center;">
            <div style="background:#0a1f23;padding:8px 14px;border-radius:999px;box-shadow:0 4px 12px rgba(10,31,35,.3);display:flex;align-items:center;gap:7px;">
              <img src="/figma/logo.svg" alt="" style="height:16px;display:block" />
            </div>
            <div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0a1f23"></div>
          </div>`,
      },
    });

    setReady(true);
  }, []);

  const handleScriptLoad = useCallback(() => {
    // 인증 실패 시 SDK가 이 콜백을 호출한다 → 폴백으로 전환
    window.navermap_authFailure = () => setFailed(true);
    initMap();
  }, [initMap]);

  if (!CLIENT_ID) return <MapFallback />;
  if (failed) return <MapFallback reason="지도 인증에 실패했습니다" />;

  return (
    <div className="w-full">
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${CLIENT_ID}`}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={() => setFailed(true)}
      />
      <div className="relative h-[186px] w-full overflow-hidden rounded-[14px] border border-line">
        <div
          ref={mapRef}
          role="application"
          aria-label={`${CLINIC.name} 지도`}
          className="size-full"
        />
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-[13px] text-black/40">
            지도를 불러오는 중…
          </div>
        )}
      </div>
      <a
        href={CLINIC.naverMapSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 block text-right text-[13px] font-semibold text-gold"
      >
        네이버지도로 길찾기 →
      </a>
    </div>
  );
}
