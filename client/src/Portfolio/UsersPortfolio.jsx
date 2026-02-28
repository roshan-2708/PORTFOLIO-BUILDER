import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyPortfolio } from '../services/operation/portfolioAPI';
import { updatePortfolio, deletePortfolio } from '../services/operation/portfolioAPI';
import DeleteModal from './DeleteModal';
import {
    Plus,
    Layout,
    Calendar,
    ArrowRight,
    Briefcase,
    ExternalLink,
    Loader2
} from 'lucide-react'; // Icons के लिए

const UsersPortfolio = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [portfolio, setPortfolio] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPortfolioId, setSelectedPortfolioId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setDeleting(true);
            await deletePortfolio(selectedPortfolioId);
            setPortfolio((prev) =>
                prev.filter((item) => item._id !== selectedPortfolioId)
            );
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setDeleting(false);
        }
    };

    useEffect(() => {
        const loadPortfolio = async () => {
            try {
                const data = await fetchMyPortfolio();
                setPortfolio(data || []);
            } catch (err) {
                setError("Failed to load portfolio");
            } finally {
                setLoading(false);
            }
        };
        loadPortfolio();
    }, []);

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B0F1A] flex flex-col items-center justify-center text-white">
                <Loader2 className="w-10 h-10 text-yellow-500 animate-spin mb-4" />
                <p className="text-gray-400 animate-pulse font-medium">Fetching your masterpieces...</p>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-center">
                    <p className="text-red-500 font-semibold">{error}</p>
                    <button onClick={() => window.location.reload()} className="mt-4 text-white underline text-sm">Try Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0F1A] text-white px-6 py-10">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-yellow-500">
                            <Briefcase size={18} />
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">Dashboard</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-white">
                            Your <span className="text-yellow-500">Portfolios</span>
                        </h1>
                        <p className="text-gray-400 mt-2 max-w-md">
                            Manage, edit and showcase your professional journey to the world.
                        </p>
                    </div>

                    {portfolio.length > 0 && (
                        <button
                            onClick={() => navigate('/create-portfolio')}
                            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-yellow-500/10 active:scale-95"
                        >
                            <Plus size={20} /> Create New
                        </button>
                    )}
                </div>

                {/* Empty State */}
                {portfolio.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-20 p-16 border-2 border-dashed border-gray-800 rounded-[2rem] bg-gray-900/20">
                        <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
                            <Layout className="text-gray-600" size={36} />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No portfolios yet</h2>
                        <p className="text-gray-500 text-center max-w-xs mb-8">
                            Start building your first professional portfolio in just a few minutes.
                        </p>
                        <button
                            onClick={() => navigate('/create-portfolio')}
                            className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-4 rounded-2xl font-extrabold transition-all shadow-xl shadow-yellow-500/20 flex items-center gap-2"
                        >
                            <Plus size={22} /> Build Now
                        </button>
                    </div>
                ) : (
                    /* Portfolio Grid */
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {portfolio.map((item) => (
                            <div
                                key={item._id}
                                onClick={() => navigate(`/portfolio/${item._id}`)}
                                className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-3xl p-7 cursor-pointer hover:border-yellow-500/50 transition-all duration-500 overflow-hidden shadow-2xl"
                            >
                                {/* Hover Glow Effect */}
                                <div className="absolute -right-16 -top-16 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl group-hover:bg-yellow-500/10 transition-all duration-500"></div>

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="p-3.5 bg-gray-800 rounded-2xl group-hover:bg-yellow-500/10 group-hover:text-yellow-500 transition-colors duration-500">
                                            <Layout size={26} />
                                        </div>
                                        <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-500/20">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                            Active
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-500 transition-colors mb-3">
                                        {item.title || "Untitled Showcase"}
                                    </h3>

                                    <p className="text-gray-400 text-sm flex items-center gap-2 mb-8">
                                        <span className="text-gray-600">Template:</span>
                                        <span className="font-medium text-gray-300 capitalize">{item.template || "Standard"}</span>
                                    </p>

                                    <div className="pt-6 border-t border-gray-800 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                                            <Calendar size={14} className="text-gray-600" />
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>

                                        <div className="flex items-center gap-1.5 text-yellow-500 font-bold text-sm transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                            Manage <ArrowRight size={16} />

                                            {/* delete modal */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedPortfolioId(item._id);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="px-3 py-1.5 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                deleting={deleting}
            />
        </div>

    );
};

export default UsersPortfolio;