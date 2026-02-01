const express = require('express');
const router = express.Router();

const { createProfile, deleteAccount } = require("../controllers/profileController");
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

router.post(
    "/create",
    authMiddleware,
    upload.single("resume"),
    createProfile,
);
router.delete('/delete-account', authMiddleware, deleteAccount);


module.exports = router;