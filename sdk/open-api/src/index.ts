// @unisat/open-api SDK
// Auto-generated from OpenAPI spec

// Export HTTP client and types
export { ContentType, HttpClient } from "./http-client";
export type { RequestParams, ApiConfig } from "./http-client";

// Export error handling
export { UniSatApiError, isUniSatApiError } from "./utils/error";

// Export data contracts (type definitions)
export * from "./data-contracts";

// Export API versions (for direct access if needed)
export { V1 } from "./V1";
export { V2 } from "./V2";
export { V3 } from "./V3";

// Re-export commonly used types for convenience
export type {
  BlockInfo,
  TxHistoryItem,
  UTXO,
  InscriptionItem,
  InscriptionData,
  BRC20InfoItem,
  BRC20HistoryItem,
  RuneEntry,
  RuneStatus,
  RunesBalance,
  RuneUtxo,
  AlkaneInfo,
  AlkanesBalance,
  AlkaneHolder,
  Order,
} from "./data-contracts";

import { V1 } from "./V1";
import { V2 } from "./V2";
import { V3 } from "./V3";

function formatApiKey(apiKey: string): string {
  if (apiKey.startsWith("Bearer ")) {
    return apiKey;
  }
  return `Bearer ${apiKey}`;
}

/**
 * Configuration options for the UniSat Open API client
 */
export interface UniSatConfig {
  /**
   * Base URL for the API
   * @default https://open-api.unisat.io
   */
  baseURL?: string;

  /**
   * API key for authentication (sent via X-Client header)
   */
  apiKey?: string;

  /**
   * Custom axios instance
   */
  axios?: any;

  /**
   * Request timeout in milliseconds
   */
  timeout?: number;

  /**
   * Additional headers
   */
  headers?: Record<string, string>;
}

/**
 * UniSat Open API Client
 *
 * Provides organized access to UniSat Open API endpoints grouped by functionality.
 *
 * @example
 * ```typescript
 * import { createClient } from '@unisat/open-api';
 *
 * const client = createClient({
 *   apiKey: 'your-api-key',
 * });
 *
 * // Get blockchain info
 * const info = await client.blockchain.info();
 *
 * // Get BRC-20 token info
 * const ordi = await client.brc20.getInfo('ordi');
 *
 * // Get address balance
 * const balance = await client.addresses.getBalance('address');
 *
 * // Get rune info
 * const rune = await client.runes.getInfo('runeid');
 * ```
 */
export class UniSatClient {
  // Direct API version access (for advanced use / backward compatibility)
  readonly v1: V1;
  readonly v2: V2;
  readonly v3: V3;

  private config: UniSatConfig;

  constructor(config: UniSatConfig = {}) {
    this.config = config;

    const baseConfig = {
      baseURL: config.baseURL || "https://open-api.unisat.io",
      axiosInstance: config.axios,
      timeout: config.timeout,
      headers: {
        ...(config.headers || {}),
        ...(config.apiKey
          ? { Authorization: formatApiKey(config.apiKey) }
          : {}),
      },
    };

    // Initialize API versions
    this.v1 = new V1(baseConfig);
    this.v2 = new V2(baseConfig);
    this.v3 = new V3(baseConfig);
  }

  /**
   * Update the API key
   */
  setApiKey(apiKey: string): void {
    this.config.apiKey = apiKey;

    const headers = apiKey ? { Authorization: formatApiKey(apiKey) } : {};

    // Update all API versions
    this.v1.instance.defaults.headers.common = {
      ...this.v1.instance.defaults.headers.common,
      ...headers,
    };
    this.v2.instance.defaults.headers.common = {
      ...this.v2.instance.defaults.headers.common,
      ...headers,
    };
    this.v3.instance.defaults.headers.common = {
      ...this.v3.instance.defaults.headers.common,
      ...headers,
    };
  }

  /**
   * Update the base URL
   */
  setBaseURL(baseURL: string): void {
    this.config.baseURL = baseURL;
    this.v1.instance.defaults.baseURL = baseURL;
    this.v2.instance.defaults.baseURL = baseURL;
    this.v3.instance.defaults.baseURL = baseURL;
  }
}

/**
 * Create a configured UniSat Open API client
 *
 * @param config - Configuration options
 * @returns UniSatClient instance
 *
 * @example
 * ```typescript
 * import { createClient } from '@unisat/open-api';
 *
 * // Mainnet client
 * const client = createClient({
 *   apiKey: 'your-api-key',
 * });
 *
 * // Testnet client
 * const testnetClient = createClient({
 *   apiKey: 'your-api-key',
 *   baseURL: 'https://open-api-testnet.unisat.io',
 * });
 *
 * // Using functional modules
 * const info = await client.blockchain.info();
 * const ordi = await client.brc20.getInfo('ordi');
 * const balance = await client.addresses.getBalance('address');
 *
 * // Direct API version access (if needed)
 * const info2 = await client.v1.getBlockchainInfo();
 * ```
 */
export function createClient(config: UniSatConfig = {}): UniSatClient {
  return new UniSatClient(config);
}

// Export a default client instance
export const client = new UniSatClient();
