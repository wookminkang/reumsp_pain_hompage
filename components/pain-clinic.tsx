import Image from "next/image";
import Reveal from "@/components/reveal";

const SPECIALTIES = [
  { src: "/figma/specialty-1.webp", label: "교통사고 후유증" },
  { src: "/figma/specialty-2.webp", label: "수술 후 재활" },
  { src: "/figma/specialty-3.webp", label: "목 · 허리 통증" },
  { src: "/figma/specialty-4.webp", label: "어깨 · 무릎 통증" },
];

export default function PainClinic() {
  return (
    <section
      id="pain-clinic"
      className="flex w-full scroll-mt-14 flex-col items-center gap-8 bg-gradient-to-b from-navy to-[#123037] py-12"
    >
      <Reveal className="w-full">
        <div className="flex flex-col items-center gap-4 text-center text-white">
          <p className="text-[16px] text-white/70">리움한방병원 통증 치료 클리닉</p>
          <h2 className="text-[24px] font-bold leading-[1.5]">
            한방재활의학과 전문의 직접진료
            <br />
            양·한방 동시 진료 가능
          </h2>
          <span aria-hidden className="h-px w-12 bg-gold/70" />
        </div>
      </Reveal>

      <div className="flex flex-col items-center gap-10">
        <Reveal>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6">
            {SPECIALTIES.map((item) => (
              <li
                key={item.label}
                className="relative size-[150px] overflow-hidden rounded-full border-2 border-gold/60"
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  quality={100}
                  sizes="150px"
                  className="object-cover"
                />
                {/* 라벨 가독성을 위한 스크림 */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent"
                />
                <p className="absolute inset-x-0 bottom-[38px] text-center text-[16px] font-bold text-white">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="flex w-[352px] max-w-full items-start gap-2 px-0">
          <Reveal className="w-[172px]" delay={0.05}>
            <figure className="pt-[10px]">
              <div className="relative h-[233px] w-full overflow-hidden rounded-[14px]">
                <Image
                  src="/figma/chuna-room.jpg"
                  alt="추나치료실"
                  fill
                  quality={100}
                  sizes="350px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-center text-[16px] font-semibold text-white">
                추나치료
              </figcaption>
            </figure>
          </Reveal>
          <Reveal className="w-[172px]" delay={0.15}>
            <figure className="pt-[42px]">
              <div className="relative h-[233px] w-full overflow-hidden rounded-[14px]">
                <Image
                  src="/figma/doctor-1.jpg"
                  alt="전문의 진료 모습"
                  fill
                  quality={100}
                  sizes="350px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-center text-[16px] font-semibold text-white">
                전문의 치료
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <div className="mx-6 w-[345px] max-w-full border-y border-gold/30 px-10 py-[37px]">
          <p className="text-center text-[19px] font-medium leading-[1.5] text-white">
            의원, 한의원 따로 가지 말고 리움한방병원에서
            <br />
            진단부터 치료까지 한번에!
          </p>
        </div>
      </Reveal>
    </section>
  );
}
