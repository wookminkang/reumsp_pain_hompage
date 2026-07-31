import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import DesktopSidebar from "@/components/desktop-sidebar";
import HeroPremium from "@/components/main2/hero-premium";
import StatsBand from "@/components/main2/stats-band";
import AthleteCare from "@/components/athlete-care";
import Philosophy from "@/components/main2/philosophy";
import SpecialtyRow from "@/components/main2/specialty-row";
import Hanbang from "@/components/main2/hanbang";
import ConsultationPremium from "@/components/main2/consultation-premium";
import Location from "@/components/location";
import SiteFooter from "@/components/site-footer";
import BottomCta from "@/components/bottom-cta";
import { CLINIC } from "@/lib/clinic";

export const metadata: Metadata = {
  title: `${CLINIC.name} 통증 치료 클리닉 — 메인 2`,
  // 시안 비교용 변형 페이지 — 검색엔진 중복 노출 방지
  robots: { index: false, follow: false },
};

export default function Main2() {
  return (
    <>
      <SiteHeader />
      <div className="lg:flex lg:min-h-svh lg:justify-center lg:gap-10 lg:bg-[#ece5d8]">
        <DesktopSidebar />
        <main className="mx-auto w-full max-w-[720px] bg-navy lg:my-8 lg:mx-0 lg:w-[460px] lg:max-w-none lg:overflow-hidden lg:rounded-[20px] lg:shadow-[0_20px_60px_rgba(10,31,35,0.28)]">
        <HeroPremium />
        <StatsBand />
        <AthleteCare />
        <Philosophy />
        <SpecialtyRow />
        <Hanbang />
        <ConsultationPremium />
        <Location />
        <SiteFooter />
        </main>
      </div>
      <BottomCta />
    </>
  );
}
