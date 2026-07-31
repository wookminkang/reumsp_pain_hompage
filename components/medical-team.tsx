import Image from "next/image";
import Parallax from "@/components/parallax";
import Reveal from "@/components/reveal";
import SectionEyebrow from "@/components/section-eyebrow";
import { CLINIC } from "@/lib/clinic";

export default function MedicalTeam() {
  return (
    <section
      id="medical-team"
      className="w-full scroll-mt-14 bg-gradient-to-b from-[#f9fafc] to-[#dfe1eb] px-5 pb-4 pt-6"
    >
      <Reveal className="flex w-full flex-col items-center">
        <SectionEyebrow label="MEDICAL TEAM" />
        <p className="mt-1 text-center text-[16px] text-black/80">
          {CLINIC.name} 의료진 소개
        </p>
        <h2 className="mt-2 text-center text-[24px] font-bold text-black/80">
          전 의료진 전문의/석·박사 진료
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <div className="relative mx-auto mt-7 aspect-[354/149] w-full max-w-[560px] overflow-hidden">
          <Parallax className="absolute inset-0" amount={8} scale={1.12}>
            <Image
              src="/figma/medical-team.png"
              alt={`${CLINIC.name} 의료진 단체 사진`}
              fill
              quality={90}
              sizes="(max-width: 720px) 100vw, 560px"
              className="object-cover object-top"
            />
          </Parallax>
        </div>
      </Reveal>
    </section>
  );
}
