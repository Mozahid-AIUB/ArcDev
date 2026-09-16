import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { isProductionSite } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Staging copies of the site stay out of search entirely.
  if (!isProductionSite) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/portal", "/api"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
