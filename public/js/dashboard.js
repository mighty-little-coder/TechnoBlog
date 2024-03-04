const goToDashboard = () => {
  document.location.replace('/dashboard');
}

const createPost = async (event) => {
  event.preventDefault();

  const post_title = document.querySelector('#post_title').value;
  const post_body = document.querySelector('#post_body').value;

  if (post_title && post_body) {
      const response = await fetch('/api/blog-posts/create-post', {
          method: 'POST',
          body: JSON.stringify({ post_title, post_body }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          document.location.replace('/home');
      } else {
          alert(response.statusText);
      }
  }
}

const editPost = (postId) => {
  const saveButtons = document.querySelectorAll('.save-changes');
  saveButtons.forEach(button => {
      button.style.display = 'none';
  });

  const saveButton = document.querySelector(`.save-changes[data-post-id="${postId}"]`);
  if (saveButton) {
      saveButton.style.display = 'block';
  }

  const postTitle = document.getElementById(`post-title-${postId}`);
  postTitle.contentEditable = true;

  const postContent = document.getElementById(`post-body-${postId}`);
  postContent.contentEditable = true;

  postContent.focus();
}

const saveChanges = async (postId) => {
  const newTitle = document.getElementById(`post-title-${postId}`).innerText;
  const newContent = document.getElementById(`post-body-${postId}`).innerText;

  const response = await fetch(`/api/blog-posts/update-post/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ newTitle, newContent }),
      headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
      document.location.reload();
  } else {
      alert(response.statusText);
  }
}

const deletePost = async (postId) => {
  const response = await fetch(`/api/blog-posts/delete-post/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
      document.location.reload();
  } else {
      alert(response.statusText);
  }
}

document.querySelector('#dashboard').addEventListener('click', goToDashboard);
document.querySelector('#create-post').addEventListener('click', createPost);