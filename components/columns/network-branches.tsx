import { CLINIC } from "@/lib/clinic";

/**
 * 모든 칼럼 하단 고정 리움 지점 안내 (2026-08-14 사용자 요청 — 지점 연계성 강화).
 * Disclaimer와 같은 이유로 데이터가 아닌 컴포넌트에 두어 원고별 누락이 불가능하게 한다.
 * 지점 목록·소개 문구는 lib/clinic.ts의 network가 단일 소스.
 */
export default function NetworkBranches() {
  return (
    <section aria-label="리움 지점 안내">
      <p className="text-[14px] font-bold text-navy">리움 지점 안내</p>
      <p className="mt-2 text-[14px] leading-[1.8] text-ink/70">
        리움은 한방병원과 한의원을 함께 운영하는 한방의료 브랜드입니다. 본원인{" "}
        {CLINIC.name}(통증·재활, {CLINIC.address}) 외에 아래 지점에서도 진료를
        받으실 수 있습니다.
      </p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {CLINIC.network.map((branch) => (
          <li key={branch.url} className="text-[14px] leading-[1.7]">
            <a
              href={branch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/70 underline underline-offset-4 hover:text-gold"
            >
              {branch.name}
            </a>
            <span className="text-muted">
              {" "}
              · {branch.focus} · {branch.address}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
