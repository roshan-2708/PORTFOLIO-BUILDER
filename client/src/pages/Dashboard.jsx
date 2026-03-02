import React, { useEffect, useState } from "react";
import { changePassword, userProfile } from "../services/operation/authAPI";
import DeleteAccountModal from "../component/DeleteAccountModal";
import EditProfile from "../component/EditProfileModal";
import CreateProfileModal from "../component/CreateProfileModal";
import { deleteAccount } from "../services/operation/profileAPI";
import { useNavigate } from "react-router-dom";
import { getPortfolioCount, viewsCount } from "../services/operation/portfolioAPI";
import {
    LayoutDashboard, User, Settings, Trash2,
    PlusCircle, Eye, FileText, CheckCircle,
    ChevronRight, Key
} from "lucide-react";

/* ------------------ Small UI Components ------------------ */

const StatCard = ({ title, value, icon: Icon, color, onClick }) => (
    <div
        onClick={onClick}
        className={`group bg-gray-900/40 backdrop-blur-md border border-gray-800 p-6 rounded-2xl cursor-pointer hover:border-indigo-500/50 transition-all duration-300 shadow-xl`}
    >
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{title}</p>
                <h2 className="text-3xl font-extrabold mt-2 text-white">{value}</h2>
            </div>
            <div className={`p-3 rounded-xl bg-gray-800 group-hover:bg-indigo-600/20 transition-colors`}>
                <Icon size={24} className={color || "text-indigo-500"} />
            </div>
        </div>
        <div className="mt-4 flex items-center text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View Details <ChevronRight size={16} className="ml-1" />
        </div>
    </div>
);

const SectionCard = ({ title, children, icon: Icon, action }) => (
    <div className="bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center bg-gray-800/30">
            <div className="flex items-center gap-3">
                {Icon && <Icon className="text-indigo-500" size={20} />}
                <h2 className="text-lg font-bold text-white">{title}</h2>
            </div>
            {action}
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

/* ------------------ Dashboard ------------------ */

export default function Dashboard() {
    const [user, setUser] = useState(0);
    const [totalViews, setTotalViews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loadingPassword, setLoadingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState({ text: "", type: "" });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openCreateProfile, setOpenCreateProfile] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [profileRes, statsRes] = await Promise.all([
                    userProfile(),
                    getPortfolioCount(localStorage.getItem('token'))
                ]);
                setUser(profileRes.user);
                if (statsRes?.success) setStats(statsRes);
            } catch (error) {
                console.error("Data fetch error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    useEffect(() => {
        if (user && !user.profile) setOpenCreateProfile(true);
    }, [user]);
    const fetchViews = async () => {
        try {
            const res = await viewsCount();
            setTotalViews(res.data.totalViews)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchViews();
    }, []);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            setLoadingPassword(true);
            const res = await changePassword(oldPassword, newPassword);
            if (res.success) {
                setPasswordMessage({ text: "Password updated successfully!", type: "success" });
                setOldPassword(""); setNewPassword("");
            }
        } catch (error) {
            setPasswordMessage({ text: error.response?.data?.message || "Failed to update", type: "error" });
        } finally {
            setLoadingPassword(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0B0F1A] text-gray-200 p-4 md:p-8 font-sans">
            {/* Header */}
            <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                        Hi, <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                            {user?.firstName || "Creator"}!
                        </span>
                    </h1>
                    <p className="text-gray-400 mt-1">Here's what's happening with your portfolios.</p>
                </div>
                <button
                    onClick={() => navigate('/create-portfolio')}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                >
                    <PlusCircle size={20} /> Create New Portfolio
                </button>
            </header>

            <div className="max-w-7xl mx-auto">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard title="Total Portfolios" value={stats?.totalPortfolios || 0} icon={LayoutDashboard} color="text-blue-400" onClick={() => navigate('/my-portfolios')} />
                    <StatCard title="Drafts" value={stats?.draftPortfolios || 0} icon={FileText} color="text-yellow-400" onClick={() => navigate('/my-portfolios')} />
                    <StatCard title="Published" value={stats?.publishedPortfolios || 0} icon={CheckCircle} color="text-emerald-400 onClick={() => navigate('/my-portfolios')}" />
                    <StatCard title="Total Views" value={totalViews} icon={Eye} color="text-purple-400" />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Profile Section (Span 2) */}
                    <div className="lg:col-span-2 space-y-8">
                        <SectionCard
                            title="Personal Information"
                            icon={User}
                            action={user?.profile && (
                                <button onClick={() => setOpenEdit(true)} className="text-sm font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                                    Edit Details
                                </button>
                            )}
                        >
                            {user?.profile ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                                        <p className="text-white font-medium">{user.firstName} {user.lastName}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                                        <p className="text-white font-medium">{user.email}</p>
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">About</label>
                                        <p className="text-gray-300 leading-relaxed">{user.profile.about || "Describe yourself to the world..."}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Contact</label>
                                        <p className="text-white font-medium">{user.profile.phone || "Not provided"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Contact</label>
                                        <p className="text-white font-medium">{user.profile.address || "Not provided"}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Resume</label>
                                        <div>
                                            {user.profile.resume?.url ? (
                                                <a
                                                    href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                                                        user.profile.resume.url
                                                    )}&embedded=true`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-indigo-400"
                                                >
                                                    View Document
                                                </a>
                                            ) : (
                                                <span className="text-gray-600 italic">Not uploaded</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-6 bg-indigo-500/5 rounded-2xl border border-dashed border-indigo-500/30">
                                    <p className="text-indigo-300 mb-4">Your profile is incomplete</p>
                                    <button onClick={() => setOpenCreateProfile(true)} className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-bold">Complete Now</button>
                                </div>
                            )}
                        </SectionCard>
                    </div>

                    {/* Sidebar: Settings */}
                    <div className="space-y-8">
                        <SectionCard title="Security" icon={Settings}>
                            <form onSubmit={handleChangePassword} className="space-y-4">
                                <div>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-3 text-gray-500" size={16} />
                                        <input
                                            type="password"
                                            placeholder="Current Password"
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-10 py-2.5 focus:border-indigo-500 outline-none transition-all text-sm"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-3 text-gray-500" size={16} />
                                        <input
                                            type="password"
                                            placeholder="New Password"
                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-10 py-2.5 focus:border-indigo-500 outline-none transition-all text-sm"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {passwordMessage.text && (
                                    <p className={`text-xs font-bold ${passwordMessage.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                                        {passwordMessage.text}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    disabled={loadingPassword}
                                    className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl text-sm font-bold transition-all"
                                >
                                    {loadingPassword ? "Updating..." : "Update Password"}
                                </button>
                            </form>

                            <div className="mt-8 pt-6 border-t border-gray-800">
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="flex items-center gap-2 text-red-500/70 hover:text-red-500 transition-colors text-sm font-bold"
                                >
                                    <Trash2 size={16} /> Deactivate Account
                                </button>
                            </div>
                        </SectionCard>
                    </div>
                </div>
            </div>

            {/* Modals - Same logic kept */}
            {openEdit && <EditProfile user={user} onClose={() => setOpenEdit(false)} />}
            {openCreateProfile && <CreateProfileModal onClose={() => setOpenCreateProfile(false)} />}
            <DeleteAccountModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={deleteAccount} loading={loading} />
        </div>
    );
}