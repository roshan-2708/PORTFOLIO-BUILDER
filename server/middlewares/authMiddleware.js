// const jwtToken = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//     try {
//         const token =
//             req.cookies.token ||
//             req.header("Authorization")?.replace("Bearer ", "");

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Login required",
//             });
//         }


//         const decoded = jwtToken.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             status: false,
//             message: "Invalid token",
//         });
//     }
// }
// module.exports = authMiddleware;

import supabase from '../config/supaBase';

const supabaseClient = supabase.default || supabase;

const authMiddleware = async (req, res, next) => {
    try {
        // Token ko Header se nikalna (ya cookie se)
        const token =
            req.cookies?.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Login required. Bhai token nahi mila!",
            });
        }

        // Supabase se token verify karwana
        const { data: { user }, error } = await supabaseClient.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({
                success: false,
                message: "Invalid ya expired token",
            });
        }

        // Agar sab theek hai, toh user data request mein daal do
        req.user = user;
        next();
    } catch (error) {
        console.error("Middleware error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during authentication",
        });
    }
};

export default authMiddleware;