import Image from "next/image";
import Reveal from "@/components/reveal";

export default function Philosophy() {
  return (
    <section className="relative w-full overflow-hidden bg-navy">
      <div className="relative h-[420px]">
        <Image
          src="/ai/hands-care.jpg"
          alt="환자의 어깨에 손을 얹은 의료진"
          fill
          quality={90}
          sizes="(max-width: 720px) 100vw, 720px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[4px] text-gold">
              Philosophy
            </p>
            <blockquote className="mt-5 text-[26px] font-bold leading-[1.5] tracking-[-0.4px] text-white">
              같은 통증은 없습니다.
              <br />
              원인을 찾는 진료가
              <br />
              먼저입니다.
            </blockquote>
            <p className="mt-5 text-[14px] leading-[1.8] text-white/60">
              의학적 진찰과 검사로 통증의 원인을 확인하고
              <br />
              치료 반응을 살피며 단계적으로 회복을 관리합니다.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
