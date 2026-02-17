
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// =======================
// CONFIG
// =======================
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// =======================
// CORS (MUST BE FIRST)
// =======================
app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());
app.use(cookieParser());

// =======================
// ROUTES
// =======================
app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/api/v1/profile", require("./routes/profileRoutes"));
app.use("/api/v1/portfolio", require("./routes/portfolioRoutes"));

// =======================
// HEALTH CHECK
// =======================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server running 🚀",
        time: new Date().toISOString(),
    });
});
console.log("CLIENT_URL =", process.env.CLIENT_URL);

// =======================
// DATABASE + CLOUDINARY + SERVER START
// =======================
const { connectDB } = require("./config/mongodbConnection");

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Server failed to start:", error.message);
        process.exit(1);
    }
};

startServer();
