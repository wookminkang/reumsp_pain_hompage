"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** 스크롤 구간 동안 이동할 비율(%). 클수록 배경이 느리게 흐르는 느낌 */
  amount?: number;
  /** 진입 시 확대 배율 (1이면 확대 없음) */
  scale?: number;
};

/**
 * 자식(보통 배경 이미지)을 스크롤에 따라 위로 흘려보내는 패럴랙스 래퍼.
 * 부모에 overflow-hidden이 있어야 넘치는 영역이 잘린다.
 */
export default function Parallax({
  children,
  className,
  amount = 14,
  scale = 1.18,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // 모바일에서는 스크롤 중 대형 이미지 리페인트 비용이 커서 패럴랙스를 끈다
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const el = ref.current;
    if (!el) return;

    el.style.willChange = "transform";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -amount, scale },
        {
          yPercent: amount,
          scale,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.4,
          },
        },
      );
    }, el);

    return () => {
      ctx.revert();
      el.style.willChange = "";
    };
  }, [amount, scale]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
