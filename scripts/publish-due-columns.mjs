#!/usr/bin/env node
/**
 * 게재일이 지난 칼럼을 content/columns/index.ts에 등록한다.
 *
 * 원고 파일은 미리 만들어 두되 index.ts에 import하지 않으면 빌드 산출물에 들어가지
 * 않아 사이트에 노출되지 않는다. 이 스크립트가 schedule.md를 읽어 오늘(KST) 이전
 * 날짜인데 아직 등록되지 않은 slug를 찾아 import 줄과 배열 항목을 넣는다.
 *
 * 커밋·푸시는 하지 않는다. 변경 후 `npx tsc --noEmit`으로 확인하고 직접 커밋한다.
 *
 * 사용:
 *   node scripts/publish-due-columns.mjs           등록 실행
 *   node scripts/publish-due-columns.mjs --dry-run 등록 대상만 출력
 *   node scripts/publish-due-columns.mjs --date 2026-09-10  특정 날짜 기준으로 실행
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCHEDULE = join(ROOT, "content/columns/schedule.md");
const INDEX = join(ROOT, "content/columns/index.ts");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const dateArg = args[args.indexOf("--date") + 1];

/** KST 기준 오늘 날짜 (빌드·런타임이 UTC라 +9시간 보정) */
const today =
  args.includes("--date") && /^\d{4}-\d{2}-\d{2}$/.test(dateArg ?? "")
    ? dateArg
    : new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);

/** schedule.md의 마크다운 표에서 날짜와 slug를 뽑는다 */
function readSchedule() {
  return readFileSync(SCHEDULE, "utf8")
    .split("\n")
    .filter((line) => /^\|\s*\d{4}-\d{2}-\d{2}\s*\|/.test(line))
    .map((line) => {
      const cells = line.split("|").map((cell) => cell.trim());
      return { date: cells[1], slug: cells[2], title: cells[3] };
    })
    .filter((row) => /^[a-z0-9-]+$/.test(row.slug));
}

/** 원고 파일에서 export 심볼 이름을 읽는다 */
function exportName(slug) {
  const file = join(ROOT, `content/columns/${slug}.ts`);
  if (!existsSync(file)) return null;
  return readFileSync(file, "utf8").match(/export const (\w+)\s*=/)?.[1] ?? null;
}

/** 정렬된 위치에 한 줄을 끼워 넣는다 */
function insertSorted(lines, start, end, newLine, keyOf) {
  const key = keyOf(newLine);
  let at = end;
  for (let i = start; i < end; i += 1) {
    if (keyOf(lines[i]) > key) {
      at = i;
      break;
    }
  }
  lines.splice(at, 0, newLine);
}

const schedule = readSchedule();
const due = schedule.filter((row) => row.date <= today);
let source = readFileSync(INDEX, "utf8");
const published = [];
const missing = [];

for (const row of due) {
  if (source.includes(`"./${row.slug}"`)) continue;

  const name = exportName(row.slug);
  if (!name) {
    missing.push(row);
    continue;
  }

  const lines = source.split("\n");
  const importEnd = lines.findLastIndex((line) => line.startsWith("import {")) + 1;
  insertSorted(
    lines,
    1,
    importEnd,
    `import { ${name} } from "./${row.slug}";`,
    (line) => line.match(/from "\.\/(.+)"/)?.[1] ?? "",
  );

  const arrayStart = lines.findIndex((line) => line.startsWith("export const COLUMNS")) + 1;
  const arrayEnd = lines.findIndex((line) => line.startsWith("].sort("));
  insertSorted(lines, arrayStart, arrayEnd, `  ${name},`, (line) => line.trim());

  source = lines.join("\n");
  published.push({ ...row, name });
}

if (published.length === 0 && missing.length === 0) {
  console.log(`등록할 칼럼이 없습니다. (기준일 ${today})`);
  process.exit(0);
}

for (const row of published) {
  console.log(`  + ${row.date}  ${row.slug}`);
}
for (const row of missing) {
  console.log(`  ! ${row.date}  ${row.slug} — 원고 파일이 없습니다`);
}

if (dryRun) {
  console.log(`\n--dry-run 이라 파일을 수정하지 않았습니다. (기준일 ${today})`);
  process.exit(missing.length > 0 ? 1 : 0);
}

if (published.length > 0) {
  writeFileSync(INDEX, source);
  console.log(`\n${published.length}편을 index.ts에 등록했습니다. (기준일 ${today})`);
  console.log("다음: npx tsc --noEmit 으로 확인한 뒤 커밋하세요.");
}

process.exit(missing.length > 0 ? 1 : 0);
