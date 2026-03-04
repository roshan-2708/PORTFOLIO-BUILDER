const Portfolio = require('../database/PortfolioInfo');
const slugify = require("slugify");
const cloudinary = require("../config/cloudinaryConnection");
const { nanoid } = require("nanoid");
const Experience = require('../database/experience');
const EducationInfo = require('../database/educationInfo');
const Services = require('../database/services');
const Blogs = require('../database/blogs');

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
        const blogImages = req.files?.blogImages || [];
        // ---------- Upload image ----------
        let profileImageUrl = "";
        const blogsWithImages = [];

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
        const experienceData = parseArray(req.body.experience);
        const educationData = parseArray(req.body.education);
        const serviceData = parseArray(req.body.services);
        const blogData = parseArray(req.body.blogs);

        /* ================= PROJECT IMAGES ================= */
        const projectImages = req.files?.projectImages || [];

        const projectsWithImages = [];

        for (let i = 0; i < projects.length; i++) {
            let project = projects[i];

            if (projectImages[i]) {
                const imageUrl = await uploadToCloudinary(
                    projectImages[i].buffer,
                    "portfolio/projects"
                );
                project.image = imageUrl;
            }

            projectsWithImages.push(project);
        }
        for (let i = 0; i < blogData.length; i++) {
            let blog = blogData[i];

            if (blogImages[i]) {
                const imageUrl = await uploadToCloudinary(
                    blogImages[i].buffer,
                    "portfolio/blogs"
                );
                blog.image = imageUrl;
            } else {
                blog.image = blog.image || ""; // important
            }

            blogsWithImages.push(blog);
        }
        const slug =
            slugify(req.body.title || "portfolio", {
                lower: true,
                strict: true,
            }) + "-" + nanoid(5);

        // ---------- Create portfolio ----------
        const portfolio = await Portfolio.create({
            user: userId,
            title: req.body.title,
            slug: slug,
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
        if (experienceData.length > 0) {
            const docs = await Experience.insertMany(experienceData.map(d => ({ ...d, user: userId })));
            portfolio.experience = docs.map(d => d._id);
        }

        if (educationData.length > 0) {
            const docs = await EducationInfo.insertMany(educationData.map(d => ({ ...d, user: userId })));
            portfolio.educations = docs.map(d => d._id);
        }

        if (serviceData.length > 0) {
            const docs = await Services.insertMany(serviceData.map(d => ({ ...d, user: userId })));
            portfolio.services = docs.map(d => d._id);
        }

        // if (blogData.length > 0) {
        //     const docs = await Blogs.insertMany(blogData.map(d => ({ ...d, user: userId })));
        //     portfolio.blogs = docs.map(d => d._id);
        // }
        if (blogsWithImages.length > 0) {
            const docs = await Blogs.insertMany(
                blogsWithImages.map(d => ({ ...d, user: userId }))
            );
            portfolio.blogs = docs.map(d => d._id);
        }

        await portfolio.save();
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

        const baseUrl = process.env.CLIENT_URL || "http://localhost:5173";

        res.status(200).json({
            success: true,
            message: "Portfolio published successfully",
            deployUrl: `${baseUrl}/portfolio/${slug}`,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to publish portfolio",
        });
    }
};

// count portfolio controller
exports.getUserPortfolioCount = async (req, res) => {
    try {
        const userId = req.user.id; // from auth middleware
        console.log("USER ID:", req.user.id);

        const total = await Portfolio.countDocuments({
            user: userId,
        });

        const published = await Portfolio.countDocuments({
            user: userId,
            isPublished: true,
        });

        const drafts = total - published;

        res.status(200).json({
            success: true,
            totalPortfolios: total,
            publishedPortfolios: published,
            draftPortfolios: drafts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch portfolio stats",
        });
    }
};

// get user's portfolio
exports.getUsersPortfolio = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("JWT USER ID:", userId);

        const portfolios = await Portfolio.find({ user: userId })
            .populate({
                path: "user",
                populate: {
                    path: "profile"
                }
            })
            .populate("services")
            .populate("projects")
            .populate("educations")
            .populate("experience")
            .populate("blogs")
            .populate('profile')
            .exec();

        if (portfolios.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Portfolio not found",
            });
        }

        return res.status(200).json({
            success: true,
            portfolios,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user's portfolio.",
        });
    }
};

// get portfolio
exports.getPortfolioBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        // Query fix: views badhane ke liye findOneAndUpdate best hai
        const portfolio = await Portfolio.findOneAndUpdate(
            { slug, isPublished: true },
            { $inc: { views: 1 } },
            { new: true }
        ).populate({
            path: "user",
            populate: {
                path: "profile"
            }
        }).populate("services")
            .populate("projects")
            .populate("educations")
            .populate("experience")
            .populate("blogs")
            .exec();

        if (!portfolio) {
            return res.status(404).json({ success: false, message: "PORTFOLIO NOT FOUND" });
        }

        return res.status(200).json({ success: true, portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// get single portfolio
exports.getSinglePortfolio = async (req, res) => {
    try {
        const { id } = req.params;
        const portfolio = await Portfolio.findById(id)
            .populate({
                path: "user",
                populate: {
                    path: "profile"
                }
            })
            .populate("services")
            .populate("projects")
            .populate("educations")
            .populate("experience")
            .populate("blogs")
            .populate('profile')
            .exec();
        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: "Portfolio not found for single",
            });
        }
        return res.status(200).json({
            success: true,
            message: "portfolio successfully found",
            portfolio,
        });
    } catch (error) {
        console.error('error in get users api ', error);
        return res.status(500).json({
            success: false,
            message: "error in controller",
        });
    }
}

