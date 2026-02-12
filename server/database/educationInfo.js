const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: true
    },
    fieldOfStudy: {
        type: String
    },
    institution: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    currentlyStudying: {
        type: Boolean,
        default: false
    },
    grade: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true });


module.exports = mongoose.model("Education", educationSchema);
