const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createPortfolio, getPortfolioBySlug } = require('../controllers/portfolioController');

router.post("/create", authMiddleware, createPortfolio);
router.get("/:slug", getPortfolioBySlug);
module.exports = router;