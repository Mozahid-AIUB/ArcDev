export const PROJECT_STATUSES = ["ongoing", "completed", "upcoming"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const LEAD_STATUSES = ["new", "contacted", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
