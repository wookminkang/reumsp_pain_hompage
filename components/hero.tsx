"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLINIC, TEL_HREF } from "@/lib/clinic";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 진입 타임라인
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-title]", { y: 40, opacity: 0, duration: 0.9 })
        .from("[data-hero-sub]", { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(
          "[data-hero-cta] > *",
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.12 },
          "-=0.4",
        );

      // 스크롤 패럴랙스: 배경은 느리게, 살짝 확대
      gsap.to("[data-hero-bg]", {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex h-[100svh] max-h-[890px] min-h-[560px] w-full items-end overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0">
        {/* LCP 배경 — GSAP 패럴랙스 대상이라 next/image 대신 img + preload 사용 */}
        <img
          data-hero-bg
          src="/figma/hero-building.jpg"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover will-change-transform"
        />
        {/* 상단은 거의 투명하게, 텍스트가 놓이는 하단만 어둡게 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(8,30,34,0.18)] to-[rgba(8,30,34,0.78)]" />
      </div>

      <div className="relative w-full max-w-[720px] px-6 pb-24">
        <h1
          data-hero-title
          className="text-[36px] font-extrabold leading-[1.22] tracking-[-0.72px] text-white"
        >
          {CLINIC.name.replace(" 강동송파", "")} 강동송파
          <br />
          통증 치료 클리닉
        </h1>
        <p data-hero-sub className="mt-5 text-[17px] leading-[1.6] text-white/80">
          365일, 야간·공휴일 진료/입원 가능
        </p>
        <div data-hero-cta className="mt-9 flex flex-col gap-[14px]">
          <a
            href={TEL_HREF}
            className="flex items-center justify-center rounded-full bg-gold px-[29px] py-4 text-[15px] font-semibold text-white"
          >
            전화 상담
          </a>
          <a
            href={CLINIC.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full border border-white/40 px-[29px] py-4 text-[15px] font-semibold text-white"
          >
            온라인 예약
          </a>
        </div>
      </div>
    </section>
  );
}
