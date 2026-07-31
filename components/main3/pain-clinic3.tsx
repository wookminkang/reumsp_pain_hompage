import Image from "next/image";
import Reveal from "@/components/reveal";

const SPECIALTIES = [
  { src: "/figma/specialty-1.jpg", label: "교통사고 후유증" },
  { src: "/figma/specialty-2.jpg", label: "수술 후 재활" },
  { src: "/figma/specialty-3.jpg", label: "목 · 허리 통증" },
  { src: "/figma/specialty-4.jpg", label: "어깨 · 무릎 통증" },
];

export default function PainClinic3() {
  return (
    <section
      id="pain-clinic"
      className="w-full scroll-mt-14 bg-[#0d2429] px-6 py-20"
    >
      <Reveal>
        <p className="text-center text-[12px] font-semibold uppercase tracking-[4px] text-gold">
          Pain Clinic
        </p>
        <p className="mt-4 text-center text-[15px] text-white/70">
          리움한방병원 통증 치료 클리닉
        </p>
        <h2 className="mt-3 text-center text-[25px] font-bold leading-[1.5] tracking-[-0.4px] text-white">
          한방재활의학과 전문의 직접진료
          <br />
          양·한방 동시 진료 가능
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <ul className="mx-auto mt-12 grid w-fit grid-cols-2 gap-x-4 gap-y-6">
          {SPECIALTIES.map((item) => (
            <li
              key={item.label}
              className="relative size-[150px] overflow-hidden rounded-full border border-gold/50 shadow-[0_10px_36px_rgba(0,0,0,0.4)]"
            >
              <Image
                src={item.src}
                alt=""
                fill
                quality={100}
                sizes="150px"
                className="object-cover"
              />
              <p className="absolute inset-0 flex items-center justify-center text-center text-[16px] font-bold text-white [text-shadow:0_4px_4px_rgba(0,0,0,0.35)]">
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mx-auto mt-14 flex w-[352px] max-w-full items-start gap-3">
        <Reveal className="flex-1" delay={0.05}>
          <figure className="pt-2">
            <div className="relative h-[233px] w-full overflow-hidden rounded-2xl shadow-[0_16px_44px_rgba(0,0,0,0.45)]">
              <Image
                src="/figma/chuna-room.jpg"
                alt="추나치료실"
                fill
                quality={100}
                sizes="350px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-[15px] font-semibold text-white/85">
              추나치료
            </figcaption>
          </figure>
        </Reveal>
        <Reveal className="flex-1" delay={0.15}>
          <figure className="pt-10">
            <div className="relative h-[233px] w-full overflow-hidden rounded-2xl shadow-[0_16px_44px_rgba(0,0,0,0.45)]">
              <Image
                src="/figma/doctor-1.jpg"
                alt="전문의 진료 모습"
                fill
                quality={100}
                sizes="350px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-[15px] font-semibold text-white/85">
              전문의 치료
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-14 max-w-[340px] border-y border-white/15 px-4 py-9">
          <p className="text-center text-[19px] font-medium leading-[1.65] text-white">
            의원, 한의원 따로 가지 말고 리움한방병원에서
            <br />
            <span className="font-bold text-gold">진단부터 치료까지 한번에!</span>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
