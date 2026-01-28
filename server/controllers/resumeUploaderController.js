const uploadResumeCloudinary = require('../utils/resumeuploader');
const profile = require('../database/AdditionalInfo');

exports.uploadResume = async (req, res) => {
    try {
        // fetch resume file and userid
        const resumeFile = req.files.resume;
        const userId = req.user.id;
        // if user id not found
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is not found",
            });
        }
        // if resume file not found
        if (!resumeFile) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required",
            });
        }
        // upload resume to cloudinary folder
        const uploadresponse = await uploadResumeCloudinary(
            resumeFile,
            process.env.FOLDER_NAME || "resumes"
        );
        // update resume url in database
        await profile.findByIdAndUpdate(
            { userId: userId },
            { resume: uploadresponse.secure_url },
            { new: true },
        );

        // return success response

        return res.status(200).json({
            success: true,
            message: "resume uploaded successfully",
            data: uploadresponse.secure_url,
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server upload Error",
        });
    }
}