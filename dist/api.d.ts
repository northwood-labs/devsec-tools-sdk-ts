import { KnownEndpoint } from "./constants";
import { DomainResponse, HttpResponse, TlsResponse } from "./types";
/**
 * Supported API methods.
 */
type ApiMethod = "domain" | "http" | "tls";
/**
 * Configuration options for the `Client` class.
 */
interface ClientOptions {
    /** The API base URL, which can be a predefined endpoint or a custom URL. */
    baseUrl?: KnownEndpoint | string;
    /** The network request timeout in seconds. The default value is `5`. */
    timeoutSeconds?: number;
}
/**
 * A TypeScript SDK client for interacting with the DevSecTools API.
 */
export declare class Client {
    /** The base URL for API requests. */
    private baseUrl;
    /** The request timeout in milliseconds. */
    private timeout;
    /**
     * Creates an instance of the API Client.
     *
     * @param options - Configuration options for the client.
     */
    constructor(options?: ClientOptions);
    /**
     * Sets the API base URL.
     *
     * @param url - The new API base URL.
     */
    setBaseUrl(url: KnownEndpoint | string): void;
    /**
     * Sets the request timeout duration.
     *
     * @param seconds - The new timeout duration in seconds.
     */
    setTimeoutSeconds(seconds: number): void;
    /**
     * Makes an API request with a timeout.
     *
     * @param url - The full API URL.
     * @returns A `Promise` resolving with the response.
     * @throws An `Error` if the request times out.
     */
    private fetchWithTimeout;
    /**
     * Retrieves domain information for a given URL.
     *
     * @param url - The domain URL to analyze.
     * @returns A `Promise` resolving with the parsed domain response.
     */
    domain(url: string): Promise<DomainResponse>;
    /**
     * Checks the HTTP protocol support (HTTP/1.1, HTTP/2, HTTP/3) for a given URL.
     *
     * @param url - The domain URL to analyze.
     * @returns A `Promise` resolving with an object containing HTTP version support details.
     */
    http(url: string): Promise<HttpResponse>;
    /**
     * Scans a given URL for supported TLS versions and cipher suites.
     *
     * @param url - The domain URL to analyze.
     * @returns A `Promise` resolving with an object containing TLS version and cipher suite information.
     */
    tls(url: string): Promise<TlsResponse>;
    /**
     * Executes multiple API requests in parallel and returns results, handling failures gracefully.
     *
     * @param requests - An array of objects specifying API calls to make.
     * @returns A `Promise` resolving to an array where successful responses contain data, and failed ones contain an error message.
     */
    batchRequests(requests: ReadonlyArray<{
        method: ApiMethod;
        url: string;
    }>): Promise<Array<DomainResponse | HttpResponse | TlsResponse | string>>;
}
export {};
//# sourceMappingURL=api.d.ts.map