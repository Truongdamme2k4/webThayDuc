import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword({ user }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage(""); // Xóa thông báo cũ

    if (!oldPassword || !newPassword) {
      setMessage("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setOldPassword("");
        setNewPassword("");
        setTimeout(() => navigate("/"), 2000); // Chuyển về trang chủ sau 2 giây
      } else {
        setMessage(data.message || "Đã xảy ra lỗi");
      }
    } catch (error) {
      setMessage("Lỗi kết nối máy chủ");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Đổi Mật Khẩu</h2>
      <div>
        <label>Tên đăng nhập: </label>
        <input type="text" value={user.username} disabled />
      </div>
      <div>
        <label>Mật khẩu cũ: </label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Nhập mật khẩu cũ"
        />
      </div>
      <div>
        <label>Mật khẩu mới: </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nhập mật khẩu mới"
        />
      </div>
      <button onClick={handleChangePassword}>Đổi Mật Khẩu</button>
      {message && <div>{message}</div>}
    </div>
  );
}