const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
// controllers
const {
    // signUp,
    login,
    logout,
    changePassword,
    registerUser,
    getUserProfile
} =  require('../controllers/usersController')
const {
    resetPassword,
    resetPasswordToken
} = require('../controllers/resetPassword');


// auth routes
// signup
// router.post("/register", signUp);

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

router.post('/registerUser', registerUser);

module.exports = router;