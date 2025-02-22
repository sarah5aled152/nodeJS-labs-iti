const socket = io("http://localhost:3000");

let postName = document.getElementById("name");
let postDesc = document.getElementById("desc");
let postBtn = document.getElementById("sendBtn");
let searchInput = document.getElementById("searchInput");

let posts = [];

function addPost() {
  socket.emit("addpost", { name: postName.value, description: postDesc.value });
}

postBtn.addEventListener("click", () => {
  addPost();
});

socket.on("connect", () => {
  socket.emit("load");
});

socket.on("posts", (data) => {
  posts = data;
  renderPosts();
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value;
  socket.emit("search", query);
});

function createPostEle(post) {
  const postElement = document.createElement("div");
  postElement.className = "card mb-3 shadow-sm";
  postElement.setAttribute("data-post-id", post._id);

  postElement.innerHTML = `
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start">
          <h5 class="card-title">${post.name}</h5>
          <i class="fas fa-trash delete-btn text-muted" onclick="deletePost('${post._id}')"></i>
      </div>
      <p class="card-text">${post.description}</p>
    </div>
  `;
  return postElement;
}

function renderPosts() {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";
  posts.forEach((post) => {
    postsContainer.appendChild(createPostEle(post));
  });
}

function deletePost(postId) {
  if (confirm("Are you sure you want to delete this post?")) {
    posts = posts.filter((post) => post._id !== postId);
    renderPosts();
  }
}
