import { useState } from "react";
import {useNavigate} from "react-router-dom";

export default function NewPost() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Vui lòng nhập tiêu đề";
    if (!formData.slug) newErrors.slug = "Vui lòng nhập slug";
    if (!formData.description) newErrors.description = "Vui lòng nhập nội dung";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try { 
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),   
      });
      const data= await response.json();
      if (response.ok) {
        setMessage("Thêm bài viết thành công!");
        setFormData({ title: "", slug: "", description: "" }); 
        setErrors({});
        navigate("/posts")
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Lỗi khi thêm bài viết:", error);
      setMessage("Đã xảy ra lỗi máy chủ!");
    }
  };

  return (
    <div className="new-post-container">
      <h2 className="new-post-title">Tạo bài viết mới</h2>
      <form className="new-post-form" onSubmit={onSubmit}>
        <div>
          <label className="new-post-label">Tiêu đề:</label>
          <input
            className="new-post-input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div>
          <label className="new-post-label">Slug:</label>
          <input
            className="new-post-input"
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
          />
          {errors.slug && <p className="error">{errors.slug}</p>}
        </div>


        <div>
          <label className="new-post-label">Nội dung:</label>
          <textarea
            className="new-post-textarea"
            rows="8"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <button className="new-post-button" type="submit">
          Đăng bài viết
        </button>
      </form>
      {message && <p className="new-post-message">{message}</p>}
    </div>
  );
}