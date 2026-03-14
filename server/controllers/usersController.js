const User = require('../database/User');
const AdditionalInfo = require('../database/AdditionalInfo');
const profileInfo = require('../database/PortfolioInfo');
const bcrypt = require('bcryptjs');
const jwtToken = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const transporter = require("../utils/mailSender");
const sendEmail = require("../utils/sendEmail");
const supabase = require('../config/supaBase');
const supabaseClient = supabase.default || supabase;
require('dotenv').config();


// login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password required bhai!",
            });
        }

        // Supabase se Login karna
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        // Agar user nahi mila ya password galat hai
        if (error) {
            return res.status(401).json({
                success: false,
                message: error.message || "Incorrect email or password",
            });
        }

        const token = data.session.access_token;

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        };

        return res
            .cookie("token", token, cookieOptions)
            .status(200)
            .json({
                success: true,
                message: "Login successful bhai!",
                token,
                user: data.user,
            });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Login failed",
        });
    }
};

// supabase register
// exports.registerUser = async (req, res) => {

//     const { email, password, fullName } = req.body;

//     if (!email || !password || !fullName) {
//         return res.status(400).json({
//             success: false,
//             message: "All fields required"
//         });
//     }

//     try {

//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User already exists"
//             })
//         }

//         const { data, error } = await supabaseClient.auth.signUp({
//             email,
//             password,
//             options: {
//                 data: { full_name: fullName },
//                 emailRedirectTo: process.env.CLIENT_URL
//             }
//         });

//         if (error) {
//             return res.status(400).json({
//                 success: false,
//                 message: error.message
//             })
//         }

//         const supabaseUser = data.user;

//         const newUser = await User.create({
//             supabaseId: supabaseUser.id,
//             email: supabaseUser.email,
//             fullName,
//             image: `https://api.dicebear.com/7.x/initials/svg?seed=${fullName}`
//         });

//         res.status(201).json({
//             success: true,
//             message: "User register ho gaya",
//             user: newUser
//         });

//     } catch (error) {

//         console.log("Registration Error:", error);

//         res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });

//     }

// }
exports.registerUser = async (req, res) => {
    const { email, password, fullName } = req.body;

    try {

        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName }
            }
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        if (!data.user) {
            return res.status(400).json({
                success: false,
                message: "Supabase user create nahi hua"
            });
        }

        console.log("Supabase user:", data.user);

        const newUser = await User.create({
            supabaseId: data.user.id,
            email: data.user.email,
            fullName
        });

        console.log("MongoDB user created:", newUser);

        res.status(201).json({
            success: true,
            user: newUser
        });

    } catch (error) {
        console.log("Registration error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// get user profile details
// exports.getUserProfile = async (req, res) => {
//     try {

//         // Supabase user id
//         const supabaseId = req.user.id;

//         // MongoDB user find
//         const user = await User.findOne({ supabaseId })
//             .select('-password')
//             .populate('profile');

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "User profile fetched successfully",
//             user
//         });

//     } catch (error) {

//         console.log("Get profile error:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Failed to fetch profile."
//         });
//     }
// };

// logout

exports.getUserProfile = async (req, res) => {
    try {

        // Supabase user id from middleware
        const supabaseId = req.user.id;

        // 1️⃣ MongoDB user
        const mongoUser = await User.findOne({ supabaseId })
            .select("-password")
            .populate("profile");

        if (!mongoUser) {
            return res.status(404).json({
                success: false,
                message: "MongoDB user not found",
            });
        }

        // 2️⃣ Supabase user
        const { data, error } = await supabaseClient.auth.getUser(
            req.headers.authorization?.replace("Bearer ", "")
        );

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Supabase user fetch failed",
            });
        }

        const supabaseUser = data.user;

        // 3️⃣ Send combined response
        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            user: {
                supabase: {
                    id: supabaseUser.id,
                    email: supabaseUser.email,
                    email_verified: supabaseUser.email_confirmed_at
                },
                mongodb: mongoUser
            }
        });

    } catch (error) {

        console.log("Get profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile."
        });
    }
};

exports.logout = async () => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });

        return res.status(200).json({
            success: true,
            message: "logout successfully",
        });
    } catch (error) {
        console.log("Logout Error", error);
        return res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
}
// change password
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Both old and new password required",
            });
        }

        const user = await User.findById(req.user.id).select('+password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "old password incorrect",
            });
        }

        if (await bcrypt.compare(newPassword, user.password)) {
            return res.status(400).json({
                success: false,
                message: "new password can't be same with old password",
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        await mailSender(
            user.email,
            'password changed successfully',
            `<p>Your password has been update.</p>`
        );

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });

    } catch (error) {
        console.log("Change password error : ", error);
        return res.status(500).json({
            success: false,
            message: "Failed to changed password",
        });
    }
}

