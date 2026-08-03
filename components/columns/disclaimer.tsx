/**
 * 모든 칼럼 하단 고정 면책 문구.
 * 데이터가 아니라 컴포넌트에 하드코딩해 원고별 누락이 불가능하게 한다.
 * 문구 변경 시 docs/geo-writing-guide.md의 의료광고법 섹션과 함께 검토할 것.
 */
export default function Disclaimer() {
  return (
    <p className="rounded-xl bg-cream/70 px-5 py-4 text-[13.5px] leading-[1.8] text-muted">
      본 칼럼은 건강 정보 제공을 목적으로 하며, 특정 치료의 효과를 보장하거나
      의학적 진단을 대신하지 않습니다. 증상과 적합한 치료 방법은 개인에 따라
      다르므로 반드시 의료진과 상담하시기 바랍니다. 건강보험·자동차보험 적용
      기준은 관련 법령·고시 개정에 따라 달라질 수 있습니다.
    </p>
  );
}