// // update portfolio
// exports.updatePortfolio = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const { portfolioId } = req.params;

//         const portfolio = await Portfolio.findOne({
//             _id: portfolioId,
//             user: userId,
//         });

//         if (!portfolio) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Portfolio not found",
//             });
//         }

//         // profile image
//         let profileImageUrl = portfolio.profileImage;
//         if (req.files?.profileImage?.[0]) {
//             profileImageUrl = await uploadToCloudinary(
//                 req.files.portfolioImage[0].buffer,
//                 'portfolio/profile',
//             );
//         }

//         // parse fields
//         const skills = parseArray(req.body.skills);
//         const projects = parseArray(req.body.projects);
//         const languages = parseArray(req.body.languages);
//         const contact = parseObject(req.body.contact);
//         const experienceData = parseArray(req.body.experience);
//         const educationData = parseArray(req.body.education);
//         const serviceData = parseArray(req.body.services);
//         const blogData = parseArray(req.body.blogs);

//         // project image
//         const projectImages = req.files?.projectImages || [];
//         const projectsWithImages = [];

//         for (let i = 0; i < projects.length; i++) {
//             let project = projects[i];

//             if (projectImages[i]) {
//                 const imageUrl = await uploadToCloudinary(
//                     projectImages[i].buffer,
//                     'portfolio/projects',
//                 );
//                 project.image = imageUrl;
//             } else if (portfolio.projects[i]?.image) {
//                 project.image = portfolio.projects[i].image;
//             }
//             projectsWithImages.push(project);
//         }

//         // update main portfolio
//         portfolio.title = req.body.title || portfolio.title;
//         portfolio.about = req.body.about || portfolio.about;
//         portfolio.template = req.body.template || portfolio.template;
//         portfolio.profileImage = profileImageUrl;
//         portfolio.userImage = profileImageUrl;
//         portfolio.skills = skills;
//         portfolio.projects = projectsWithImages;
//         portfolio.languages = languages;
//         portfolio.contact = contact;

//         // replace child collection
//         await Experience.deleteMany({ user: userId });
//         await EducationInfo.deleteMany({ user: userId });
//         await Services.deleteMany({ user: userId });
//         await Blogs.deleteMany({ user: userId });

//         // insert new
//         if (experienceData.length > 0) {
//             const docs = await Experience.insertMany(
//                 experienceData.map(d => ({ ...d, user: userId }))
//             );
//             portfolio.experience = docs.map(d => d._id);
//         }

//         if (educationData.length > 0) {
//             const docs = await EducationInfo.insertMany(
//                 educationData.map(d => ({ ...d, user: userId }))
//             );
//             portfolio.educations = docs.map(d => d._id);
//         }

//         if (serviceData.length > 0) {
//             const docs = await Services.insertMany(
//                 serviceData.map(d => ({ ...d, user: userId }))
//             );
//             portfolio.services = docs.map(d => d._id);
//         }

//         if (blogData.length > 0) {
//             const docs = await Blogs.insertMany(
//                 blogData.map(d => ({ ...d, user: userId }))
//             );
//             portfolio.blogs = docs.map(d => d._id);
//         }

//         await portfolio.save();

//         return res.status(200).json({
//             success: true,
//             message: 'portfolio updated successfully',
//             portfolio,
//         });


