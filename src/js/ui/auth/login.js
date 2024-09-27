import { login } from "../../api/auth/login";

/**
 * Handles the login form submission, sending email and password to the login API.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves after login is processed.
 * @throws Will show an alert if login fails.
 *
 * @example
 * document.querySelector('form').addEventListener('submit', onLogin);
 */

export async function onLogin(event) {
  event.preventDefault();

  const { email, password } = Object.fromEntries(new FormData(event.target));

  try {
    const result = await login({ email: email.trim(), password });
    window.location.href = "/";
  } catch (error) {
    alert(`Login failed: ${error.message}`);
  }
}
