import { API_AUTH_REGISTER } from "../constants";
import { headers } from "../headers";

/**
 * Registers a new user with the provided credentials.
 *
 * Sends a POST request to the API to register the user. If successful, the user is redirected to the login page.
 * Displays an alert if registration fails or an error occurs.
 *
 * @param {Object} user - The user information.
 * @param {string} user.name - The name of the user.
 * @param {string} user.email - The email of the user.
 * @param {string} user.password - The password for the user.
 *
 * @returns {Promise<void>} A promise that resolves when the registration process completes.
 *
 * @example
 * ```js
 * const user = { name: 'John Doe', email: 'john@example.com', password: 'secret123' };
 * register(user);
 * ```
 */

export async function register({ name, email, password }) {
  const body = {
    name,
    email,
    password,
  };

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: {
        ...headers(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      alert("User registered successfully!");
      window.location.href = "/auth/login/";
    } else {
      const errorData = await response.json();
      alert(`Registration failed: ${errorData.message || "Unknown error"}`);
    }
  } catch (error) {
    alert("An error occurred during registration.");
    console.error(error);
  }
}
