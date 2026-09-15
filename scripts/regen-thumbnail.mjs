#!/usr/bin/env node
/**
 * 칼럼 썸네일을 사진 배경으로 생성한다.
 *
 * scripts/thumbnail-prompts.json에 미리 확정해 둔 장면으로 gpt-image-1 배경을 뽑고,
 * scripts/make-thumbnail.py로 리움 오버레이를 합성한다. 배경 원본은 중간 산출물이라
 * 저장소에 남기지 않고 시스템 임시 폴더에 둔다.
 *
 * 사용:
 *   node scripts/regen-thumbnail.mjs --today          오늘(KST) 게재분 전부
 *   node scripts/regen-thumbnail.mjs --date 2026-09-15
 *   node scripts/regen-thumbnail.mjs car-accident-meals [...]
 *
 * 환경변수 OPENAI_API_KEY 필요:
 *   set -a; . ./.env.local; set +a
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BG_DIR = join(tmpdir(), "reum-thumbnail-bg");
const prompts = JSON.parse(readFileSync(join(ROOT, "scripts/thumbnail-prompts.json"), "utf8"));
const CONSTRAINTS = prompts._공통제약;

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("사용: node scripts/regen-thumbnail.mjs [--today | --date YYYY-MM-DD | <이름>...]");
  process.exit(1);
}

/** 원고에서 게재일과 썸네일 이름을 읽는다 */
function columnsOn(date) {
  const dir = join(ROOT, "content/columns");
  const out = [];
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".ts") || f === "index.ts") continue;
    const s = readFileSync(join(dir, f), "utf8");
    if (s.match(/datePublished: "(.*?)"/)?.[1] !== date) continue;
    const thumb = s.match(/src: "\/images\/columns\/(.*?)-thumbnail\.jpg"/)?.[1];
    if (thumb) out.push(thumb);
  }
  return out;
}

let names;
if (args[0] === "--today") {
  const today = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  names = columnsOn(today);
  console.log(`${today} 게재분 ${names.length}편`);
} else if (args[0] === "--date") {
  names = columnsOn(args[1]);
  console.log(`${args[1]} 게재분 ${names.length}편`);
} else {
  names = args;
}

if (names.length === 0) {
  console.log("대상이 없습니다.");
  process.exit(0);
}

mkdirSync(BG_DIR, { recursive: true });
let failed = 0;

for (const name of names) {
  const spec = prompts[name];
  if (!spec) {
    console.error(`  [건너뜀] ${name} — thumbnail-prompts.json에 장면 정의가 없습니다`);
    failed += 1;
    continue;
  }

  const bg = join(BG_DIR, `${name}.png`);
  try {
    if (existsSync(bg)) {
      console.log(`  배경 캐시됨: ${name}`);
    } else {
      // gen-image.py는 API 실패 시 그라데이션 플레이스홀더를 저장하고 정상 종료한다.
      // 종료 코드만 보면 실패를 놓치므로 출력으로 판별한다.
      const log = execFileSync("python3", [
        join(ROOT, "scripts/gen-image.py"),
        bg,
        "1024x1024",
        `${spec.scene}. ${CONSTRAINTS}`,
      ], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

      if (log.includes("fallback placeholder")) {
        rmSync(bg, { force: true });
        throw new Error("AI 생성 실패로 플레이스홀더가 저장됨 (크레딧·API 상태 확인 필요)");
      }
      console.log(`  배경 생성: ${name}`);
    }

    execFileSync("python3", [
      join(ROOT, "scripts/make-thumbnail.py"),
      "--bg", bg,
      "--subtitle", spec.subtitle,
      "--title", spec.title,
      "--out", `public/images/columns/${name}-thumbnail.jpg`,
    ], { cwd: ROOT, stdio: "pipe" });
    console.log(`  완성: ${name}-thumbnail.jpg`);
  } catch (err) {
    console.error(`  [실패] ${name} — ${err.message.split("\n")[0]}`);
    failed += 1;
  }
}

console.log(failed === 0 ? "\n전부 완료. 이미지를 눈으로 확인한 뒤 커밋하세요." : `\n실패 ${failed}건`);
process.exit(failed > 0 ? 1 : 0);
