export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "의료진 소개", href: "#medical-team" },
  { label: "통증 클리닉", href: "#pain-clinic" },
  { label: "한·양방 협진", href: "#collaboration" },
  { label: "병원 둘러보기", href: "#facility" },
  { label: "오시는길", href: "#location" },
];

export const FOOTER_NAV: NavItem[] = NAV_ITEMS.filter(
  (item) => item.label !== "한·양방 협진",
);
