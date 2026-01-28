const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        bio: String,
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            default: "Other",
        },
        dateOfBirth: Date,
        about: String,
        address: String,
        phone: String,
        resume: {
            url: {
                type: String,
                required: true,
            },
            publicId: { // later delete resume from cloudinary using publicId
                type: String,
                required: true,
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
