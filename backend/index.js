const express = require("express");
const cors = require("cors");
const dbConnect = require("./database/dbConnect");
const PostRouter = require("./routes/PostRouter");

const app = express();
const PORT = process.env.PORT || 5000; // Sử dụng biến môi trường cho PORT

// Kết nối cơ sở dữ liệu MongoDB
dbConnect();

// Middleware
app.use(cors()); // Cho phép yêu cầu từ các nguồn khác
app.use(express.json()); // Phân tích cú pháp JSON cho body của yêu cầu

// Định tuyến API
app.use("/api", PostRouter); // Sử dụng PostRouter cho các tuyến đường liên quan đến bài viết

// Điểm cuối đăng nhập (cải tiến sau)
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  // TODO: Thay thế bằng xác thực dựa trên cơ sở dữ liệu và mã hóa mật khẩu
  if (username === "admin" && password === "123") {
    return res.status(200).json({ message: "Đăng nhập thành công" });
  }
  return res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
});

// Middleware xử lý lỗi toàn cục
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Đã xảy ra lỗi máy chủ" });
});

// Khởi động máy chủ
app.listen(PORT, () => {
  console.log(`Máy chủ đang chạy trên http://localhost:${PORT}`);
});