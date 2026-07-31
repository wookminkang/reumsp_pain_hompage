import Image from "next/image";
import Parallax from "@/components/parallax";
import Reveal from "@/components/reveal";

const COLLAGE = [
  { src: "/figma/consult.png", alt: "전문의 진료 상담", flip: false },
  { src: "/figma/oxygen-room.png", alt: "고압산소 치료실", flip: false },
  { src: "/figma/pulse-check.png", alt: "맥진 진찰", flip: false },
  { src: "/figma/pulse-check-2.png", alt: "맥진 진찰", flip: true },
  { src: "/figma/ward.png", alt: "입원실", flip: false },
  { src: "/figma/stretch.png", alt: "도수치료", flip: true },
];

export default function Collaboration() {
  return (
    <section
      id="collaboration"
      className="relative w-full scroll-mt-14 overflow-hidden border-y-[5px] border-white bg-white"
    >
      <Parallax className="grid grid-cols-2" amount={10} scale={1.14}>
        {COLLAGE.map((photo, i) => (
          <div
            key={`${photo.src}-${i}`}
            aria-hidden
            className={`relative h-[220px] ${photo.flip ? "-scale-x-100" : ""}`}
          >
            <Image
              src={photo.src}
              alt=""
              fill
              quality={90}
              sizes="(max-width: 720px) 85vw, 620px"
              className="object-cover"
            />
          </div>
        ))}
      </Parallax>

      <div className="absolute inset-0 flex items-center justify-center">
        <Reveal>
          <div className="flex w-[322px] flex-col items-center gap-2 bg-white/80 px-6 py-8 backdrop-blur-[1px]">
            <h2 className="text-center text-[28px] font-bold leading-[1.3] tracking-[-0.28px] text-black">
              한·양방 협진으로
              <br />
              통증부터 기능 회복까지
            </h2>
            <div className="flex flex-col gap-[22px] pt-6">
              <p className="text-center text-[20px] font-bold leading-[1.6] text-black">
                같은 부위에 나타나더라도 원인과 진행 정도가 다른 통증
              </p>
              <p className="text-center text-[14px] leading-[2.1] text-black/80">
                의학적 진찰과 검사를 통해 통증의 원인을 확인하고, 약물치료와
                물리치료, 침·약침·추나치료 등을 환자의 상태에 맞춰 적용합니다.
              </p>
              <p className="text-center text-[14px] leading-[2.1] text-black/80">
                한·양방 협진은 단순히 여러 치료를 동시에 시행하는 것이 아니라,
                치료 반응을 함께 살피며 통증 완화와 관절 움직임, 일상생활 기능
                회복을 단계적으로 관리하는 진료 방식입니다.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
