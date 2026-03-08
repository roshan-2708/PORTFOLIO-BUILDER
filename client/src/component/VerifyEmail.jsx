
import React, { useState, useEffect } from "react";
import { sendVerificationEmail } from "../services/operation/authAPI";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import { Mail, ArrowLeft, CheckCircle2, Rocket, Sparkles, ShieldCheck } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const VerifyEmail = () => {

    const [searchParams] = useSearchParams();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [linkSent, setLinkSent] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [isOpenSignUp, setOpenSignUp] = useState(false);
    const [isOpenLogin, setOpenLogin] = useState(false);

    // Detect verification redirect
    useEffect(() => {
        const token = searchParams.get("token");
        const verifiedEmail = searchParams.get("email");

        if (verifiedEmail) {
            setEmail(verifiedEmail);
        }

        if (token) {
            setOpenSignUp(true);
        }
    }, [searchParams]);

    // countdown timer for resend
    useEffect(() => {
        if (!linkSent) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [linkSent]);

    // send verification email
    const handleSendLink = async () => {

        if (!email) {
            alert("Please enter email");
            return;
        }

        try {

            setLoading(true);

            const res = await sendVerificationEmail(email);

            if (res?.success) {
                setLinkSent(true);
                setCountdown(60);
            } else {
                alert(res?.message || "Failed to send verification email");
            }

        } catch (error) {

            console.error(error);
            alert("Something went wrong");

        } finally {
            setLoading(false);
        }
    };

    // resend email
    const handleResend = async () => {
        if (countdown !== 0 || loading) return;
        await handleSendLink();
    };

    return (

        <div className="min-h-screen flex flex-col md:flex-row bg-[#0B0F1A] text-white">

            {/* LEFT SIDE */}

            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-900/40 to-gray-900 p-12 flex-col justify-center relative overflow-hidden">

                <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>

                <div className="relative z-10 max-w-lg">

                    <div className="flex items-center space-x-2 mb-10">

                        <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <Rocket className="text-black w-6 h-6" />
                        </div>

                        <span className="text-2xl font-bold">
                            PortfolioBuilder<span className="text-blue-500">.</span>
                        </span>

                    </div>

                    <h2 className="text-5xl font-extrabold leading-tight mb-8">
                        Build your professional <br />
                        <span className="text-yellow-500 italic font-serif">
                            Identity
                        </span>{" "}
                        in minutes.
                    </h2>

                    <div className="space-y-6">

                        <div className="flex items-start space-x-4">
                            <CheckCircle2 className="text-blue-400 mt-1" />
                            <p className="text-gray-300 text-lg">
                                AI-powered portfolio templates.
                            </p>
                        </div>

                        <div className="flex items-start space-x-4">
                            <CheckCircle2 className="text-blue-400 mt-1" />
                            <p className="text-gray-300 text-lg">
                                Deploy instantly with custom domains.
                            </p>
                        </div>

                        <div className="flex items-start space-x-4">
                            <Sparkles className="text-blue-400 mt-1" />
                            <p className="text-gray-300 text-lg">
                                Track visitors with built-in analytics.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="flex-1 flex items-center justify-center p-8 md:p-16">

                <div className="w-full max-w-md">

                    <div className="mb-10">

                        <h3 className="text-3xl font-bold mb-2">
                            {linkSent ? "Verify Your Email" : "Create Account"}
                        </h3>

                        <p className="text-gray-400">
                            {linkSent
                                ? `Verification link sent to ${email} `
                                : "Join thousands of creators building their future."}
                        </p>

                    </div>

                    {!linkSent ? (

                        <div className="space-y-4">

                            <label className="text-sm text-gray-400 ml-1">
                                Work Email
                            </label>

                            <div className="relative">

                                <Mail className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-800/40 border border-gray-700 p-3.5 pl-12 rounded-xl focus:border-yellow-500 outline-none"
                                />

                            </div>

                            <button
                                onClick={handleSendLink}
                                disabled={loading || !email}
                                className="w-full bg-yellow-600 hover:bg-yellow-500 py-4 rounded-xl font-bold transition-all"
                            >
                                {loading ? "Sending link..." : "Continue with Email"}
                            </button>

                        </div>

                    ) : (

                        <div className="text-center space-y-6">

                            <ShieldCheck className="mx-auto text-green-400 w-16 h-16" />

                            <h4 className="text-xl font-semibold">
                                Check your inbox
                            </h4>

                            <p className="text-gray-400">
                                Click the verification link we sent to
                                <br />
                                <span className="text-white font-medium">
                                    {email}
                                </span>
                            </p>

                            <button
                                onClick={handleResend}
                                disabled={countdown !== 0 || loading}
                                className="text-yellow-500 font-medium"
                            >
                                {countdown === 0
                                    ? "Resend verification email"
                                    : `Resend in ${countdown} s`}
                            </button>

                            <button
                                onClick={() => setLinkSent(false)}
                                className="flex items-center justify-center gap-2 text-gray-500 hover:text-white text-sm w-full"
                            >
                                <ArrowLeft size={16} /> Change Email
                            </button>

                        </div>

                    )}

                    <p className="mt-10 text-center text-gray-500 text-sm">
                        Already have an account?{" "}
                        <button
                            onClick={() => setOpenLogin(true)}
                            className="text-yellow-500 font-semibold hover:underline"
                        >
                            Log in
                        </button>
                    </p>

                </div>

            </div>

            <SignUpModal
                isOpen={isOpenSignUp}
                onClose={() => setOpenSignUp(false)}
                onSignupSuccess={() => {
                    setOpenSignUp(false);
                    setOpenLogin(true);
                }}
            />

            <LoginModal
                isOpen={isOpenLogin}
                onClose={() => setOpenLogin(false)}
            />

        </div>

    );
};

export default VerifyEmail;
