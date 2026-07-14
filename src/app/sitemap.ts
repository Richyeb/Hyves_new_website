import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const routes = [
  "",
  "/product",
  "/how-it-works",
  "/about",
  "/contact",
  "/get-started",
  "/blog",
  "/join-our-team",
  "/policies",
  "/ims-policy",
  "/careers",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/product" || route === "/contact" ? 0.9 : 0.7,
  }));
}
