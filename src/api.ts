import { ENDPOINT, KnownEndpoint, SECONDS } from "./constants";
import { DomainResponse, HttpResponse, TlsResponse } from "./types";
import { handleResponse } from "./utils";

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
export class Client {
  /** The base URL for API requests. */
  private baseUrl: string;

  /** The request timeout in milliseconds. */
  private timeout: number;

  /**
   * Creates an instance of the API Client.
   *
   * @param options - Configuration options for the client.
   */
  constructor(options: ClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? ENDPOINT.PRODUCTION;
    this.timeout = (options.timeoutSeconds ?? 5) * SECONDS;
  }

  /**
   * Sets the API base URL.
   *
   * @param url - The new API base URL.
   */
  setBaseUrl(url: KnownEndpoint | string): void {
    this.baseUrl = url;
  }

  /**
   * Sets the request timeout duration.
   *
   * @param seconds - The new timeout duration in seconds.
   */
  setTimeoutSeconds(seconds: number): void {
    this.timeout = seconds * SECONDS;
  }

  /**
   * Makes an API request with a timeout.
   *
   * @param url - The full API URL.
   * @returns A `Promise` resolving with the response.
   * @throws An `Error` if the request times out.
   */
  private async fetchWithTimeout(url: string): Promise<Response> {
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
  async domain(url: string): Promise<DomainResponse> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}/domain?url=${encodeURIComponent(url)}`);
    return handleResponse<DomainResponse>(response);
  }

  /**
   * Checks the HTTP protocol support (HTTP/1.1, HTTP/2, HTTP/3) for a given URL.
   *
   * @param url - The domain URL to analyze.
   * @returns A `Promise` resolving with an object containing HTTP version support details.
   */
  async http(url: string): Promise<HttpResponse> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}/http?url=${encodeURIComponent(url)}`);
    return handleResponse<HttpResponse>(response);
  }

  /**
   * Scans a given URL for supported TLS versions and cipher suites.
   *
   * @param url - The domain URL to analyze.
   * @returns A `Promise` resolving with an object containing TLS version and cipher suite information.
   */
  async tls(url: string): Promise<TlsResponse> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}/tls?url=${encodeURIComponent(url)}`);
    return handleResponse<TlsResponse>(response);
  }

  /**
   * Executes multiple API requests in parallel and returns results, handling failures gracefully.
   *
   * @param requests - An array of objects specifying API calls to make.
   * @returns A `Promise` resolving to an array where successful responses contain data, and failed ones contain an error message.
   */
  async batchRequests(
    requests: ReadonlyArray<{ method: ApiMethod; url: string }>
  ): Promise<Array<DomainResponse | HttpResponse | TlsResponse | string>> {
    const results = await Promise.allSettled(
      requests.map(({ method, url }) => this[method](url))
    );

    return results.map(res => res.status === "fulfilled" ? res.value : `Error: ${res.reason}`);
  }
}
