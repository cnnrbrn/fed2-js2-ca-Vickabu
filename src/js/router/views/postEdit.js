import { readPost } from "../../api/post/read";
import { onUpdatePost } from "../../ui/post/update"; 



const postId = JSON.parse(localStorage.getItem("postId")); 
const editPostForm = document.forms['editPost']; 

async function loadPost() {
    try {
        const post = await readPost(postId); 
        if (post && post.data) {
            editPostForm.title.value = post.data.title;
            editPostForm.body.value = post.data.body;
            editPostForm.tags.value = post.data.tags?.join(', ') || ''; 
            editPostForm.mediaUrl.value = post.data.media?.url || ''; 
            editPostForm.mediaAlt.value = post.data.media?.alt || ''; 
            editPostForm.addEventListener('submit', (event) => onUpdatePost(event, postId));
        } else {
            console.error("Post not found.");
            document.body.innerHTML = "<p>Post not found.</p>";
        }
    } catch (error) {
        console.error("Error loading post:", error);
        document.body.innerHTML = "<p>Failed to load post.</p>";
    }
}

loadPost();
