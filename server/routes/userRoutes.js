const express = require('express');
const router = express.Router();

// controllers
const {
    sendOtp,
    verifyOtp,
    signUp,
    login,
    getUserProfile,
    logout,
    changePassword,
    sendVerificationLink,
    signUpComplete
} = require('../controllers/UserController');
const {
    resetPassword,
    resetPasswordToken
} = require('../controllers/resetPassword');

const authMiddleware = require('../middlewares/authMiddleware');

// auth routes

// send otp
router.post("/send-otp", sendOtp);

// verify otp
router.post("/verify-otp", verifyOtp);

// signup
router.post("/signup", signUp);

// login
router.post("/login", login);

// getUserProfile
router.get('/me', authMiddleware, getUserProfile);

// logout
router.post('/logout', logout);

// change password
router.put('/change-password', authMiddleware, changePassword);

// forgot password
router.post('/reset-password-token', resetPasswordToken);
router.post('/reset-password', resetPassword);

// Phase 1: Email verify karne ke liye link bhejna
router.post('/send-verification', sendVerificationLink);

// Phase 2: Link click hone ke baad registration complete karna
router.post('/signup-complete', signUpComplete);

module.exports = router;