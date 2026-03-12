import React, { useEffect, useState } from "react";
import { registerUser } from "../services/operation/authAPI";
import { MdOutlineCancel, MdEmail, MdPassword, MdPerson, MdWork, MdAutoAwesome } from "react-icons/md";

const SignUpModal = ({ isOpen, onClose, onSignupSuccess }) => {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = async (e) => {

    //     e.preventDefault();
    //     try {
    //         setLoading(true);
    //         await registerUser({ ...formData });
    //         alert("Account created successfully");
    //         onClose();
    //         onSignupSuccess();
    //     } catch (error) {
    //         alert(error?.message || "Signup failed");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Destructure karke alag alag bhejo ya authAPI ko ek object lene wala banao
            const { email, password, fullName } = formData;
            await registerUser(email, password, fullName);

            alert("Account created successfully! Bhai email check karo verification ke liye.");
            onClose();
            onSignupSuccess();
        } catch (error) {
            // Backend se aaya exact error dikhao
            alert(error.response?.data?.error || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 bg-black/60 p-4">
            {/* Main Container */}
            <div className="bg-[#0f172a] flex flex-col md:flex-row w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] border border-white/10 animate-scaleIn relative">

                {/* Close Button - Mobile friendly position */}
                <button onClick={onClose} className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white transition-colors">
                    <MdOutlineCancel size={28} />
                </button>

                {/* Left Side: Visual / Branding (Hidden on mobile) */}
                <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-10 border-r border-white/5 relative overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center">
                        <div className="bg-yellow-500/20 p-4 rounded-2xl inline-block mb-4 shadow-inner">
                            <MdWork size={48} className="text-yellow-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">Build Your Legacy</h1>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Join 5,000+ developers creating stunning portfolios with our AI-powered builder.
                        </p>

                        <div className="mt-8 space-y-4 text-left">
                            <div className="flex items-center gap-3 text-gray-300 text-sm bg-white/5 p-3 rounded-xl border border-white/5">
                                <MdAutoAwesome className="text-yellow-500" />
                                <span>1-Click Portfolio Generation</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300 text-sm bg-white/5 p-3 rounded-xl border border-white/5">
                                <MdPerson className="text-blue-400" />
                                <span>Custom Domains & SEO</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 bg-[#0f172a] text-white">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold">Sign Up 🚀</h2>
                        <p className="text-gray-400 text-sm mt-1">Complete your profile to get started.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter Your Full Name"
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-yellow-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <MdEmail className="absolute top-4 left-4 text-gray-500" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 p-3 rounded-xl bg-white/5 border border-white/10 focus:border-yellow-500 outline-none transition-all"
                            />
                        </div>

                        <div className="relative">
                            <MdPassword className="absolute top-4 left-4 text-gray-500" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 p-3 rounded-xl bg-white/5 border border-white/10 focus:border-yellow-500 outline-none transition-all"
                            />
                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold py-3.5 rounded-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-yellow-500/20 mt-4"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                    <span>Creating...</span>
                                </div>
                            ) : "Launch My Portfolio"}
                        </button>
                    </form>

                    <p className="text-center text-[10px] text-gray-500 mt-6 uppercase tracking-widest">
                        Secure 256-bit SSL Encryption
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpModal;