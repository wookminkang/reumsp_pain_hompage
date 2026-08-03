/** 공식기관 출처 목록 — 신뢰 시그널용 외부링크 */
export default function References({
  references,
}: {
  references: { label: string; href: string }[];
}) {
  if (references.length === 0) return null;
  return (
    <section aria-label="참고 자료">
      <p className="text-[14px] font-bold text-navy">참고 자료</p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {references.map((ref) => (
          <li key={ref.href} className="text-[14px] leading-[1.7]">
            <a
              href={ref.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 underline underline-offset-4 hover:text-gold"
            >
              {ref.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
