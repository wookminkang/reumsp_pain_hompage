import type { ColumnSection } from "@/lib/columns/types";

/** 목차 — 섹션 H2 + FAQ 앵커 링크 자동 생성 */
export default function Toc({ sections }: { sections: ColumnSection[] }) {
  return (
    <nav aria-label="목차" className="border-l-2 border-line pl-5">
      <p className="text-[13px] font-bold tracking-wide text-muted">목차</p>
      <ol className="mt-2.5 flex flex-col gap-2">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-[15px] leading-[1.6] text-ink/70 underline-offset-4 hover:text-gold hover:underline"
            >
              {section.heading}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#faq"
            className="text-[15px] leading-[1.6] text-ink/70 underline-offset-4 hover:text-gold hover:underline"
          >
            자주 묻는 질문 (FAQ)
          </a>
        </li>
      </ol>
    </nav>
  );
}
