// index.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

const BlogPosts = {
  "first-blog-post": {
    title: "First Blog Post",
    description: "Lorem ipsum dolor sit amet, consectetur adip.",
  },
  "second-blog-post": {
    title: "Second Blog Post",
    description: "Hello React Router v6",
  },
};

// GET all blogs
app.get("/api/blogs", (req, res) => {
  res.json(BlogPosts);
});

// GET blog by id or slug
app.get("/api/blogs/:slug", (req, res) => {
  const { slug } = req.params;
  const blog = BlogPosts[slug];
  res.json(blog);
});

app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
