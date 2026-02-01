const Profile = require('../database/AdditionalInfo');
const User = require("../database/User");
const Portfolio = require('../database/PortfolioInfo');
const { uploadPdf } = require('../utils/resumeuploader');
const cloudinary = require('cloudinary').v2;


// create account
exports.createProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const { bio, gender, dateOfBirth, about, address, phone } = req.body;

        if (!bio || !gender || !dateOfBirth || !about || !address || !phone) {
            return res.status(400).json({
                success: false,
                message: "Enter all details",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume PDF is required",
            });
        }

        const uploadResume = await uploadPdf(req.file.buffer);

        if (!uploadResume?.secure_url) {
            return res.status(500).json({
                success: false,
                message: "Resume upload failed",
            });
        }

        const profile = await Profile.create({
            bio,
            gender,
            dateOfBirth: new Date(dateOfBirth),
            about,
            phone,
            address,
            resume: {
                url: uploadResume.secure_url,
                publicId: uploadResume.public_id,
            },
        });

        await User.findByIdAndUpdate(userId, {
            profile: profile._id,
        });

        return res.status(201).json({
            success: true,
            message: "Profile created successfully",
            profile,
        });

    } catch (error) {
        console.log("Create profile error", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create profile",
        });
    }
};

// delete account
exports.deleteAccount = async (req, res) => {
    try {
        // user id find
        const userId = req.user.id;

        const user = await User.findById(userId).populate('profile');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        }

        // delete resume from cloudinary
        if (user.profile?.resume?.publicId) {
            await cloudinary.uploader.destroy(
                user.profile.resume.publicId,
                {
                    resource_type: 'raw',
                }
            );
        }

        // delete profile
        if (user.profile) {
            await Profile.findByIdAndDelete(user.profile._id);
        }

        // delete all portfolio
        await Portfolio.deleteMany({ user: userId });

        // delete user
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });


    } catch (error) {
        console.error("delete account error : ", error.message);
        return res.status(500).json({
            success: false,
            message: "failed to delete your account"
        });
    }
}