const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        // slug only exists AFTER publish
        slug: {
            type: String,
            unique: true,
            sparse: true, // allows multiple null values
        },

        profileImage: { type: String, default: null },

        about: String,

        skills: [String],

        projects: [
            {
                title: String,
                description: String,
                link: String,
                image: {
                    type: String,
                    default: ""
                },
            },
        ],

        contact: {
            email: String,
            github: String,
            linkedin: String,
        },

        languages: [
            {
                name: String,
                proficiency: String,
            },
        ],

        template: {
            type: String,
            required: true,
        },

        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
