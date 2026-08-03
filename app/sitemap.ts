import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/clinic";
import { COLUMNS } from "@/content/columns";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestColumn = COLUMNS.map((c) => c.dateModified).sort().at(-1);

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/columns`,
      lastModified: latestColumn ? new Date(latestColumn) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...COLUMNS.map((column) => ({
      url: `${SITE_URL}/columns/${column.slug}`,
      lastModified: new Date(column.dateModified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
