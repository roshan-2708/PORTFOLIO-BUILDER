import React, { useEffect, useState } from "react";
import { signup } from "../services/operation/authAPI";
import { MdOutlineCancel, MdEmail, MdLock } from "react-icons/md";

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
            onClose();              // close signup modal
            onSignupSuccess();      // open login modal
        } catch (error) {
            alert(error?.message || "Signup failed");
        } finally {
            setLoading(false);

        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md text-white relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-xl"
                >
                    <MdOutlineCancel size={22} />
                </button>

                <h2 className="text-2xl font-bold mb-4">Create Account</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-700"
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-700"
                    />

                    <input
                        type="email"
                        value={email}
                        readOnly
                        className="w-full p-2 rounded bg-gray-600 cursor-not-allowed"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-700"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-700"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpModal;
