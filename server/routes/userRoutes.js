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
} = require('../controllers/UserController');

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

module.exports = router;