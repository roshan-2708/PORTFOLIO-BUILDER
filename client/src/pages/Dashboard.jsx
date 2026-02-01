import React, { useEffect, useState } from "react";
import { changePassword, userProfile } from "../services/operation/authAPI";
import DeleteAccountModal from "../component/DeleteAccountModal";
import { deleteAccount } from "../services/operation/profileAPI";

const StatCard = ({ title, value }) => (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
        <p className="text-gray-500 text-sm uppercase">{title}</p>
        <h2 className="text-3xl font-bold mt-4">{value}</h2>
    </div>
);

const SectionCard = ({ title, children, action }) => (
    <div className="bg-white rounded-2xl shadow p-6 relative">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            {action}
        </div>
        {children}
    </div>
);

export default function Dashboard() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState('');
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const [showModal, setShowModal] = useState(false);



    // user profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await userProfile();
                setUser(data.user); // ✅ THIS IS THE KEY FIX
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // password change
    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!oldPassword || !newPassword) {
            setPasswordMessage('All filed are required');
            return;
        }
        setLoadingPassword(true);
        setPasswordMessage("");
        try {
            const res = await changePassword(oldPassword, newPassword);

            if (res.success) {
                setPasswordMessage('password changed successfully');
                setOldPassword('');
                setNewPassword('');
            }
        } catch (error) {
            setPasswordMessage(
                error.response?.data?.message || 'password update failed'
            );
        }
        finally {
            setLoadingPassword(false);
        }
    }

    // delete account
    const handleDeleteAccount = async () => {
        try {

            setLoading(true);
            await deleteAccount();
            alert('Account deleted successfully');

            localStorage.clear();
            window.location.href = '/'

        } catch (error) {
            alert('failed to delete account!')
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    }


    // portfolio data


    if (loading) return <p>Loading Profile....</p>

    return (
        <div className="min-h-screen p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
                <h1 className="text-3xl text-yellow-500 font-bold">Welcome Back
                    <span className="text-indigo-500">{" "}
                        {
                            user?.firstName
                        }
                    </span>
                </h1>
                <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
                    Start Creating New Portfolio
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Portfolio" value="3" />
                <StatCard title="Draft" value="1" />
                <StatCard title="Published" value="2" />
                <StatCard title="Views" value="124" />
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Details */}
                <SectionCard
                    title="Profile Details"
                    action={
                        <button className="text-indigo-600 font-medium hover:underline">
                            Edit Profile
                        </button>
                    }
                >
                    <ul className="space-y-2 text-gray-700">
                        <li><strong>Name: </strong>
                            {user?.firstName || "User"} {user?.lastName || 'Last Name'}
                        </li>
                        <li><strong>Email: </strong>
                            {user?.email || "xyz@gmail.com"}
                        </li>
                        <li><strong>About: </strong>
                            {user?.profile?.about || 'Not added'}
                        </li>
                        <li><strong>Address: </strong>
                            {user?.profile?.address}
                        </li>
                        <li><strong>Phone: </strong>
                            {
                                user?.profile?.phone
                            }
                        </li>
                        <li><strong>Resume: </strong>
                            {
                                " "
                            } {user?.profile?.resume?.url ? (
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
                </SectionCard>

                {/* Account Settings */}
                <SectionCard title="Account Settings">
                    <div className="space-y-6">
                        {
                            passwordMessage && (
                                <p className="mb-3 text-sm text-pink-700">{passwordMessage}</p>
                            )
                        }

                        <form action="" onSubmit={handleChangePassword} noValidate  >
                            <div>
                                <h3 className="font-semibold mb-2">Change Password</h3>
                                <input
                                    type="password"
                                    placeholder="Current Password"
                                    className="w-full border rounded-lg px-3 py-2 mb-2 text-white"
                                    id="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    className="w-full border rounded-lg px-3 py-2 mb-3 text-white"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    disabled={loadingPassword}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                                    {
                                        loadingPassword ? "updating..." : "change password"
                                    }
                                </button>
                            </div>
                        </form>
                        <div className="border-t pt-4">
                            <button className="text-red-600 font-semibold hover:underline" onClick={() => setShowModal(true)}>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </SectionCard>
            </div>
            <DeleteAccountModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDeleteAccount}
                loading={loading}
            />
        </div>
    );
}
