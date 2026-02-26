import React, { useRef, useState } from "react";
import { sendOtp, verifyOtp } from "../services/operation/authAPI";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import { Mail, ShieldCheck, ArrowLeft, CheckCircle2, Rocket, Sparkles } from "lucide-react";

const VerifyEmail = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isOpenSignUp, setOpenSignUp] = useState(false);
    const [isOpenLogin, setOpenLogin] = useState(false);

    const inputsRef = useRef([]);

    // --- Logic functions same rahegi jo aapne pehle di thi ---
    const handleSendOtp = async () => {
        if (!email) return alert("Please enter email");
        try {
            setLoading(true);
            const res = await sendOtp(email);
            if (res?.success) setOtpSent(true);
        } catch (error) { alert("Error sending OTP"); }
        finally { setLoading(false); }
    };

    const handleVerifyOtp = async () => {
        const finalOtp = otp.join("");
        if (finalOtp.length !== 6) return;
        try {
            setLoading(true);
            const res = await verifyOtp(email, finalOtp);
            if (res?.success) {
                localStorage.setItem("verifiedEmail", email);
                setOpenSignUp(true);
            }
        } catch (error) { alert("Invalid OTP"); }
        finally { setLoading(false); }
    };

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) inputsRef.current[index + 1].focus();
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#0B0F1A] text-white">

            {/* --- LEFT SIDE: Content & Branding --- */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-900/40 to-gray-900 p-12 flex-col justify-center relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative z-10 max-w-lg">
                    <div className="flex items-center space-x-2 mb-8">
                        <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <Rocket className="text-black w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">PortfolioBuilder<span className="text-blue-500">.</span></span>
                    </div>

                    <h2 className="text-5xl font-extrabold leading-tight mb-6">
                        Build your professional <br />
                        <span className="text-yellow-500 italic font-serif">Identity</span> in minutes.
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <CheckCircle2 className="text-blue-400 mt-1" />
                            <p className="text-gray-300 text-lg">AI-Powered templates for developers & designers.</p>
                        </div>
                        <div className="flex items-start space-x-4">
                            <CheckCircle2 className="text-blue-400 mt-1" />
                            <p className="text-gray-300 text-lg">One-click deployment to custom domains.</p>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Sparkles className="text-blue-400 mt-1" />
                            <p className="text-gray-300 text-lg">Real-time analytics to track your visitors.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDE: Verify Logic --- */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-16">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <h3 className="text-3xl font-bold mb-2">
                            {otpSent ? "Verify Security Code" : "Create Account"}
                        </h3>
                        <p className="text-gray-400">
                            {otpSent ? `We sent a 6-digit code to ${email}` : "Join 10,000+ creators building their future today."}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {!otpSent ? (
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-400 ml-1">Work Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-gray-800/40 border border-gray-700 p-3.5 pl-12 rounded-xl focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                                    />
                                </div>
                                <button
                                    onClick={handleSendOtp}
                                    disabled={loading}
                                    className="w-full bg-yellow-600 hover:bg-yellow-500 py-4 rounded-xl font-bold transition-all shadow-lg shadow-yellow-600/10"
                                >
                                    {loading ? "Sending Code..." : "Continue with Email"}
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex justify-between gap-2">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputsRef.current[index] = el)}
                                            type="text"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(e, index)}
                                            onKeyDown={(e) => (e.key === "Backspace" && !otp[index] && index > 0) && inputsRef.current[index - 1].focus()}
                                            className="w-full aspect-square text-center text-2xl font-bold bg-gray-800 border border-gray-700 rounded-xl focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={loading}
                                    className="w-full bg-yellow-600 hover:bg-yellow-500 py-4 rounded-xl font-bold transition-all"
                                >
                                    {loading ? "Verifying..." : "Confirm & Sign Up"}
                                </button>
                                <button
                                    onClick={() => setOtpSent(false)}
                                    className="w-full text-center text-gray-500 hover:text-white text-sm flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft size={16} /> Edit Email Address
                                </button>
                            </div>
                        )}
                    </div>

                    <p className="mt-8 text-center text-gray-500 text-sm">
                        Already have an account? <button onClick={() => setOpenLogin(true)} className="text-yellow-500 font-semibold hover:underline">Log in</button>
                    </p>
                </div>
            </div>

            {/* Modals */}
            <SignUpModal isOpen={isOpenSignUp} onClose={() => setOpenSignUp(false)} onSignupSuccess={() => { setOpenSignUp(false); setOpenLogin(true); }} />
            <LoginModal isOpen={isOpenLogin} onClose={() => setOpenLogin(false)} />
        </div>
    );
};

export default VerifyEmail;