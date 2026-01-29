const Portfolio = require('../database/PortfolioInfo');
const User = require('../database/User');
const slugify = require("slugify");

// create Portfolio
exports.createPortfolio = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "user id not found",
            });
        }

        const { title, about, skills, projects, languages, template, contact } = req.body;

        if (!title || !template) {
            return res.status(400).json({
                success: false,
                message: "title and template are required",
            });
        }

        const slugBase = slugify(title, { lower: true, strict: true });
        const slug = `${slugBase}-${Date.now()}`;
        const portfolio = await Portfolio.create({
            user: userId,
            title,
            slug,
            about,
            skills: skills || [],
            projects: projects || [],
            languages: languages || [],
            contact: contact || {},
            template,
            isPublished: true,
        });

        return res.status(201).json({
            success: true,
            message: "Portfolio created successfully",
            portfolio,
            uniqueLink: `https://localhost:3000/${portfolio.slug}`,
        });
    } catch (error) {
        console.error("Create Portfolio Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create portfolio",
        });
    }
};

// get portfolio
exports.getPortfolioBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const portfolio = await Portfolio.findOne({ slug }).populate("user");

        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: "PORTFOLIO NOT FOUND",
            });
        }

        return res.status(200).json({
            success: true,
            portfolio,
        });
    } catch (error) {
        console.error("Get Portfolio Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch portfolio",
        });
    }
}