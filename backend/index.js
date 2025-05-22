const express = require("express");
const cors = require("cors");
const dbConnect = require("./database/dbConnect");
const PostRouter = require("./routes/PostRouter");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối database
dbConnect();

app.use(cors());
app.use(express.json());

app.use("/api", PostRouter);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema, "user"); 

// API login
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Vui lòng cung cấp tên đăng nhập và mật khẩu" });
    }

    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
    }

    return res.status(200).json({ message: "Đăng nhập thành công", user: { username: user.username } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi máy chủ" });
  }
});

// API đổi mật khẩu
app.post("/api/change-password", async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    if (!username || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "Vui lòng cung cấp tên đăng nhập, mật khẩu cũ và mật khẩu mới" });
    }

    const user = await User.findOne({ username });

    if (!user || user.password !== oldPassword) {
      return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu cũ không đúng" });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({ message: "Mật khẩu mới không được trùng với mật khẩu cũ" });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Đã xảy ra lỗi máy chủ" });
  }
});


app.post("/api/register", async (req, res) => {
    try{
        const {username,password}=req.body;
        if(!username || !password){
            return res.status(400).json({message: "Vui lòng cung cấp tên đăng nhập và mật khẩu"});
        }
        const existingUser= await User.findOne({username});
        if(existingUser){
            return res.status(400).json({message: "Tên đăng nhập đã tồn tại"});
        }else{
            const newUser=new User({username,password});
            await newUser.save();
            return res.status(201).json({message: "Đăng ký thành công"});
        }
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Đã xảy ra lỗi máy chủ" });
    }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Đã xảy ra lỗi máy chủ" });
});

// Khởi động máy chủ
app.listen(PORT, () => {
  console.log(`Máy chủ đang chạy trên http://localhost:${PORT}`);
});