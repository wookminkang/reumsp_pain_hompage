import Image from "next/image";
import type { Block, ColumnSection } from "@/lib/columns/types";
import InlineText from "./inline-text";

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[16.5px] leading-[1.9] text-ink/85">
          <InlineText content={block.content} />
        </p>
      );

    case "image":
      return (
        <figure>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-cream">
            <Image
              src={block.image.src}
              alt={block.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 680px"
              className="object-cover"
            />
          </div>
          {block.image.caption && (
            <figcaption className="mt-2.5 text-center text-[13px] text-muted">
              {block.image.caption}
            </figcaption>
          )}
        </figure>
      );

    case "criteria":
      return (
        <ol className="flex flex-col gap-9">
          {block.items.map((item, i) => (
            <li key={i}>
              <h3 className="flex items-start gap-2.5 text-[18px] font-bold leading-[1.5] text-ink">
                <span
                  aria-hidden
                  className="mt-[2px] flex size-[26px] shrink-0 items-center justify-center rounded-full bg-gold text-[14px] font-bold text-white"
                >
                  {i + 1}
                </span>
                {item.title}
              </h3>
              {item.body.map((paragraph, j) => (
                <p
                  key={j}
                  className="mt-3 text-[16.5px] leading-[1.9] text-ink/85"
                >
                  <InlineText content={paragraph} />
                </p>
              ))}
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl bg-cream/70">
          <table className="w-full min-w-[420px] border-collapse text-[15px]">
            <caption className="px-5 pb-1 pt-4 text-left text-[14px] font-bold text-ink">
              {block.caption}
            </caption>
            <thead>
              <tr className="border-b border-line">
                {block.headers.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-5 py-3 text-left font-semibold text-ink/70"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-line/60 last:border-b-0">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-5 py-3 leading-[1.7] ${
                        j === 0
                          ? "whitespace-nowrap font-semibold text-ink"
                          : "text-ink/80"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "checklist":
      return (
        <div className="rounded-2xl bg-cream/70 px-6 py-6">
          <p className="text-[16px] font-bold text-ink">{block.title}</p>
          <ul className="mt-4 flex flex-col gap-3">
            {block.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[15.5px] leading-[1.7] text-ink/80"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="mt-[3px] shrink-0 text-gold"
                >
                  <path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      );

    case "callout": {
      const isWarning = block.tone === "warning";
      return (
        <aside
          className={`rounded-2xl px-6 py-5 ${
            isWarning ? "bg-[#fbf3ee]" : "bg-cream/70"
          }`}
        >
          {block.title && (
            <p
              className={`text-[14.5px] font-bold ${
                isWarning ? "text-[#8f4423]" : "text-ink"
              }`}
            >
              {block.title}
            </p>
          )}
          <p className="mt-1.5 text-[15.5px] leading-[1.85] text-ink/80">
            <InlineText content={block.content} />
          </p>
        </aside>
      );
    }
  }
}

/** 칼럼 본문 — 섹션(H2 + Block 목록) 렌더링 */
export default function ArticleRenderer({
  sections,
}: {
  sections: ColumnSection[];
}) {
  return (
    <div className="flex flex-col gap-16">
      {sections.map((section) => (
        <section key={section.id} aria-labelledby={`${section.id}-heading`}>
          <h2
            id={section.id}
            className="scroll-mt-24 text-[21px] font-bold leading-[1.45] text-ink lg:text-[23px]"
          >
            <span id={`${section.id}-heading`}>{section.heading}</span>
          </h2>
          <div className="mt-6 flex flex-col gap-6">
            {section.blocks.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
