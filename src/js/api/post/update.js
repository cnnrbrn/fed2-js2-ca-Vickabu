import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

/**
 * Updates an existing post by ID.
 *
 * Sends a PUT request to update the post with the given `id`, including title, body, tags, and optional media.
 *
 * @param {string} id - The ID of the post to update.
 * @param {Object} postData - The data for updating the post.
 * @param {string} postData.title - The updated title of the post.
 * @param {string} postData.body - The updated body content of the post.
 * @param {string[]} [postData.tags] - The updated tags for the post.
 * @param {Object} [postData.media] - The media information to update (optional).
 * @param {string} postData.media.url - The URL of the media (optional).
 * @param {string} postData.media.alt - The alt text for the media (optional).
 *
 * @returns {Promise<Object>} The updated post data from the server.
 *
 * @throws {Error} Throws an error if the update request fails or the server responds with an error.
 *
 * @example
 * ```js
 * const updatedPost = await updatePost("12345", {
 *   title: "Updated Title",
 *   body: "This is the updated content of the post.",
 *   tags: ["update", "post"],
 *   media: {
 *     url: "https://example.com/image.jpg",
 *     alt: "Example Image",
 *   },
 * });
 * console.log(updatedPost);
 * ```
 */

export async function updatePost(id, { title, body, tags, media }) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({
        title,
        body,
        tags,
        media: media ? { url: media.url, alt: media.alt } : null,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}
