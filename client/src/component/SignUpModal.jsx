import React, { useEffect, useState } from "react";
import { signup } from "../services/operation/authAPI";
import { MdOutlineCancel, MdEmail, MdPassword } from "react-icons/md";

const SignUpModal = ({ isOpen, onClose, onSignupSuccess }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (isOpen) {
            const savedEmail = localStorage.getItem("verifiedEmail");
            setEmail(savedEmail || "");
        }
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return alert("Passwords do not match");
        }

        try {
            setLoading(true);
            await signup({ ...formData, email });
            alert("Account created successfully");

            localStorage.removeItem("verifiedEmail");
            onClose();
            onSignupSuccess();
        } catch (error) {
            alert(error?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#0f172a] p-6 rounded-2xl w-full max-w-md text-black relative shadow-2xl border border-white/10 animate-scaleIn">

                <button onClick={onClose} className="absolute top-3 right-3">
                    <MdOutlineCancel size={22} />
                </button>

                <h2 className="text-2xl font-bold mb-1">Create your account 🚀</h2>
                <p className="text-sm text-gray-700 mb-5">
                    Start building your professional portfolio
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-300"
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-300"
                    />

                    <div className="relative">
                        <MdEmail className="absolute top-3 left-3 text-gray-700" />
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className="w-full pl-10 p-2 rounded-lg bg-gray-200 text-gray-300 cursor-not-allowed"
                        />
                    </div>

                    <div className="relative">
                        <MdPassword className="absolute top-3 left-3 text-gray-700" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 p-2 rounded-lg bg-gray-300"
                        />
                    </div>

                    <div className="relative">
                        <MdPassword className="absolute top-3 left-3 text-gray-700" />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 p-2 rounded-lg bg-gray-300"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 py-2.5 rounded-lg font-semibold hover:opacity-90 transition"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpModal;
