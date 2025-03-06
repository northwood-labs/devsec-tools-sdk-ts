import { ErrorResponse } from "./types";

/**
 * Handles API responses, converting them to JSON or throwing an error.
 *
 * @param response - The API response object.
 * @returns The parsed JSON response.
 * @throws An error if the response is not successful.
 */
export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody: ErrorResponse = await response.json();
    throw new Error(errorBody.error || `HTTP Error ${response.status}`);
  }
  return response.json();
}
