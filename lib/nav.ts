export type NavItem = { label: string; href: string };

/**
 * 홈 섹션은 `/#앵커` 형태 — 홈에서는 기존처럼 스크롤되고,
 * 칼럼 등 다른 페이지에서는 홈으로 이동 후 해당 섹션으로 스크롤된다.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "의료진 소개", href: "/#medical-team" },
  { label: "통증 클리닉", href: "/#pain-clinic" },
  { label: "한·양방 협진", href: "/#collaboration" },
  { label: "병원 둘러보기", href: "/#facility" },
  // 오시는길은 전용 서브페이지로 연결 (2026-08-20) — 홈 섹션(#location)은 그대로 유지
  { label: "오시는길", href: "/location" },
  { label: "건강 칼럼", href: "/columns" },
];

export const FOOTER_NAV: NavItem[] = NAV_ITEMS.filter(
  (item) => item.label !== "한·양방 협진",
);
