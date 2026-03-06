import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/operation/authAPI";

const ResetPassword = () => {

    const { token } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await resetPassword(
                formData.password,
                formData.confirmPassword,
                token,
                navigate
            );

        } catch (error) {
            alert("Reset password failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "100px auto" }}>

            <h2>Reset Password</h2>

            <form onSubmit={submitHandler}>

                <label>New Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    required
                />

                <label>Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={changeHandler}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                </button>

            </form>

        </div>
    );
};

export default ResetPassword;