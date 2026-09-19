import type { ProjectStatus } from "../constants/statuses";

export interface ProjectUpdate {
  /** Month and year, e.g. "March 2026". */
  date: string;
  title: string;
}

/** A project as the website shows it. The API will return this same shape. */
export interface Project {
  slug: string;
  name: string;
  /** Area and city, e.g. "Mirpur, Dhaka". */
  location: string;
  status: ProjectStatus;
  kind: "residential" | "commercial" | "industrial" | "hotel-resort" | "interior";
  /** One or two sentences for cards and search results. */
  summary: string;
  description: string;
  /** Land area in katha. */
  landKatha?: number;
  storeys?: number;
  units?: number;
  /** Flat or floor sizes on offer, in sq ft. */
  flatSizesSqft?: number[];
  /** Expected or actual handover, e.g. "December 2027". */
  handover?: string;
  /** Construction progress, 0–100. Ongoing projects only. */
  progress?: number;
  amenities?: string[];
  /** Construction milestones, newest first. */
  updates?: ProjectUpdate[];
  /** Paths under /public or full URLs. The first is the cover. */
  images: string[];
}
