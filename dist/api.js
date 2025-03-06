"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const constants_1 = require("./constants");
const utils_1 = require("./utils");
/**
 * A TypeScript SDK client for interacting with the DevSecTools API.
 */
class Client {
    /** The base URL for API requests. */
    baseUrl;
    /** The request timeout in milliseconds. */
    timeout;
    /**
     * Creates an instance of the API Client.
     *
     * @param options - Configuration options for the client.
     */
    constructor(options = {}) {
        this.baseUrl = options.baseUrl ?? constants_1.ENDPOINT.PRODUCTION;
        this.timeout = (options.timeoutSeconds ?? 5) * constants_1.SECONDS;
    }
    /**
     * Sets the API base URL.
     *
     * @param url - The new API base URL.
     */
    setBaseUrl(url) {
        this.baseUrl = url;
    }
    /**
     * Sets the request timeout duration.
     *
     * @param seconds - The new timeout duration in seconds.
     */
    setTimeoutSeconds(seconds) {
        this.timeout = seconds * constants_1.SECONDS;
    }
    /**
     * Makes an API request with a timeout.
     *
     * @param url - The full API URL.
     * @returns A `Promise` resolving with the response.
     * @throws An `Error` if the request times out.
     */
    async fetchWithTimeout(url) {
        const controller = new AbortController();
        const timeoutSignal = AbortSignal.timeout(this.timeout);
        return fetch(url, { signal: timeoutSignal });
    }
    /**
     * Retrieves domain information for a given URL.
     *
     * @param url - The domain URL to analyze.
     * @returns A `Promise` resolving with the parsed domain response.
     */
    async domain(url) {
        const response = await this.fetchWithTimeout(`${this.baseUrl}/domain?url=${encodeURIComponent(url)}`);
        return (0, utils_1.handleResponse)(response);
    }
    /**
     * Checks the HTTP protocol support (HTTP/1.1, HTTP/2, HTTP/3) for a given URL.
     *
     * @param url - The domain URL to analyze.
     * @returns A `Promise` resolving with an object containing HTTP version support details.
     */
    async http(url) {
        const response = await this.fetchWithTimeout(`${this.baseUrl}/http?url=${encodeURIComponent(url)}`);
        return (0, utils_1.handleResponse)(response);
    }
    /**
     * Scans a given URL for supported TLS versions and cipher suites.
     *
     * @param url - The domain URL to analyze.
     * @returns A `Promise` resolving with an object containing TLS version and cipher suite information.
     */
    async tls(url) {
        const response = await this.fetchWithTimeout(`${this.baseUrl}/tls?url=${encodeURIComponent(url)}`);
        return (0, utils_1.handleResponse)(response);
    }
    /**
     * Executes multiple API requests in parallel and returns results, handling failures gracefully.
     *
     * @param requests - An array of objects specifying API calls to make.
     * @returns A `Promise` resolving to an array where successful responses contain data, and failed ones contain an error message.
     */
    async batchRequests(requests) {
        const results = await Promise.allSettled(requests.map(({ method, url }) => this[method](url)));
        return results.map(res => res.status === "fulfilled" ? res.value : `Error: ${res.reason}`);
    }
}
exports.Client = Client;
