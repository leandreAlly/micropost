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

    this.changeFormState("edit");
  }

  clearIdInput() {
    this.idInput.value = "";
  }

  // Change the form state
  changeFormState(type) {
    if (type === "edit") {
      this.postSubmit.textContent = "Update it";
      this.postSubmit.className = "post-submit btn btn-warning btn-block";

      // Create cancel button
      const button = document.createElement("button");
      button.className = "post-cancel btn btn-light btn-block";
      button.appendChild(document.createTextNode("Cancel edit"));

      // Get parent
      const cardForm = document.querySelector(".card-form");
      // Get element insert before
      const formEnd = document.querySelector(".form-end");
      // Insert cancel button
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = "Post it";
      this.postSubmit.className = "post-submit btn btn-primary btn-block";

      // remove cancel button if it is there
      if (document.querySelector(".post-cancel")) {
        document.querySelector(".post-cancel").remove();
      }

      // Clear the ID form hidden fields
      this.clearIdInput();
      //clear text
      this.clearFields();
    }
  }
}

export const ui = new UI();
