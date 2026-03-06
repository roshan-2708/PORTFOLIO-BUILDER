import React, { useState } from "react";
import { resetPasswordToken } from "../services/operation/authAPI";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await resetPasswordToken(email);
            alert("Reset link sent to your email");
        } catch (error) {
            alert("Failed to send reset link");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "100px auto" }}>
            <h2>Forgot Password</h2>

            <form onSubmit={submitHandler}>

                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>

            </form>
        </div>
    );
};

export default ForgotPassword;