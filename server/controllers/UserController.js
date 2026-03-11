const User = require('../database/User');
const AdditionalInfo = require('../database/AdditionalInfo');
const profileInfo = require('../database/PortfolioInfo');
const bcrypt = require('bcryptjs');
const jwtToken = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const transporter = require("../utils/mailSender");
const sendEmail = require("../utils/sendEmail");
const supabase = require('../config/supaBase');
require('dotenv').config();


// signup
// exports.signUp = async (req, res) => {
//     try {
//         // fetch data from user
//         const {
//             firstName,
//             lastName,
//             email,
//             password,
//             confirmPassword,
//         } = req.body;

//         // validation
//         if (!firstName || !lastName || !email || !password || !confirmPassword) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All field are required",
//             });
//         }

//         // check password
//         if (password !== confirmPassword) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Password don't match",
//             });
//         }

//         // check user is exit or not 
//         const exitsUser = await User.findOne({
//             email,
//         });
//         // if user not exist then create user
//         if (exitsUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User already exits",
//             });
//         }

//         // hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // create new user
//         const newUser = await User.create({
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword,
//             profile: null,
//             image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
//             isVerified: false,
//         });

//         const token = jwtToken.sign({
//             id: newUser._id
//         }, process.env.JWT_SECRET, {
//             expiresIn: '7d'
//         });
//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//             maxAge: 7 * 24 * 60 * 1000,
//         });

//         // const mailOptions = {
//         //     from: process.env.EMAIL_USER,
//         //     to: email,
//         //     subject: "Welcome to FolioFlow",
//         //     text: `Welcome to portfolio builder website. Your account has been created with email id : ${email}`
//         // };

//         // await transporter.sendMail(mailOptions);
//         await sendEmail(
//             email,
//             "Welcome to FolioFlow",
//             `Welcome to portfolio builder website. Your account has been created with email id: ${email}`
//         );

//         return res.status(201).json({
//             success: true,
//             message: "User registered successfully.",
//             user: newUser,
//         });

//     } catch (error) {
//         console.error("Signup Error:", error);

//         return res.status(500).json({
//             success: false,
//             message: "Failed to signup",
//         });
//     }
// }

// login
exports.login = async (req, res) => {
    try {
        // fetch data
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password requried",
            });
        }

        // find user exit or not
        const existUser = await User.findOne({ email }).populate("profile");

        // not found user
        if (!existUser) {
            return res.status(404).json({
                success: false,
                message: "user is not exist , Please sign up first",
            });
        }

        // compare password
        const isPasswordValid = await bcrypt.compare(password, existUser.password);

        // if not success
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password , try again",
            });
        }

        const payload = {
            id: existUser.id,
            email: existUser.email,
        };

        const token = jwtToken.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        };

        existUser.password = undefined;

        return res
            .cookie("token", token, cookieOptions)
            .status(200)
            .json({
                success: true,
                message: "Login successful",
                token,
                existUser,
            });

    } catch (error) {
        console.error("login error", error);
        return res.status(500).json({
            success: false,
            message: "login failed",
        })
    }
}

// getUserWithProfile
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('-password').populate('profile');


        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully get data - ",
            user
        });


    } catch (error) {
        console.log("Get profile error", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile."
        })
    }
}

// logout
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

// supabase register
exports.registerUser = async (req, res) => {
    const { email, password, fullName } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Bhai, email aur password dono zaroori hain!' });
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
                // IMPORTANT: Verification link click karne ke baad user frontend pe aana chahiye
                emailRedirectTo: process.env.CLIENT_URL,
            },
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Success response
        return res.status(201).json({
            success: true,
            message: 'User registered successfully! Email verification link bhej diya gaya hai.',
            user: data.user,
        });

    } catch (err) {
        console.error('Registration Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};