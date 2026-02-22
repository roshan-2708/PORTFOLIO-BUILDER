const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createPortfolio, getPortfolioBySlug, publishPortfolio, getUserPortfolioCount, getUsersPortfolio, getSinglePortfolio } = require('../controllers/portfolioController');
const upload = require('../utils/uploader');

router.post(
    "/create",
    authMiddleware,
    upload.fields([
        { name: "profileImage", maxCount: 1 },   // for main profile
        { name: "projectImages", maxCount: 10 }  // for projects
    ]),
    createPortfolio
);

router.put(
    '/publish/:portfolioId',
    authMiddleware,
    publishPortfolio,
);

router.get("/stats/me", authMiddleware, getUserPortfolioCount);
router.get('/my-portfolio', authMiddleware, getUsersPortfolio);
// router.get("/:slug", getPortfolioBySlug);
// router.get('/:id', authMiddleware, getSinglePortfolio);

// Change the URL paths so they are unique
router.get("/s/:slug", getPortfolioBySlug);          // Accessible at /portfolio/s/my-slug
router.get('/i/:id', authMiddleware, getSinglePortfolio); // Accessible at /portfolio/i/69942f4...


module.exports = router;
