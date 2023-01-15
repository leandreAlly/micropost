class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "add";
  }

  showPosts(posts) {
    let output = "";
    posts.forEach((post) => {
      output += `
          <div class = "card mb-3">
           <div class="card-body">
           <h4 class = "card-title">${post.title}</h4>
           <p class = "card-text">${post.body}</p>
           <a class = "edit card-link" data-id="${post.id}">
           <i class = "fa fa-pencil"></i>
           </a>
           <a class = "delete card-link" data-id="${post.id}">
           <i class = "fa fa-remove"></i>
           </a>
           </div>
          </div>
          `;
    });

    this.post.innerHTML = output;
  }
  // clear Alert message
  showAlert(message, className) {
    this.clearAlert();

    // create div
    const div = document.createElement("div");

    // Add class to div
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".postsContainer");
    // Get Posts
    const posts = this.post;

    //   Insert alert div
    container.insertBefore(div, posts);

    //   Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }
  //   clear alert after showing it
  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }
  //  Clear input form in the fiedls
  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  // Fill form to edit
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;
  }
}

export const ui = new UI();
