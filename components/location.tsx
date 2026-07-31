import Image from "next/image";
import NaverMap from "@/components/naver-map";
import Reveal from "@/components/reveal";
import SectionEyebrow from "@/components/section-eyebrow";
import { CLINIC } from "@/lib/clinic";

const INFO_ROWS: {
  icon: string;
  label: string;
  lines: string[];
}[] = [
  {
    icon: "/figma/ic-pin.svg",
    label: "주소",
    lines: [CLINIC.address],
  },
  {
    icon: "/figma/ic-subway.svg",
    label: "지하철",
    lines: [
      "5호선 둔촌동역,",
      "9호선 둔촌오륜역,",
      "5·9호선 올림픽공원역",
      "10분 이내 거리",
    ],
  },
  {
    icon: "/figma/ic-parking.svg",
    label: "주차",
    // TODO: 주차 상세 안내(지원 시간·요금) 확정 후 교체
    lines: ["건물 내 주차 가능"],
  },
];

export default function Location() {
  return (
    <section
      id="location"
      className="flex w-full scroll-mt-14 flex-col items-center gap-6 bg-cream px-5 py-10"
    >
      <Reveal className="w-full">
        <SectionEyebrow label="LOCATION" title="오시는 길" />
      </Reveal>
      <Reveal className="w-full" delay={0.08}>
        <NaverMap />
      </Reveal>
      <Reveal className="w-full" delay={0.14}>
        <div className="flex flex-col gap-5">
          <h3 className="text-[20px] font-bold text-ink">{CLINIC.shortName}</h3>
          {INFO_ROWS.map((row) => (
            <div key={row.label} className="flex items-start gap-[14px]">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
                <Image src={row.icon} alt="" width={18} height={18} />
              </span>
              <div>
                <p className="text-[14.5px] font-bold leading-[1.6] text-ink">
                  {row.label}
                </p>
                <p className="text-[14px] leading-[1.6] text-black/80">
                  {row.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
