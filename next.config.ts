import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 사진 화질 우선 — 100으로 서빙
    qualities: [75, 90, 100],
    // AVIF 우선 (같은 화질에서 WebP보다 30~50% 작음), 미지원 브라우저는 WebP로 폴백
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
