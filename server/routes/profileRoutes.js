const express = require('express');
const router = express.Router();

const { createProfile } = require("../controllers/profileController");
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer');

router.post(
    "/create",
    authMiddleware,
    upload.single("resume"),
    createProfile,
)

module.exports = router;