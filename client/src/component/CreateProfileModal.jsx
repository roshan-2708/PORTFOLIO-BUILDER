import React, { useState } from "react";
import { createAccount } from "../services/operation/profileAPI";

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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (!formData.about || !formData.phone) {
            alert("About and Phone are required");
            return;
        }

        try {
            setLoading(true);

            const data = new FormData();
            data.append("bio", formData.bio);
            data.append("gender", formData.gender);
            data.append("dateOfBirth", formData.dateOfBirth);
            data.append("about", formData.about);
            data.append("address", formData.address);
            data.append("phone", formData.phone);

            if (resume) {
                data.append("resume", resume);
            }

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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-slate-900 text-white w-full max-w-lg rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>

                <input
                    name="bio"
                    placeholder="Short Bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-800 mb-3"
                />

                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-800 mb-3"
                >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-800 mb-3"
                />

                <textarea
                    name="about"
                    placeholder="About yourself"
                    value={formData.about}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-800 mb-3"
                />

                <input
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-800 mb-3"
                />

                <input
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-800 mb-3"
                />

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                    className="mb-4 text-sm"
                />

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700"
                    >
                        {loading ? "Saving..." : "Create Profile"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateProfileModal;
