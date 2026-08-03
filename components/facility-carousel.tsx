"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, type PanInfo } from "motion/react";
import SectionEyebrow from "@/components/section-eyebrow";

const SLIDES = [
  {
    src: "/figma/facility-02.jpg",
    caption: "재활치료센터",
    desc: "체계적인 재활 치료 전문 공간",
  },
  {
    src: "/figma/facility-07.jpg",
    caption: "운동치료실",
    desc: "넓고 쾌적한 운동 치료 공간",
  },
  {
    src: "/figma/facility-01.jpg",
    caption: "도수치료실",
    desc: "1:1 맞춤 도수·슬링 치료 공간",
  },
  {
    src: "/figma/facility-08.jpg",
    caption: "물리치료실",
    desc: "최신 장비를 갖춘 치료 공간",
  },
  {
    src: "/figma/facility-03.jpg",
    caption: "검사·치료센터",
    desc: "정확한 진단을 위한 검사·치료 공간",
  },
  {
    src: "/figma/facility-04.jpg",
    caption: "족욕 테라피",
    desc: "편안한 회복을 돕는 힐링 공간",
  },
  {
    src: "/figma/facility-06.jpg",
    caption: "휴게라운지",
    desc: "환자와 보호자를 위한 휴식 공간",
  },
  {
    src: "/figma/facility-05.jpg",
    caption: "대기공간",
    desc: "여유로운 진료 대기 공간",
  },
  {
    src: "/figma/facility-09.jpg",
    caption: "재활치료센터 입구",
    desc: "재활 전문 치료가 시작되는 곳",
  },
];

const AUTOPLAY_MS = 4500;
const N = SLIDES.length;

/** 중앙 기준 부호 있는 거리 (-2 ~ +2) */
function signedOffset(i: number, index: number) {
  let d = (i - index + N) % N;
  if (d > N / 2) d -= N;
  return d;
}

// 커버플로우 배치: 중앙 카드 + 좌우로 살짝 보이는 이웃 카드.
// 어둡게 하는 처리는 CSS filter 대신 오버레이 opacity로 — 모바일 리페인트 비용 절감
function deckStyle(d: number) {
  if (d === 0) return { x: "0%", scale: 1, opacity: 1, zIndex: 30 };
  if (Math.abs(d) === 1)
    return {
      x: d > 0 ? "88%" : "-88%",
      scale: 0.86,
      opacity: 1,
      zIndex: 20,
    };
  return {
    x: d > 0 ? "140%" : "-140%",
    scale: 0.8,
    opacity: 0,
    zIndex: 10,
  };
}

export default function FacilityCarousel() {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % N), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + N) % N), []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      if (!pausedRef.current) next();
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [next]);

  // 이동 거리 + 던진 속도를 함께 보고 판정 — 짧고 빠른 스와이프도 넘어간다
  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const power = info.offset.x + info.velocity.x * 0.2;
      if (power < -45) next();
      else if (power > 45) prev();
    },
    [next, prev],
  );

  return (
    <section
      id="facility"
      className="flex w-full scroll-mt-14 flex-col items-center gap-6 overflow-hidden bg-white py-10"
    >
      <SectionEyebrow label="FACILITY" title="병원 둘러보기" />

      <div
        className="relative h-[470px] w-full"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
        onTouchEnd={() => (pausedRef.current = false)}
        aria-roledescription="carousel"
        aria-label="병원 시설 사진"
      >
        {SLIDES.map((slide, i) => {
          const d = signedOffset(i, index);
          const style = deckStyle(d);
          const isCenter = d === 0;
          // 화면에 보이는 3장(중앙+좌우)만 합성 — 나머지는 DOM에서 제외
          if (Math.abs(d) > 1) return null;
          return (
            <motion.div
              key={slide.src}
              className={`absolute inset-y-0 left-1/2 ml-[-34%] w-[68%] ${
                isCenter ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
              }`}
              style={{ zIndex: style.zIndex, touchAction: "pan-y" }}
              animate={style}
              transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.7 }}
              drag={isCenter ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              dragMomentum={false}
              onDragStart={() => (pausedRef.current = true)}
              onDragEnd={isCenter ? onDragEnd : undefined}
              onClick={!isCenter && Math.abs(d) === 1 ? () => setIndex(i) : undefined}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${N} — ${slide.caption}`}
              aria-hidden={!isCenter}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[30px] shadow-[0_24px_60px_rgba(10,31,35,0.35)]">
                <Image
                  src={slide.src}
                  alt={slide.caption}
                  fill
                  quality={100}
                  // 세로 카드 + object-cover라 필요 해상도가 높이로 결정된다 → sizes를 넉넉히
                  sizes="(max-width: 720px) 120vw, 640px"
                  className="pointer-events-none object-cover"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-b from-transparent to-[rgba(10,20,23,0.92)]" />
                {/* 비중앙 카드 딤 처리 (filter 대체) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[#0a1417] transition-opacity duration-300"
                  style={{ opacity: isCenter ? 0 : 0.5 }}
                />
                <div className="absolute inset-x-0 bottom-8 flex flex-col items-center px-7 text-center">
                  <p className="text-[26px] font-extrabold tracking-[-0.3px] text-white">
                    {slide.caption}
                  </p>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-white/75">
                    {slide.desc}
                  </p>
                  <a
                    href="#consultation"
                    className="pointer-events-auto mt-5 rounded-full bg-white px-7 py-[10px] text-[14px] font-bold text-ink shadow-lg"
                  >
                    예약 문의
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex gap-[10px]" role="tablist" aria-label="슬라이드 선택">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={index === i}
            aria-label={slide.caption}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === i ? "w-6 bg-gold" : "w-2 bg-black/20"
            }`}
          />
        ))}
      </div>

      <p className="px-5 text-center text-[14px] leading-[1.55] text-black/80">
        그 외 진료실, 검사실 등 다양한 시설이 마련되어 있습니다.
      </p>
    </section>
  );
}