//     } catch (error) {
//         console.error("Update Portfolio Error:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to update portfolio",
//         });
//     }
// }
exports.updatePortfolio = async (req, res) => {
    try {
        const userId = req.user.id;
        const { portfolioId } = req.params;

        const portfolio = await Portfolio.findOne({
            _id: portfolioId,
            user: userId,
        });

        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: "Portfolio not found",
            });
        }

        // ---------------- SAFE PARSE ----------------
        const parseArray = (data) => {
            try {
                return data ? JSON.parse(data) : [];
            } catch {
                return [];
            }
        };

        const parseObject = (data) => {
            try {
                return data ? JSON.parse(data) : {};
            } catch {
                return {};
            }
        };

        // ---------------- PROFILE IMAGE ----------------
        let profileImageUrl = portfolio.profileImage;

        if (req.files?.profileImage?.[0]) {
            const uploaded = await uploadToCloudinary(
                req.files.profileImage[0].buffer,
                "portfolio/profile"
            );
            profileImageUrl = uploaded;
        }

        // ---------------- PARSE BODY ----------------
        const skills = parseArray(req.body.skills);
        const projects = parseArray(req.body.projects);
        const languages = parseArray(req.body.languages);
        const contact = parseObject(req.body.contact);
        const experienceData = parseArray(req.body.experience);
        const educationData = parseArray(req.body.education);
        const serviceData = parseArray(req.body.services);
        const blogData = parseArray(req.body.blogs);

        // ---------------- PROJECT IMAGES ----------------
        const projectImages = req.files?.projectUImages || [];
        const projectsWithImages = [];

        for (let i = 0; i < projects.length; i++) {
            let project = projects[i];

            if (projectImages[i]) {
                const uploaded = await uploadToCloudinary(
                    projectImages[i].buffer,
                    "portfolio/projects"
                );
                project.image = uploaded;
            } else if (portfolio.projects[i]?.image) {
                project.image = portfolio.projects[i].image;
            }

            projectsWithImages.push(project);
        }

        // ---------------- UPDATE MAIN FIELDS ----------------
        portfolio.title = req.body.title || portfolio.title;
        portfolio.about = req.body.about || portfolio.about;
        portfolio.template = req.body.template || portfolio.template;
        portfolio.profileImage = profileImageUrl;
        portfolio.userImage = profileImageUrl;
        portfolio.skills = skills;
        portfolio.projects = projectsWithImages;
        portfolio.languages = languages;
        portfolio.contact = contact;

        // ---------------- DELETE OLD CHILD DOCS ----------------
        await Experience.deleteMany({ _id: { $in: portfolio.experience || [] } });
        await EducationInfo.deleteMany({ _id: { $in: portfolio.educations || [] } });
        await Services.deleteMany({ _id: { $in: portfolio.services || [] } });
        await Blogs.deleteMany({ _id: { $in: portfolio.blogs || [] } });

        // ---------------- INSERT NEW CHILD DOCS ----------------

        if (experienceData.length) {
            const docs = await Experience.insertMany(
                experienceData.map(({ _id, ...rest }) => ({
                    ...rest,
                    user: userId
                }))
            );
            portfolio.experience = docs.map(d => d._id);
        } else {
            portfolio.experience = [];
        }

        if (educationData.length) {
            const docs = await EducationInfo.insertMany(
                educationData.map(({ _id, ...rest }) => ({
                    ...rest,
                    user: userId
                }))
            );
            portfolio.educations = docs.map(d => d._id);
        } else {
            portfolio.educations = [];
        }

        if (serviceData.length) {
            const docs = await Services.insertMany(
                serviceData.map(({ _id, ...rest }) => ({
                    ...rest,
                    user: userId
                }))
            );
            portfolio.services = docs.map(d => d._id);
        } else {
            portfolio.services = [];
        }

        if (blogData.length) {

            const cleanedBlogs = blogData.map(({ _id, ...rest }) => {

                let imageValue = rest.image;

                // 🔥 Fix: Ensure image is string or null
                if (typeof imageValue !== "string") {
                    imageValue = null;
                }

                return {
                    ...rest,
                    image: imageValue,
                    user: userId
                };
            });

            const docs = await Blogs.insertMany(cleanedBlogs);
            portfolio.blogs = docs.map(d => d._id);

        } else {
            portfolio.blogs = [];
        }

        // ---------------- SAVE ----------------
        await portfolio.save();

        return res.status(200).json({
            success: true,
            message: "Portfolio updated successfully",
            portfolio,
        });

    } catch (error) {
        console.error("FULL UPDATE ERROR:", error);
        console.error("STACK:", error.stack);

        return res.status(500).json({
            success: false,
            message: "Failed to update portfolio",
        });
    }
};

// delete portfolio
exports.deletePortfolio = async (req, res) => {
    try {
        const userId = req.user.id;
        const { portfolioId } = req.params;

        const portfolio = await Portfolio.findOne({
            _id: portfolioId,
            user: userId,
        });

        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: "Portfolio not found",
            });
        }

        /* ========== SAFE CHILD DELETE ========== */

        if (portfolio.experience?.length > 0) {
            await Experience.deleteMany({
                _id: { $in: portfolio.experience }
            });
        }

        if (portfolio.educations?.length > 0) {
            await EducationInfo.deleteMany({
                _id: { $in: portfolio.educations }
            });
        }

        if (portfolio.services?.length > 0) {
            await Services.deleteMany({
                _id: { $in: portfolio.services }
            });
        }

        if (portfolio.blogs?.length > 0) {
            await Blogs.deleteMany({
                _id: { $in: portfolio.blogs }
            });
        }

        /* ========== DELETE MAIN PORTFOLIO ========== */

        await Portfolio.findByIdAndDelete(portfolioId);

        return res.status(200).json({
            success: true,
            message: "Portfolio deleted successfully",
        });

    } catch (error) {
        console.error("Delete Portfolio Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// total views
exports.getTotalViews = async (req, res) => {
    try {
        const userId = req.user.id;
        const portfolios = await Portfolio.find({ user: userId });

        // Safe calculation using reduce
        const totalView = portfolios.reduce((acc, portfolio) => acc + (portfolio.views || 0), 0);

        return res.status(200).json({
            success: true,
            totalViews: totalView,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}