import { updatePost } from "../../api/post/update";

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
        console.log("Post updated successfully:", updatedPost);
        window.location.href = '/'; 
    } catch (error) {
        console.error("Error while updating post:", error);
    }
}