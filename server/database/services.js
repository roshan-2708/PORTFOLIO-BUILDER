const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({

    image: {
        type: String,
        required: false,
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    link: {
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);
