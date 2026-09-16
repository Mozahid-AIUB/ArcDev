import type { ServiceSlug } from "@arcdev/shared";

/**
 * Longer copy for each service page, one string per paragraph.
 * `null` means ArcDev hasn't supplied it yet, and the page says so.
 */
export const SERVICE_CONTENT: Record<ServiceSlug, readonly string[] | null> = {
  fund: null,
  landshare: null,
  interior: null,
  engineering: null,
  management: null,
  investment: null,
};
