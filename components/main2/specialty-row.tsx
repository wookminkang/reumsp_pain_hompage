import Image from "next/image";
import Reveal from "@/components/reveal";

const SPECIALTIES = [
  { src: "/figma/specialty-1.png", label: "교통사고 후유증" },
  { src: "/figma/specialty-2.png", label: "수술 후 재활" },
  { src: "/figma/specialty-3.png", label: "목 · 허리 통증" },
  { src: "/figma/specialty-4.png", label: "어깨 · 무릎 통증" },
];

export default function SpecialtyRow() {
  return (
    <section id="pain-clinic" className="w-full scroll-mt-14 bg-navy px-6 py-20">
      <Reveal>
        <p className="text-center text-[12px] font-semibold uppercase tracking-[4px] text-gold">
          Pain Clinic
        </p>
        <h2 className="mt-4 text-center text-[27px] font-bold leading-[1.4] tracking-[-0.4px] text-white">
          한방재활의학과 전문의
          <br />
          직접진료
        </h2>
        <p className="mt-4 text-center text-[14px] leading-[1.7] text-white/55">
          의원, 한의원 따로 가지 말고
          <br />
          진단부터 치료까지 한 번에.
        </p>
      </Reveal>
      <ul className="mt-12 grid grid-cols-2 gap-4">
        {SPECIALTIES.map((item, i) => (
          <Reveal key={item.label} delay={0.08 * i}>
            <li className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="relative aspect-square">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  quality={90}
                  sizes="(max-width: 720px) 45vw, 320px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-transparent" />
                <p className="absolute inset-x-0 bottom-4 text-center text-[15px] font-bold text-white">
                  {item.label}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
