const express = require('express');
const router = express.Router();

const { createProfile, updateProfile, getProfile, deleteAccount } = require("../controllers/profileController");
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

router.post(
    "/create",
    authMiddleware,
    upload.single("resume"),
    createProfile,
);

router.put(
    '/update',
    authMiddleware,
    upload.single('resume'),
    updateProfile
);

router.get(
    '/getProfile',
    authMiddleware,
    getProfile,
);

router.delete('/delete-account', authMiddleware, deleteAccount);


module.exports = router;