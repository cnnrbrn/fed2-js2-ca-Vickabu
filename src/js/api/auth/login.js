import { API_AUTH_LOGIN } from "../constants";
import { headers } from "../headers";

/**
 * Logs in a user by sending their email and password to the authentication API.
 *
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The email of the user.
 * @param {string} credentials.password - The password of the user.
 * @returns {Promise<Object>} A promise that resolves with user data including access token, name, bio, avatar, and banner.
 * @throws {Error} If the login request fails or returns an error from the server.
 *
 * @example
 * login({ email: "user@example.com", password: "password123" })
 *   .then(userData => {
 *     console.log("Logged in!", userData);
 *   })
 *   .catch(error => {
 *     console.error("Login failed:", error);
 *   });
 */

export async function login({ email, password }) {
  try {
    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || "Unknown error");
    }

    const { data } = await response.json();
    const { accessToken, name, bio, avatar, banner } = data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ name, email, bio, avatar, banner })
    );
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
