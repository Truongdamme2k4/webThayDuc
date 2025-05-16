import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true); // Đặt lại trạng thái tải khi slug thay đổi
    setError(null);  // Xóa lỗi cũ
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${slug}`);
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "Bài viết bạn yêu cầu không tồn tại."
            : "Đã xảy ra lỗi khi lấy bài viết."
        );
      }
      const data = await response.json();
      console.log(data);
      setPost(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Đang tải...</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;
  if (!post) return <div style={{ padding: 20 }}>Bài viết không tồn tại.</div>;

  const { title, description } = post;

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ marginBottom: 10 }}>{title}</h3>
      <p style={{ lineHeight: 1.6 }}>{description}</p>
    </div>
  );
}