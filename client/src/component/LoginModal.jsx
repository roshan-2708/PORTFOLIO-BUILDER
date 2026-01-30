import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/operation/authAPI";
import { MdOutlineCancel, MdEmail, MdLock } from "react-icons/md";

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
                navigate("/dashboard");
            } else {
                setError(response?.message || "Invalid credentials");
            }
        } catch (err) {
            setError(
                err?.response?.data?.message || "Login failed. Try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Modal Card */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-[92%] max-w-md rounded-2xl p-7 shadow-2xl relative"
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
                >
                    <MdOutlineCancel size={22} />
                </button>

                {/* Brand */}
                <div className="text-xl font-bold text-yellow-500 mb-6">
                    Portfolio-Builder
                    <span className="text-blue-600 font-extrabold">.</span>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Welcome back 👋
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                    Sign in to continue to your dashboard
                </p>

                {/* Error */}
                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">

                    {/* Email */}
                    <div className="relative">
                        <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className=" text-white w-full border border-gray-300 pl-10 pr-4 py-2.5 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className=" text-white w-full border border-gray-300 pl-10 pr-4 py-2.5 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-600 text-white py-2.5 rounded-lg font-medium
                       hover:bg-yellow-700 transition disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-gray-500 text-center mt-6">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => {
                            onClose();
                            navigate("/signup");
                        }}
                        className="text-yellow-600 font-medium cursor-pointer hover:underline"
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;
