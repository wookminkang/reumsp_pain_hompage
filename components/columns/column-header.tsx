import Image from "next/image";
import Link from "next/link";
import { CLINIC, TEL_HREF } from "@/lib/clinic";

/**
 * 칼럼 섹션 전용 헤더.
 * 랜딩의 SiteHeader는 히어로 오버레이 + 모바일 전용(lg:hidden)이라
 * 아티클 레이아웃에서는 전 브레이크포인트에서 보이는 단순 네비를 쓴다.
 */
export default function ColumnHeader() {
  return (
    <header className="sticky top-0 z-50 bg-navy">
      <div className="mx-auto flex w-full max-w-[720px] items-center justify-between px-5 py-3">
        <Link href="/" aria-label={`${CLINIC.name} 홈`}>
          <Image
            src="/figma/logo.svg"
            alt={`${CLINIC.shortName} 로고`}
            width={100}
            height={26}
            priority
          />
        </Link>
        <nav aria-label="칼럼 메뉴">
          <ul className="flex items-center gap-5">
            <li>
              <Link
                href="/location"
                className="text-[14.5px] font-semibold text-white/90"
              >
                오시는길
              </Link>
            </li>
            <li>
              <Link
                href="/columns"
                className="text-[14.5px] font-semibold text-white/90"
              >
                건강 칼럼
              </Link>
            </li>
            <li>
              <a
                href={TEL_HREF}
                className="rounded-full bg-gold px-4 py-2 text-[13.5px] font-semibold text-white"
              >
                전화 상담
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
