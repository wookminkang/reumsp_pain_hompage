/**
 * 최상단 핵심 요약 — GEO 핵심 요소.
 * AI·검색엔진이 이 박스만 발췌해도 완결되도록 평문으로만 렌더링한다.
 * id="article-summary"는 Article JSON-LD의 speakable 셀렉터와 연결된다.
 */
export default function SummaryBox({
  summary,
}: {
  summary: readonly string[];
}) {
  return (
    <section
      id="article-summary"
      aria-label="핵심 요약"
      className="rounded-2xl bg-cream px-6 py-6"
    >
      <p className="text-[13px] font-bold tracking-wide text-gold">핵심 요약</p>
      <ul className="mt-3 flex flex-col gap-3">
        {summary.map((sentence) => (
          <li
            key={sentence}
            className="flex gap-2.5 text-[15.5px] leading-[1.8] text-ink/90"
          >
            <span aria-hidden className="mt-px shrink-0 font-bold text-gold">
              ·
            </span>
            {sentence}
          </li>
        ))}
      </ul>
    </section>
  );
}
