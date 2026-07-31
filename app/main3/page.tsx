import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import DesktopSidebar from "@/components/desktop-sidebar";
import Hero3 from "@/components/main3/hero3";
import CancerCenterLink from "@/components/cancer-center-link";
import AthleteCare from "@/components/athlete-care";
import MedicalTeam3 from "@/components/main3/medical-team3";
import PainClinic3 from "@/components/main3/pain-clinic3";
import TreatmentIcons from "@/components/treatment-icons";
import Collaboration from "@/components/collaboration";
import ResearchCarousel from "@/components/research-carousel";
import FacilityCarousel from "@/components/facility-carousel";
import HealthyMeal from "@/components/healthy-meal";
import ConsultationPremium from "@/components/main2/consultation-premium";
import Location from "@/components/location";
import SiteFooter from "@/components/site-footer";
import BottomCta from "@/components/bottom-cta";
import { CLINIC } from "@/lib/clinic";

export const metadata: Metadata = {
  title: `${CLINIC.name} 통증 치료 클리닉 — 메인 3`,
  // 시안 비교용 변형 페이지 — 검색엔진 중복 노출 방지
  robots: { index: false, follow: false },
};

export default function Main3() {
  return (
    <>
      <SiteHeader />
      <div className="lg:flex lg:min-h-svh lg:justify-center lg:gap-10 lg:bg-[#ece5d8]">
        <DesktopSidebar />
        <main className="mx-auto w-full max-w-[720px] lg:my-8 lg:mx-0 lg:w-[460px] lg:max-w-none lg:overflow-hidden lg:rounded-[20px] lg:bg-white lg:shadow-[0_20px_60px_rgba(10,31,35,0.14)]">
        <Hero3 />
        <CancerCenterLink />
        <AthleteCare />
        <MedicalTeam3 />
        <PainClinic3 />
        <TreatmentIcons />
        <Collaboration />
        <ResearchCarousel />
        <FacilityCarousel />
        <HealthyMeal />
        <ConsultationPremium />
        <Location />
        <SiteFooter />
        </main>
      </div>
      <BottomCta />
    </>
  );
}
