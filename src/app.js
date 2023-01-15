import { http } from "./http";
import { ui } from "./ui";

// Get post on DOM load
document.addEventListener("DOMContentLoaded", getPosts);
// Listen for submit post
document.querySelector(".post-submit").addEventListener("click", submitPost);

// Listen for delete
document.querySelector("#posts").addEventListener("click", deletePost);

// Listen for Edit state
document.querySelector("#posts").addEventListener("click", enableEdit);

//Get posts
function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err));
}

// submit posts
function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;

  const data = {
    title,
    body,
  };

  // Create post
  http
    .post("http://localhost:3000/posts", data)
    .then((data) => {
      ui.showAlert("Post added", "alert alert-success");
      ui.clearFields();
      getPosts();
    })
    .catch((err) => console.log(err));
}

// Delete post
function deletePost(e) {
  e.preventDefault();

  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("Are you sure to delete this post")) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          ui.showAlert("Post deleted", "alert alert-success");
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

// Enable edit
function enableEdit(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body,
    };

    ui.fillForm(data);
  }

  e.preventDefault();
}
