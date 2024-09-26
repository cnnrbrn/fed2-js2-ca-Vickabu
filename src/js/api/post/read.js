import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

export async function readPost(id) {
  try {
      const response = await fetch(`${API_SOCIAL_POSTS}/${id}?_author=true`, { 
          method: "GET",
          headers: headers(),
      });
      if (response.ok) {
          const data = await response.json();
          console.log("Post:", data);
          return data; 
      } else {
          console.error("Failed to fetch post:", response.status);
      }
  } catch (error) {
      console.error("Error fetching post:", error);
  }
}

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
      const data = await response.json();
      const posts = data.data;
      console.log("responseData", posts);
      return posts;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

export async function readPostsByUser(name, limit = 12, page = 1, tag) {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      ...(tag && { tag: tag }), 
    });

    const response = await fetch(`${API_SOCIAL_PROFILES}/${name}/posts?${params}`, {
      method: "GET",
      headers: headers(),
    });
    if (response.ok) {
      const data = await response.json();
      const posts = data.data;
      console.log(`Posts by user ${name}:`, posts);
      return posts;
    }
  } catch (error) {
    console.error(`Error fetching posts by user ${name}:`, error);
  }
}



// export async function addComment(id, commentBody, replyToId = null) {
//   const token = localStorage.getItem('accessToken'); 
//   console.log("Token:", token); 
//   try {
//       const response = await fetch(`${API_SOCIAL_POSTS}/${id}/comment?_author=true`, {
//           method: "POST",
//           headers: {
//               ...headers(),
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//               body: commentBody,
//               replyToId: replyToId // Send replyToId som valgfritt
//           }),
//       });
      
//       if (response.ok) {
//           const data = await response.json();
//           console.log("Comment added:", data);
//           return data; // Returner hele dataobjektet
//       } else {
//           console.error("Failed to add comment:", response.status, response.statusText);
//           const errorData = await response.json();
//           console.error("Error details:", errorData); // Logge feilmeldinger
//       }
//   } catch (error) {
//       console.error("Error adding comment:", error);
//   }
// }

  

// export async function deleteComment(id, commentId) {
//     try {
//       const response = await fetch(`${API_SOCIAL_POSTS}/${id}/comment/${commentId}`, {
//         method: "DELETE",
//         headers: headers(),
//       });
//       if (response.ok) {
//         console.log("Comment deleted");
//         return true;
//       }
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//     }
//   }


//   function isValidEmoji(symbol) {
//     const emojiRegex = /\p{Extended_Pictographic}/u;
//     return emojiRegex.test(symbol); // Returner true hvis symbolet er gyldig
//   }

//  export async function addReaction(id, symbol) {
//   // Valider emoji-symbol
//   if (!isValidEmoji(symbol)) {
//     console.error("Invalid emoji symbol:", symbol);
//     return; // Avbryt hvis symbolet ikke er gyldig
//   }

//   try {
//     const response = await fetch(`${API_SOCIAL_POSTS}/${id}/react/${symbol}`, {
//       method: "PUT",
//       headers: headers(),
//     });

//     const responseBody = await response.json(); // Hent responsen for debugging

//     if (!response.ok) {
//       console.error("Failed to add reaction:", response.status, responseBody);
//       return;
//     }
    
//     console.log("Reaction added:", responseBody.data); // Logg den oppdaterte reaksjonen
//     return responseBody.data; // Returner data
//   } catch (error) {
//     console.error("Error adding reaction:", error);
//   }
// }
  

