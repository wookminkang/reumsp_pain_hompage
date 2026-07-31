"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const STATS = [
  { value: 365, suffix: "일", label: "야간·공휴일 진료/입원" },
  { value: 100, suffix: "%", label: "전문의·석박사 직접진료" },
  { value: 2, suffix: "배", label: "한·양방 협진 회복 관리" },
];

export default function StatsBand() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        root.querySelectorAll<HTMLElement>("[data-stat-num]").forEach((el, i) => {
          const target = STATS[i].value;
          if (prefersReduced) {
            el.textContent = String(target);
            return;
          }
          const counter = { v: 0 };
          gsap.to(counter, {
            v: target,
            duration: 1.6,
            delay: i * 0.15,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = String(Math.round(counter.v));
            },
          });
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="relative w-full overflow-hidden bg-navy">
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/ai/silk-gold.jpg')] bg-cover bg-center opacity-60"
      />
      <div className="relative grid grid-cols-3 divide-x divide-white/10 py-12">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 px-2">
            <p className="text-[30px] font-extrabold leading-none text-white">
              <span data-stat-num>0</span>
              <span className="ml-0.5 text-[18px] font-bold text-gold">
                {stat.suffix}
              </span>
            </p>
            <p className="text-center text-[11.5px] leading-[1.5] text-white/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
