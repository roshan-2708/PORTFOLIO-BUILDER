
const User = require('../database/User');
const mailSender = require('../utils/mailSender');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { resetPasswordTemplate } = require('./mail/resetPasswordTemplate');

exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("Email id : ", email);
        if (!email) {
            console.log('Email is required');
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        // check user
        const user = await User.findOne({ email });
        console.log('User : ', user);
        if (!user) {
            console.log('email id not registered')
            return res.status(404).json({
                success: false,
                message: "Email is not registered",
            })
        }

        // generate unique token
        const token = crypto.randomUUID();

        // save token + expiry in DB
        await User.findOneAndUpdate(
            { email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 15 * 60 * 1000,
            },
            { new: true }
        );

        const url = `https://portfolio-builder-3h77.vercel.app/update-password/${token}`;

        // send email
        await mailSender(
            email,
            "Reset Your Password",
            resetPasswordTemplate(url, user.firstName)
        );

        return res.status(200).json({
            success: true,
            message: "Reset password link sent to your email",
        });
    } catch (error) {
        console.log('Reset Password token Error');
        return res.status(500).json({
            success: false,
            message: "Could not send reset password"
        });
    }
}

// reset password
exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;
        if (!password || !confirmPassword || !token) {
            console.log("All fields are required");
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password does not match",
            });
        }

        const user = await User.findOne({
            token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token expired. Please request a new link."
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            { token },
            {
                password: hashPassword,
                token: null,
                resetPasswordExpires: null,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        console.log('reset password error', error);
        return res.status(500).json({
            success: false,
            message: "Something is went wrong in reset password controller",
        })
    }
}