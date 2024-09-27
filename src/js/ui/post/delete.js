import { deletePost } from "../../api/post/delete";

/**
 * Handles the delete post action when the delete button is clicked.
 *
 * @param {Event} event - The click event from the delete button.
 * @returns {Promise<void>}
 */

export async function onDeletePost(event) {
    const postId = event.target.dataset.postId; 
    const postElement = event.target.closest('.post'); 
    
    if (!postId) {
      console.error("Post ID not found.");
      return;
  }

  if (confirm("Are you sure you want to delete this post?")) {
      const success = await deletePost(postId);

      if (success) {
          alert("Post deleted successfully.");
          if (window.location.pathname.includes('post')) {
              window.location.href = '/'; 
          } else {
              postElement?.remove(); 
          }
      } else {
          alert("Failed to delete the post.");
      }
  }
}
