"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLINIC, TEL_HREF } from "@/lib/clinic";
import { HERO_BLUR } from "@/lib/hero-blur";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  // 진입 연출은 CSS(.rise-in)가 담당 — JS 실패해도 콘텐츠가 보인다.
  // GSAP은 데스크탑 스크롤 패럴랙스만 담당한다.
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to("[data-hero-bg]", {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex hero-viewport max-h-[890px] min-h-[560px] w-full items-end overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0">
        {/* LCP 배경 — next/image로 뷰포트에 맞는 크기만 내려받는다 */}
        <div data-hero-bg className="absolute inset-0">
          {/*
            세로로 긴 컨테이너 + object-cover라 필요한 해상도는 폭이 아니라 높이가 결정한다.
            sizes를 뷰포트 폭보다 크게 잡아야 충분한 크기의 변형본을 받는다.
          */}
          <Image
            src="/figma/hero-building.jpg"
            alt=""
            fill
            priority
            quality={100}
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            sizes="(max-width: 720px) 120vw, 900px"
            className="object-cover"
          />
        </div>
        {/* 상단은 밝게 두되, 텍스트가 놓이는 하단은 확실히 어둡게 (가독성 확보) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-25% via-[rgba(8,30,34,0.45)] via-65% to-[rgba(8,30,34,0.92)]" />
      </div>

      <div className="relative w-full max-w-[720px] px-6 pb-24">
        <h1
          className="rise-in text-[27px] font-extrabold leading-[1.3] tracking-[-0.5px] text-white sm:text-[32px] lg:text-[34px]"
          style={{ animationDelay: "0.1s" }}
        >
          {CLINIC.name.replace(" 강동송파", "")} 강동송파
          <br />
          통증 치료 클리닉
        </h1>
        <p
          className="rise-in mt-4 text-[15px] font-semibold leading-[1.6] text-white sm:text-[16px]"
          style={{ animationDelay: "0.26s" }}
        >
          365일, 야간·공휴일 진료/입원 가능
        </p>
        <div className="mt-9 flex flex-col gap-[14px]">
          <a
            href={TEL_HREF}
            className="rise-in flex items-center justify-center rounded-full bg-gold px-[29px] py-4 text-[15px] font-semibold text-white"
            style={{ animationDelay: "0.4s" }}
          >
            전화 상담
          </a>
          <a
            href={CLINIC.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rise-in flex items-center justify-center rounded-full border border-white/40 px-[29px] py-4 text-[15px] font-semibold text-white"
            style={{ animationDelay: "0.5s" }}
          >
            온라인 예약
          </a>
        </div>
      </div>
    </section>
  );
}
