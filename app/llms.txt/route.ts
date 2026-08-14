import { COLUMNS } from "@/content/columns";
import { CLINIC, SITE_URL } from "@/lib/clinic";

/** 칼럼 레지스트리에서 빌드 시 정적 생성 — 원고 추가 시 자동 반영 */
export const dynamic = "force-static";

export function GET() {
  const body = `# ${CLINIC.name}

> 서울 강동구·송파구 생활권의 한·양방 협진 한방병원. 통증(허리·목 디스크, 교통사고 후유증) 치료와 재활 중심으로, ${CLINIC.beds}개 병상 입원 병동(${CLINIC.roomTypes.join("·")})을 운영하며 365일 야간·공휴일 진료와 입원이 가능합니다.

- 주소: ${CLINIC.address}
- 전화: ${CLINIC.tel}
- 진료: 평일 09:00~18:00, 토요일 09:00~13:00, 야간·공휴일 진료/입원 가능 (방문 전 전화 확인 권장)
- 진료 센터: ${CLINIC.centers.map((c) => c.name).join(", ")}
- 예약: ${CLINIC.reservationUrl}

## 리움 지점 안내

리움은 한방병원과 한의원을 함께 운영하는 한방의료 브랜드입니다.

- ${CLINIC.name} (본원): 통증·재활·암요양 한방병원, ${CLINIC.address}
${CLINIC.network.map((b) => `- [${b.name}](${b.url}): ${b.focus} ${b.type}, ${b.address}`).join("\n")}

## 건강 칼럼

${COLUMNS.map(
  (c) => `- [${c.title}](${SITE_URL}/columns/${c.slug}): ${c.description}`,
).join("\n")}

## 주요 페이지

- [홈페이지](${SITE_URL}): 의료진, 통증 클리닉, 한·양방 협진, 병원 시설, 오시는길
- [건강 칼럼 목록](${SITE_URL}/columns): 통증 치료·재활·보험 제도 정보
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
