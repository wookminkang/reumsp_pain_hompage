#!/usr/bin/env python3
"""칼럼 썸네일 생성기 — 배경 사진 위에 리움 고정 오버레이 합성.

고정 요소(항상 동일): 리움한방병원 강동송파 배지, 하단 화이트 그라데이션,
우하단 리움 로고 워터마크. 배경 사진과 서브타이틀/타이틀만 원고마다 바꾼다.

사용:
  python3 scripts/make-thumbnail.py \
    --bg public/images/columns/asan-nearby-thumbnail-bg.webp \
    --subtitle "서울아산병원 퇴원 후" \
    --title "강동송파 통원재활 한방병원" \
    --out public/images/columns/asan-nearby-thumbnail.jpg

의존: gstack browse (~/.claude/skills/gstack/browse/dist/browse), macOS sips
"""
import argparse
import base64
import mimetypes
import os
import pathlib
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
BROWSE = pathlib.Path.home() / ".claude/skills/gstack/browse/dist/browse"

# app/icon.svg의 리움 글리프 (fill은 CSS로 흰색 지정)
GLYPH = """
<svg class="mark" viewBox="0 0 28.5 28" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.5951 -4.12562e-05H10.2046V16.5511H11.5951V-4.12562e-05Z"/>
  <path d="M1.60409 13.0369H6.40947C7.59304 13.0369 8.58257 12.1303 8.62784 11.0173C8.65371 10.442 8.43382 9.89178 8.01989 9.47285C7.60597 9.06016 7.04976 8.82881 6.45475 8.82881H1.37773V7.41568H0.0195405V10.1732H6.46122C6.66818 10.1732 6.86867 10.2544 7.01742 10.4045C7.16618 10.5483 7.25026 10.7484 7.24379 10.9548C7.23732 11.3674 6.86867 11.6988 6.42241 11.6988H0.000137849L0.0195405 11.9177C0.0648133 12.4054 0.135956 12.8744 0.239437 13.3058C0.827984 15.7319 2.11503 17.9516 3.95181 19.7274C6.53883 22.2285 9.96663 23.6229 13.6079 23.6729V22.3286C10.3353 22.2786 7.26319 21.0218 4.93487 18.777C3.28565 17.1888 2.1409 15.2067 1.60409 13.0369Z"/>
  <path d="M13.7644 8.68446V10.0288H20.3872V11.6795H21.7712V10.0288H28.4845V8.68446H13.7644Z"/>
  <path d="M21.0767 8.11567C22.7971 8.11567 24.2005 6.75881 24.2005 5.09557C24.2005 3.67619 23.1916 2.46314 21.7687 2.15051V0.699857H20.3782V2.15051C18.9618 2.46314 17.9464 3.66993 17.9464 5.09557C17.9464 6.75881 19.3499 8.11567 21.0702 8.11567H21.0767ZM21.0767 3.41357C22.0339 3.41357 22.8165 4.1639 22.8165 5.08932C22.8165 6.01473 22.0404 6.76506 21.0767 6.76506C20.113 6.76506 19.3369 6.01473 19.3369 5.08932C19.3369 4.1639 20.113 3.41357 21.0767 3.41357Z"/>
  <path d="M14.4017 27.9987H15.7922V13.711H25.8298C24.5234 17.9254 21.0245 21.0768 16.5877 22.0335V23.4029C21.6647 22.4212 25.707 18.8508 27.1816 14.0299C27.3174 13.5922 27.4209 13.1295 27.4985 12.598L27.5373 12.3667H14.4082V27.9987H14.4017Z"/>
</svg>
"""

TEMPLATE = """<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: "Pretendard Variable", Pretendard, sans-serif; }
  .card {
    position: relative; width: 1080px; height: 1080px; overflow: hidden;
    background: url("__BG__") center / cover no-repeat; word-break: keep-all;
  }
  .fade {
    position: absolute; inset: auto 0 0 0; height: 62%;
    background: linear-gradient(to top,
      rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.94) 30%,
      rgba(255,255,255,0.55) 62%, rgba(255,255,255,0) 100%);
  }
  .mark {
    position: absolute; right: -52px; bottom: -36px; width: 470px;
    opacity: 0.6;
  }
  .mark path { fill: #ffffff; }
  .content { position: absolute; left: 64px; right: 64px; bottom: 72px; }
  .badge {
    display: inline-block; background: #0f1418; color: #fff;
    font-size: 38px; font-weight: 500; letter-spacing: -0.01em;
    padding: 18px 30px; border-radius: 16px;
  }
  .badge strong { font-weight: 800; }
  .subtitle {
    margin-top: 40px; font-size: 54px; font-weight: 600;
    color: #3d434b; letter-spacing: -0.02em; line-height: 1.3;
  }
  .title {
    margin-top: 14px; font-size: 78px; font-weight: 800;
    color: #0a1f23; letter-spacing: -0.025em; line-height: 1.25;
  }
</style>
</head>
<body>
<div class="card">
  <div class="fade"></div>
  __GLYPH__
  <div class="content">
    <span class="badge">리움한방병원 <strong>강동송파</strong></span>
    <div class="subtitle">__SUBTITLE__</div>
    <div class="title">__TITLE__</div>
  </div>
</div>
</body>
</html>
"""


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--bg", required=True, help="배경 이미지 경로 (repo 기준)")
    p.add_argument("--subtitle", required=True)
    p.add_argument("--title", required=True)
    p.add_argument("--out", required=True, help="출력 jpg 경로 (repo 기준)")
    args = p.parse_args()

    bg_path = (ROOT / args.bg).resolve()
    mime = mimetypes.guess_type(str(bg_path))[0] or "image/jpeg"
    data_uri = f"data:{mime};base64," + base64.b64encode(bg_path.read_bytes()).decode()

    html = (
        TEMPLATE.replace("__BG__", data_uri)
        .replace("__GLYPH__", GLYPH)
        .replace("__SUBTITLE__", args.subtitle)
        .replace("__TITLE__", args.title)
    )

    # browse의 file:// 접근 허용 범위(/private/tmp, cwd)에 맞춘다
    tmp_dir = pathlib.Path("/private/tmp")
    tmp_html = tmp_dir / "reum-thumbnail.html"
    tmp_png = tmp_dir / "reum-thumbnail.png"
    tmp_html.write_text(html, encoding="utf-8")

    run = lambda *cmd: subprocess.run(cmd, check=True, cwd=ROOT)
    run(str(BROWSE), "viewport", "1200x1200")
    run(str(BROWSE), "goto", f"file://{tmp_html}")
    run(str(BROWSE), "wait", "--networkidle")
    run(str(BROWSE), "screenshot", str(tmp_png), "--selector", ".card")

    out_path = (ROOT / args.out).resolve()
    out_path.parent.mkdir(parents=True, exist_ok=True)
    run("sips", "-s", "format", "jpeg", "-s", "formatOptions", "92",
        str(tmp_png), "--out", str(out_path))
    print(f"saved {out_path} ({out_path.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
