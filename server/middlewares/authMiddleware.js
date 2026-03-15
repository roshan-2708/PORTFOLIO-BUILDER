const jwt = require("jsonwebtoken");
require("dotenv").config();

// AUTH
const authMiddleware = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies?.token) {
            token = req.cookies.token;
        } else if (req.body?.token) {
            token = req.body.token;
        }

        console.log("TOKEN RECEIVED:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("DECODED USER:", decoded);

        req.user = decoded;
        next();
    } catch (error) {
        console.error("AUTH ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = authMiddleware;