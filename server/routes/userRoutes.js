const express = require('express');
const router = express.Router();

// controllers
const {
    sendOtp,
    login,
    logout,
    changePassword,
    registerUser,
    getUserProfile
} = require('../controllers/usersController');
const {
    resetPassword,
    resetPasswordToken
} = require('../controllers/resetPassword');

const authMiddleware = require('../middlewares/authMiddleware');
// auth routes

// send otp
router.post("/send-otp", sendOtp);

// login
router.post("/login", login);

// register
router.post('/registerUser', registerUser);

// getUserProfile
router.get('/me', authMiddleware, getUserProfile);

// logout
router.post('/logout', logout);

// change password
router.put('/change-password', authMiddleware, changePassword);

// forgot password
router.post('/reset-password-token', resetPasswordToken);
router.post('/reset-password', resetPassword);



module.exports = router;