import React, { useEffect, useState } from 'react';
import { Menu, X, Briefcase, GraduationCap, Code, Mail, ExternalLink, Github, Linkedin } from 'lucide-react';
import { userProfile } from "../../../services/operation/authAPI";

const TemplateTwo = ({ data }) => {
    if (!data) return null;
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await userProfile();
                setUser(res.user);
            } catch (error) {
                console.log("failed to fetch user");
            }
        };
        fetchUser();
    }, []);

    const {
        title,
        about,
        skills = [],
        projects = [],
        languages = [],
        contact = {},
        profileImage,
    } = data;

    const navLinks = [
        { name: "Home", href: '#home' },
        { name: "Experience", href: '#experience' },
        { name: "About", href: '#about' },
        { name: "Blogs", href: '#Blogs' },
        { name: "Projects", href: '#projects' },
        { name: "Contact", href: '#contact' },
    ];

    return (
        <div className="bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
            {/* --- Navigation --- */}
            <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
                    <span className="text-xl font-bold tracking-tight text-indigo-600">
                        {user?.firstName?.toUpperCase() || "PORTFOLIO"}
                    </span>

                    <ul className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a href={link.href} className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                        <a href="#contact" className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
                            Get in Touch
                        </a>
                    </ul>

                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <section id="home" className="pt-44 pb-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="relative p-1 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500">
                            <img
                                src={profileImage || user?.image || "https://via.placeholder.com/150"}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white object-cover"
                            />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
                        Hey, I'm {user?.firstName || "there"} 👋
                    </h1>
                    <p className="text-2xl font-medium text-indigo-600 mb-8">{title}</p>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
                        {about || "I am a passionate developer focused on building clean, functional, and user-centric web applications."}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex gap-4">
                            {contact?.github && (
                                <a href={contact.github} target="_blank" rel="noreferrer" className="p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all">
                                    <Github size={24} />
                                </a>
                            )}
                            {contact?.linkedin && (
                                <a href={contact.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all">
                                    <Linkedin size={24} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Skills Section --- */}
            <section className="py-20 bg-white border-y border-slate-100">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-10">Tech Stack</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {skills.map((skill, i) => (
                            <span key={i} className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 font-medium hover:bg-indigo-50 hover:border-indigo-200 transition-colors">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Projects Section --- */}
            <section id="projects" className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                        <div className="max-w-xl text-left">
                            <h2 className="text-4xl font-bold mb-4">Selected Projects</h2>
                            <p className="text-slate-500">A collection of things I've built, from experimental web apps to commercial solutions.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, i) => (
                            <div key={i} className="group bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
                                <div className="h-72 bg-slate-100 relative overflow-hidden">
                                    <img
                                        src={
                                            profileImage instanceof File
                                                ? URL.createObjectURL(profileImage)
                                                : profileImage || "https://via.placeholder.com/400"
                                        }
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        alt={project.title}
                                    />
                                    <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors"></div>
                                </div>
                                <div className="p-10">
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                                    <p className="text-slate-600 mb-8 leading-relaxed line-clamp-3">{project.description}</p>
                                    <a href={project.link} className="inline-flex items-center gap-2 font-bold text-indigo-600 hover:gap-4 transition-all">
                                        View Case Study <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Contact Section --- */}
            <section id="contact" className="py-24 px-6 bg-slate-900 text-white rounded-[3rem] mx-6 mb-12">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-5xl font-bold mb-8">Let's build something <span className="text-indigo-400">extraordinary</span>.</h2>
                        <p className="text-slate-400 text-lg mb-10">I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-indigo-400">
                                    <Mail />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Email me at</p>
                                    <p className="text-xl font-medium">{contact?.email || "hello@example.com"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-4">
                        <input type="text" placeholder="Your Name" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-indigo-400 transition" />
                        <input type="email" placeholder="Your Email" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-indigo-400 transition" />
                        <textarea rows="4" placeholder="Your Message" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-indigo-400 transition resize-none"></textarea>
                        <button className="w-full py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition shadow-lg shadow-indigo-900">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            {/* --- Footer --- */}
            <footer className="py-12 text-center text-slate-500 text-sm">
                <p>© {new Date().getFullYear()} {user?.firstName} {user?.lastName}. Made with ❤️ and React.</p>
            </footer>
        </div>
    );
};

export default TemplateTwo;