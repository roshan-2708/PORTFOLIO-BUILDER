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
        skills = [],
        projects = [],
        languages = [],
        contact = {},
        profileImage,
        services = [],
        educations = [],
        experience = [],
        blogs = [],
    } = data;

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Experience", href: "#experience" },
        { name: "Education", href: "#education" },
        { name: "Blogs", href: "#blog" },
        { name: "Services", href: "#services" },

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
            <section id="projects" className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    {/* Section Heading */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Selected <span className="text-indigo-500">Works</span></h2>
                        <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
                        <p className="mt-4 text-slate-400 max-w-xl">A curated collection of digital experiences that prioritize performance and clean design.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {projects?.length > 0 ? (
                            projects.map((project, i) => (
                                <div key={i} className="group relative bg-slate-900/50 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/50 hover:bg-[#0f172a] transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-indigo-500/10">

                                    {/* Image Container */}
                                    <div className="relative h-72 md:h-80 overflow-hidden">
                                        <img
                                            src={project.image || "https://via.placeholder.com/800x600/0f172a/6366f1?text=Project+Preview"}
                                            alt={project.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                                        />

                                        {/* Floating Project Link Icon */}
                                        {project.link && (
                                            <div className="absolute top-6 right-6">
                                                <div className="w-12 h-12 bg-white text-[#030712] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                                                    <ExternalLink size={20} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Subtle Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent opacity-60"></div>
                                    </div>

                                    {/* Project Content */}
                                    <div className="p-10">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                                {project.title}
                                            </h3>
                                            {/* Small decorative project status/dot */}
                                            <div className="flex gap-1.5 mt-2">
                                                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                                <div className="w-2 h-2 rounded-full bg-purple-500/30"></div>
                                            </div>
                                        </div>

                                        <p className="text-slate-400 leading-relaxed mb-8 text-sm line-clamp-3">
                                            {project.description}
                                        </p>

                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 text-xs font-black tracking-[0.2em] text-indigo-500 uppercase hover:text-indigo-300 transition-colors group/link"
                                            >
                                                Explore Case Study
                                                <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 border border-dashed border-slate-800 rounded-[2.5rem]">
                                <p className="text-slate-500">The project gallery is currently being updated. Check back soon!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- EXPERIENCE SECTION --- */}
            <section id="experience" className="py-24 px-6 bg-slate-900/20">
                <div className="max-w-7xl mx-auto">
                    {/* Section Heading */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Professional Journey</h2>
                        <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
                    </div>

                    <div className="space-y-8">
                        {experience?.length > 0 ? (
                            experience.map((exp, i) => {
                                // Safety check for unpopulated IDs
                                if (typeof exp === 'string') {
                                    return (
                                        <div key={i} className="p-6 border border-red-500/20 bg-red-500/5 rounded-2xl">
                                            <p className="text-red-400 text-sm italic">Experience ID: {exp} not populated.</p>
                                        </div>
                                    );
                                }

                                const startYear = new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                                const endYear = exp.currentlyWorking ? "Present" : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

                                return (
                                    <div key={i} className="group relative bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-indigo-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl hover:shadow-indigo-500/5">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">

                                            {/* Left Side: Role & Company */}
                                            <div className="space-y-4 flex-1">
                                                <div className="space-y-1">
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider mb-2">
                                                        {exp.employmentType || "Full-Time"}
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                                        {exp.role}
                                                    </h3>
                                                    <p className="text-lg font-medium text-slate-300">
                                                        {exp.companyName}
                                                    </p>
                                                </div>

                                                {/* Location & Dates for Mobile/Small Screens */}
                                                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                                    <span className="flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                                        {exp.location}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                                        {startYear} — {endYear}
                                                    </span>
                                                </div>

                                                {/* Description */}
                                                {exp.description && (
                                                    <p className="text-slate-400 leading-relaxed text-sm max-w-3xl pt-4 border-t border-slate-800/50">
                                                        {exp.description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Right Side: Large Date Display (Desktop Only) */}
                                            <div className="hidden md:block text-right">
                                                <div className="text-sm font-mono text-indigo-500/80 font-bold tracking-tighter uppercase">
                                                    Timeline
                                                </div>
                                                <div className="text-slate-500 font-medium whitespace-nowrap">
                                                    {startYear} <br />
                                                    <span className="text-indigo-500/30">|</span> <br />
                                                    {endYear}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl">
                                <p className="text-slate-500">No professional experience listed yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- EDUCATION SECTION --- */}
            <section id="education" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Section Heading */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Academic Background</h2>
                        <div className="h-1 w-20 bg-purple-500 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {educations?.length > 0 ? (
                            educations.map((edu, i) => {
                                // Safety check for unpopulated IDs
                                if (typeof edu === 'string') {
                                    return (
                                        <div key={i} className="p-6 border border-slate-800 bg-slate-900/50 rounded-3xl">
                                            <p className="text-slate-500 text-sm italic">Loading education details... ({edu})</p>
                                        </div>
                                    );
                                }

                                const startYear = new Date(edu.startDate).getFullYear();
                                const endYear = edu.currentlyStudying ? "Present" : new Date(edu.endDate).getFullYear();

                                return (
                                    <div key={i} className="group p-8 bg-slate-900/40 border border-slate-800 rounded-[2rem] hover:border-purple-500/50 hover:bg-slate-900 transition-all duration-500 relative overflow-hidden">
                                        {/* Decorative Background Icon */}
                                        <div className="absolute -right-4 -top-4 opacity-[0.03] text-white group-hover:opacity-[0.07] transition-opacity">
                                            <Globe size={140} />
                                        </div>

                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="space-y-1">
                                                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                                        {edu.degree}
                                                    </h3>
                                                    <p className="text-indigo-400 font-medium tracking-wide">
                                                        {edu.fieldOfStudy}
                                                    </p>
                                                </div>
                                                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                                                    {startYear} — {endYear}
                                                </span>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                                                        <Globe size={16} />
                                                    </div>
                                                    <span className="font-semibold">{edu.institution}</span>
                                                </div>

                                                {edu.grade && (
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                                                        <span className="text-[10px] text-indigo-400 uppercase font-bold tracking-widest">Grade</span>
                                                        <span className="text-white font-bold">{edu.grade}</span>
                                                    </div>
                                                )}

                                                {edu.description && (
                                                    <p className="text-slate-400 text-sm leading-relaxed pt-4 border-t border-slate-800/50">
                                                        {edu.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-10">
                                <p className="text-slate-600 italic">No education data provided.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- BLOG SECTION --- */}
            <section id="blog" className="py-24 px-6 bg-slate-900/30">
                <div className="max-w-7xl mx-auto">
                    {/* Section Heading */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Latest <span className="text-indigo-500">Articles</span></h2>
                        <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
                        <p className="mt-4 text-slate-400 max-w-xl">Sharing my thoughts on technology, design, and the future of web development.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs?.length > 0 ? (
                            blogs.map((blog, i) => {
                                // Safety check for unpopulated IDs
                                if (typeof blog === 'string') {
                                    return (
                                        <div key={i} className="p-6 border border-slate-800 bg-slate-900/50 rounded-3xl">
                                            <p className="text-slate-500 text-sm italic">Article loading... ({blog})</p>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={i} className="group flex flex-col bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500">

                                        {/* Blog Image Placeholder/Container */}
                                        <div className="h-48 bg-slate-800 relative overflow-hidden">
                                            <img
                                                src={blog.image || `https://via.placeholder.com/600x400/0f172a/6366f1?text=${blog.title}`}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                                        </div>

                                        {/* Blog Content */}
                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors leading-snug">
                                                    {blog.title}
                                                </h3>
                                                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
                                                    {blog.description}
                                                </p>
                                            </div>

                                            {blog.link && (
                                                <a
                                                    href={blog.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors group/link"
                                                >
                                                    READ ARTICLE
                                                    <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-20 bg-slate-900/50 border border-slate-800 rounded-[2rem]">
                                <p className="text-slate-500 italic text-lg">My notebook is currently empty. Stay tuned!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- SERVICES SECTION --- */}
            <section id="services" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Section Heading */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Solutions & <span className="text-indigo-500">Services</span></h2>
                        <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
                        <p className="mt-4 text-slate-400 max-w-xl">Turning complex problems into elegant, functional digital solutions.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services?.length > 0 ? (
                            services.map((service, i) => {
                                // Safety check for unpopulated IDs
                                if (typeof service === 'string') {
                                    return (
                                        <div key={i} className="p-8 border border-slate-800 bg-slate-900/50 rounded-[2rem]">
                                            <p className="text-slate-500 text-sm italic">Service ID: {service} loading...</p>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={i} className="group p-10 bg-slate-900 border border-slate-800 rounded-[2.5rem] hover:border-indigo-500/50 hover:bg-[#0f172a] transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-indigo-500/10">

                                        {/* Icon Box */}
                                        <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-8 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                                            <Code size={28} />
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                                            {service.title}
                                        </h3>

                                        <p className="text-slate-400 leading-relaxed mb-8 text-sm">
                                            {service.description}
                                        </p>

                                        {service.link && (
                                            <a
                                                href={service.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 text-xs font-black tracking-[0.2em] text-indigo-500 uppercase hover:text-indigo-300 transition-colors"
                                            >
                                                View Details <ExternalLink size={14} />
                                            </a>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-20 border border-slate-800 rounded-[2.5rem]">
                                <p className="text-slate-600 italic">No services listed at the moment.</p>
                            </div>
                        )}
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