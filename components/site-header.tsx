"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV_ITEMS } from "@/lib/nav";
import { CLINIC, TEL_HREF } from "@/lib/clinic";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-[720px] lg:hidden">
      <div className="flex items-center justify-between bg-black/20 px-4 py-[11px] backdrop-blur-[2px]">
        <a href="#top" aria-label={`${CLINIC.name} 홈`}>
          <Image
            src="/figma/logo.svg"
            alt={`${CLINIC.shortName} 로고`}
            width={110}
            height={28}
            priority
          />
        </a>
        <button
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={open}
          aria-controls="site-drawer"
          onClick={() => setOpen(true)}
          className="p-1"
        >
          <Image src="/figma/ic-menu.svg" alt="" width={24} height={24} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              id="site-drawer"
              aria-label="주요 메뉴"
              className="fixed right-0 top-0 z-50 flex h-full w-[280px] flex-col bg-navy px-6 pb-8 pt-5"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between">
                <Image
                  src="/figma/logo.svg"
                  alt={`${CLINIC.shortName} 로고`}
                  width={110}
                  height={28}
                />
                <button
                  type="button"
                  aria-label="메뉴 닫기"
                  onClick={() => setOpen(false)}
                  className="p-2 text-2xl leading-none text-white"
                >
                  ×
                </button>
              </div>
              <ul className="mt-10 flex flex-col gap-6">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-[17px] font-semibold text-white/90"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={TEL_HREF}
                className="mt-auto rounded-full bg-gold py-[14px] text-center text-[15px] font-semibold text-white"
              >
                전화 상담 {CLINIC.tel}
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
