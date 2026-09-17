const PRODUCTION_URL = "https://arcdevltd.com";

export const SITE = {
  name: "ArcDev Ltd",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL,
  description:
    "Construction funding, joint land development, interior and engineering design, project management and managed investment.",

  // Placeholders until ArcDev confirms its contact details.
  // 010 is not an operator prefix in Bangladesh, so these can't reach a real person.
  phone: "+8801000000000",
  phoneDisplay: "+880 1000-000000",
  whatsappNumber: "8801000000000",
  email: "info@arcdevltd.com",
  address: "Office address to be confirmed",
} as const;

/**
 * Search engines may index the site only on the real domain, and only once
 * NEXT_PUBLIC_ALLOW_INDEXING=true is set — after the client approves real content.
 * Until then the live site carries sample data that must not end up in Google.
 */
export const isProductionSite =
  SITE.url === PRODUCTION_URL && process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const whatsappUrl = `https://wa.me/${SITE.whatsappNumber}`;
