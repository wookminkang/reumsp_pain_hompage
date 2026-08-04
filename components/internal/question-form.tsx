"use client";

import { useEffect, useRef, useState } from "react";
import { QUESTION_SECTIONS } from "@/lib/internal-questions";

const STORAGE_KEY = "reum-pending-questions-v1";

type Answers = Record<string, string>;

function buildExportText(answers: Answers): string {
  const today = new Date().toISOString().slice(0, 10);
  const lines: string[] = [
    `[리움한방병원 강동송파] 홈페이지 표기 확인 답변 (${today})`,
    "",
  ];
  for (const section of QUESTION_SECTIONS) {
    lines.push(`■ ${section.title}`);
    for (const item of section.items) {
      const answer = answers[item.id]?.trim();
      lines.push(`Q. ${item.question}`);
      lines.push(`A. ${answer || "(미답변)"}`);
      lines.push("");
    }
  }
  return lines.join("\n");
}

export default function QuestionForm() {
  const [answers, setAnswers] = useState<Answers>({});
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const loaded = useRef(false);

  // 최초 로드 시 localStorage에서 임시저장 답변 복원
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers(JSON.parse(raw));
    } catch {
      // 저장 데이터가 깨진 경우 무시하고 빈 상태로 시작
    }
    loaded.current = true;
  }, []);

  // 입력할 때마다 localStorage에 자동 임시저장
  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      setSavedAt(
        new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    } catch {
      // 저장 실패(시크릿 모드 등)해도 입력은 계속 가능
    }
  }, [answers]);

  const answeredCount = QUESTION_SECTIONS.flatMap((s) => s.items).filter(
    (item) => answers[item.id]?.trim(),
  ).length;
  const totalCount = QUESTION_SECTIONS.flatMap((s) => s.items).length;

  async function copyAll() {
    const text = buildExportText(answers);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // 클립보드 권한이 없으면 선택 가능한 텍스트로 안내
      window.prompt("아래 내용을 길게 눌러 복사해 주세요", text);
    }
  }

  function resetAll() {
    if (!window.confirm("작성한 답변을 모두 지울까요?")) return;
    setAnswers({});
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <div>
      {/* 진행 상태 + 안내 */}
      <div className="rounded-2xl bg-cream px-5 py-4 text-[14.5px] leading-[1.8] text-ink/85">
        <p className="font-bold text-navy">작성 안내</p>
        <p className="mt-1">
          답변은 이 브라우저에 자동 임시저장되며, 자동으로 전송되지 않습니다.
          작성을 마친 뒤 하단의 <strong>답변 전체 복사</strong> 버튼을 눌러
          카카오톡이나 문자로 붙여넣어 보내주세요.
        </p>
      </div>

      <div className="sticky top-0 z-10 -mx-5 mt-6 flex items-center justify-between border-b border-line bg-white/95 px-5 py-3 backdrop-blur">
        <p className="text-[14px] font-semibold text-navy">
          {answeredCount} / {totalCount} 답변
        </p>
        <p className="text-[12.5px] text-muted">
          {savedAt ? `${savedAt} 임시저장됨` : "자동 저장 대기"}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-10">
        {QUESTION_SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-[18px] font-bold text-navy">{section.title}</h2>
            {section.warning && (
              <p className="mt-2 rounded-xl bg-[#fbf3ee] px-4 py-3 text-[13.5px] leading-[1.7] text-[#8f4423]">
                {section.warning}
              </p>
            )}
            <div className="mt-4 flex flex-col gap-5">
              {section.items.map((item) => (
                <div key={item.id}>
                  <label
                    htmlFor={item.id}
                    className="block text-[15px] font-semibold leading-[1.6] text-ink"
                  >
                    {item.question}
                  </label>
                  {item.note && (
                    <p className="mt-0.5 text-[13px] text-muted">{item.note}</p>
                  )}
                  <textarea
                    id={item.id}
                    rows={2}
                    value={answers[item.id] ?? ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    placeholder="답변을 입력해 주세요"
                    className="mt-2 w-full resize-y rounded-xl border border-line bg-white px-4 py-3 text-[15px] leading-[1.7] text-ink outline-none focus:border-gold"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-3">
        <button
          type="button"
          onClick={copyAll}
          className="rounded-full bg-navy py-4 text-[16px] font-bold text-white"
        >
          {copied ? "복사 완료! 카톡·문자에 붙여넣어 주세요" : "답변 전체 복사"}
        </button>
        <button
          type="button"
          onClick={resetAll}
          className="py-2 text-[13.5px] text-muted underline underline-offset-4"
        >
          답변 초기화
        </button>
      </div>
    </div>
  );
}
