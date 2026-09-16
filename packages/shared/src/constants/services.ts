export const SERVICE_SLUGS = [
  "fund",
  "landshare",
  "interior",
  "engineering",
  "management",
  "investment",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

/** An extra question asked on one service's request form. */
export interface ServiceField {
  name: string;
  label: string;
  placeholder?: string;
  inputMode?: "text" | "numeric" | "decimal";
}

export interface Service {
  slug: ServiceSlug;
  /** Short name shown on the tile, e.g. "Fund". */
  name: string;
  /** What the service is, in plain words. Used as the page heading. */
  title: string;
  /** The client's own one-line description. */
  summary: string;
  /** The request button, in the customer's voice. */
  cta: string;
  fields: readonly ServiceField[];
}

export const SERVICES: readonly Service[] = [
  {
    slug: "fund",
    name: "Fund",
    title: "Construction funding for landowners",
    summary: "We provide funds for construction to landowners.",
    cta: "I want fund for construction",
    fields: [
      { name: "landLocation", label: "Land location", placeholder: "Area, city" },
      { name: "landSize", label: "Land size (katha)", inputMode: "decimal" },
    ],
  },
  {
    slug: "landshare",
    name: "Landshare",
    title: "Joint land development with co-owners",
    summary: "We jointly develop land with co-owners.",
    cta: "Let's buy a land together",
    fields: [
      { name: "preferredArea", label: "Preferred area", placeholder: "Area, city" },
      { name: "budget", label: "Budget (BDT)", inputMode: "numeric" },
    ],
  },
  {
    slug: "interior",
    name: "Interior",
    title: "Interior design solutions",
    summary: "We provide interior design solutions.",
    cta: "Design my apartment",
    fields: [
      { name: "flatSize", label: "Flat size (sq ft)", inputMode: "numeric" },
      { name: "flatLocation", label: "Flat location", placeholder: "Area, city" },
    ],
  },
  {
    slug: "engineering",
    name: "Engineering",
    title: "Engineering design solutions",
    summary: "We provide all engineering design solutions.",
    cta: "I want engineering solutions",
    fields: [
      {
        name: "workType",
        label: "What needs designing?",
        placeholder: "Structural, architectural, electrical…",
      },
      { name: "siteLocation", label: "Site location", placeholder: "Area, city" },
    ],
  },
  {
    slug: "management",
    name: "Management",
    title: "Project management from A to Z",
    summary: "We provide A to Z project management solutions.",
    cta: "I want project management",
    fields: [
      { name: "projectType", label: "Project type", placeholder: "Residential, commercial…" },
      { name: "siteLocation", label: "Site location", placeholder: "Area, city" },
    ],
  },
  {
    slug: "investment",
    name: "Investment",
    title: "Managed investment with returns",
    summary: "We manage customer investments and provide profits.",
    cta: "I want to invest",
    fields: [
      { name: "amount", label: "Amount you plan to invest (BDT)", inputMode: "numeric" },
      { name: "term", label: "Preferred term", placeholder: "e.g. 2 years" },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
