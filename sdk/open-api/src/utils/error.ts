/**
 * UniSat API Error
 */

export class UniSatApiError extends Error {
  constructor(
    public code: number,
    message: string
  ) {
    super(`UniSat API Error ${code}: ${message}`);
    this.name = "UniSatApiError";
  }
}

/**
 * Check if an error is a UniSat API Error
 */
export function isUniSatApiError(error: unknown): error is UniSatApiError {
  return error instanceof UniSatApiError;
}
