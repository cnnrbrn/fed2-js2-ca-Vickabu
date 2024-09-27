/**
 * Checks if the user is authenticated by verifying the presence of an access token in localStorage.
 * If the user is not logged in, they are alerted and redirected to the authentication page.
 *
 * @example
 * authGuard(); // Call this function before rendering a protected page
 */

export function authGuard() {
  if (!localStorage.accessToken) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/";
  }
}
