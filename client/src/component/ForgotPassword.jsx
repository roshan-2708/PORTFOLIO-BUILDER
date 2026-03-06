import React, { useState } from "react";
import { Link } from "react-router-dom";
import { resetPasswordToken } from "../services/operation/authAPI";
import { BiArrowBack } from "react-icons/bi";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await resetPasswordToken(email);
            setEmailSent(true); // Confirmation state update
        } catch (error) {
            console.error("FORGOT_PASSWORD_ERROR", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-gray-900 px-4">
            <div className="max-w-[450px] w-full p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">

                {/* Dynamic Heading based on status */}
                <h2 className="text-3xl font-bold text-white mb-2">
                    {!emailSent ? "Reset your password" : "Check email"}
                </h2>

                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                    {!emailSent
                        ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
                        : `We have sent the reset link to ${email}`}
                </p>

                {!emailSent ? (
                    // Form for sending the link
                    <form onSubmit={submitHandler} className="flex flex-col gap-y-5">
                        <div className="flex flex-col gap-y-1">
                            <label className="text-sm text-gray-300">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all transform active:scale-95 shadow-lg shadow-blue-500/20"
                        >
                            {loading ? "Sending..." : "Reset Password"}
                        </button>
                    </form>
                ) : (
                    // If email is sent, show resend option
                    <button
                        onClick={submitHandler}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all transform active:scale-95"
                    >
                        Resend email
                    </button>
                )}

                {/* Navigation Links */}
                <div className="mt-6 flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-x-2 text-blue-400 hover:text-blue-300 transition-all text-sm"
                    >
                        <BiArrowBack size={18} /> Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;