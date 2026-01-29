import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/operation/authAPI'

const LoginPage = () => {

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
            if (response.success) {
                localStorage.setItem("token", response.token);
                navigate("/dashboard");
            } else {
                setError(response.error);
            }
        } catch (err) {
            setError(err.message?.data?.message || "login failed")
        }
        setLoading(false);
    }

    return (
        <div className='text-white'>
            <form action="" onSubmit={handleLogin}>
                <h2>
                    Login
                </h2>

                {
                    error && <p>
                        {
                            error
                        }
                    </p>
                }

                <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required />

                <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button type='submit' disabled={loading} >
                    {
                        loading ? "logging in..." : "login"
                    }
                </button>
            </form>
        </div>
    );
}

export default LoginPage
