const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    employmentType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Internship', 'Freelance'],
    },
    location: String,

    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: false,
    },
    currentlyWorking: {
        type: Boolean,
        default: false,
    },
    description: String,
    companyName: String,
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);