import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    setLoading(true); 
    setError(null);
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
      setPost(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      alert("Vui lòng nhập nội dung comment");
      return;
    }

    const updatedPost = {
      ...post,
      comments: [...post.comments, newComment]
    };

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPost) 
      });
      
      const data = await response.json();
      if(response.ok) {
        setPost(updatedPost); 
        setNewComment(""); 
        alert("Comment thành công");
      } else {
        alert(data.message || "Comment thất bại");
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi gửi comment");
    }
  };


  if (loading) return <div style={{ padding: 20 }}>Đang tải...</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;
  if (!post) return <div style={{ padding: 20 }}>Bài viết không tồn tại.</div>;

  const { title, description,comments } = post;
  return (
    <>
      <div style={{ padding: 20 }}>
        <h3 style={{ marginBottom: 10 }}>{title}</h3>
        <p style={{ lineHeight: 1.6 }}>{description}</p>
      </div>
      <div>
        <h1>Comments:</h1>
        {comments && comments.length > 0 ? (
          <ul>
            {comments.map((cmt, index) => (
              <li key={index}>
                {cmt}
              </li>
            ))}
          </ul>
        ) : (
          <p>no comments</p>
        )}

      </div>
      <div>
        <label>enter comment:</label>
        <input type="text" value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleComment}>comment</button>
      </div>
    </>

  );
}