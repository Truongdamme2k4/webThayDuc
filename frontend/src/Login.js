import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [creds, setCreds] = useState({});
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      if (res.ok) {
        onLogin({ username: creds.username });
        navigate("/stats");
      } else {
        setError("Sai tên đăng nhập hoặc mật khẩu!");
      }
    } catch (err) {
      console.error(err);
      setError("Lỗi máy chủ!");
    }
  };

  return (
    <div className="login">
      <label>Tên đăng nhập:</label>
      <input
        onChange={(e) => setCreds({ ...creds, username: e.target.value })}
      />
      <label>Mật khẩu:</label>
      <input
        type="password"
        onChange={(e) => setCreds({ ...creds, password: e.target.value })}
      />
      <button onClick={handleLogin}>Đăng nhập</button>
      {error && <p>{error}</p>}
    </div>
  );
}
