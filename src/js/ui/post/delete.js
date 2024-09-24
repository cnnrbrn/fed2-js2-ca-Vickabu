import { deletePost } from "../../api/post/delete";

export async function onDeletePost(event) {
    const postId = event.target.dataset.postId; 
    const postElement = event.target.closest('.post'); 
    
    if (!postId) {
      console.error("Post ID not found.");
      return;
    }
  
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      const success = await deletePost(postId);
      if (success) {
        alert("Post deleted successfully.");
        postElement.remove(); 
      } else {
        alert("Failed to delete the post.");
      }
    }
  }
