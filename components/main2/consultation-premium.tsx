import Reveal from "@/components/reveal";
import { CLINIC, TEL_HREF } from "@/lib/clinic";

export default function ConsultationPremium() {
  return (
    <section
      id="consultation"
      className="relative w-full scroll-mt-14 overflow-hidden bg-navy"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/ai/silk-gold.jpg')] bg-cover bg-center opacity-70"
      />
      <div className="relative flex flex-col items-center px-7 py-24">
        <Reveal className="flex w-full flex-col items-center">
          <p className="text-[12px] font-semibold uppercase tracking-[4px] text-gold">
            Consultation
          </p>
          <h2 className="mt-4 text-center text-[28px] font-bold tracking-[-0.4px] text-white">
            1:1 상담 · 예약문의
          </h2>

          <div className="mt-9 flex w-full max-w-[340px] flex-col gap-3">
            <a
              href={TEL_HREF}
              className="rounded-full bg-gold py-4 text-center text-[15px] font-semibold text-white shadow-[0_8px_28px_rgba(176,141,87,0.35)]"
            >
              전화 상담하기
            </a>
            <a
              href={CLINIC.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/25 bg-white/5 py-4 text-center text-[15px] font-semibold text-white backdrop-blur-sm"
            >
              온라인 예약하기
            </a>
          </div>

          <dl className="mt-10 flex w-full max-w-[340px] flex-col divide-y divide-white/10 border-y border-white/10">
            {CLINIC.hours.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between py-4 text-[14px]"
              >
                <dt className="font-bold text-white">{row.label}</dt>
                <dd className="text-white/65">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
