import Image from "next/image";
import Reveal from "@/components/reveal";
import SectionEyebrow from "@/components/section-eyebrow";

const GROUPS = [
  {
    heading: "국가대표 선수단과 함께",
    photos: [
      { src: "/figma/athlete-1.jpg", alt: "국가대표 선수단과 함께한 의료진" },
      { src: "/figma/athlete-2.jpg", alt: "국가대표 선수단 의무 지원 현장" },
    ],
  },
  {
    heading: "정확한 진단, 세심한 치료",
    photos: [
      { src: "/figma/care-1.jpg", alt: "환자를 진단하는 의료진" },
      { src: "/figma/care-2.jpg", alt: "세심하게 치료 중인 의료진" },
    ],
  },
];

export default function AthleteCare() {
  return (
    <section className="flex w-full flex-col items-center gap-6 bg-[#f9fafc] px-5 py-10">
      <Reveal className="w-full">
        <SectionEyebrow label="ATHLETE CARE" title="국가대표가 찾는 병원" />
      </Reveal>
      {GROUPS.map((group, i) => (
        <Reveal key={group.heading} className="w-full" delay={0.08 * (i + 1)}>
          <div className="flex flex-col gap-2">
            <h3 className="flex items-center gap-[10px] text-[15px] font-bold text-deep">
              <span aria-hidden className="size-1 rounded-[2px] bg-gold" />
              {group.heading}
            </h3>
            <div className="flex gap-[6px]">
              {group.photos.map((photo) => (
                <div
                  key={photo.src}
                  // 원본과 동일한 3:2 — 잘림 없이 사진 전체가 보인다
                  className="relative aspect-[3/2] flex-1 overflow-hidden rounded-lg"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    quality={100}
                    sizes="(max-width: 720px) 45vw, 320px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
