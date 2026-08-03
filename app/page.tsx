import SiteHeader from "@/components/site-header";
import DesktopSidebar from "@/components/desktop-sidebar";
import Hero from "@/components/hero";
import CancerCenterLink from "@/components/cancer-center-link";
import AthleteCare from "@/components/athlete-care";
import MedicalTeam from "@/components/medical-team";
import PainClinic from "@/components/pain-clinic";
import TreatmentIcons from "@/components/treatment-icons";
import Collaboration from "@/components/collaboration";
import ResearchCarousel from "@/components/research-carousel";
import FacilityCarousel from "@/components/facility-carousel";
import HealthyMeal from "@/components/healthy-meal";
import Consultation from "@/components/consultation";
import Location from "@/components/location";
import SiteFooter from "@/components/site-footer";
import BottomCta from "@/components/bottom-cta";
import { CLINIC_JSON_LD, JsonLd } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <JsonLd data={CLINIC_JSON_LD} />
      <SiteHeader />
      {/* 데스크탑: 좌측 사이드바 + 우측 콘텐츠 컬럼 / 모바일: 단일 컬럼 */}
      <div className="lg:flex lg:min-h-svh lg:justify-center lg:gap-10 lg:bg-[#ece5d8]">
        <DesktopSidebar />
        {/* 하단 고정 CTA(56px)만큼 pb 확보 */}
        <main className="mx-auto w-full max-w-[720px] lg:my-8 lg:mx-0 lg:w-[460px] lg:max-w-none lg:overflow-hidden lg:rounded-[20px] lg:bg-white lg:shadow-[0_20px_60px_rgba(10,31,35,0.14)]">
        <Hero />
        <CancerCenterLink />
        <AthleteCare />
        <MedicalTeam />
        <PainClinic />
        <TreatmentIcons />
        <Collaboration />
        <ResearchCarousel />
        <FacilityCarousel />
        <HealthyMeal />
        <Consultation />
        <Location />
        <SiteFooter />
        </main>
      </div>
      <BottomCta />
    </>
  );
}
