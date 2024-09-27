/**
 * Retrieves the logged-in user's name from localStorage.
 *
 * @returns {string|undefined} The name of the logged-in user, or undefined if no user is logged in.
 *
 * @example
 * const userName = getLoggedInUserName();
 * console.log("Logged in user name:", userName);
 */

export function getLoggedInUserName() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo?.name;
}
