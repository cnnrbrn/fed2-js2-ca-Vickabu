import { onDeletePost } from "../../ui/post/delete";
import { readPosts } from "../../api/post/read";
import { setLogoutListener } from "../../ui/global/logout";
import { authGuard } from "../../utilities/authGuard";


setLogoutListener();
authGuard();

function createPostsContainer() {
    const container = document.createElement('div'); 
    container.id = 'posts-list'; 
    document.body.appendChild(container); 
    return container; 
}

function displayPosts(posts) {
  const container = document.getElementById('posts-list');
  container.innerHTML = ''; 

  if (posts.length === 0) {
    container.innerHTML = '<p>No posts found.</p>';
    return;
  }

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const loggedInUserName = userInfo?.name; 

  posts.forEach(post => {
    const postElement = createPostElement(post, loggedInUserName); 
    container.appendChild(postElement); 
  });
}

function createPostElement(post, loggedInUserName) {
    const postElement = document.createElement('div');
    postElement.classList.add('post'); // Legger til en CSS-klasse for enklere seleksjon

    const heading = document.createElement('h2');
    heading.textContent = post.title;

    const content = document.createElement('p');
    content.textContent = post.body;

    const authorName = post.author?.name || 'Unknown Author';
    const postDate = new Date(post.created).toLocaleDateString();

    const metaInfoContainer = document.createElement('div');
    const authorSpan = document.createElement('span');
    authorSpan.textContent = `By ${authorName}`;

    const dateSpan = document.createElement('span');
    dateSpan.textContent = ` | ${postDate}`;

    metaInfoContainer.appendChild(authorSpan);
    metaInfoContainer.appendChild(dateSpan);

    if (post.author?.name === loggedInUserName) {
        const deleteButton = createDeleteButton(post.id);
        postElement.appendChild(deleteButton);
    }

    postElement.appendChild(heading);
    postElement.appendChild(content);
    postElement.appendChild(metaInfoContainer);

    if (post.media?.url) {
        const image = document.createElement('img');
        image.src = post.media.url;
        image.alt = post.media.alt || 'Post image';
        postElement.appendChild(image);
    }

    return postElement;
}

// Ny funksjon for å opprette slett-knappen
function createDeleteButton(postId) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.postId = postId; // Setter post ID som data-attributt
    deleteButton.addEventListener('click', onDeletePost);
    return deleteButton;
}


async function loadAndDisplayPosts() {
    createPostsContainer(); 

    try {
        const posts = await readPosts(); 
        displayPosts(posts); 
    } catch (error) {
        console.error('Error loading posts:', error);
        const container = document.getElementById('posts-list');
        container.innerHTML = '<p>No post found.</p>'; 
    }
}

loadAndDisplayPosts();
