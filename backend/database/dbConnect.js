const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Successfully connected to MongoDB Atlas!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error; // Re-throw để cho phép xử lý ở cấp cao hơn nếu cần
    }
}

module.exports = dbConnect;