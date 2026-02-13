import React, { useEffect, useState } from 'react';
import { Menu, X, Mail, Github, Linkedin, ExternalLink, Code, Globe, User } from 'lucide-react';
import { userProfile } from "../../../services/operation/authAPI";

const TemplateOne = ({ data }) => {
    if (!data) return null;
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        profileImage,
        skills = [],
        projects = [],
        contact = {},
        languages = [],
    } = data;

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-indigo-500/30">
            {/* --- NAVIGATION --- */}
            <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-[#030712]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        {user?.firstName || "Portfolio"}.
                    </div>

                    {/* Desktop */}
                    <ul className="hidden md:flex gap-10 text-sm font-medium tracking-wide">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a href={link.href} className="hover:text-indigo-400 transition-colors">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Toggle */}
                    <button className="md:hidden text-slate-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-[#030712] border-b border-slate-800 p-6 space-y-4">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="block text-lg">
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}
            </nav>

            {/* --- HERO SECTION --- */}
            <section id="about" className="relative pt-40 pb-20 px-6 overflow-hidden">
                {/* Ambient Background Glows */}
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full -z-10" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full -z-10" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            Available for projects
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                            I'm <span className="text-indigo-500">{user?.firstName}</span>, <br />
                            {title}
                        </h1>

                        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                            {about}
                        </p>

                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20">
                                Get In Touch
                            </button>
                            <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white rounded-xl font-bold transition-all">
                                View Resume
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative w-72 h-72 md:w-80 md:h-80 bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800">
                                <img
                                    src={
                                        profileImage instanceof File
                                            ? URL.createObjectURL(profileImage)
                                            : profileImage || "https://via.placeholder.com/400"
                                    }

                                    alt="Profile"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SKILLS SECTION --- */}
            <section id="skills" className="py-24 px-6 bg-slate-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Core Expertise</h2>
                        <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {skills.map((skill, i) => (
                            <div key={i} className="group p-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl hover:border-indigo-500/50 hover:bg-slate-800 transition-all duration-300 text-center">
                                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Code className="text-indigo-400" size={24} />
                                </div>
                                <span className="font-semibold text-slate-300 group-hover:text-white">{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PROJECTS SECTION --- */}
            <section id="projects" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">Featured Projects</h2>
                            <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, i) => (
                            <div key={i} className="group relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all">
                                <div className="h-64 bg-slate-800 overflow-hidden">
                                    <img
                                        src={project.image || "https://via.placeholder.com/600x400"}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                                    <p className="text-slate-400 mb-6 leading-relaxed line-clamp-2">
                                        {project.description}
                                    </p>
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                                            Case Study <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- LANGUAGES & CONTACT --- */}
            <section id="contact" className="py-24 px-6 border-t border-slate-800/50 bg-[#020617]">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">

                    {/* Languages */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-10">Language Proficiency</h2>
                        <div className="space-y-8">
                            {languages.map((lang, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between font-medium">
                                        <span>{lang.name}</span>
                                        <span className="text-indigo-400">{lang.proficiency}</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-600 rounded-full"
                                            style={{ width: lang.proficiency === 'Expert' ? '95%' : lang.proficiency === 'Fluent' ? '80%' : '60%' }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Card */}
                    <div className="p-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Mail size={120} />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Let's work together</h2>
                        <p className="text-indigo-100 mb-10 text-lg">
                            Have a project in mind? Reach out and let's build something amazing.
                        </p>

                        <div className="space-y-4">
                            {contact?.email && (
                                <a href={`mailto:${contact.email}`} className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
                                    <Mail size={20} /> {contact.email}
                                </a>
                            )}
                            <div className="flex gap-4">
                                {contact?.github && (
                                    <a href={contact.github} target="_blank" rel="noreferrer" className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all flex-1 flex justify-center">
                                        <Github size={20} />
                                    </a>
                                )}
                                {contact?.linkedin && (
                                    <a href={contact.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all flex-1 flex justify-center">
                                        <Linkedin size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-10 px-6 text-center text-slate-500 text-sm border-t border-slate-800/50">
                <p>© {new Date().getFullYear()} {user?.firstName} {user?.lastName}. Built with React & Tailwind.</p>
            </footer>
        </div>
    );
};

export default TemplateOne;