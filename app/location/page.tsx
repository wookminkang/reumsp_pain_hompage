import type { Metadata } from "next";
import Image from "next/image";
import ColumnHeader from "@/components/columns/column-header";
import SiteFooter from "@/components/site-footer";
import BottomCta from "@/components/bottom-cta";
import NaverMap from "@/components/naver-map";
import { CLINIC, SITE_URL, TEL_HREF } from "@/lib/clinic";
import { breadcrumbJsonLd, JsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "오시는길",
  description: `${CLINIC.name} 오시는길 안내. ${CLINIC.address}, 5호선 둔촌동역·9호선 올림픽공원역 도보 약 10분. 지하철·버스·주차·진료시간 정보를 한 페이지에 정리했습니다.`,
  alternates: { canonical: "/location" },
};

/** 인포 카드 공통 셸 — 페이지 전용의 단순 반복 레이아웃 */
function InfoCard({
  icon,
  title,
  children,
  darkIcon = false,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  /** 흰색 스트로크 아이콘(ic-iv 등)은 네이비 원 배경으로 */
  darkIcon?: boolean;
}) {
  return (
    <section className="rounded-2xl bg-cream/70 p-6">
      <div className="flex items-center gap-3">
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-full ${darkIcon ? "bg-navy" : "bg-white"}`}
        >
          <Image src={icon} alt="" width={18} height={18} />
        </span>
        <h2 className="text-[17px] font-bold text-ink">{title}</h2>
      </div>
      <div className="mt-4 text-[14.5px] leading-[1.8] text-ink/80">
        {children}
      </div>
    </section>
  );
}

export default function LocationPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", url: SITE_URL },
          { name: "오시는길" },
        ])}
      />
      <ColumnHeader />
      <main className="mx-auto w-full max-w-[720px] px-5 pb-24 pt-10">
        <header>
          <h1 className="text-[26px] font-bold leading-[1.4] tracking-[-0.01em] text-ink lg:text-[32px]">
            오시는 길
          </h1>
          <p className="mt-4 text-[15px] leading-[1.8] text-muted">
            {CLINIC.name}는 {CLINIC.address}에 있습니다. 지하철 두 개 노선과
            버스, 자가용 모두 편리하며 365일 진료합니다.
          </p>
        </header>

        <div className="mt-8">
          <NaverMap />
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={CLINIC.naverMapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-navy px-4 py-2 text-[13.5px] font-semibold text-white"
            >
              네이버지도에서 보기
            </a>
            <a
              href={TEL_HREF}
              className="rounded-full bg-gold px-4 py-2 text-[13.5px] font-semibold text-white"
            >
              전화 {CLINIC.tel}
            </a>
            <a
              href={CLINIC.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-navy/20 px-4 py-2 text-[13.5px] font-semibold text-navy"
            >
              네이버 예약
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5">
          <InfoCard icon="/figma/ic-pin.svg" title="주소">
            <p>{CLINIC.address}</p>
            <p className="mt-1 text-[13.5px] text-muted">
              내비게이션에 위 주소 또는 &quot;{CLINIC.name}&quot;을 검색하세요.
            </p>
          </InfoCard>

          <InfoCard icon="/figma/ic-subway.svg" title="지하철·버스">
            <ul className="flex flex-col gap-2">
              {CLINIC.transit.map((t) => (
                <li key={t.mode}>
                  <p className="font-semibold text-ink">{t.mode}</p>
                  <p>{t.guide}</p>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard icon="/figma/ic-parking.svg" title="주차 안내">
            <ul className="flex flex-col gap-1.5">
              {CLINIC.parking.map((p) => (
                <li key={p.case} className="flex flex-wrap justify-between gap-x-4">
                  <span>{p.case}</span>
                  <span className="font-semibold text-ink">{p.benefit}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[13.5px] text-muted">
              주차장은 건물 뒷편에 있습니다.
            </p>
          </InfoCard>

          <InfoCard icon="/figma/ic-arrow-right.svg" title="픽업·드랍 차량" darkIcon>
            <p>
              {CLINIC.shuttle.target}으로 픽업·드랍 차량을 운영합니다. 대표전화(
              {CLINIC.tel})로 예약하며, 접수는 {CLINIC.shuttle.reservationHours}{" "}
              선착순입니다.
            </p>
            <p className="mt-3 text-[13.5px] text-muted">
              항암·방사선 치료 목적 외의 내원에는 운영되지 않습니다.
            </p>
          </InfoCard>

          <InfoCard icon="/figma/ic-iv.svg" title="입원 병동" darkIcon>
            <p>
              입원 병동 {CLINIC.beds}개 병상을 운영하며,{" "}
              {CLINIC.roomTypes.join("·")} 중 선택할 수 있습니다. 365일 입원이
              가능합니다.
            </p>
            <p className="mt-3 text-[13.5px] text-muted">
              병실 배정과 입원 상담은 전화로 문의해 주세요.
            </p>
          </InfoCard>

          <InfoCard icon="/figma/ic-pin.svg" title="진료시간">
            <ul className="flex flex-col gap-1.5">
              {CLINIC.hours.map((h) => (
                <li key={h.label} className="flex flex-wrap justify-between gap-x-4">
                  <span>{h.label}</span>
                  <span className="font-semibold text-ink">{h.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[13.5px] text-muted">
              365일 진료·입원이 가능합니다. 일·공휴일과 야간 방문 전에는 전화로
              접수 시간을 확인해 주세요.
            </p>
          </InfoCard>
        </div>
      </main>
      <SiteFooter />
      <BottomCta />
    </>
  );
}
