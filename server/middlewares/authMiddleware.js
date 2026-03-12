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

const supabase = require("../config/supaBase");
const supabaseClient = supabase.default || supabase;

const authMiddleware = async (req, res, next) => {
    try {

        const token =
            req.cookies?.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token nahi mila bhai",
            });
        }

        const { data, error } = await supabaseClient.auth.getUser(token);

        if (error || !data.user) {
            return res.status(401).json({
                success: false,
                message: "Invalid ya expired token",
            });
        }

        req.user = data.user;
        next();

    } catch (error) {
        console.error("Supabase Auth Error:", error);

        return res.status(500).json({
            success: false,
            message: "Authentication failed",
        });
    }
};

module.exports = authMiddleware;

// const supabaseClient = supabase.default || supabase;

// const authMiddleware = async (req, res, next) => {
//     try {
//         // Token ko Header se nikalna (ya cookie se)
//         const token =
//             req.cookies?.token ||
//             req.header("Authorization")?.replace("Bearer ", "");

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Login required. Bhai token nahi mila!",
//             });
//         }

//         // Supabase se token verify karwana
//         const { data: { user }, error } = await supabaseClient.auth.getUser(token);

//         if (error || !user) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid ya expired token",
//             });
//         }

//         // Agar sab theek hai, toh user data request mein daal do
//         req.user = user;
//         next();
//     } catch (error) {
//         console.error("Middleware error:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error during authentication",
//         });
//     }
// };

// export default authMiddleware;