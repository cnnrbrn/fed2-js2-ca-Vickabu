import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

/**
 * Deletes a post by its ID.
 *
 * @param {string} id - The ID of the post to delete.
 * @returns {Promise<boolean>} - Returns true if the post was deleted successfully, false otherwise.
 */

export async function deletePost(id) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "DELETE",
      headers: headers(),
    });
    if (!response.ok) {
      console.error(
        "Failed to delete post:",
        response.status,
        response.statusText
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
}
