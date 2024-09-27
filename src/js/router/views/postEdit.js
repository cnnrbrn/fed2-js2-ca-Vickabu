import { readPost } from "../../api/post/read";
import { onUpdatePost } from "../../ui/post/update";

const postId = JSON.parse(localStorage.getItem("postId"));
const editPostForm = document.forms["editPost"];

/**
 * Loads the post data from the server and populates the edit post form.
 *
 * This function fetches the post data using the `postId` stored in local storage.
 * If the post is found, it fills in the edit post form fields with the post's title, body, tags,
 * media URL, and media alt text. If the post is not found, it displays an error message.
 *
 * @returns {Promise<void>}
 * @throws Logs an error and display a message if the post is not found or if loading fails.
 *
 * @example
 * loadPost();
 */

async function loadPost() {
  try {
    const post = await readPost(postId);
    if (post && post.data) {
      const { title, body, tags = [], media } = post.data;

      editPostForm.title.value = title;
      editPostForm.body.value = body;
      editPostForm.tags.value = tags.join(", ");
      editPostForm.mediaUrl.value = media?.url || "";
      editPostForm.mediaAlt.value = media?.alt || "";
    } else {
      console.error("Post not found.");
      document.body.innerHTML = "<p>Post not found.</p>";
    }
  } catch (error) {
    console.error("Error loading post:", error);
    document.body.innerHTML =
      "<p>Failed to load post. Please try again later.</p>";
  }
}

editPostForm.addEventListener("submit", (event) => onUpdatePost(event, postId));

loadPost();
