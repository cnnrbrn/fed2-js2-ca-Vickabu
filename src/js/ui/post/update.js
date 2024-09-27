import { updatePost } from "../../api/post/update";

/**
 * Handles form submission to update a post.
 * 
 * Prevents default submission, retrieves updated data from the form,
 * and calls `updatePost`. Redirects to the homepage upon success.
 *
 * @param {Event} event - The form submission event.
 * @param {string} postId - The ID of the post to update.
 * @returns {Promise<void>} Resolves when the update is complete.
 * @throws {Error} If the update fails.
 *
 * @example
 * ```html
 * <form name="updatePost" onsubmit="onUpdatePost(event, '12345')">
 *   <input type="text" name="title" required />
 *   <textarea name="body" required></textarea>
 *   <input type="text" name="tags" />
 *   <input type="text" name="mediaUrl" />
 *   <input type="text" name="mediaAlt" />
 *   <button type="submit">Update Post</button>
 * </form>
 * ```
 */

export async function onUpdatePost(event, postId) {
    event.preventDefault(); 

    const title = event.target.title.value; 
    const body = event.target.body.value; 
    const tags = event.target.tags.value.split(",").map(tag => tag.trim()); 
    const mediaUrl = event.target.mediaUrl.value; 
    const mediaAlt = event.target.mediaAlt.value; 

    const media = mediaUrl ? { url: mediaUrl, alt: mediaAlt } : null; 

    try {
        const updatedPost = await updatePost(postId, { title, body, tags, media });
        window.location.href = '/'; 
    } catch (error) {
        console.error("Error while updating post:", error);
    }
}