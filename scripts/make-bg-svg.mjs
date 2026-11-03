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

/** 통증 지점 강조 (따뜻한 코랄 점 + 링) */
const accent = (x, y) =>
  `<circle cx="${x}" cy="${y}" r="26" fill="none" stroke="#F2A07B" stroke-opacity="0.45" stroke-width="4"/>` +
  `<circle cx="${x}" cy="${y}" r="11" fill="#F2A07B" stroke="none"/>`;

const footprint = (x, y, rot, opacity) =>
  `<g transform="translate(${x} ${y}) rotate(${rot})" stroke-opacity="${opacity}" fill-opacity="${opacity}">` +
  `<ellipse cx="0" cy="0" rx="24" ry="44"/>` +
  `<circle cx="-13" cy="-62" r="8" fill="#ffffff" stroke="none"/>` +
  `<circle cx="4" cy="-67" r="8" fill="#ffffff" stroke="none"/>` +
  `<circle cx="19" cy="-58" r="7" fill="#ffffff" stroke="none"/></g>`;

const sole =
  "M158 292 Q126 292 124 252 Q120 162 138 92 Q154 42 178 42 Q204 42 208 94 Q212 162 198 252 Q194 292 158 292 Z";

/**
 * 원고 주제를 나타내는 선 아이콘 (400×300 로컬 좌표, 흰 선).
 * 썸네일 하단 62%는 화이트 그라데이션이 덮으므로 상단 영역에 배치한다.
 */
