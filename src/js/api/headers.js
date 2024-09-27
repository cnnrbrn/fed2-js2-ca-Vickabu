import { API_KEY } from "./constants";

/**
 * Constructs and returns a Headers object for API requests.
 *
 * This function creates a new Headers object and populates it with the necessary
 * authorization headers if an API key or an access token is present.
 * It ensures that the Content-Type is set to 'application/json'.
 *
 * @returns {Headers} The constructed Headers object.
 *
 * @example
 * const requestHeaders = headers();
 * fetch(API_ENDPOINT, { method: 'GET', headers: requestHeaders });
 */

export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`);
  }

  headers.append("Content-Type", "application/json");

  return headers;
}
