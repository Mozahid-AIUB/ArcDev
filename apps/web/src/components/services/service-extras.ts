import type { Project, ServiceSlug } from "@arcdev/shared";

/** A second photo for the "What's included" section, different from the page header photo. */
export const SERVICE_SECOND_PHOTO: Record<ServiceSlug, { src: string; alt: string }> = {
  fund: { src: "/images/sample/land-planning.webp", alt: "A building plot being prepared for construction" },
  landshare: { src: "/images/sample/site-frame.webp", alt: "The concrete frame of a building under construction" },
  interior: { src: "/images/sample/interior-kitchen.webp", alt: "A finished modern kitchen and living area" },
  engineering: { src: "/images/sample/engineering-blueprint.webp", alt: "Engineering drawings laid out on a desk" },
  management: { src: "/images/sample/site-tower-crane.webp", alt: "A worker receiving material from a tower crane on site" },
  investment: { src: "/images/sample/city-night-towers.webp", alt: "City towers lit up at night" },
};

/** Which of ArcDev's projects are worth showing next to each service. */
export function relatedProjects(slug: ServiceSlug, projects: readonly Project[], limit = 3): Project[] {
  const matches = projects.filter((project) => {
    switch (slug) {
      case "fund":
      case "landshare":
      case "management":
        return project.kind === "residential" && (project.status === "ongoing" || project.status === "upcoming");
      case "interior":
        return project.status === "completed";
      case "engineering":
        return true;
      case "investment":
        return project.status === "ongoing" || project.kind === "commercial";
    }
  });
  return matches.slice(0, limit);
}
