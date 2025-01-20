import express from "express";

const app = express();
app.use(express.json());

let posts = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    content: "JavaScript is a versatile programming language...",
    author: "John Doe",
    date: "2023-01-01",
  },
  {
    id: 2,
    title: "Web Development Best Practices",
    content: "When building web applications, it is important to...",
    author: "Jane Smith",
    date: "2023-02-15",
  },
  {
    id: 3,
    title: "Exploring ES6 Features",
    content: "ES6, also known as ECMAScript 2015, introduced several...",
    author: "Bob Johnson",
    date: "2023-03-20",
  },
];

// Helper function to find post by ID
const findPostById = (id) => posts.find((post) => post.id === Number(id));

// Helper function to get next ID
const getNextId = () => {
  if (posts.length === 0) return 1;
  const maxId = Math.max(...posts.map((post) => post.id));
  return maxId + 1;
};

// Get all posts
app.get("/posts", (req, res) => {
  res.json({ posts });
});

// Get posts in reverse order
app.get("/posts/reversed", (req, res) => {
  const reversedPosts = [...posts].reverse();
  res.json({ posts: reversedPosts });
});

// Get post by ID
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = findPostById(id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  res.json({
    message: "Post found",
    post,
  });
});

// Add new post
app.post("/posts", (req, res) => {
  const { title, content, author, date } = req.body;

  // Validate required fields
  if (!title || !content || !author || !date) {
    return res.status(400).json({
      message: "All fields (title, content, author, date) are required",
    });
  }

  // Create new post
  const newPost = {
    id: getNextId(),
    title,
    content,
    author,
    date,
  };

  posts.push(newPost);

  res.status(201).json({
    message: "Post added successfully",
    post: newPost,
  });
});

// Update post
app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, date } = req.body;

  const post = findPostById(id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  // Update only provided fields
  if (title) post.title = title;
  if (date) post.date = date;

  res.json({
    message: "Post updated successfully",
    post,
  });
});

// Delete post
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  const postIndex = posts.findIndex((post) => post.id === Number(id));

  if (postIndex === -1) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const deletedPost = posts.splice(postIndex, 1)[0];

  res.json({
    message: "Post deleted successfully",
    deletedPost,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
