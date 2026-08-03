import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/clinic";

export default function robots(): MetadataRoute.Robots {
  return {
    // /main2·/main3는 디자인 시안 — 메타 noindex에 더해 크롤 단계에서도 차단
    rules: { userAgent: "*", allow: "/", disallow: ["/main2", "/main3"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
