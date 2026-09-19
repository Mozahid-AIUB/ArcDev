import type { Project, ServiceSlug } from "@arcdev/shared";

/** A second photo for the "What's included" section, different from the page header photo. */
export const SERVICE_SECOND_PHOTO: Record<ServiceSlug, { src: string; alt: string }> = {
  fund: { src: "/images/projects/joynal-garden/rooftop-01.webp", alt: "Joynal Garden's rooftop terrace" },
  landshare: { src: "/images/projects/runner-apartment-complex/exterior-02.webp", alt: "Runner Apartment Complex exterior" },
  interior: { src: "/images/projects/royal-group-guest-house/kitchen-01.webp", alt: "A finished kitchen and breakfast bar" },
  engineering: { src: "/images/projects/desco-chq-nikunjo/render-aerial-01.webp", alt: "Desco CHQ aerial design render" },
  management: { src: "/images/projects/sadma-fashion-dyeing/construction-02.webp", alt: "A factory under construction" },
  investment: { src: "/images/projects/imperial-commercial-center/aerial-01.webp", alt: "Imperial Commercial Center, aerial view" },
};

/** Which of ArcDev's projects are worth showing next to each service. */
export function relatedProjects(slug: ServiceSlug, projects: readonly Project[], limit = 3): Project[] {
  const matches = projects.filter((project) => {
    switch (slug) {
      case "fund":
      case "landshare":
        return project.kind === "residential" || project.kind === "commercial";
      case "management":
        return project.status === "ongoing" || project.kind === "industrial";
      case "interior":
        return project.kind === "interior";
      case "engineering":
        return true;
      case "investment":
        return project.kind === "commercial" || project.kind === "hotel-resort";
    }
  });
  return matches.slice(0, limit);
}
