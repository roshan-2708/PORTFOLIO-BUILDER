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

const supabase = require('../config/supaBase');
const supabaseClient = supabase.default || supabase;

export const verifyToken = async (req, res, next) => {
    try {
        // Frontend se header mein token aayega "Bearer <token>" format mein
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Access Denied! Bhai token kahan hai?' });
        }

        // Token extract karo
        const token = authHeader.split(' ')[1];

        // Supabase se token verify karo
        const { data: { user }, error } = await supabaseClient.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid ya expired token!' });
        }

        // Agar token sahi hai, toh user ka data request object mein daal do aage ke routes ke liye
        req.user = user;

        // next() ka matlab hai ki sab theek hai, aage badho (main controller function run karo)
        next();

    } catch (err) {
        console.error('Middleware Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};