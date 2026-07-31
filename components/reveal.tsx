"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** 초 단위 지연 (스태거 연출용) */
  delay?: number;
  /** 진입 시 아래에서 올라오는 거리(px) */
  y?: number;
};

/** 뷰포트 진입 시 페이드+슬라이드로 나타나는 Motion 래퍼. 스크롤 리빌 공용. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