const MOTIFS = {
  // 지역 한방병원 일반 질의
  pin: `<path d="M200 270 C150 205 120 165 120 120 A80 80 0 0 1 280 120 C280 165 250 205 200 270 Z"/>
    <circle cx="200" cy="120" r="28"/>
    <ellipse cx="200" cy="284" rx="95" ry="16" stroke-opacity="0.5"/>
    <ellipse cx="200" cy="284" rx="160" ry="28" stroke-opacity="0.25"/>`,
  // 교통사고
  car: `<path d="M30 205 V168 Q30 142 56 139 L118 133 L166 90 Q176 81 192 81 H274 Q292 81 304 93 L344 133 L366 137 Q388 141 388 165 V205"/>
    <path d="M30 205 H72 M148 205 H262 M338 205 H388"/>
    <circle cx="110" cy="205" r="36"/><circle cx="300" cy="205" r="36"/>
    <path d="M150 133 H340 M236 84 V133"/>
    <path d="M-70 150 H0 M-92 178 H-12 M-70 206 H-22" stroke-opacity="0.45"/>
    ${accent(26, 176)}`,
  bus: `<rect x="40" y="40" width="330" height="190" rx="28"/>
    <path d="M40 150 H370 M110 62 V150 M180 62 V150 M250 62 V150 M320 62 V150"/>
    <circle cx="110" cy="240" r="30"/><circle cx="300" cy="240" r="30"/>
    <path d="M400 90 H460 M410 130 H486 M400 170 H452" stroke-opacity="0.45"/>
    ${accent(370, 196)}`,
  // 척추·관절
  spine: [14, 4, -4, 2, 14]
    .map((o, i) => `<rect x="${140 + o}" y="${18 + i * 54}" width="120" height="38" rx="13"/>`)
    .join("") + accent(208, 226),
  neck: `<circle cx="200" cy="48" r="44"/>
    ${[8, 2, -4, -2, 6].map((o, i) => `<rect x="${170 + o}" y="${108 + i * 30}" width="60" height="20" rx="8"/>`).join("")}
    <path d="M20 300 Q60 262 140 258 H260 Q340 262 380 300"/>
    ${accent(198, 174)}`,
  knee: `<path d="M168 0 V118 Q168 140 150 152 Q132 166 140 184 Q148 198 172 196 H228 Q252 198 260 184 Q268 166 250 152 Q232 140 232 118 V0"/>
    <path d="M175 300 V252 Q150 246 146 228 Q144 212 170 210 H230 Q256 212 254 228 Q250 246 225 252 V300"/>
    <path d="M272 238 V300"/>
    <circle cx="200" cy="200" r="20"/>
    ${accent(140, 204)}`,
  shoulder: `<path d="M80 0 V64 Q80 96 50 106"/>
    <path d="M50 106 Q140 80 214 86 Q272 92 290 140 L330 300"/>
    <path d="M208 176 L246 300"/>
    <path d="M208 176 Q170 182 160 210 V300"/>
    <circle cx="236" cy="132" r="32"/>
    ${accent(254, 104)}`,
  elbow: `<path d="M40 20 L168 250 Q182 272 206 262 L380 170"/>
    <path d="M104 4 L200 192 L360 112"/>
    ${accent(178, 256)}`,
  wrist: `<path d="M0 132 H168 M0 214 H168"/>
    <rect x="180" y="120" width="140" height="106" rx="40"/>
    <path d="M318 142 H384 M320 166 H396 M320 190 H390 M316 212 H372"/>
    <path d="M222 122 Q232 72 282 58"/>
    <circle cx="174" cy="146" r="6" fill="#ffffff" stroke="none"/>
    <circle cx="174" cy="200" r="6" fill="#ffffff" stroke="none"/>
    ${accent(174, 173)}`,
  ankle: `<path d="M190 0 V196 M262 0 V200"/>
    <path d="M190 196 Q186 240 150 256 L60 276 Q30 284 38 300 H352 Q378 300 370 276 Q360 252 318 244 L280 234 Q262 226 262 200"/>
    ${accent(250, 214)}`,
  // 재활·운동 기능
  range: `<path d="M120 240 H380"/>
    <path d="M120 240 L270 40"/>
    <path d="M300 240 A180 180 0 0 0 228 96" stroke-dasharray="2 22"/>
    <circle cx="228" cy="96" r="8" fill="#ffffff" stroke="none"/>
    ${accent(120, 240)}`,
  walk: [
    footprint(90, 262, -10, 0.45),
    footprint(185, 205, 10, 0.65),
    footprint(255, 140, -10, 0.82),
    footprint(345, 84, 10, 1),
  ].join(""),
  dumbbell: `<path d="M110 160 H290"/>
    <rect x="56" y="98" width="36" height="124" rx="10"/><rect x="92" y="120" width="22" height="80" rx="7"/>
    <rect x="308" y="98" width="36" height="124" rx="10"/><rect x="286" y="120" width="22" height="80" rx="7"/>
    <path d="M200 84 V14 M176 38 L200 14 L224 38" stroke-opacity="0.7"/>`,
  // 생활 장면
  clock: `<circle cx="190" cy="160" r="118"/>
    <path d="M190 52 V70 M298 160 H280 M190 268 V250 M82 160 H100"/>
    <path d="M190 160 L138 190 M190 160 V84"/>
    <circle cx="190" cy="160" r="9" fill="#ffffff" stroke="none"/>
    <path d="M352 6 A40 40 0 1 0 380 64 A32 32 0 1 1 352 6 Z"/>`,
  box: `<path d="M90 120 L210 76 L330 120 L210 164 Z"/>
    <path d="M90 120 V250 L210 294 L330 250 V120 M210 164 V294"/>
    <path d="M150 98 L270 142 V184" stroke-opacity="0.55"/>`,
  feet: `<path d="${sole}" transform="translate(-22 0)"/>
    <path d="${sole}" transform="translate(422 0) scale(-1 1)"/>
    <path d="M40 304 H360" stroke-opacity="0.45"/>
    ${accent(136, 258)}`,
  bike: `<circle cx="88" cy="210" r="72"/><circle cx="312" cy="210" r="72"/>
    <path d="M88 210 L168 210 L250 104 M168 210 L140 92 M88 210 L148 112 L252 108 L312 210 M118 88 H164 M252 108 L246 76 L280 70"/>`,
};

const [slug, variantName = "entry", motifName, outArg] = process.argv.slice(2);
if (!slug) {
  console.error(
    "사용: node scripts/make-bg-svg.mjs <slug> [entry|stay|rehab|info] [motif] [출력경로]\n" +
      `  motif: ${Object.keys(MOTIFS).join(" | ")}`,
  );
  process.exit(1);
}
if (motifName && !MOTIFS[motifName]) {
  console.error(`알 수 없는 motif: ${motifName}`);
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
${
  motifName
    ? `
  <g transform="translate(310 66) scale(1.15)" fill="none" stroke="#ffffff" stroke-opacity="0.9" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    ${MOTIFS[motifName]}
  </g>`
    : ""
}
</svg>
`;

const out = outArg ?? join(ROOT, `public/images/columns/${slug}-bg.svg`);
writeFileSync(out, svg);
console.log(`saved ${out}`);
