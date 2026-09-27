// Proof points for the homepage, all taken from ArcDev's 2026 company profile and portfolio.

export interface Client {
  name: string;
  /** Official logo under /public/images/clients, with its pixel size. */
  logo: { src: string; width: number; height: number };
}

/**
 * Organisations ArcDev and its sister firm Arctic Architects & Construction have designed or built
 * for. Logos come from each organisation's own website or Wikimedia Commons.
 */
export const CLIENTS: Client[] = [
  { name: "Navana Real Estate", logo: { src: "/images/clients/navana.webp", width: 520, height: 119 } },
  { name: "Rakeen Development", logo: { src: "/images/clients/rakeen.webp", width: 150, height: 65 } },
  { name: "DESCO", logo: { src: "/images/clients/desco.webp", width: 520, height: 117 } },
  { name: "University of Dhaka", logo: { src: "/images/clients/university-of-dhaka.webp", width: 126, height: 160 } },
  { name: "UNDP Bangladesh", logo: { src: "/images/clients/undp.webp", width: 79, height: 160 } },
  { name: "Dhaka Bank", logo: { src: "/images/clients/dhaka-bank.webp", width: 520, height: 96 } },
  { name: "Premier Bank", logo: { src: "/images/clients/premier-bank.webp", width: 520, height: 101 } },
  { name: "Padma Bank (formerly Farmers Bank)", logo: { src: "/images/clients/padma-bank.webp", width: 229, height: 160 } },
  { name: "Star Ceramics", logo: { src: "/images/clients/star-ceramics.webp", width: 203, height: 160 } },
  { name: "Mount Adora Hospital", logo: { src: "/images/clients/mount-adora-hospital.webp", width: 160, height: 160 } },
  { name: "Tauri Foundation", logo: { src: "/images/clients/tauri-foundation.webp", width: 200, height: 78 } },
];

/** Past clients without a usable logo, named in text under the band. */
export const MORE_CLIENTS = ["Royal Group", "Habitus Fashion", "Newtex Group"] as const;

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
