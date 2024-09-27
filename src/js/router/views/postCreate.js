import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout";

authGuard();
setLogoutListener();

/**
 * Sets up the event listener for the create post form submission.
 *
 * @returns {void}
 *
 * @example
 * ```js
 * document.forms.createPost.addEventListener("submit", onCreatePost);
 * ```
 */

document.forms.createPost.addEventListener("submit", onCreatePost);
