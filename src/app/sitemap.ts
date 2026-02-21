import type { MetadataRoute } from "next";
import { SITE_URL } from "@shared/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/ko`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          ko: `${SITE_URL}/ko`,
          zh: `${SITE_URL}/zh`,
        },
      },
    },
    {
      url: `${SITE_URL}/zh`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          ko: `${SITE_URL}/ko`,
          zh: `${SITE_URL}/zh`,
        },
      },
    },
  ];
}
