import Reveal from "@/components/reveal";
import SectionEyebrow from "@/components/section-eyebrow";
import { CLINIC, TEL_HREF } from "@/lib/clinic";

export default function Consultation() {
  return (
    <section id="consultation" className="w-full scroll-mt-14 bg-navy py-16">
      <Reveal className="flex w-full flex-col items-center px-5">
        <SectionEyebrow label="CONSULTATION" />
        <h2 className="mt-3 text-center text-[28px] font-bold tracking-[-0.28px] text-white">
          1:1 상담 · 예약문의
        </h2>

        <div className="mt-8 flex items-center justify-center gap-[14px]">
          <a
            href={TEL_HREF}
            className="rounded-full bg-gold px-[29px] py-4 text-[15px] font-semibold text-white"
          >
            전화 상담하기
          </a>
          <a
            href={CLINIC.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/40 px-[29px] py-4 text-[15px] font-semibold text-white"
          >
            온라인 예약하기
          </a>
        </div>

        <dl className="mt-[18px] flex w-[210px] flex-col items-center gap-2 rounded-full border border-white/20 px-6 py-[22px]">
          {CLINIC.hours.map((row) => (
            <div key={row.label} className="flex items-baseline gap-2 text-[13.5px]">
              <dt className="font-bold text-white">{row.label}</dt>
              <dd className="text-white/80">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
