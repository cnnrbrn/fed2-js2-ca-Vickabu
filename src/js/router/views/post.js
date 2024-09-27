import { readPost } from "../../api/post/read";
import { onDeletePost } from "../../ui/post/delete";
import { getLoggedInUserName } from "../../utilities/loggedInUser";
import { setLogoutListener } from "../../ui/global/logout";
import { authGuard } from "../../utilities/authGuard";
import { createPostElement } from "../../utilities/createPostElement";

authGuard();
setLogoutListener();

const postId = JSON.parse(localStorage.getItem("postId"));

if (postId) {
  loadPost(postId);
} else {
  console.error("No postId found in localStorage");
  document.body.innerHTML = "<p>No post selected.</p>";
}

const loggedInUserName = getLoggedInUserName();

/**
 * Loads a post by its ID and displays it on the page.
 * If the post is not found or an error occurs, an appropriate message is shown.
 *
 * @async
 * @function loadPost
 * @param {string} postId - The ID of the post to be loaded.
 */
async function loadPost(postId) {
  try {
    const post = await readPost(postId);
    if (post && post.data) {
      displayPost(post.data);
    } else {
      document.body.innerHTML = "<p>Post not found.</p>";
    }
  } catch (error) {
    console.error("Error loading post:", error);
    document.body.innerHTML = "<p>Failed to load post.</p>";
  }
}

/**
 * Displays a single post on the page by creating a post element.
 *
 * @param {Object} post - The post object to display.
 * @function displayPost
 */

function displayPost(post) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post");
  const postElement = createPostElement(post, loggedInUserName, onDeletePost);
  postContainer.appendChild(postElement);
  document.body.appendChild(postContainer);
}
