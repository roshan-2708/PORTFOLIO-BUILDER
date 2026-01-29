// const mongoose = require("mongoose");

// exports.connect = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URL);
//         console.log("✅ MongoDB connected successfully");
//     } catch (error) {
//         console.error("❌ MongoDB connection failed:", error.message);
//         process.exit(1);
//     }
// };

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);

        await mongoose.connect(process.env.MONGODB_URL);

        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = { connectDB };
