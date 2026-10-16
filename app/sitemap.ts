import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.c6m1lo.com";

const routes = [
  "",
  "/projects",
  "/resume",
  "/habitAnalytics",
  "/support",
  "/privacy",
  "/tos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/projects" ? 0.9 : 0.6,
  }));
}
