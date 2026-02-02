import React, { useEffect, useState } from "react";
import { changePassword, userProfile } from "../services/operation/authAPI";
import DeleteAccountModal from "../component/DeleteAccountModal";
import EditProfile from "../component/EditProfileModal";
import CreateProfileModal from "../component/CreateProfileModal";
import { deleteAccount } from "../services/operation/profileAPI";
import { Navigate, useNavigate } from "react-router-dom";

/* ------------------ Small UI Components ------------------ */

const StatCard = ({ title, value, onClick }) => (
    <div className="bg-white rounded-2xl shadow p-6" onClick={onClick}>
        <p className="text-gray-500 text-sm uppercase">{title}</p>
        <h2 className="text-3xl font-bold mt-4">{value}</h2>
    </div>
);

const SectionCard = ({ title, children, action }) => (
    <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            {action}
        </div>
        {children}
    </div>
);

/* ------------------ Dashboard ------------------ */

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openCreateProfile, setOpenCreateProfile] = useState(false);

    const navigate = useNavigate();

    // Fetch Profile

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await userProfile();
                setUser(data.user);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Auto open create profile if not created
    useEffect(() => {
        if (user && !user.profile) {
            setOpenCreateProfile(true);
        }
    }, [user]);

    // Change Password

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword) {
            setPasswordMessage("All fields are required");
            return;
        }

        try {
            setLoadingPassword(true);
            const res = await changePassword(oldPassword, newPassword);

            if (res.success) {
                setPasswordMessage("Password changed successfully");
                setOldPassword("");
                setNewPassword("");
            }
        } catch (error) {
            setPasswordMessage(
                error.response?.data?.message || "Password update failed"
            );
        } finally {
            setLoadingPassword(false);
        }
    };

    // Delete Account

    const handleDeleteAccount = async () => {
        try {
            setLoading(true);
            await deleteAccount();
            alert("Account deleted successfully");

            localStorage.clear();
            window.location.href = "/";
        } catch (error) {
            alert("Failed to delete account");
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
        }
    };

    if (loading) return <p className="p-8">Loading profile...</p>;

    /* ------------------ UI ------------------ */

    return (
        <div className="min-h-screen p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-yellow-500">
                    Welcome Back{" "}
                    <span className="text-indigo-600">
                        {user?.firstName || "User"}
                    </span>
                </h1>
                <button
                onClick={()=>navigate('/create-portfolio')}
                        className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
                    Start Creating New Portfolio
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Portfolio" value="3" onClick={() => navigate('/my-portfolios')} />
                <StatCard title="Draft" value="1" />
                <StatCard title="Published" value="2" />
                <StatCard title="Views" value="124" />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Section */}
                <SectionCard
                    title="Profile Details"
                    action={
                        user?.profile && (
                            <button
                                onClick={() => setOpenEdit(true)}
                                className="text-indigo-600 font-medium hover:underline"
                            >
                                Edit Profile
                            </button>
                        )
                    }
                >
                    {user?.profile ? (
                        <ul className="space-y-2 text-gray-700">
                            <li>
                                <strong>Name:</strong> {user.firstName} {user.lastName}
                            </li>
                            <li>
                                <strong>Email:</strong> {user.email}
                            </li>
                            <li>
                                <strong>About:</strong>{" "}
                                {user.profile.about || "Not added"}
                            </li>
                            <li>
                                <strong>Address:</strong>{" "}
                                {user.profile.address || "Not added"}
                            </li>
                            <li>
                                <strong>Phone:</strong>{" "}
                                {user.profile.phone || "Not added"}
                            </li>
                            <li>
                                <strong>Resume:</strong>{" "}
                                {user.profile.resume?.url ? (
                                    <a
                                        href={user.profile.resume.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-indigo-600 underline"
                                    >
                                        View
                                    </a>
                                ) : (
                                    "Not uploaded"
                                )}
                            </li>
                        </ul>
                    ) : (
                        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
                            <p className="text-yellow-700">
                                ⚠️ Your profile is incomplete.
                            </p>
                            <button
                                onClick={() => setOpenCreateProfile(true)}
                                className="mt-2 text-indigo-600 font-medium underline"
                            >
                                Complete Profile
                            </button>
                        </div>
                    )}
                </SectionCard>

                {/* Account Settings */}
                <SectionCard title="Account Settings">
                    {passwordMessage && (
                        <p className="mb-3 text-sm text-pink-600">{passwordMessage}</p>
                    )}

                    <form onSubmit={handleChangePassword}>
                        <h3 className="font-semibold mb-2">Change Password</h3>

                        <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full border rounded-lg px-3 py-2 mb-2 text-white"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full border rounded-lg px-3 py-2 mb-3 text-white"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={loadingPassword}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                        >
                            {loadingPassword ? "Updating..." : "Change Password"}
                        </button>
                    </form>

                    <div className="border-t pt-4 mt-6">
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="text-red-600 font-semibold hover:underline"
                        >
                            Delete Account
                        </button>
                    </div>
                </SectionCard>
            </div>

            {/* Modals */}
            {openEdit && (
                <EditProfile user={user} onClose={() => setOpenEdit(false)} />
            )}

            {openCreateProfile && (
                <CreateProfileModal
                    onClose={() => setOpenCreateProfile(false)}
                />
            )}

            <DeleteAccountModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteAccount}
                loading={loading}
            />
        </div>
    );
}
