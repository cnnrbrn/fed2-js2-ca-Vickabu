/**
 * Logs out the user by clearing session data from localStorage and redirecting to the homepage.
 *
 * Removes `accessToken` and `userInfo` from localStorage, shows an alert indicating
 * the user is logged out, and redirects to the home page (`/`).
 *
 * @example
 * onLogout(); // Logs the user out and redirects them to the home page.
 */

export function onLogout() {
  ["accessToken", "userInfo"].forEach((item) => localStorage.removeItem(item));
  alert("Logged out");
  window.location.href = "/";
}
