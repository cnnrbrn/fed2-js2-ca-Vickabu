import { register } from "../../api/auth/register";

/**
 * Handles the form submission for user registration.
 *
 * Extracts user input from the registration form and calls the `register` function.
 * Validates that all required fields (name, email, password) are filled in.
 *
 * @param {Event} event - The form submit event.
 *
 * @returns {Promise<void>} A promise that resolves after the registration process.
 *
 * @example
 * ```js
 * document.forms.register.addEventListener("submit", onRegister);
 * ```
 */

export async function onRegister(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;

  if (!name || !email || !password) {
    console.error("All required fields must be filled out");
    return;
  }

  try {
    const result = await register({ name, email, password });
  } catch (error) {
    console.error("Registration failed:", error);
  }
}
