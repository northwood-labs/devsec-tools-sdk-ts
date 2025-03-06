/**
 * Response type for domain API calls.
 */
export interface DomainResponse {
  hostname: string;
}

/**
 * Response type for HTTP version checks.
 */
export interface HttpResponse {
  hostname: string;
  http11: boolean;
  http2: boolean;
  http3: boolean;
}

/**
 * Response type for TLS analysis.
 */
export interface TlsResponse {
  hostname: string;
  tlsConnections: TlsConnection[];
  tlsVersions: {
    tls10: boolean;
    tls11: boolean;
    tls12: boolean;
    tls13: boolean;
  };
}

/**
 * TLS connection details.
 */
export interface TlsConnection {
  version: string;
  versionId: number;
  cipherSuites: CipherSuite[];
}

/**
 * Cipher suite details.
 */
export interface CipherSuite {
  authentication: string;
  encryption: string;
  gnutlsName: string;
  hash: string;
  ianaName: string;
  isAEAD: boolean;
  isPFS: boolean;
  keyExchange: string;
  opensslName: string;
  strength: string;
  url: string;
}

/**
 * Response type for API errors.
 */
export interface ErrorResponse {
  error: string;
}
