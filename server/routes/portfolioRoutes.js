const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createPortfolio, updatePortfolio, getPortfolioBySlug, publishPortfolio, getUserPortfolioCount, getUsersPortfolio, getTotalViews, deletePortfolio, getSinglePortfolio } = require('../controllers/portfolioController');
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

// router.put('/updatePortfolio/:portfolioId',
//     authMiddleware,
//     upload.fields([
//         { name: 'profileImage', maxCount: 1 },
//         { name: 'projectUImages', maxCount: 10 },
//     ]),
//     updatePortfolio,
// );

router.put(
    '/updatePortfolio/:portfolioId',
    authMiddleware,
    upload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'projectImages', maxCount: 10 },
    ]),
    updatePortfolio,
);

router.put(
    '/publish/:portfolioId',
    authMiddleware,
    publishPortfolio,
);

router.delete(
    '/delete/:portfolioId',
    authMiddleware,
    deletePortfolio
);

router.get("/stats/me", authMiddleware, getUserPortfolioCount);
router.get('/my-portfolio', authMiddleware, getUsersPortfolio);
router.get("/total-views", authMiddleware, getTotalViews);
router.get('/getThrough/i/:id', getSinglePortfolio);
router.get("/getThrough/s/:slug", getPortfolioBySlug);



module.exports = router;
