type SectionEyebrowProps = {
  label: string;
  title?: string;
  /** dark: 남색 배경 섹션에서 제목을 흰색으로 */
  tone?: "light" | "dark";
};

/** "— LABEL —" 형태의 섹션 라벨 + 제목 */
export default function SectionEyebrow({
  label,
  title,
  tone = "light",
}: SectionEyebrowProps) {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <span className="flex items-center justify-center gap-2">
        <span aria-hidden className="h-px w-[18px] bg-gold" />
        <span className="text-[13px] font-semibold uppercase tracking-[0.52px] text-gold">
          {label}
        </span>
        <span aria-hidden className="h-px w-[18px] bg-gold" />
      </span>
      {title && (
        <h2
          className={`text-center text-[24px] font-bold leading-[26px] ${
            tone === "dark" ? "text-white" : "text-black/80"
          }`}
        >
          {title}
        </h2>
      )}
    </div>
  );
}
