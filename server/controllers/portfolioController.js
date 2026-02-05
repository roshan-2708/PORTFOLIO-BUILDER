const Portfolio = require('../database/PortfolioInfo');
const slugify = require("slugify");
const cloudinary = require("../config/cloudinaryConnection");
const { nanoid } = require("nanoid");


const parseArray = (value) => {
    try {
        return value ? JSON.parse(value) : [];
    } catch (err) {
        return [];
    }
};

const parseObject = (value) => {
    try {
        return value ? JSON.parse(value) : {};
    } catch (err) {
        return {};
    }
};
const uploadToCloudinary = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        ).end(buffer);
    });
};
// create portfolio
exports.createPortfolio = async (req, res) => {
    try {
        const userId = req.user.id;

        // ---------- Upload image ----------
        let profileImageUrl = "";

        if (req.files?.profileImage?.[0]) {
            profileImageUrl = await uploadToCloudinary(
                req.files.profileImage[0].buffer,
                "portfolio/profile"
            );
        }

        // ---------- Parse form-data fields ----------
        const skills = parseArray(req.body.skills);
        const projects = parseArray(req.body.projects);
        const languages = parseArray(req.body.languages);
        const contact = parseObject(req.body.contact);

        /* ================= PROJECT IMAGES ================= */
        const projectImages = req.files?.projectImages || [];

        const projectsWithImages = projects.map((project, index) => {
            if (projectImages[index]) {
                project.image = projectImages[index].secure_url;
            }
            return project;
        });

        // ---------- Create portfolio ----------
        const portfolio = await Portfolio.create({
            user: userId,
            title: req.body.title,
            about: req.body.about,
            template: req.body.template,
            profileImage: profileImageUrl,
            userImage: profileImageUrl,
            skills,
            projects: projectsWithImages,
            languages,
            contact,
            isPublished: false,
        });

        return res.status(201).json({
            success: true,
            message: "Portfolio created successfully",
            portfolio,
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

        const portfolio = await Portfolio.findOne({ slug, isPublished: true }).populate("user");

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

// publish portfolio
exports.publishPortfolio = async (req, res) => {
    try {
        const { portfolioId } = req.params;

        const portfolio = await Portfolio.findById(portfolioId);

        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: "Portfolio not found",
            });
        }

        if (portfolio.isPublished) {
            return res.status(400).json({
                success: false,
                message: "Portfolio already published",
            });
        }

        const slug = `${slugify(portfolio.title, {
            lower: true,
            strict: true,
        })}-${nanoid(6)}`;

        portfolio.slug = slug;
        portfolio.isPublished = true;
        await portfolio.save();

        res.status(200).json({
            success: true,
            message: "Portfolio published successfully",
            deployUrl: `${process.env.CLIENT_URL}/portfolio/${slug}`,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to publish portfolio",
        });
    }
};
