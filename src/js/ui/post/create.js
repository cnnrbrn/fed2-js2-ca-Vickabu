import { createPost } from "../../api/post/create";

export async function onCreatePost(event) {
    event.preventDefault(); 
    const title = event.target.title.value; // Pass på at input-feltet for tittel har navn 'title'
    const body = event.target.body.value; // Pass på at input-feltet for innhold har navn 'body'
    const tags = event.target.tags.value.split(",").map(tag => tag.trim()); // Hente tags fra et tekstfelt og dele opp i en liste
    const mediaUrl = event.target.mediaUrl.value; // Pass på at input-feltet for media-url har navn 'mediaUrl'
    const mediaAlt = event.target.mediaAlt.value; // Pass på at input-feltet for media-alt har navn 'mediaAlt'
  
    const media = mediaUrl ? { url: mediaUrl, alt: mediaAlt } : null; // Lag et media-objekt hvis URL finnes
  
    try {
      const newPost = await createPost({ title, body, tags, media });
      console.log("New post created successfully:", newPost);
      event.target.reset(); 
      window.location.href = '/';
    } catch (error) {
      console.error("Error while creating post:", error);
    }
  }