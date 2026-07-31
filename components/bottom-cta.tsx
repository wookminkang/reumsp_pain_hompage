"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CLINIC, TEL_HREF } from "@/lib/clinic";

const SPRING = { type: "spring", stiffness: 500, damping: 26 } as const;

export default function BottomCta() {
  // 히어로를 지나면 맨 위로 버튼 노출
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col items-center gap-3 lg:right-[calc(50%-424px)]">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            aria-label="맨 위로"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileTap={{ scale: 0.9 }}
            transition={SPRING}
            className="flex size-[58px] items-center justify-center rounded-full bg-navy text-white"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 15l6-6 6 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={TEL_HREF}
        whileTap={{ scale: 0.9 }}
        transition={SPRING}
        aria-label={`전화 상담 ${CLINIC.tel}`}
        className="flex size-[62px] flex-col items-center justify-center gap-0.5 rounded-full bg-white text-navy shadow-[0_6px_18px_rgba(10,31,35,0.18)]"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17 17 0 014.5 5.7 2 2 0 016.5 3.5z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[11px] font-bold leading-none">전화</span>
      </motion.a>

      <motion.a
        href={CLINIC.reservationUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.9 }}
        transition={SPRING}
        aria-label="온라인 예약"
        className="flex size-[62px] flex-col items-center justify-center gap-0.5 rounded-full bg-white text-navy shadow-[0_6px_18px_rgba(10,31,35,0.18)]"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect
            x="3.5"
            y="5"
            width="17"
            height="15.5"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M3.5 9.5h17M8 3.5v3M16 3.5v3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-[11px] font-bold leading-none">예약</span>
      </motion.a>
    </div>
  );
}
