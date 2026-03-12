import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpenLogin, setOpenLogin] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isOpenSignUp, setOpenSignUp] = useState(false);

    const token = localStorage.getItem("token");

    // Page checks
    const isDashboardPage = location.pathname.startsWith('/dashboard');
    const isVerifyPage = location.pathname === '/verify-email';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-8 py-4 flex justify-between items-center ${scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-gray-900'
                }`}>

                {/* Logo */}
                <Link to='/' className='group text-2xl font-extrabold tracking-tight'>
                    <span className='text-white'>Portfolio</span>
                    <span className='text-yellow-500'>Builder</span>
                    <span className='text-blue-500'>.</span>
                </Link>

                <div className='flex items-center space-x-6'>
                    {!token ? (
                        <>
                            {/* Agar Verify Page par hai to Login Button ko Highlight karo, 
                                warna normal Login link dikhao */}
                            {isVerifyPage ? (
                                <button
                                    onClick={() => setOpenLogin(true)}
                                    className='bg-yellow-600 hover:bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md'
                                >
                                    Login
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setOpenLogin(true)}
                                        className='text-gray-300 hover:text-white font-medium transition-all'
                                    >
                                        Login
                                    </button>
                                    {/* <Link
                                        to='/verify-email'
                                        className='bg-yellow-600 hover:bg-yellow-500 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-md'
                                    >
                                        Get Started
                                    </Link> */}
                                    <button
                                        onClick={() => setOpenSignUp(true)}
                                        className='text-gray-300 hover:text-white font-medium transition-all'
                                    >
                                        SignUp
                                    </button>
                                </>
                            )}
                        </>
                    ) : (
                        /* Logged In State */
                        <div className="flex items-center space-x-4">
                            {!isDashboardPage && (
                                <Link to='/dashboard' className='text-gray-300 hover:text-yellow-500 font-medium'>
                                    Dashboard
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white px-4 py-1.5 rounded-lg transition-all text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            <div className="h-20"></div>

            <LoginModal
                isOpen={isOpenLogin}
                onClose={() => setOpenLogin(false)}
            />
            <SignUpModal
                isOpen={isOpenSignUp}
                onClose={() => setOpenSignUp(false)}
                onSignupSuccess={() => {
                    setOpenSignUp(false);
                    setOpenLogin(true);
                }}
            />
        </>
    );
};

export default Navbar;