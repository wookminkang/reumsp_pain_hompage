import Image from "next/image";
import Parallax from "@/components/parallax";
import Reveal from "@/components/reveal";

const TREATMENTS = [
  { icon: "/figma/ic-xray.svg", label: "X-ray" },
  { icon: "/figma/ic-blood.svg", label: "혈액검사" },
  { icon: "/figma/ic-iv.svg", label: "수액치료" },
  { icon: "/figma/ic-manual.svg", label: "도수치료" },
  { icon: "/figma/ic-hanbang.svg", label: "한방치료" },
  { icon: "/figma/ic-chuna.svg", label: "추나치료" },
];

export default function TreatmentIcons() {
  return (
    <section
      id="treatments"
      className="relative flex h-[383px] w-full items-center justify-center overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0">
        <Parallax className="absolute inset-0">
          <Image
            src="/figma/treatment-bg.png"
            alt=""
            fill
            quality={90}
            sizes="(max-width: 720px) 150vw, 1080px"
            className="object-cover object-[22%_55%]"
          />
        </Parallax>
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <Reveal className="relative">
        <ul className="grid w-[290px] grid-cols-3 gap-x-11 gap-y-8">
          {TREATMENTS.map((item) => (
            <li key={item.label} className="flex flex-col items-center gap-[14px]">
              <span className="flex h-[67px] w-full items-center justify-center rounded-full bg-white/20 backdrop-blur-[2.4px]">
                <Image src={item.icon} alt="" width={29} height={29} />
              </span>
              <p className="text-center text-[16.2px] font-semibold text-white">
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
