import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/operation/authAPI";
import { MdOutlineCancel, MdEmail, MdLock, MdRocketLaunch, MdCheckCircle } from "react-icons/md";

const LoginModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await login({ email, password });
            if (response?.success) {
                localStorage.setItem("token", response.token);
                onClose();
                navigate("/dashboard"); // Corrected: passing path string
            } else {
                setError(response?.message || "Invalid credentials");
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Login failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn">
            {/* Modal Card */}
            <div
                className="bg-[#0f172a] flex flex-col md:flex-row w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                >
                    <MdOutlineCancel size={26} />
                </button>

                {/* Left Side: Branding/Visual */}
                <div className="hidden md:flex flex-col justify-center items-center w-5/12 bg-gradient-to-tr from-yellow-600/20 to-orange-600/20 p-10 border-r border-white/5 relative">
                    {/* Animated Background Blobs */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-500/10 blur-3xl rounded-full"></div>

                    <div className="relative z-10 text-center">
                        <div className="w-20 h-20 bg-yellow-500 rounded-2xl rotate-12 flex items-center justify-center shadow-2xl mb-6 mx-auto">
                            <MdRocketLaunch size={40} className="text-[#0f172a] -rotate-12" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Welcome Back!</h2>
                        <p className="text-gray-400 text-sm mb-8">
                            Your professional portfolio is just a few clicks away.
                        </p>

                        {/* Status Checkmarks */}
                        <div className="space-y-3 text-left">
                            <div className="flex items-center gap-2 text-xs text-gray-300">
                                <MdCheckCircle className="text-yellow-500" /> Auto-save enabled
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-300">
                                <MdCheckCircle className="text-yellow-500" /> New templates available
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-7/12 p-8 md:p-12 text-white">
                    <div className="mb-8">
                        <div className="text-xl font-bold text-yellow-500 mb-2 flex items-center gap-2">
                            Portfolio-Builder<span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        </div>
                        <h3 className="text-2xl font-bold">Sign In</h3>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-6 text-center animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="relative">
                            <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-3.5 rounded-xl focus:border-yellow-500 outline-none transition-all placeholder:text-gray-600"
                            />
                        </div>

                        <div className="relative">
                            <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-3.5 rounded-xl focus:border-yellow-500 outline-none transition-all placeholder:text-gray-600"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button type="button" className="text-xs text-gray-400 hover:text-yellow-500 transition">
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3.5 rounded-xl shadow-lg shadow-yellow-500/10 transform active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                    <span>Verifying...</span>
                                </div>
                            ) : "Enter Dashboard"}
                        </button>
                    </form>

                    <p className="text-sm text-gray-400 text-center mt-8">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => {
                                onClose();
                                navigate("/signup");
                            }}
                            className="text-yellow-500 font-bold cursor-pointer hover:underline"
                        >
                            Get Started Free
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;