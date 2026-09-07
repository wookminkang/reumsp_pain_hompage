#!/usr/bin/env node
/**
 * 칼럼 썸네일 배경 SVG 생성기.
 *
 * gen-image.py(gpt-image-1)를 대신한다. make-thumbnail.py가 --bg를 data URI로 읽어
 * CSS background에 넣는 구조이고 .svg의 MIME이 image/svg+xml로 잡히므로, 여기서 만든
 * SVG를 그대로 --bg에 넘기면 된다. 최종 산출물은 여전히 JPG라 next/image와 OG
 * 미리보기가 정상 동작한다. (SVG를 thumbnail.src에 직접 넣으면 안 된다.)
 *
 * 썸네일 하단 62%는 화이트 그라데이션이 덮으므로 배경은 상단 영역이 살아야 한다.
 *
 * 사용:
 *   node scripts/make-bg-svg.mjs <slug> <variant>
 *   variant: entry(지역 진입) | stay(입원 생활) | rehab(입원재활) | info(검사·제도)
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const VARIANTS = {
  entry: { from: "#123037", to: "#08191d", glow: "#3d8f88", tint: "#1d5b60" },
  stay: { from: "#20303d", to: "#0c161d", glow: "#5b83a8", tint: "#2a4a63" },
  rehab: { from: "#14332b", to: "#071c17", glow: "#43906f", tint: "#1c5442" },
  info: { from: "#272b3e", to: "#111320", glow: "#6a6fa6", tint: "#3a3e60" },
};

const [slug, variantName = "entry"] = process.argv.slice(2);
if (!slug) {
  console.error("사용: node scripts/make-bg-svg.mjs <slug> [entry|stay|rehab|info]");
  process.exit(1);
}

const v = VARIANTS[variantName];
if (!v) {
  console.error(`알 수 없는 variant: ${variantName}`);
  process.exit(1);
}

/** slug에서 만든 안정적인 해시 — 같은 원고는 항상 같은 배경이 나온다 */
const seed = [...slug].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) % 100000, 7);
const jitter = (range, offset = 0) => ((seed >> offset) % range) - range / 2;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stop-color="${v.from}"/>
      <stop offset="1" stop-color="${v.to}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${v.glow}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${v.glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="tint" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${v.tint}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${v.tint}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1080" height="1080" fill="url(#base)"/>

  <circle cx="${760 + jitter(180)}" cy="${210 + jitter(120, 3)}" r="${330 + jitter(90, 5)}" fill="url(#glow)"/>
  <circle cx="${230 + jitter(160, 7)}" cy="${400 + jitter(140, 9)}" r="${300 + jitter(80, 11)}" fill="url(#tint)"/>

  <g fill="none" stroke="#ffffff" stroke-opacity="0.07" stroke-width="2">
    <path d="M-60 ${330 + jitter(120, 2)} C 300 ${170 + jitter(100, 4)}, 700 ${430 + jitter(120, 6)}, 1140 ${250 + jitter(100, 8)}"/>
    <path d="M-60 ${430 + jitter(120, 10)} C 320 ${290 + jitter(100, 12)}, 720 ${540 + jitter(120, 1)}, 1140 ${360 + jitter(100, 3)}"/>
    <path d="M-60 ${530 + jitter(120, 5)} C 340 ${400 + jitter(100, 7)}, 740 ${650 + jitter(120, 9)}, 1140 ${470 + jitter(100, 11)}"/>
  </g>

  <g fill="#ffffff" fill-opacity="0.05">
    <circle cx="${900 + jitter(80, 4)}" cy="${120 + jitter(60, 6)}" r="8"/>
    <circle cx="${170 + jitter(80, 8)}" cy="${180 + jitter(60, 10)}" r="6"/>
    <circle cx="${520 + jitter(120, 12)}" cy="${90 + jitter(50, 2)}" r="5"/>
  </g>
</svg>
`;

const out = join(ROOT, `public/images/columns/${slug}-bg.svg`);
writeFileSync(out, svg);
console.log(`saved ${out}`);
