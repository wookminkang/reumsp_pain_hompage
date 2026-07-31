import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 사진류는 quality 90으로 서빙 (기본 75는 인물 사진에서 뭉개짐)
    qualities: [75, 90],
  },
};

export default nextConfig;
