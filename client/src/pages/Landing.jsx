import React, { useState } from 'react'
import LoginModal from '../component/LoginModal';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { features } from '../Data/features';
import FeatureCard from '../component/FeatureCard';

const Landing = ({ onLoginClick, onSignupClick, }) => {

    const token = localStorage.getItem('token');
    const [isOpenLogin, setOpenLogin] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white items-center">
            {/* hero section */}
            <section>
                <div className="max-w-6xl mx-auto py-20 grid md:grid-cols-2 gap-12 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <span className="inline-block mb-3 px-3 py-1 text-sm rounded-full bg-indigo-600/20 text-indigo-400">
                            Portfolio Builder Platform
                        </span>

                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            Build a stunning <span className="text-indigo-400">developer portfolio</span>
                            <br /> in minutes
                        </h1>

                        <p className="mt-5 text-gray-400 text-lg">
                            Create, customize, and publish your portfolio without writing a single line of code.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            {
                                !token ? (<>
                                    <Link to='/verify-email'>
                                        <button
                                            onClick={onSignupClick}
                                            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition"
                                        >
                                            Get Started Free
                                        </button>
                                    </Link>
                                </>) : (<>
                                    <button
                                        onClick={() => navigate('/dashboard')}
                                        className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition"
                                    >
                                        Get Started Free
                                    </button>
                                </>)
                            }

                            {
                                !token ? (<button
                                    onClick={() => setOpenLogin(true)}
                                    className='bg-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-700 transition'
                                >
                                    Login
                                </button>) : (<></>)
                            }
                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                            No credit card required 🚀
                        </p>
                    </div>

                    {/* RIGHT PREVIEW */}
                    <div className="hidden md:block">
                        <div className="relative bg-slate-800 rounded-2xl p-4 shadow-xl border border-white/10">
                            <div className="h-64 rounded-lg bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-gray-400">
                                Portfolio Preview
                            </div>

                            {/* fake browser dots */}
                            <div className="absolute top-3 left-4 flex gap-2">
                                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            </div>
                        </div>
                    </div>

                </div>

            </section>


            {/* How it works section */}
            <section>
                <div className="max-w-6xl mx-auto px-6">

                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-indigo-400">
                            Build your portfolio in 3 simple steps
                        </h2>
                        <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
                            From signup to deployment — everything is designed to be fast,
                            simple, and professional.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Step 1 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                            <span className="inline-flex items-center justify-center w-10 h-10 mb-6 rounded-full bg-indigo-600 text-white font-semibold">
                                1
                            </span>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Create your account
                            </h3>

                            <p className="text-gray-700">
                                Sign up using your email, verify it with OTP, and create your
                                basic profile to get started.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                            <span className="inline-flex items-center justify-center w-10 h-10 mb-6 rounded-full bg-indigo-600 text-white font-semibold">
                                2
                            </span>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Build your portfolio
                            </h3>

                            <p className="text-gray-700 mb-4">
                                Customize everything that represents you professionally.
                            </p>

                            <ul className="text-sm text-gray-600 space-y-2">
                                <li>• Personal details & bio</li>
                                <li>• Skills & technologies</li>
                                <li>• Projects with live links</li>
                                <li>• Resume & social profiles</li>
                            </ul>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
                            <span className="inline-flex items-center justify-center w-10 h-10 mb-6 rounded-full bg-indigo-600 text-white font-semibold">
                                3
                            </span>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                Deploy & share
                            </h3>

                            <p className="text-gray-700">
                                Publish your portfolio instantly and share your unique link with
                                recruiters, clients, or on social media.
                            </p>
                        </div>

                    </div>

                    {/* CTA */}
                    <div className="mt-20 text-center">
                        <button className="px-10 py-4 rounded-xl bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition">
                            Start building your portfolio
                        </button>

                        <p className="mt-3 text-sm text-gray-500">
                            Free to start · No credit card required
                        </p>
                    </div>

                </div>
            </section>

            {/* features */}
            <section>
                <div className="max-w-6xl mx-auto px-6 mt-6">
                    <div className='text-center mb-16'>
                        <h1 className='text-4xl font-bold text-indigo-400 '>
                            Everything you need to build a professional portfolio
                        </h1>
                        <p className='mt-4 text-gray-300 max-w-2xl mx-auto'>
                            From secure authentication to instant deployment, our platform provides all the tools you need to create, manage, and share your portfolio effortlessly.
                        </p>
                    </div>

                    {/* feature card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <FeatureCard
                                key={feature.id}
                                title={feature.title}
                                description={feature.description}
                                whyItMatters={feature.whyItMatters}
                            />
                        ))}
                    </div>

                </div>
            </section>

            <LoginModal
                isOpen={isOpenLogin}
                onClose={() => setOpenLogin(false)}
            />
        </div>
    )
}

export default Landing
