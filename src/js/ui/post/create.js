import { createPost } from "../../api/post/create";

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
      console.log("New post created successfully:", newPost);
      event.target.reset(); 
      window.location.href = '/';
  } catch (error) {
      console.error("Error while creating post:", error);
  }
}
