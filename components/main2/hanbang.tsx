import Image from "next/image";
import Reveal from "@/components/reveal";

const TREATMENTS = [
  { name: "침 · 약침", desc: "통증 부위와 원인에 맞춘 시술" },
  { name: "추나치료", desc: "관절·근막의 정렬을 바로잡는 수기 치료" },
  { name: "한약 처방", desc: "회복 단계에 맞춘 맞춤 처방" },
  { name: "도수 · 물리치료", desc: "양방 재활과의 협진 관리" },
];

export default function Hanbang() {
  return (
    <section className="w-full bg-[#0d2429]">
      <div className="relative h-[300px]">
        <Image
          src="/ai/herbs-luxury.jpg"
          alt="한약재와 약탕"
          fill
          quality={100}
          sizes="(max-width: 720px) 100vw, 720px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/10 to-[#0d2429]" />
      </div>
      <div className="px-7 pb-20 pt-2">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[4px] text-gold">
            Oriental Medicine
          </p>
          <h2 className="mt-4 text-[27px] font-bold leading-[1.4] tracking-[-0.4px] text-white">
            정성으로 짓는
            <br />
            치료의 기본
          </h2>
        </Reveal>
        <ul className="mt-10 flex flex-col">
          {TREATMENTS.map((item, i) => (
            <Reveal key={item.name} delay={0.06 * i}>
              <li className="flex items-baseline justify-between gap-4 border-b border-white/10 py-5">
                <p className="shrink-0 text-[17px] font-bold text-white">
                  {item.name}
                </p>
                <p className="text-right text-[13px] leading-[1.6] text-white/50">
                  {item.desc}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
