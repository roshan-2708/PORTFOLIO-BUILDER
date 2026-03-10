const express = require('express');
const router = express.Router();

// controllers
const {
    signUp,
    login,
    getUserProfile,
    logout,
    changePassword
} = require('../controllers/UserController');
const {
    resetPassword,
    resetPasswordToken
} = require('../controllers/resetPassword');

const authMiddleware = require('../middlewares/authMiddleware');

// auth routes
// signup
router.post("/register", signUp);

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


module.exports = router;