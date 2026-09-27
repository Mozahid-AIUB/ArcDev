// Proof points for the homepage, all taken from ArcDev's 2026 company profile and portfolio.

/** Organisations ArcDev and its sister firm Arctic Architects & Construction have designed or built for. */
export const CLIENTS = [
  "Navana Real Estate",
  "Rakeen Development",
  "DESCO",
  "University of Dhaka",
  "UNDP Bangladesh",
  "Royal Group",
  "Habitus Fashion",
  "Farmers Bank",
  "Dhaka Bank",
  "Premier Bank",
  "Mount Adora Hospital",
  "Tauri Foundation",
  "Star Ceramics",
  "Newtex Group",
] as const;

export type CredentialIcon = "shield" | "document" | "award" | "building";

export interface Credential {
  icon: CredentialIcon;
  title: string;
  detail: string;
}

export const CREDENTIALS: Credential[] = [
  { icon: "shield", title: "RJSC registered", detail: "Registration no. C-208789" },
  { icon: "document", title: "Trade licensed", detail: "DNCC licence TRAD/DNCC/043688/2025" },
  { icon: "award", title: "IAB & RAJUK registered architects", detail: "Memberships M-071 and A-165" },
  { icon: "award", title: "PMP & LEED certified", detail: "Project Management Institute · US Green Building Council" },
  { icon: "building", title: "18 years in practice", detail: "Through sister firm Arctic Architects & Construction, since 2008" },
];

export interface Testimonial {
  quote: string;
  name: string;
  /** e.g. "Landowner, Mirpur" or "Investor, Uttara". */
  role: string;
  photo?: string;
}

/**
 * Real words from real clients only. The section stays hidden until ArcDev supplies these,
 * with each person's permission to publish their name.
 */
export const TESTIMONIALS: Testimonial[] = [];
