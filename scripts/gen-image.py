#!/usr/bin/env python3
"""OpenAI gpt-image-1 image generator: gen_img.py <out> <size> <prompt>

AI 생성이 실패하면(크레딧 소진, API 오류 등) 원고 발행 전체가 막히지 않도록
브랜드 톤 그라데이션 플레이스홀더를 대신 저장한다. 실패 사실은 stderr/stdout에
명확히 남겨, 나중에 실사진이나 AI 이미지로 교체할 대상을 알아볼 수 있게 한다.
"""
import base64
import json
import os
import sys
import urllib.request

out, size, prompt = sys.argv[1], sys.argv[2], sys.argv[3]
key = os.environ["OPENAI_API_KEY"]


def save_fallback(out_path: str, size_str: str) -> None:
    from PIL import Image, ImageDraw

    try:
        w, h = (int(v) for v in size_str.lower().split("x"))
    except ValueError:
        w, h = 1024, 1024

    img = Image.new("RGB", (w, h))
    draw = ImageDraw.Draw(img)
    top, bottom = (15, 61, 46), (31, 111, 79)  # 브랜드 그린 그라데이션
    for y in range(h):
        t = y / max(1, h - 1)
        color = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        draw.line([(0, y), (w, y)], fill=color)
    img.save(out_path)


req = urllib.request.Request(
    "https://api.openai.com/v1/images/generations",
    data=json.dumps(
        {"model": "gpt-image-1", "prompt": prompt, "size": size, "quality": "high", "n": 1}
    ).encode(),
    headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
)
try:
    with urllib.request.urlopen(req, timeout=280) as r:
        d = json.load(r)
    with open(out, "wb") as f:
        f.write(base64.b64decode(d["data"][0]["b64_json"]))
    print("saved", out)
except urllib.error.HTTPError as e:
    print("WARNING: AI 이미지 생성 실패, 플레이스홀더로 대체합니다", e.code, e.read().decode()[:400])
    save_fallback(out, size)
    print("saved (fallback placeholder)", out)
