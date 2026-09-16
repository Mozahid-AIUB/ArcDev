import type { Project, ProjectStatus } from "@arcdev/shared";
import { PROJECTS } from "@/content/projects";

// Pages get their data only through this file. In Phase 1 it reads content/;
// from Phase 2 it calls the API instead, and no page has to change.

export async function getProjects(status?: ProjectStatus): Promise<Project[]> {
  return PROJECTS.filter((project) => !status || project.status === status);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return PROJECTS.find((project) => project.slug === slug);
}
