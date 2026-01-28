const jwtToken = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Login required",
            });
        }


        const decoded = jwtToken.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Invalid token",
        });
    }
}
module.exports = authMiddleware;