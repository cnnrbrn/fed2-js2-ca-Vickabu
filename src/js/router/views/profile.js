import { readPostsByUser } from "../../api/post/read";
import { setLogoutListener } from "../../ui/global/logout";
import { authGuard } from "../../utilities/authGuard";
import { readProfile } from "../../api/profile/read";
import {
  createDeleteButton,
  createEditButton,
} from "../../utilities/createButton";
import { onDeletePost } from "../../ui/post/delete";

authGuard();
setLogoutListener();

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const username = userInfo?.name;
if (username) {
  loadProfile(username);
} else {
  console.error("No user is logged in.");
}

/**
 * Loads a user profile and their associated posts.
 * If the profile or posts are not found, an appropriate message is shown.
 *
 * @async
 * @function loadProfile
 * @param {string} name - The username of the profile to be loaded.
 */

async function loadProfile(name) {
  try {
    const profile = await readProfile(name);

    if (profile) {
      displayProfile(profile);
      const posts = await readPostsByUser(name);
      displayPosts(posts, profile.name);
    } else {
      console.error("Profile not found.");
      document.body.innerHTML = "<p>Profile not found.</p>";
    }
  } catch (error) {
    console.error("Error loading profile:", error);
  }
}

/**
 * Displays the user's profile information on the page.
 *
 * @param {Object} profile - The profile object containing user information.
 * @function displayProfile
 */

function displayProfile(profile) {
  const profileContainer = document.createElement("div");
  profileContainer.classList.add("profile");

  const avatar = document.createElement("img");
  avatar.src = profile.avatar?.url;
  avatar.alt = profile.avatar?.alt || "User Avatar";

  const nameElement = document.createElement("h1");
  nameElement.textContent = profile.name;

  const bioElement = document.createElement("p");
  bioElement.textContent = profile.bio || "No bio available";

  profileContainer.append(nameElement, avatar, bioElement);
  document.body.appendChild(profileContainer);
}

/**
 * Displays a list of posts made by the user.
 * If no posts are available, a message is shown.
 *
 * @param {Array<Object>} posts - An array of post objects to display.
 * @param {string} loggedInUserName - The name of the logged-in user.
 * @function displayPosts
 */

function displayPosts(posts, loggedInUserName) {
  const postsContainer = document.createElement("div");
  postsContainer.classList.add("posts-list");

  if (posts.length === 0) {
    postsContainer.innerHTML = "<p>No posts available.</p>";
  } else {
    posts.forEach((post) => {
      const postElement = createPostElement(post, loggedInUserName);
      postsContainer.appendChild(postElement);
    });
  }

  document.body.appendChild(postsContainer);
}

/**
 * Creates a DOM element representing a single post, including its title, body, and action buttons.
 *
 * @param {Object} post - The post object containing post details.
 * @returns {HTMLElement} The HTML element representing the post.
 * @function createPostElement
 */

function createPostElement(post) {
  const postElement = document.createElement("div");
  postElement.classList.add("post");

  const titleElement = document.createElement("h2");
  titleElement.textContent = post.title;

  const bodyElement = document.createElement("p");
  bodyElement.textContent = post.body;

  const deleteButton = createDeleteButton(post.id, onDeletePost);
  const editButton = createEditButton(post.id);

  postElement.append(editButton, deleteButton);
  postElement.append(titleElement, bodyElement);

  if (post.media?.url) {
    const image = document.createElement("img");
    image.src = post.media.url;
    image.alt = post.media.alt || "Post image";
    image.className = "postImage";
    postElement.appendChild(image);
  }

  return postElement;
}
