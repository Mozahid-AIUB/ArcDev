import type { MetadataRoute } from "next";
import { SERVICES } from "@arcdev/shared";
import { getProjects } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    ...SERVICES.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: absoluteUrl("/projects"), changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: absoluteUrl("/enquiry"), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/gallery"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.5 },
  ];
}
