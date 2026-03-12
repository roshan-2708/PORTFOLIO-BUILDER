const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        supabaseId: {
            type: String,
            required: true,
            unique: true
        },

        firstName: {
            type: String,
            trim: true
        },

        lastName: {
            type: String,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile"
        },

        image: {
            type: String,
            default: ""
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        token: {
            type: String
        },

        resetPasswordExpires: {
            type: Date
        },

        verifyOtp: {
            type: String,
            default: ""
        },

        verifyOtpExpireAt: {
            type: Number,
            default: 0
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);