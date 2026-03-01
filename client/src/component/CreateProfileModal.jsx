import React, { useState } from "react";
import { createAccount } from "../services/operation/profileAPI";
import { MdClose, MdCloudUpload, MdInfo, MdPhone, MdLocationOn, MdCake, MdBadge } from "react-icons/md";
import { FaTransgender } from "react-icons/fa";

const CreateProfileModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        bio: "",
        gender: "Other",
        dateOfBirth: "",
        about: "",
        address: "",
        phone: "",
    });

    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.about || !formData.phone) {
            alert("About and Phone are required");
            return;
        }

        try {
            setLoading(true);
            const data = new FormData();
            Object.keys(formData).forEach(key => data.append(key, formData[key]));
            if (resume) data.append("resume", resume);

            await createAccount(data);
            alert("Profile created successfully ✅");
            onClose();
            window.location.reload();
        } catch (error) {
            alert("Failed to create profile ❌");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-[#0f172a] border border-white/10 text-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">

                {/* Header */}
                <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Complete Your Profile
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">Let's set up your professional identity</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                        <MdClose size={24} />
                    </button>
                </div>

                <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Bio Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <MdBadge className="text-yellow-500" /> Short Bio
                            </label>
                            <input
                                name="bio"
                                placeholder="Full Stack Developer"
                                value={formData.bio}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-yellow-500 outline-none transition-all placeholder:text-gray-600"
                            />
                        </div>

                        {/* Gender Select */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <FaTransgender className="text-yellow-500" /> Gender
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl bg-[#1e293b] border border-white/10 focus:border-yellow-500 outline-none transition-all cursor-pointer"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* DOB */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <MdCake className="text-yellow-500" /> Date of Birth
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-yellow-500 outline-none transition-all [color-scheme:dark]"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <MdPhone className="text-yellow-500" /> Phone Number
                            </label>
                            <input
                                name="phone"
                                placeholder="+91 00000 00000"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-yellow-500 outline-none transition-all placeholder:text-gray-600"
                            />
                        </div>

                        {/* Address - Full Width */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <MdLocationOn className="text-yellow-500" /> Address
                            </label>
                            <input
                                name="address"
                                placeholder="City, State, Country"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-yellow-500 outline-none transition-all placeholder:text-gray-600"
                            />
                        </div>

                        {/* About - Full Width */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <MdInfo className="text-yellow-500" /> About Yourself
                            </label>
                            <textarea
                                name="about"
                                rows="3"
                                placeholder="Write a brief description about your journey..."
                                value={formData.about}
                                onChange={handleChange}
                                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-yellow-500 outline-none transition-all placeholder:text-gray-600 resize-none"
                            />
                        </div>

                        {/* File Upload Area */}
                        <div className="md:col-span-2 mt-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Resume (PDF)</label>
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 hover:border-yellow-500/50 cursor-pointer transition-all">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <MdCloudUpload size={32} className="text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-400">
                                        {resume ? <span className="text-yellow-500 font-medium">{resume.name}</span> : "Click to upload your resume"}
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".pdf"
                                    onChange={(e) => setResume(e.target.files[0])} // File state update
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-8 border-t border-white/5 bg-white/5 flex flex-col md:flex-row gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 font-medium transition-colors order-2 md:order-1"
                    >
                        Maybe Later
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-[2] px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-[#0f172a] font-bold shadow-lg shadow-yellow-500/10 transition-all transform active:scale-[0.98] disabled:opacity-50 order-1 md:order-2"
                    >
                        {loading ? "Saving Profile..." : "Complete Setup"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProfileModal;