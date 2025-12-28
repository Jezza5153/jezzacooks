export const WEBSITE_MODES = ["simple", "pro", "custom"] as const;
export type WebsitesMode = (typeof WEBSITE_MODES)[number];
