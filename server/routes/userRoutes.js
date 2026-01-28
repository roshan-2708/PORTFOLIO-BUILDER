const express = require('express');
const router = express.Router();

// controllers
const {
    sendOtp,
    verifyOtp,
    signUp,
    login,
} = require('../controllers/UserController');

// auth routes

// send otp
router.post("/send-otp", sendOtp);

// verify otp
router.post("/verify-otp", verifyOtp);

// signup
router.post("/signup", signUp);

// login
router.post("/login", login);

module.exports = router;