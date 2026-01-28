const Profile = require('../database/AdditionalInfo');
const User = require("../database/User");
const { uploadPdf } = require('../utils/resumeuploader');

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
