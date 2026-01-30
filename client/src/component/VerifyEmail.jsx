import React, { useRef, useState } from "react";
import { sendOtp, verifyOtp } from "../services/operation/authAPI";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";

const VerifyEmail = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isOpenSignUp, setOpenSignUp] = useState(false);
    const [isOpenLogin, setOpenLogin] = useState(false);

    const inputsRef = useRef([]);

    // Send OTP
    const handleSendOtp = async () => {
        if (!email) return alert("Please enter email");

        try {
            setLoading(true);
            const res = await sendOtp(email);
            console.log("OTP response:", res);

            if (res?.success) {
                setOtpSent(true);
                alert(res.message || "OTP sent successfully");
            } else {
                alert(res?.message || "Failed to send OTP");
            }
        } catch (error) {
            alert(error?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    // Verify OTP
    const handleVerifyOtp = async () => {
        const finalOtp = otp.join("");

        if (finalOtp.length !== 6) {
            alert("Please enter a valid 6 digit OTP");
            return;
        }

        try {
            setLoading(true);
            const res = await verifyOtp(email, finalOtp);

            if (res?.success) {
                localStorage.setItem("verifiedEmail", email);
                setOpenSignUp(true); // open signup modal
            } else {
                alert(res?.message || "Invalid OTP");
            }
        } catch (error) {
            alert(error?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    // OTP input change
    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen text-white">
            <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
                <h1 className="text-2xl font-bold mb-2">Verify Email</h1>
                <p className="text-gray-400 mb-4">
                    Enter your email to receive a verification code.
                </p>

                {/* Email */}
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={otpSent}
                    className="w-full p-2 rounded-lg mb-4 bg-gray-700 outline-none"
                />

                {/* Send OTP */}
                {!otpSent && (
                    <button
                        onClick={handleSendOtp}
                        disabled={loading}
                        className="w-full bg-yellow-600 py-2 rounded-lg hover:bg-yellow-700"
                    >
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                )}

                {/* OTP Inputs */}
                {otpSent && (
                    <>
                        <p className="mt-4 mb-2">Enter the 6-digit OTP</p>
                        <div className="flex justify-between gap-2 mb-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-10 h-10 text-center text-white rounded-lg outline-none"
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleVerifyOtp}
                            disabled={loading}
                            className="w-full bg-yellow-600 py-2 rounded-lg hover:bg-yellow-700"
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </>
                )}
            </div>

            {/* Signup Modal */}
            <SignUpModal
                isOpen={isOpenSignUp}
                onClose={() => setOpenSignUp(false)}
                onSignupSuccess={() => {
                    setOpenSignUp(false);
                    setOpenLogin(true); // ✅ open login modal after signup
                }}
            />

            {/* Login Modal */}
            <LoginModal
                isOpen={isOpenLogin}
                onClose={() => setOpenLogin(false)}
            />
        </div>
    );
};

export default VerifyEmail;
