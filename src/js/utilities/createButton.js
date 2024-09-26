

export function createDeleteButton(postId, onDeletePost) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.postId = postId; 
    deleteButton.addEventListener('click', onDeletePost);
    return deleteButton;
}

export function createEditButton(postId) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.dataset.postId = postId; 
    editButton.addEventListener('click', () => {
        window.location.href = `/post/edit/`;  
        localStorage.setItem("postId", JSON.stringify(postId));  
    });
    return editButton;
}


