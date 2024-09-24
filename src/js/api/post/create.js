import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function createPost({ title, body, tags = [], media = null }) {
    try {
      const response = await fetch(API_SOCIAL_POSTS, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          title,
          body,
          tags,
          media: media ? { url: media.url, alt: media.alt } : null,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Post created:", data);
        return data.data;
      } else {
        const errorData = await response.json();
        console.error("Failed to create post:", response.status, response.statusText, errorData);
        throw new Error(`Error ${response.status}: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }
