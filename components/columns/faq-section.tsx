import type { Faq } from "@/lib/columns/types";

/**
 * FAQ — 접지 않고 항상 노출한다.
 * <details> 접힘은 AI·크롤러 발췌에 불리하므로 쓰지 않는다.
 * 내용은 FAQPage JSON-LD(lib/schema.tsx faqJsonLd)와 동일 소스에서 나온다.
 */
export default function FaqSection({ faq }: { faq: readonly Faq[] }) {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24">
      <h2
        id="faq-heading"
        className="text-[21px] font-bold leading-[1.45] text-ink lg:text-[23px]"
      >
        자주 묻는 질문 (FAQ)
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        {faq.map((item) => (
          <div
            key={item.question}
            className="rounded-2xl bg-cream/70 px-6 py-5"
          >
            <h3 className="flex gap-2 text-[16.5px] font-bold leading-[1.55] text-ink">
              <span aria-hidden className="shrink-0 text-gold">
                Q.
              </span>
              {item.question}
            </h3>
            <p className="mt-2.5 pl-7 text-[15.5px] leading-[1.85] text-ink/80">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
