import { createDeleteButton, createEditButton } from "./createButton";

/**
 * Creates a DOM element representing a single post, including its title, body, metadata,
 * and action buttons if the logged-in user is the author.
 *
 * @param {Object} post - The post object containing details of the post.
 * @param {string} loggedInUserName - The username of the logged-in user.
 * @param {function} onDeletePost - Callback function to handle post deletion.
 * @returns {HTMLElement} The HTML element representing the post.
 *
 * @example
 * const postElement = createPostElement(post, loggedInUserName, onDeletePost);
 * document.body.appendChild(postElement);
 */

export function createPostElement(post, loggedInUserName, onDeletePost) {
  const postElement = document.createElement("div");
  postElement.classList.add("post");

  const heading = document.createElement("h2");
  heading.textContent = post.title;
  heading.style.cursor = "pointer";
  heading.addEventListener("click", () => {
    window.location.href = `/post/?id=${post.id}`;
    localStorage.setItem("postId", JSON.stringify(post.id));
  });

  const content = document.createElement("p");
  content.textContent = post.body;

  const authorName = post.author?.name || "Unknown Author";
  const postDate = new Date(post.created).toLocaleDateString();

  const metaInfoContainer = document.createElement("div");
  metaInfoContainer.innerHTML = `By ${authorName} | ${postDate}`;

  if (post.author?.name === loggedInUserName) {
    const deleteButton = createDeleteButton(post.id, onDeletePost);
    const editButton = createEditButton(post.id);
    postElement.append(deleteButton, editButton);
  }

  postElement.append(heading, content, metaInfoContainer);

  if (post.media?.url) {
    const image = document.createElement("img");
    image.src = post.media.url;
    image.alt = post.media.alt || "Post image";
    image.className = "postImage";
    postElement.appendChild(image);
  }

  return postElement;
}

/**
 * Displays a message indicating that no posts were found within a specified container.
 *
 * @param {HTMLElement} container - The container element where the message will be displayed.
 *
 * @example
 * showNoPostsMessage(document.getElementById('posts-list'));
 */

export function showNoPostsMessage(container) {
  container.innerHTML = "<p>No posts found.</p>";
}
