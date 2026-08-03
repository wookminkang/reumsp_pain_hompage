import ColumnHeader from "@/components/columns/column-header";
import SiteFooter from "@/components/site-footer";
import BottomCta from "@/components/bottom-cta";

/** 칼럼 공통 셸 — 가독성 중심 중앙 720px 단일 컬럼 */
export default function ColumnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ColumnHeader />
      <main className="mx-auto w-full max-w-[720px] px-5 pb-24 pt-10">
        {children}
      </main>
      <div className="mx-auto w-full max-w-[720px]">
        <SiteFooter />
      </div>
      <BottomCta />
    </>
  );
}
