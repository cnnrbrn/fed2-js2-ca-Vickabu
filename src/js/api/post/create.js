import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

/**
 * Creates a new post with the provided title, body, tags, and media.
 *
 * @param {Object} postData - The data for the new post.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.body - The body content of the post.
 * @param {Array<string>} [postData.tags=[]] - An optional array of tags for the post.
 * @param {Object|null} [postData.media=null] - Optional media object containing `url` and `alt` attributes.
 * @returns {Promise<Object>} The created post data.
 * @throws {Error} Throws an error if the post creation fails.
 *
 * @example
 * ```js
 * const newPost = await createPost({
 *   title: "My New Post",
 *   body: "This is the content of my new post.",
 *   tags: ["tag1", "tag2"],
 *   media: { url: "http://example.com/image.jpg", alt: "Image description" }
 * });
 * ```
 */

export async function createPost({ title, body, tags = [], media = null }) {
  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        title,
        body,
        tags,
        media: media ? { url: media.url, alt: media.alt } : null,
      }),
    });

    if (response.ok) {
      const { data } = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error(
        "Failed to create post:",
        response.status,
        response.statusText,
        errorData
      );
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}
