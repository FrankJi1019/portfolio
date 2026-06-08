import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hello.frankji.com",
      lastModified: new Date(),
    },
  ];
}
