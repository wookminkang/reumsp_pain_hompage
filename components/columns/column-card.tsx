import Image from "next/image";
import Link from "next/link";
import type { ColumnArticle } from "@/lib/columns/types";

/** 목록·관련 글에서 쓰는 칼럼 카드 — 썸네일이 있으면 좌측에 노출 */
export default function ColumnCard({ column }: { column: ColumnArticle }) {
  return (
    <Link
      href={`/columns/${column.slug}`}
      className="group flex items-start gap-5 rounded-2xl p-2 transition-colors hover:bg-cream/60"
    >
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] font-bold text-gold">{column.category}</p>
        <h3 className="mt-1.5 text-[17px] font-bold leading-[1.5] text-ink group-hover:underline group-hover:underline-offset-4">
          {column.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[14.5px] leading-[1.7] text-ink/60">
          {column.description}
        </p>
        <time
          dateTime={column.datePublished}
          className="mt-2 block text-[13px] text-muted"
        >
          {column.datePublished.replaceAll("-", ".")}
        </time>
      </div>
      {column.thumbnail && (
        <div className="relative aspect-square w-[96px] shrink-0 overflow-hidden rounded-xl bg-cream sm:w-[120px]">
          <Image
            src={column.thumbnail.src}
            alt=""
            fill
            sizes="140px"
            className="object-cover"
          />
        </div>
      )}
    </Link>
  );
}
