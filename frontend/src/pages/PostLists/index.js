import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from 'react';

export default function PostLists() {
  const [blogPosts, setBlogPosts] = useState([]); // Thay đổi từ đối tượng thành mảng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      if (!response.ok) {
        throw new Error('Không thể lấy danh sách bài viết');
      }
      const data = await response.json();
      setBlogPosts(data); // Dữ liệu là một mảng
      setLoading(false);
    } catch (err) {
      setError(`Lỗi: ${err.message}`);
      setLoading(false);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul>
      {blogPosts.length > 0 ? (
        blogPosts.map((post) => (
          <li key={post.slug}>
            <Link to={`/posts/${post.slug}`}>
              <h3>{post.title}</h3>
            </Link>
          </li>
        ))
      ) : (
        <li>Không có bài viết nào để hiển thị.</li>
      )}
    </ul>
  );
}