import { COLUMNS } from "@/content/columns";
import { CLINIC, SITE_URL } from "@/lib/clinic";

/**
 * 건강 칼럼 RSS 2.0 피드 — 네이버 서치어드바이저 RSS 제출용.
 * 칼럼 레지스트리에서 빌드 시 정적 생성되므로 원고 추가 시 자동 반영된다.
 */
export const dynamic = "force-static";

const escapeXml = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

/** "YYYY-MM-DD"(KST 게재일) → RFC-822 날짜 문자열 */
const toRfc822 = (date: string) =>
  new Date(`${date}T09:00:00+09:00`).toUTCString();

export function GET() {
  const items = COLUMNS.map((c) => {
    const url = `${SITE_URL}/columns/${c.slug}`;
    return `    <item>
      <title>${escapeXml(c.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(c.description)}</description>
      <pubDate>${toRfc822(c.datePublished)}</pubDate>
    </item>`;
  }).join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`${CLINIC.name} 건강 칼럼`)}</title>
    <link>${SITE_URL}/columns</link>
    <description>${escapeXml(
      "통증 치료와 재활, 교통사고 후유증, 회복 관리에 대해 자주 받는 질문을 정리한 건강 칼럼입니다.",
    )}</description>
    <language>ko</language>
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
