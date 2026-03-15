const User = require('../database/User');
const Otp = require("../database/Otp");
const bcrypt = require('bcryptjs');
const otpGenerator = require("otp-generator");
const jwtToken = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
require('dotenv').config();


// send otp
exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const userExits = await User.findOne({ email });
        if (userExits) {
            return res.status(400).json({
                success: false,
                message: "User already exits",
            });
        }
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let exits = await Otp.findOne({ otp });
        while (exits) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            User.exists = await Otp.findOne({ otp });
        }

        await Otp.create({
            email,
            otp,
            createdAt: Date.now()
        });

        await mailSender(
            email,
            "Your OTP Code",
            `<h3>Your OTP is: <b>${otp}</b></h3>
            <p>OTP valid for 5 minutes.</p>`
        );

        return res.status(200).json({
            success: true,
            message: "Otp sent successfully"
        });
    } catch (error) {
        console.error("SEND OTP ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send OTP",
        });
    }
}

// verify otp
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpRecord = await Otp.findOne({ email, otp });

        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        otpRecord.isVerified = true;
        await otpRecord.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "OTP verification failed",
        });
    }
};

// sign up
exports.signUp = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
        } = req.body;

        if (!fullName || !email || !password) {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            });
        }

        const exitUser = await User.findOne({ email });
        if (exitUser) {
            return res.status(400).json({
                success: false,
                message: "user is already exits",
            });
        }

        const verifyEmail = await Otp.findOne({
            email,
            isVerified: true,
        });

        if (!verifyEmail) {
            return res.status(400).json({
                success: false,
                message: "Email not verified, Please verify Otp first",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
            profile: null,
        });

        await Otp.deleteMany({ email });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
        });

    } catch (error) {
        console.error("SIGNUP ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Signup failed.",
        });
    }
}

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

// get profile details

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

