import Image from "next/image";
import { FOOTER_NAV } from "@/lib/nav";
import { CLINIC } from "@/lib/clinic";

export default function SiteFooter() {
  return (
    <footer className="w-full bg-navy pb-7 pt-14">
      {/* 배경은 100% 가로, 내용은 헤더와 동일하게 중앙 720px */}
      <div className="mx-auto w-full max-w-[720px] px-6">
        <div className="border-b border-white/20 pb-8">
          <Image
            src="/figma/logo.svg"
            alt={`${CLINIC.shortName} 로고`}
            width={110}
            height={28}
          />
          <div className="flex flex-col gap-1 pt-[14px] text-[13.5px] leading-[1.6] text-white/60">
            <p>상호명 {CLINIC.name}</p>
            <p>{CLINIC.address}</p>
            <p>
              대표원장{" "}
              {CLINIC.doctors.find((d) => d.title === "대표원장")?.name}
            </p>
            <p>대표전화 {CLINIC.tel}</p>
            <p>사업자등록번호 {CLINIC.bizNumber}</p>
          </div>
          <nav aria-label="푸터 메뉴" className="pt-6">
            <ul className="flex gap-6">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[13.5px] text-white/60"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="py-5 text-center text-[13.5px] text-white/60">
          © 2026 {CLINIC.shortName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
