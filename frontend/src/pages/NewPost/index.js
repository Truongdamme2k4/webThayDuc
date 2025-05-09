import { useForm } from "react-hook-form";
import { useState } from "react";

export default function NewPost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Thêm bài viết thành công!");
        reset(); // reset form fields
      } else {
        setMessage("Thêm bài viết thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm bài viết:", error);
      setMessage("Đã xảy ra lỗi!");
    }
  };

  return (
    <div className="new-post-container">
      <h2 className="new-post-title">Tạo bài viết mới</h2>
      <form className="new-post-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="new-post-label">Tiêu đề:</label>
          <input
            className="new-post-input"
            type="text"
            {...register("title", { required: "Vui lòng nhập tiêu đề" })}
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>
        <div>
          <label className="new-post-label">Slug:</label>
          <input
            className="new-post-input"
            type="text"
            {...register("slug", { required: "Vui lòng nhập slug" })}
          />
          {errors.slug && <p className="error">{errors.slug.message}</p>}
        </div>
        <div>
          <label className="new-post-label">Nội dung:</label>
          <textarea
            className="new-post-textarea"
            rows="8"
            {...register("description", { required: "Vui lòng nhập nội dung" })}
          />
          {errors.body && <p className="error">{errors.body.message}</p>}
        </div>
        <button className="new-post-button" type="submit">
          Đăng bài viết
        </button>
      </form>
      {message && <p className="new-post-message">{message}</p>}
    </div>
  );
}
