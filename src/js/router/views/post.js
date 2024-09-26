import { readPost } from "../../api/post/read";  
import { onDeletePost } from "../../ui/post/delete";
import { getLoggedInUserName } from "../../utilities/loggedInUser";
import { createDeleteButton } from "../../utilities/createButton";
import { setLogoutListener } from "../../ui/global/logout";
import { authGuard } from "../../utilities/authGuard";

authGuard();
setLogoutListener();

const postId = JSON.parse(localStorage.getItem("postId"));

if (postId) {
    loadPost(postId);  
} else {
    console.error("No postId found in localStorage");
    document.body.innerHTML = "<p>No post selected.</p>";
}

const loggedInUserName = getLoggedInUserName(); 

async function loadPost(postId) {
    try {
        const post = await readPost(postId);
        if (post && post.data) { 
            displayPost(post.data); 
        } else {
            document.body.innerHTML = "<p>Post not found.</p>";
        }
    } catch (error) {
        console.error("Error loading post:", error);
        document.body.innerHTML = "<p>Failed to load post.</p>";
    }
}

function displayPost(post) {
    const postContainer = document.createElement('div');
    postContainer.classList.add('post');

    const heading = document.createElement('h1');
    heading.textContent = post.title;

    const content = document.createElement('p');
    content.textContent = post.body;

    const authorName = post.author?.name || 'Unknown Author';
    const postDate = new Date(post.created).toLocaleDateString();

    const metaInfo = document.createElement('div');
    metaInfo.textContent = `By ${authorName} on ${postDate}`;

    postContainer.append(heading, metaInfo, content);

    if (post.media?.url) {
        const image = document.createElement('img');
        image.src = post.media.url;
        image.alt = post.media.alt || 'Post image';
        image.className = "postImage";
        postContainer.appendChild(image);
    }

    if (post.author?.name === loggedInUserName) {
        const deleteButton = createDeleteButton(postId, onDeletePost); 
        postContainer.appendChild(deleteButton);
    }

    document.body.appendChild(postContainer);
}

