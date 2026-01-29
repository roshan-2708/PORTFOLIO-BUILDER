import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleRequest = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login"; // or navigate("/login")
    };


    return (
        <nav className='bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md'>
            {/* logo of portfolio-builder */}
            <div className='text-xl font-bold text-yellow-500'>
                <Link to='/'>
                    Portfolio-Builder<span className='text-blue-600 font-extrabold' onClick={() => navigate("/")} >.</span>
                </Link>
            </div>

            <div className='space-x-4'>
                {
                    !token ? (
                        <>
                            <Link to='/login' className='hover:text-gray-300'>
                                Login
                            </Link>
                            <Link to='/signup' className='hover:text-gray-300'>
                                signup
                            </Link>
                        </>
                    ) : (<div className="flex items-center space-x-4">
                        {/* <Link to="/dashboard" className="hover:text-gray-300">
                            Dashboard
                        </Link> */}
                        {/* <button
                            onClick={handleLogout}
                            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                        >
                            Logout
                        </button> */}
                        <button onClick={handleLogout} className="btn">
                            Logout
                        </button>

                        <h1>Dashboard</h1>
                    </div>)
                }
            </div>
        </nav>
    )
}

export default Navbar
