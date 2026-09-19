const PRODUCTION_URL = "https://arcdevltd.com";

export const SITE = {
  name: "Arc Development Pvt. Ltd.",
  shortName: "ArcDev",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL,
  description:
    "Construction funding, joint land development, interior and engineering design, project management and managed investment.",

  phone: "+8801930699909",
  phoneDisplay: "+880 1930-699909",
  whatsappNumber: "8801930699909",
  email: "arcdevelopmentbd@gmail.com",
  address: "Quantum Meher (4th Fl), House 43, Road 13, Section-11, Uttara, Dhaka-1230",
  addressSylhet: "Level-6, Mount Adora Hospital, Sylhet-Sunamganj Road, Akhalia, Sylhet-3100",
} as const;

/**
 * Search engines may index the site only on the real domain, and only once
 * NEXT_PUBLIC_ALLOW_INDEXING=true is set — after the client approves real content.
 * Until then the live site carries sample data that must not end up in Google.
 */
export const isProductionSite =
  SITE.url === PRODUCTION_URL && process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const whatsappUrl = `https://wa.me/${SITE.whatsappNumber}`;
