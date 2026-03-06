import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { resetPassword } from "../services/operation/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { password, confirmPassword } = formData;

    const changeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            await resetPassword(password, confirmPassword, token, navigate);
        } catch (error) {
            console.error("RESET_PASSWORD_ERROR", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-gray-900 px-4">
            {loading ? (
                <div className="spinner"></div> // Apna loading spinner yahan daal sakte ho
            ) : (
                <div className="max-w-[450px] w-full p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Choose New Password
                    </h2>
                    <p className="text-gray-400 mb-6 text-sm">
                        Almost done. Enter your new password and you're all set.
                    </p>

                    <form onSubmit={submitHandler} className="flex flex-col gap-y-5">
                        {/* New Password Field */}
                        <div className="relative">
                            <label className="text-sm text-gray-300 mb-1 block">
                                New Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={changeHandler}
                                placeholder="Enter Password"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] cursor-pointer text-gray-400 hover:text-white"
                            >
                                {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                            </span>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="relative">
                            <label className="text-sm text-gray-300 mb-1 block">
                                Confirm New Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={changeHandler}
                                placeholder="Confirm Password"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            <span
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] cursor-pointer text-gray-400 hover:text-white"
                            >
                                {showConfirmPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                            </span>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all transform active:scale-95 shadow-lg shadow-blue-500/20"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login" className="flex items-center gap-x-2 text-blue-400 hover:text-blue-300 transition-all text-sm">
                            <BiArrowBack /> Back to Login
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;