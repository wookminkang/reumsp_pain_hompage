"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLINIC, TEL_HREF } from "@/lib/clinic";

gsap.registerPlugin(ScrollTrigger);

export default function HeroPremium() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 느린 시네마틱 줌 (Ken Burns)
      gsap.fromTo(
        "[data-hero2-bg]",
        { scale: 1.12 },
        { scale: 1, duration: 3.2, ease: "power2.out" },
      );

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero2-eyebrow]", { y: 18, opacity: 0, duration: 0.8, delay: 0.2 })
        .from("[data-hero2-line]", { scaleX: 0, duration: 0.7 }, "-=0.4")
        .from("[data-hero2-title] span", { y: 44, opacity: 0, duration: 1, stagger: 0.14 }, "-=0.4")
        .from("[data-hero2-sub]", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
        .from("[data-hero2-cta] > *", { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from("[data-hero2-scroll]", { opacity: 0, duration: 0.8 }, "-=0.2");

      // 스크롤 패럴랙스
      gsap.to("[data-hero2-bg]", {
        yPercent: 16,
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
      className="relative flex h-[100svh] max-h-[930px] min-h-[620px] w-full items-end overflow-hidden bg-navy"
    >
      <div aria-hidden className="absolute inset-0">
        <img
          data-hero2-bg
          src="/ai/hero-luxury.jpg"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/10 to-navy" />
      </div>

      <div className="relative w-full px-7 pb-28">
        <p
          data-hero2-eyebrow
          className="text-[12px] font-semibold uppercase tracking-[4px] text-gold"
        >
          Reum Korean Medicine Hospital
        </p>
        <div
          data-hero2-line
          className="mt-4 h-px w-14 origin-left bg-gradient-to-r from-gold to-gold/0"
        />
        <h1
          data-hero2-title
          className="mt-6 text-[38px] font-extrabold leading-[1.28] tracking-[-0.8px] text-white"
        >
          <span className="block">통증의 원인부터</span>
          <span className="block">
            회복까지,{" "}
            <em className="not-italic bg-gradient-to-r from-[#d8b98a] via-gold to-[#8a6a3e] bg-clip-text text-transparent">
              한 번에
            </em>
          </span>
        </h1>
        <p data-hero2-sub className="mt-6 text-[16px] leading-[1.7] text-white/70">
          {CLINIC.name} 통증 치료 클리닉
          <br />
          365일, 야간·공휴일 진료/입원 가능
        </p>
        <div data-hero2-cta className="mt-10 flex items-center gap-3">
          <a
            href={TEL_HREF}
            className="flex-1 rounded-full bg-gold py-4 text-center text-[15px] font-semibold text-white shadow-[0_8px_28px_rgba(176,141,87,0.35)]"
          >
            전화 상담
          </a>
          <a
            href={CLINIC.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full border border-white/25 bg-white/5 py-4 text-center text-[15px] font-semibold text-white backdrop-blur-sm"
          >
            온라인 예약
          </a>
        </div>
      </div>

      <div
        data-hero2-scroll
        aria-hidden
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[3px] text-white/50">
          Scroll
        </span>
        <span className="h-8 w-px animate-pulse bg-gradient-to-b from-white/60 to-white/0" />
      </div>
    </section>
  );
}
