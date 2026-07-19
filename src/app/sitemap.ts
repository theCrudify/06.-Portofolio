import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.APP_URL ?? "http://localhost:3000";
  const routes = [
    "",
    "/about",
    "/projects",
    "/experience",
    "/skills",
    "/education",
    "/resume",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
