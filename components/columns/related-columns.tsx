import { COLUMNS } from "@/content/columns";
import type { ColumnArticle } from "@/lib/columns/types";
import ColumnCard from "./column-card";

/**
 * 관련 글 — relatedSlugs 우선, 비어 있으면 같은 카테고리 → 최신순으로 채운다.
 * 내부링크 순환 구조(GEO 시그널)를 유지하기 위해 글이 2편 이상이면 항상 노출된다.
 */
export default function RelatedColumns({
  current,
}: {
  current: ColumnArticle;
}) {
  const explicit = (current.relatedSlugs ?? [])
    .map((slug) => COLUMNS.find((column) => column.slug === slug))
    .filter((column): column is ColumnArticle => Boolean(column));

  const fallback = COLUMNS.filter(
    (column) =>
      column.slug !== current.slug &&
      !explicit.some((picked) => picked.slug === column.slug),
  ).sort((a, b) => {
    const sameCategory =
      Number(b.category === current.category) -
      Number(a.category === current.category);
    return sameCategory || (a.datePublished < b.datePublished ? 1 : -1);
  });

  const related = [...explicit, ...fallback].slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section aria-label="관련 칼럼">
      <p className="text-[16px] font-bold text-navy">함께 읽으면 좋은 칼럼</p>
      <div className="mt-3.5 flex flex-col gap-3.5">
        {related.map((column) => (
          <ColumnCard key={column.slug} column={column} />
        ))}
      </div>
    </section>
  );
}
