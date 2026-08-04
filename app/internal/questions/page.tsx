import type { Metadata } from "next";
import Image from "next/image";
import { CLINIC } from "@/lib/clinic";
import QuestionForm from "@/components/internal/question-form";

// 내부 확인용 페이지 — 검색·AI 노출 금지 (robots.ts에서도 /internal 차단)
export const metadata: Metadata = {
  title: "담당자 확인 질문지 (내부용)",
  robots: { index: false, follow: false },
};

export default function InternalQuestionsPage() {
  return (
    <>
      <header className="bg-navy">
        <div className="mx-auto flex w-full max-w-[720px] items-center gap-3 px-5 py-3">
          <Image
            src="/figma/logo.svg"
            alt={`${CLINIC.shortName} 로고`}
            width={100}
            height={26}
          />
          <span className="text-[13px] font-semibold text-white/70">
            내부 확인용
          </span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[720px] px-5 pb-24 pt-8">
        <h1 className="text-[22px] font-bold leading-[1.4] text-navy">
          홈페이지 표기 확인 질문지
        </h1>
        <p className="mt-2 text-[14.5px] leading-[1.8] text-ink/70">
          홈페이지와 건강 칼럼에 정확한 정보를 표기하기 위해 확인이 필요한
          내용입니다. 아시는 항목만 답변해 주셔도 됩니다.
        </p>
        <div className="mt-6">
          <QuestionForm />
        </div>
      </main>
    </>
  );
}
