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

    const el = ref.current;
    if (!el) return;

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
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [amount, scale]);

  return (
    <div ref={ref} className={`will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  );
}
