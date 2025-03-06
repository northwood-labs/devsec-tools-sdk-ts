/**
 * Type-safe API endpoints.
 */
export declare const ENDPOINT: {
    readonly PRODUCTION: "https://api.devsec.tools";
    readonly LOCALDEV: "http://api.devsec.local";
};
/**
 * Extract the type of API endpoints.
 */
export type KnownEndpoint = (typeof ENDPOINT)[keyof typeof ENDPOINT];
/**
 * Constant to convert seconds to milliseconds.
 */
export declare const SECONDS: 1000;
//# sourceMappingURL=constants.d.ts.map