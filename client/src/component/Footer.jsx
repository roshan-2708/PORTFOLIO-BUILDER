import React from "react";
import { Link } from "react-router-dom";
import {
    FaDiscord,
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bottom-0 w-full bg-gray-900 text-gray-300 pt-14 mt-10 border-t border-gray-800 shadow-[0_-8px_30px_rgba(0,0,0,0.35)]">
            <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-4">

                {/* Brand */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                        PORTFOLIO<span className="text-yellow-500">-BUILDER</span>
                    </h2>
                    <p className="text-sm text-gray-400 mb-4">
                        Create and deploy your professional portfolio in minutes.
                    </p>

                    <div className="flex gap-3">
                        <Link to='https://discord.com/channels/@me' ><SocialIcon icon={<FaDiscord />} /></Link>
                        <Link to='https://www.instagram.com/_roshan_2708/'>
                            <SocialIcon icon={<FaInstagram />} /></Link>
                        <Link to='https://www.linkedin.com/in/roshan-kumar-patra-b52468316/'><SocialIcon icon={<FaLinkedinIn />} /></Link>
                        <Link to='https://github.com/roshan-2708'><SocialIcon icon={<FaGithub />} /></Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="footer-title">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Home</li>
                        <li>Features</li>
                        <li>How It Works</li>
                        <li>Dashboard</li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="footer-title">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li>About Us</li>
                        <li>Contact</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="footer-title">Contact</h3>
                    <p className="text-sm">📞 +91 78940 75618</p>
                    <p className="text-sm mt-2">📧 roshanpatra@gmail.com</p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10 mt-12 py-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Portfolio-Builder. All rights reserved.
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }) => (
    <div className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 hover:bg-yellow-500 hover:text-black transition cursor-pointer">
        {icon}
    </div>
);

export default Footer;
