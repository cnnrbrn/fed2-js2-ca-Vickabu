import { onRegister } from "../../ui/auth/register";

/**
 * Sets up the event listener for the register form submission.
 *
 * @returns {void}
 *
 * @example
 * ```js
 * document.forms.register.addEventListener("submit", onLogin);
 * ```
 */

document.forms.register.addEventListener("submit", onRegister);
