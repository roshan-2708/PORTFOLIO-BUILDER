const mongoose = require("mongoose");
const slugify = require('slugify');

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
        slug: {
            type: String,
            unique: true,
            required: true,
        },
        about: String,
        skills: [String],

        projects: [
            {
                title: String,
                description: String,
                link: String,
                image: String,
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

// pre-save hook to generate unique slug
portfolioSchema.pre("validate", async function (next) {
    if (this.title && !this.slug) {
        let baseSlug = slugify(this.title, {
            lower: true,
            strict: true,
        });
        let slug = baseSlug;
        let counter = 1;

        // ensure slug is unique
        while (await constructor.findOne({ slug })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        this.slug = slug;
    }
    // next();
})

module.exports = mongoose.model("Portfolio", portfolioSchema);

