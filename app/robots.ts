import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/clinic";

export default function robots(): MetadataRoute.Robots {
  return {
    // /main2·/main3는 디자인 시안, /internal은 내부 확인용 — 크롤 차단
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/main2", "/main3", "/internal"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
