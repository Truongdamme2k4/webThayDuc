// index.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const bodyParser = require("body-parser");
const BlogPosts = require("./data/blogPost");

app.use(cors());
app.use(bodyParser.json());

app.get("/api/blogs", (req, res) => {
  res.json(BlogPosts);
});
 
app.get("/api/blogs/:slug", (req, res) => {
  const { slug } = req.params;
  const blog = BlogPosts[slug];
  res.json(blog);
});

// Add new post
app.post("/api/blogs", (req, res) => {
  const { slug, title, description } = req.body;
  if (!slug || !title || !description) {
    return res.status(400).json({ error: "Thiếu thông tin bài viết" });
  }
  const newPost = {
    id: BlogPosts.length + 1,
    slug,
    title,
    description,
  };
  BlogPosts.push(newPost);
  res.status(201).json({ message: "Thêm bài viết thành công", post: newPost });
});

// Login API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "123") {
    res.status(200).json({ message: "Đăng nhập thành công" });
  } else {
    res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
  }
});

app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
