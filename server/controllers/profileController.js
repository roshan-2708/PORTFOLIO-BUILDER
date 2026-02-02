const Profile = require('../database/AdditionalInfo');
const User = require("../database/User");
const Portfolio = require('../database/PortfolioInfo');
const { uploadPdf } = require('../utils/resumeuploader');
const { data } = require('autoprefixer');
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

// update account
exports.updateProfile = async (req, res) => {
    try {
        const {
            bio,
            gender,
            dateOfBirth,
            about,
            address,
            phone
        } = req.body;

        const userId = req.user.id;

        const user = await User.findById(userId).populate("profile");
        if (!user || !user.profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        // Build update object dynamically
        const updateData = {
            bio,
            gender,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
            about,
            address,
            phone,
        };

        // Remove undefined fields
        Object.keys(updateData).forEach(
            key => updateData[key] === undefined && delete updateData[key]
        );

        // If resume uploaded, update it
        if (req.file) {
            const uploadResume = await uploadPdf(req.file.buffer);

            if (!uploadResume?.secure_url) {
                return res.status(500).json({
                    success: false,
                    message: "Resume upload failed",
                });
            }

            updateData.resume = {
                url: uploadResume.secure_url,
                publicId: uploadResume.public_id,
            };
        }

        const updatedProfile = await Profile.findByIdAndUpdate(
            user.profile._id,
            updateData,
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile: updatedProfile,
        });

    } catch (error) {
        console.log("Update profile error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });
    }
};

// get account
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).populate('profile').select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User profile data fetched",
            data: user,
            profile: user.profile || null,
            isProfileCreated: !!user.profile,
        });
    } catch (error) {
        console.log("Error in get user profile details", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch user data",
            error: error.message,
        });
    }
}

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