import { onLogout } from "../auth/logout.js";

/**
 * Attaches an event listener to the logout button, triggering the logout process on click.
 *
 * This function expects an element with the ID `logoutButton` to be present in the DOM.
 * When the button is clicked, it calls the `onLogout` function to log the user out.
 *
 * @example
 * <button id="logoutButton">Logout</button>
 * setLogoutListener(); // Adds click event listener to the logout button
 */

export function setLogoutListener() {
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", () => {
    onLogout();
  });
}