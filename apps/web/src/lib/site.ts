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

export const isProductionSite = SITE.url === PRODUCTION_URL;

export const whatsappUrl = `https://wa.me/${SITE.whatsappNumber}`;
