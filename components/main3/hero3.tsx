"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLINIC, TEL_HREF } from "@/lib/clinic";

gsap.registerPlugin(ScrollTrigger);

export default function Hero3() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero3-bg]",
        { scale: 1.1 },
        { scale: 1, duration: 3, ease: "power2.out" },
      );

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero3-eyebrow]", { y: 18, opacity: 0, duration: 0.8, delay: 0.2 })
        .from("[data-hero3-line]", { scaleX: 0, duration: 0.7 }, "-=0.4")
        .from("[data-hero3-title] span", { y: 44, opacity: 0, duration: 1, stagger: 0.14 }, "-=0.4")
        .from("[data-hero3-sub]", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
        .from("[data-hero3-cta] > *", { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4");

      gsap.to("[data-hero3-bg]", {
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
      className="relative flex hero-viewport max-h-[930px] min-h-[620px] w-full items-end overflow-hidden bg-navy"
    >
      <div aria-hidden className="absolute inset-0">
        <img
          data-hero3-bg
          src="/figma/hero-building.jpg"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/35 to-navy" />
      </div>

      <div className="relative w-full px-7 pb-24">
        <p
          data-hero3-eyebrow
          className="text-[12px] font-semibold uppercase tracking-[4px] text-[#e3c795] [text-shadow:0_1px_14px_rgba(10,31,35,0.9)]"
        >
          Reum Gangdong Songpa
        </p>
        <div
          data-hero3-line
          className="mt-4 h-px w-14 origin-left bg-gradient-to-r from-gold to-gold/0"
        />
        <h1
          data-hero3-title
          className="mt-6 text-[36px] font-extrabold leading-[1.3] tracking-[-0.8px] text-white"
        >
          <span className="block">{CLINIC.name}</span>
          <span className="block bg-gradient-to-r from-[#d8b98a] via-gold to-[#8a6a3e] bg-clip-text text-transparent">
            통증 치료 클리닉
          </span>
        </h1>
        <p data-hero3-sub className="mt-5 text-[16px] leading-[1.7] text-white/70">
          365일, 야간·공휴일 진료/입원 가능
        </p>
        <div data-hero3-cta className="mt-9 flex items-center gap-3">
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
    </section>
  );
}
