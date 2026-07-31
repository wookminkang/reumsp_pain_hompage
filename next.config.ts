import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 사진 화질 우선 — 100으로 서빙
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
