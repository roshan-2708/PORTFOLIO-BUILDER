// require neccessary modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const database = require('./config/mongodbConnection');
const cloudinaryConnect = require('./config/cloudinaryConnection').cloudinaryConnect;

// start app building
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
// middleware
app.use(express.json());
app.use(cookieParser());

// DATABASE & CLOUDINARY 
database.connect();
cloudinaryConnect();

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/portfolio", portfolioRoutes);

// cors
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));


// health check route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'server is running 🚀',
        timestamp: new Date().toISOString(),
    });
});

// start server
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
