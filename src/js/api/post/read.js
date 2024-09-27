import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

/**
 * Fetches a single post by its ID.
 *
 * @param {string} id - The ID of the post to retrieve.
 * @returns {Promise<Object|undefined>} A promise that resolves to the post data or undefined if the fetch fails.
 *
 * @example
 * readPost("12345")
 *   .then(post => console.log("Fetched post:", post))
 *   .catch(error => console.error("Error:", error));
 */

export async function readPost(id) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}?_author=true`, {
      method: "GET",
      headers: headers(),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch post:", response.status);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

/**
 * Fetches a list of posts with optional pagination and tagging.
 *
 * @param {number} [limit=12] - The number of posts to retrieve (default is 12).
 * @param {number} [page=1] - The page number to retrieve (default is 1).
 * @param {string} [tag] - An optional tag to filter posts by.
 * @returns {Promise<Array<Object>|undefined>} A promise that resolves to an array of post data or undefined if the fetch fails.
 *
 * @example
 * readPosts(5, 2, "news")
 *   .then(posts => console.log("Fetched posts:", posts))
 *   .catch(error => console.error("Error:", error));
 */

export async function readPosts(limit = 12, page = 1, tag) {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      ...(tag && { tag: tag }),
      _author: true,
    });

    const response = await fetch(`${API_SOCIAL_POSTS}?${params}`, {
      method: "GET",
      headers: headers(),
    });
    if (response.ok) {
      const { data } = await response.json();
      const posts = data;
      return posts;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

/**
 * Fetches posts made by a specific user.
 *
 * @param {string} name - The username of the user whose posts to retrieve.
 * @param {number} [limit=12] - The number of posts to retrieve (default is 12).
 * @param {number} [page=1] - The page number to retrieve (default is 1).
 * @param {string} [tag] - An optional tag to filter posts by.
 * @returns {Promise<Array<Object>|undefined>} A promise that resolves to an array of posts made by the user, an empty array(no post found) or undefined if the fetch fails.
 *
 * @example
 * readPostsByUser("johnDoe")
 *   .then(posts => console.log("Fetched posts by user:", posts))
 *   .catch(error => console.error("Error:", error));
 */

export async function readPostsByUser(name, limit = 12, page = 1, tag) {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      ...(tag && { tag: tag }),
    });

    const response = await fetch(
      `${API_SOCIAL_PROFILES}/${name}/posts?${params}`,
      {
        method: "GET",
        headers: headers(),
      }
    );

    if (response.ok) {
      const { data } = await response.json();
      const posts = data || [];
      return posts;
    } else {
      console.error(`Error fetching posts for user ${name}:`, response.status);
    }
  } catch (error) {
    console.error(`Error fetching posts by user ${name}:`, error);
  }
}
