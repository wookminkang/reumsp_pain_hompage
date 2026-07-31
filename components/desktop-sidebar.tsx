import Image from "next/image";
import { NAV_ITEMS } from "@/lib/nav";
import { CLINIC, TEL_HREF } from "@/lib/clinic";

/**
 * 데스크탑(lg↑) 전용 좌측 스티키 내비게이션 패널.
 * 고연령 이용자를 고려해 밝은 배경 + 진한 텍스트로 대비를 높이고 글자 크기를 키웠다.
 */
export default function DesktopSidebar() {
  return (
    <aside className="sticky top-0 hidden h-[100svh] w-[380px] shrink-0 flex-col overflow-hidden bg-[#fbf8f2] px-10 py-8 lg:flex">
      {/* 배경 레이어: 워터마크 로고 + 골드 글로우 + 우측 경계선 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/figma/logo.svg"
          alt=""
          width={420}
          height={107}
          className="absolute -bottom-8 -left-16 max-w-none opacity-[0.055]"
        />
        <div className="absolute -right-24 -top-28 size-72 rounded-full bg-gold/25 blur-[90px]" />
      </div>

      <div className="relative flex flex-col items-center text-center">
        <div className="flex size-[92px] items-center justify-center rounded-full bg-navy">
          <Image
            src="/figma/logo.svg"
            alt={`${CLINIC.shortName} 로고`}
            width={74}
            height={19}
          />
        </div>
        <p className="mt-4 text-[22px] font-extrabold tracking-[-0.4px] text-navy">
          {CLINIC.name}
        </p>
        <p className="mt-1 text-[12px] font-bold uppercase tracking-[3px] text-[#8a6a3e]">
          Pain Clinic
        </p>
      </div>

      <nav aria-label="데스크탑 메뉴" className="relative mt-7 min-h-0 flex-1">
        <ul>
          <li>
            <a
              href={CLINIC.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-b border-[#e4ddcd] py-[14px] text-[17px] font-semibold text-navy transition-colors hover:text-[#8a6a3e]"
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-4"
                />
                온라인 예약
              </span>
              <span aria-hidden className="text-[13px] text-navy/35">
                ↗
              </span>
            </a>
          </li>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group flex items-center justify-between border-b border-[#e4ddcd] py-[14px] text-[17px] font-semibold text-navy transition-colors hover:text-[#8a6a3e]"
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-4"
                  />
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative pt-5">
        <p className="text-[17px] font-bold text-navy">
          궁금하신 점이 있으신가요?
        </p>
        <p className="mt-1.5 text-[14px] leading-[1.6] text-navy/60">
          친절하고 자세하게 안내해 드리겠습니다.
        </p>
        <a
          href={TEL_HREF}
          className="mt-4 block rounded-[6px] bg-navy py-[15px] text-center text-[16px] font-bold text-white shadow-[0_10px_24px_rgba(10,31,35,0.2)] transition-opacity hover:opacity-90"
        >
          전화 상담 {CLINIC.tel}
        </a>
      </div>
    </aside>
  );
}
