import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LoginModal from './LoginModal';

const Navbar = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    // login modal
    const [isOpenLogin, setOpenLogin] = useState(false);
    const location = useLocation();
    const isDashboardPage = location.pathname.startsWith('/dashboard');

    const handleRequest = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };


    return (

        <>
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

                                <button
                                    onClick={() => setOpenLogin(true)}
                                    className='bg-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-700 transition'
                                >
                                    Login
                                </button>

                                <Link to='/verify-email' className='hover:text-gray-300 transition border-2 px-4 py-2 rounded-lg border-yellow-600'>
                                    signup
                                </Link>
                            </>
                        ) : !isDashboardPage ? (<div className="flex items-center space-x-4">

                            <button onClick={handleLogout} className="btn">
                                Logout
                            </button>

                            <Link to='/dashboard' className='bg-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-700 transition'>
                                Dashboard</Link>
                        </div>) : (
                            <div className="flex items-center space-x-4">
                                <button onClick={handleLogout} className="btn">
                                    Logout
                                </button>
                            </div>
                        )
                    }
                </div >
            </nav >
            {/* call login modal */}
            < LoginModal
                isOpen={isOpenLogin}
                onClose={() => setOpenLogin(false)}
            />
        </>
    )
}

export default Navbar
{/* <Link to="/dashboard" className="hover:text-gray-300">
                            Dashboard
                        </Link> */}
{/* <button
                            onClick={handleLogout}
                            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                        >
                            Logout
                        </button> */}