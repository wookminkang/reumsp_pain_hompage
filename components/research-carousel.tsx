"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SectionEyebrow from "@/components/section-eyebrow";

// 12개월 추적 통증 점수 추이 (시안 막대 높이값)
const TREND_BARS = [88, 80, 70, 75, 75, 57, 42, 51, 51, 42, 27, 19];

export default function ResearchCarousel() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const root = rootRef.current;
    if (!root) return;

    // 가로 캐러셀이라 세로 스크롤 기준 ScrollTrigger 대신,
    // 각 카드가 (가로/세로 모두) 화면에 절반 이상 보일 때 차트를 재생한다.
    const playCard = (card: HTMLElement) => {
      const bars = card.querySelectorAll("[data-chart-bar]");
      if (bars.length) {
        gsap.from(bars, {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.05,
        });
        gsap.from(card.querySelectorAll("[data-chart-line]"), {
          opacity: 0,
          duration: 0.6,
          delay: 0.7,
        });
      }

      const countEl = card.querySelector("[data-count-up]");
      if (countEl) {
        const counter = { value: 0 };
        gsap.fromTo(
          countEl,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        );
        gsap.to(counter, {
          value: 20.3,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            countEl.textContent = `-${counter.value.toFixed(1)}점`;
          },
        });
      }

      const compareBars = card.querySelectorAll("[data-compare-bar]");
      if (compareBars.length) {
        gsap.from(compareBars, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1,
          ease: "power2.out",
          stagger: 0.18,
        });
        gsap.from(card.querySelectorAll("[data-compare-label]"), {
          opacity: 0,
          duration: 0.5,
          delay: 1.1,
        });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playCard(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.55 },
    );

    root
      .querySelectorAll("[data-research-card]")
      .forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="research"
      ref={rootRef}
      className="flex w-full flex-col items-start gap-6 bg-cream px-5 py-10"
    >
      <SectionEyebrow label="RESEARCH REFERENCE" title="관련 연구 자료" />

      <div className="w-full">
        <ul className="-mx-5 flex snap-x snap-mandatory gap-[19px] overflow-x-auto px-5 pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* 카드 1 — MacPherson 2015, 만성 목 통증 */}
          <li className="w-[283px] shrink-0 snap-start">
            <article
              data-research-card
              className="flex h-[314px] flex-col rounded-[14px] border border-line bg-white px-[21px] py-[29px]"
            >
              <p className="text-[12.5px] font-bold uppercase tracking-[0.375px] text-gold">
                미국내과학회지 · 2015
              </p>
              <p className="pt-2 text-[13px] text-muted">
                MacPherson 외 · 참여자 517명
              </p>
              <h3 className="pt-1 text-[16px] font-bold leading-[1.5] text-deep">
                침 치료, 12개월 후 통증 32% 감소
              </h3>
              <div data-chart-trend className="relative mt-2 h-[91px] w-[224px]">
                <div className="absolute left-[7px] top-0 flex items-end gap-[7px]">
                  {TREND_BARS.map((h, i) => (
                    <span
                      key={i}
                      data-chart-bar
                      className={`w-[10px] rounded-full ${
                        i === TREND_BARS.length - 1 ? "bg-deep" : "bg-black/20"
                      }`}
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
                <div
                  data-chart-line
                  className="pointer-events-none absolute left-[9px] top-[10px] h-[69px] w-[178px]"
                >
                  <Image src="/figma/chart-line.svg" alt="" fill />
                </div>
                <p className="absolute left-[191px] top-[52px] font-bold text-deep">
                  <span className="text-[8px]">32</span>
                  <span className="text-[5px]">%↓</span>
                </p>
              </div>
              <p className="pt-2 text-[12px] leading-[1.6] text-black/40">
                {"12개월 시점 통증·기능장애 감소율 (일반 치료 대비 유의미, p<0.01)"}
              </p>
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/26524571/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center gap-[6px] pt-2 text-[13.5px] font-bold text-ink"
              >
                원문 보기 (PubMed)
                <Image src="/figma/ic-external.svg" alt="" width={14} height={14} />
              </a>
            </article>
          </li>

          {/* 카드 2 — Mu 2020 코크란 리뷰, 만성 요통 */}
          <li className="w-[283px] shrink-0 snap-start">
            <article
              data-research-card
              className="flex h-[314px] flex-col rounded-[14px] border border-line bg-white px-[21px] py-[29px]"
            >
              <p className="text-[12.5px] font-bold uppercase tracking-[0.375px] text-gold">
                코크란 체계적 문헌고찰 · 2020
              </p>
              <p className="pt-2 text-[13px] text-muted">
                Mu 외 · 33건 연구 · 8,270명 분석
              </p>
              <h3 className="pt-1 text-[16px] font-bold leading-[1.5] text-deep">
                요통 환자, 침 치료로 통증 대폭 감소
              </h3>
              <div className="relative mt-2 h-[100px] w-[224px]">
                <p className="absolute left-0 top-[38px] text-[16px] font-black text-gold">
                  무처치 대비
                </p>
                <p
                  data-count-up
                  className="absolute left-[82px] top-[8px] bg-gradient-to-b from-gold from-45% to-gold/0 bg-clip-text text-[40px] font-black text-transparent"
                >
                  -20.3점
                </p>
              </div>
              <p className="pt-2 text-[12px] leading-[1.6] text-black/40">
                통증 점수 감소폭 (100점 만점 기준, VAS)
              </p>
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/33306198/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center gap-[6px] pt-2 text-[13.5px] font-bold text-ink"
              >
                원문 보기 (PubMed)
                <Image src="/figma/ic-external.svg" alt="" width={14} height={14} />
              </a>
            </article>
          </li>

          {/* 카드 3 — 협진 회복 속도 비교 */}
          {/* TODO: 해당 연구(Lee 외 2021, 150명·8주 ODI)의 정확한 PubMed 원문 링크 확인 필요 */}
          <li className="w-[283px] shrink-0 snap-start">
            <article
              data-research-card
              className="flex h-[314px] flex-col rounded-[14px] border border-line bg-white px-[21px] py-[29px]"
            >
              <p className="text-[12.5px] font-bold uppercase tracking-[0.375px] text-gold">
                국제 보완대체의학 학술지 · 2021
              </p>
              <p className="pt-2 text-[13px] text-muted">
                Lee 외 · 참여자 150명 · 8주 관찰
              </p>
              <h3 className="pt-1 text-[16px] font-bold leading-[1.5] text-deep">
                한·양방 협진, 회복 속도 약 2배
              </h3>
              <div data-chart-compare className="relative mt-2 h-[100px] w-[224px]">
                <p className="absolute left-0 top-[29px] text-[12px] text-muted">
                  협진 치료군
                </p>
                <div className="absolute left-[65px] top-[35px] h-[10px] w-[159px] rounded-full bg-black/10">
                  <span
                    data-compare-bar
                    className="absolute inset-y-0 left-0 w-[124px] rounded-full bg-deep"
                  />
                </div>
                <p className="absolute left-0 top-[52px] text-[12px] text-muted">
                  단일 치료군
                </p>
                <div className="absolute left-[65px] top-[58px] h-[10px] w-[159px] rounded-full bg-black/10">
                  <span
                    data-compare-bar
                    className="absolute inset-y-0 left-0 w-[61px] rounded-full bg-black/20"
                  />
                </div>
                <p
                  data-compare-label
                  className="absolute left-[196px] top-[27px] text-[8px] font-black text-deep"
                >
                  -27%
                </p>
              </div>
              <p className="pt-2 text-[12px] leading-[1.6] text-black/40">
                8주 후 장애지수(ODI) 개선폭 비교
              </p>
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/?term=integrative+korean+medicine+chronic+pain"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center gap-[6px] pt-2 text-[13.5px] font-bold text-ink"
              >
                원문 보기 (PubMed)
                <Image src="/figma/ic-external.svg" alt="" width={14} height={14} />
              </a>
            </article>
          </li>
        </ul>
      </div>

      <p className="text-[12px] leading-[1.65] text-[#9aa0a6]">
        ※ 위 연구 결과는 일반적인 치료 경향을 소개하기 위한 참고 자료이며,
        개인의 치료 효과 및 결과를 보장하지 않습니다.
      </p>
    </section>
  );
}
