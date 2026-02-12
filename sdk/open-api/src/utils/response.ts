/**
 * Response utilities
 */

import type { AxiosResponse } from "axios";
import { UniSatApiError } from "./error";

/**
 * Standard API response format
 */
interface ApiResponse<T = unknown> {
  code: number;
  msg: string;
  data?: T;
}

/**
 * Process API response - returns data on success, throws error on failure
 */
export async function processResponse<T>(promise: Promise<AxiosResponse<ApiResponse<T>>>): Promise<T> {
  const response = await promise;
  const { code, msg, data } = response.data;

  if (code === 0) {
    return data as T;
  }

  throw new UniSatApiError(code, msg || "API request failed");
}

/**
 * Create a wrapped API method that auto-processes responses
 */
export function wrapApiMethod<T extends (...args: any[]) => Promise<any>>(
  fn: T
): (...args: Parameters<T>) => Promise<ReturnType<T> extends Promise<AxiosResponse<ApiResponse<infer D>>> ? D : never> {
  return (...args) => processResponse(fn(...args));
}
