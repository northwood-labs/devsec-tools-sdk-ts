"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = handleResponse;
/**
 * Handles API responses, converting them to JSON or throwing an error.
 *
 * @param response - The API response object.
 * @returns The parsed JSON response.
 * @throws An error if the response is not successful.
 */
async function handleResponse(response) {
    if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || `HTTP Error ${response.status}`);
    }
    return response.json();
}
