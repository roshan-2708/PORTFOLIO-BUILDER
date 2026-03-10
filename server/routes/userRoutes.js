const express = require('express');
const router = express.Router();

// controllers
const {
    signUp,
    login,
    getUserProfile,
    logout,
    changePassword,
    // sendVerificationEmail,
    // verifySupabaseToken
    registerUser
} = require('../controllers/UserController');
const {
    resetPassword,
    resetPasswordToken
} = require('../controllers/resetPassword');

const authMiddleware = require('../middlewares/authMiddleware');

// auth routes
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

// send verification link
// router.post("/send-verification", sendVerificationEmail);

// verification link
// router.post("/verify-token", verifySupabaseToken);

router.post('/register', registerUser);

module.exports = router;