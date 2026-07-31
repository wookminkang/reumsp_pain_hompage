import Image from "next/image";
import Reveal from "@/components/reveal";
import { CLINIC } from "@/lib/clinic";

export default function MedicalTeam3() {
  return (
    <section id="medical-team" className="w-full scroll-mt-14 bg-cream px-6 py-20">
      <Reveal>
        <p className="text-center text-[12px] font-semibold uppercase tracking-[4px] text-gold">
          Medical Team
        </p>
        <p className="mt-4 text-center text-[14px] leading-[1.7] text-black/50">
          {CLINIC.name} 의료진 소개
        </p>
        <h2 className="mt-3 text-center text-[26px] font-bold leading-[1.4] tracking-[-0.4px] text-ink">
          전 의료진 전문의/석·박사 진료
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <div className="relative mx-auto mt-10 aspect-[354/149] w-full max-w-[560px] overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_rgba(10,31,35,0.12)]">
          <Image
            src="/figma/medical-team.png"
            alt={`${CLINIC.name} 의료진 단체 사진`}
            fill
            quality={90}
            sizes="(max-width: 720px) 100vw, 560px"
            className="object-cover object-top"
          />
        </div>
      </Reveal>
    </section>
  );
}
