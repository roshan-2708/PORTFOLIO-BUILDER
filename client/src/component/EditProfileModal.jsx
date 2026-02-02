import { useEffect, useState } from "react";
import axios from "axios";
import { getAccount, updateAccount } from "../services/operation/profileAPI";


const EditProfile = ({ user, onClose }) => {
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        about: user?.profile?.about || "",
        address: user?.profile?.address || "",
        phone: user?.profile?.phone || "",
    })

    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    // Load existing profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getAccount()

                const { user, profile } = res.data;

                setFormData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    about: profile.about,
                    address: profile.address,
                    phone: profile.phone,
                });
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //Submit update
    const handleSubmit = async () => {
        try {
            setLoading(true);

            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) =>
                data.append(key, value)
            );

            if (resume) {
                data.append("resume", resume);
            }

            await updateAccount(data);

            alert("Profile updated successfully ✅");
            window.location.reload();
        } catch (err) {
            alert("Failed to update profile ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-slate-900 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            <div className="grid grid-cols-2 gap-4">
                <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="input"
                />
                <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="input"
                />
            </div>

            <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="About"
                className="input mt-4"
            />

            <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="input mt-4"
            />

            <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="input mt-4"
            />

            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
                className="mt-4 text-sm"
            />

            {/* Yes / No buttons (Wireframe Match) */}
            <div className="flex gap-4 mt-6">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700"
                >
                    Yes
                </button>

                <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700"
                >
                    No
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
