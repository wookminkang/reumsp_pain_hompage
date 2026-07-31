#!/usr/bin/env python3
"""OpenAI gpt-image-1 image generator: gen_img.py <out> <size> <prompt>"""
import base64
import json
import os
import sys
import urllib.request

out, size, prompt = sys.argv[1], sys.argv[2], sys.argv[3]
key = os.environ["OPENAI_API_KEY"]

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
    print("ERROR", e.code, e.read().decode()[:400])
    sys.exit(1)
