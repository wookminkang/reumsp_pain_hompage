import type { Metadata } from "next";
import { COLUMNS } from "@/content/columns";
import { SITE_URL } from "@/lib/clinic";
import { breadcrumbJsonLd, JsonLd } from "@/lib/schema";
import ColumnCard from "@/components/columns/column-card";

export const metadata: Metadata = {
  title: "건강 칼럼",
  description:
    "강동·송파 통증 치료, 교통사고 후유증, 추나·도수치료에 대해 리움한방병원 강동송파가 정리한 건강 정보 칼럼입니다.",
  alternates: { canonical: "/columns" },
};

export default function ColumnsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "홈", url: SITE_URL },
          { name: "건강 칼럼", url: `${SITE_URL}/columns` },
        ])}
      />
      <h1 className="text-[24px] font-bold leading-[1.4] text-navy lg:text-[28px]">
        건강 칼럼
      </h1>
      <p className="mt-2.5 text-[15.5px] leading-[1.8] text-ink/70">
        통증 치료와 재활, 보험 제도에 대해 자주 받는 질문을 정리했습니다.
      </p>
      <div className="mt-8 flex flex-col gap-4">
        {COLUMNS.map((column) => (
          <ColumnCard key={column.slug} column={column} />
        ))}
      </div>
    </>
  );
}
