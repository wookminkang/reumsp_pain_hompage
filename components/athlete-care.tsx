import Image from "next/image";
import Reveal from "@/components/reveal";
import SectionEyebrow from "@/components/section-eyebrow";

const GROUPS = [
  {
    heading: "국가대표&선수들이 계속해서 찾는 병원",
    photos: [
      {
        src: "/figma/athlete-1.jpg",
        alt: "야구선수 LG 송승기선수와 함께한 의료진",
        caption: "야구선수 LG 송승기선수",
      },
      {
        src: "/figma/athlete-2.jpg",
        alt: "클라이밍 올림픽 대표 신은철선수와 함께한 의료진",
        caption: "클라이밍 올림픽 대표 신은철선수",
      },
    ],
  },
  {
    heading: null,
    photos: [
      {
        src: "/figma/care-1.jpg",
        alt: "야구선수 NC 박민우선수와 함께한 의료진",
        caption: "야구선수 NC 박민우선수",
      },
      {
        src: "/figma/care-2.jpg",
        alt: "야구선수 두산 오명진선수와 함께한 의료진",
        caption: "야구선수 두산 오명진선수",
      },
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
        <Reveal key={group.photos[0].src} className="w-full" delay={0.08 * (i + 1)}>
          <div className="flex flex-col gap-2">
            {group.heading && (
              <h3 className="flex items-center gap-[10px] text-[15px] font-bold text-deep">
                <span aria-hidden className="size-1 rounded-[2px] bg-gold" />
                {group.heading}
              </h3>
            )}
            <div className="flex gap-[6px]">
              {group.photos.map((photo) => (
                <div key={photo.src} className="flex flex-1 flex-col gap-[6px]">
                  {/* 원본과 동일한 3:2 — 잘림 없이 사진 전체가 보인다 */}
                  <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      quality={100}
                      sizes="(max-width: 720px) 45vw, 320px"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-center text-[12.5px] font-medium text-deep">
                    {photo.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
