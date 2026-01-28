const cloudinary = require("cloudinary").v2;

exports.uploadPdf = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: "resumes",
                resource_type: "raw", // IMPORTANT for PDF
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        ).end(fileBuffer);
    });
};
