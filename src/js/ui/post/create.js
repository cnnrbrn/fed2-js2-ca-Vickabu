import { createPost } from "../../api/post/create";

/**
 * Handles the submission of the create post form.
 * Prevents the default form submission, gathers input values,
 * and creates a new post by calling `createPost`.
 *
 * @param {Event} event - The submit event from the form.
 * @returns {Promise<void>}
 *
 * @example
 * ```js
 * document.forms.createPost.addEventListener("submit", onCreatePost);
 * ```
 */

export async function onCreatePost(event) {
  event.preventDefault(); 

  const title = event.target.title.value; 
  const body = event.target.body.value; 
  const tags = event.target.tags.value.split(",").map(tag => tag.trim()); 
  const mediaUrl = event.target.mediaUrl.value; 
  const mediaAlt = event.target.mediaAlt.value; 

  const media = mediaUrl ? { url: mediaUrl, alt: mediaAlt } : null; 

  try {
      const newPost = await createPost({ title, body, tags, media });
      event.target.reset(); 
      window.location.href = '/';
  } catch (error) {
      console.error("Error while creating post:", error);
  }
}
