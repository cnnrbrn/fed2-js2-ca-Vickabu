import { onDeletePost } from "../../ui/post/delete";
import { readPosts } from "../../api/post/read";
import { setLogoutListener } from "../../ui/global/logout";
import { authGuard } from "../../utilities/authGuard";
import { getLoggedInUserName } from "../../utilities/loggedInUser";
import {
  createPostElement,
  showNoPostsMessage,
} from "../../utilities/createPostElement";

authGuard();
setLogoutListener();

/**
 * Loads and displays posts for the logged-in user.
 * Creates a posts container, fetches posts, and displays them.
 * If an error occurs during fetching, it shows a no posts message.
 *
 * @async
 * @function loadAndDisplayPosts
 */

async function loadAndDisplayPosts() {
  createPostsContainer();

  try {
    const posts = await readPosts();
    displayPosts(posts);
  } catch (error) {
    console.error("Error loading posts:", error);
    showNoPostsMessage(container);
  }
}

/**
 * Creates a container for displaying posts and appends it to the document body.
 *
 * @returns {HTMLElement} The created posts container element.
 *
 * @function createPostsContainer
 */

function createPostsContainer() {
  const container = document.createElement("div");
  container.id = "posts-list";
  document.body.appendChild(container);
  return container;
}

/**
 * Displays the posts in the posts container.
 * If there are no posts, it shows a no posts message.
 *
 * @param {Array<Object>} posts - The array of post objects to display.
 * @function displayPosts
 */

function displayPosts(posts) {
  const container = document.getElementById("posts-list");
  container.innerHTML = "";

  if (posts.length === 0) {
    showNoPostsMessage(container);
    return;
  }

  const loggedInUserName = getLoggedInUserName();
  posts.forEach((post) => {
    const postElement = createPostElement(post, loggedInUserName, onDeletePost);
    container.appendChild(postElement);
  });
}

loadAndDisplayPosts();
