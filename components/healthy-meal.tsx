import Image from "next/image";
import Parallax from "@/components/parallax";
import Reveal from "@/components/reveal";
import SectionEyebrow from "@/components/section-eyebrow";

const THUMBS = ["/figma/meal-1.jpg", "/figma/meal-2.jpg", "/figma/meal-3.jpg"];

export default function HealthyMeal() {
  return (
    <section className="flex w-full flex-col items-center gap-6 bg-cream px-5 py-10">
      <Reveal className="w-full">
        <SectionEyebrow label="HEALTHY MEAL CARE" title="리움한방병원 식단" />
      </Reveal>
      <Reveal className="w-full" delay={0.1}>
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-[192px] w-full overflow-hidden rounded-lg">
            <Parallax className="absolute inset-0" amount={9} scale={1.14}>
              <Image
                src="/figma/meal-main.jpg"
                alt="리움한방병원 입원 환자 식단"
                fill
                quality={100}
                sizes="(max-width: 720px) 100vw, 680px"
                className="object-cover"
              />
            </Parallax>
          </div>
          <div className="flex gap-[6px]">
            {THUMBS.map((src, i) => (
              <div
                key={src}
                className="relative h-[61px] w-[113px] overflow-hidden rounded-lg"
              >
                <Image
                  src={src}
                  alt={`식단 예시 ${i + 1}`}
                  fill
                  quality={100}
                  sizes="113px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="text-center text-[14px] leading-[1.75] text-black/80">
          10가지가 넘는 치료식이가 제공 가능한, 보다 전문적인 리움한방병원
          식이팀이 체계적인 식사를 제공합니다.
        </p>
      </Reveal>
    </section>
  );
}
