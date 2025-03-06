/**
 * Type-safe API endpoints.
 */
export const ENDPOINT = {
  PRODUCTION: "https://api.devsec.tools",
  LOCALDEV: "http://api.devsec.local",
} as const;

/**
 * Extract the type of API endpoints.
 */
export type KnownEndpoint = (typeof ENDPOINT)[keyof typeof ENDPOINT];

/**
 * Constant to convert seconds to milliseconds.
 */
export const SECONDS = 1000 as const;
