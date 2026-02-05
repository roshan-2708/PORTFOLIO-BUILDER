const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createPortfolio, getPortfolioBySlug } = require('../controllers/portfolioController');
const upload = require('../utils/uploader');

router.post(
    "/create",
    upload.single("userImage"),
    authMiddleware,
    createPortfolio
);

router.get("/:slug", getPortfolioBySlug);

module.exports = router;
