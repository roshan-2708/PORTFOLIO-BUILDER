import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { userProfile } from "../../../services/operation/authAPI";

const TemplateThree = ({ data }) => {
    if (!data) return null;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await userProfile();
                setUser(res.user);
            } catch (error) {
                console.log("failed to fetch user")
            }
        }
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
    // const projects = [
    //     {
    //         id: 1,
    //         title: "E-Commerce Website",
    //         description: "Modern online store with cart & payment integration.",
    //         image: "/project1.png",
    //         link: "#"
    //     },
    //     {
    //         id: 2,
    //         title: "Portfolio Website",
    //         description: "Personal portfolio with responsive design.",
    //         image: "/project2.png",
    //         link: "#"
    //     },
    //     {
    //         id: 3,
    //         title: "Blog Platform",
    //         description: "Full stack blog app with authentication.",
    //         image: "/project3.png",
    //         link: "#"
    //     }
    // ];
    const blogs = [
        {
            id: 1,
            title: "Understanding React Hooks",
            description: "A complete beginner guide to React hooks.",
            image: "/blog1.jpg",
            link: "#"
        },
        {
            id: 2,
            title: "Node.js Best Practices",
            description: "How to structure scalable backend apps.",
            image: "/blog2.jpg",
            link: "#"
        },
        {
            id: 3,
            title: "MongoDB Optimization",
            description: "Improve performance with indexing.",
            image: "/blog3.jpg",
            link: "#"
        }
    ];

    const [isOpen, setOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: '#hero' },
        { name: 'Services', href: '#services' },
        { name: "About", href: '#about' },
        { name: "Blogs", href: '#blogs' },
        { name: "Projects", href: '#projects' },
        { name: "Contact", href: '#contact' },
    ]
    return (
        <div className='bg-[#10131A]'>
            {/* navbar section */}
            <header>
                <nav className="bg-[#10131A] text-white shadow-md fixed w-full top-0 z-50">
                    <div className="max-w-7xl mx-auto px-6 py-4 text-white flex justify-between items-center">

                        {/* Left - User Name */}
                        <h1 className="text-2xl font-bold ">
                            {title || "Portfolio"}
                        </h1>

                        {/* Desktop Menu */}
                        <ul className="hidden md:flex gap-8  font-medium">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="hover:text-[#2EB2D3] transition duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)}>
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                    {/* mobile dropdown */}
                    {isOpen && (
                        <div className="md:hidden bg-white shadow-md px-6 pb-4">
                            <ul className="flex flex-col gap-4  font-medium">
                                {navLinks.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block hover:text-[#2EB2D3]"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </nav>
            </header>

            {/* Hero section */}
            <section id='hero' className="relative min-h-screen bg-gradient-to-br from-[#0E1117] via-[#10131A] to-[#0A0D12] text-[#EFF0F2] flex items-center pt-24 overflow-hidden">

                {/* Background Glow Effects */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#2EB2D3]/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2EB2D3]/10 blur-[150px] rounded-full"></div>

                <div className="relative max-w-7xl mx-auto px-6 w-full">
                    <div className="grid md:grid-cols-2 gap-16 items-center">

                        {/* ================= LEFT SIDE ================= */}
                        <div>

                            {/* Small Intro */}
                            <h2 className="text-2xl md:text-3xl font-medium text-gray-300">
                                I am a{" "}
                                <span className="text-[#2EB2D3] font-semibold">
                                    Developer
                                </span>
                            </h2>

                            {/* Name */}
                            <h1 className="text-4xl md:text-6xl font-extrabold mt-5 leading-tight tracking-wide">
                                {user?.firstName}{" "}
                                <span className="text-[#2EB2D3]">
                                    {user?.lastName}
                                </span>
                            </h1>

                            {/* Title */}
                            <p className="mt-6 text-xl text-gray-400 font-medium">
                                {title}
                            </p>

                            {/* About */}
                            <p className="mt-4 text-gray-400 max-w-xl leading-relaxed">
                                {about}
                            </p>

                            {/* Buttons */}
                            <div className="mt-10 flex gap-6 flex-wrap">

                                <button className="px-8 py-3 rounded-lg bg-[#2EB2D3] text-[#10131A] font-semibold shadow-lg hover:scale-105 hover:shadow-[0_0_20px_#2EB2D3] transition duration-300">
                                    <a href="#contact">Hire Me</a>
                                </button>

                                <button className="px-8 py-3 rounded-lg border border-[#2EB2D3] text-[#2EB2D3] hover:bg-[#2EB2D3] hover:text-[#10131A] transition duration-300">
                                    <a href="#projects">View Projects</a>
                                </button>

                            </div>

                        </div>

                        {/* ================= RIGHT SIDE ================= */}
                        <div className="flex justify-center md:justify-end relative">

                            {/* Soft Glow Background */}
                            <div className="absolute w-96 h-96 bg-[#2EB2D3]/20 blur-[120px] rounded-2xl animate-pulse"></div>

                            {/* Outer Glass Circle */}
                            <div className="relative p-[6px] bg-gradient-to-tr from-[#2EB2D3  shadow-[0_0_40px_#2EB2D3] rounded-2xl transition duration-500 hover:scale-105">

                                {/* Inner Border Ring */}
                                <div className="bg-[#0E1117] p-2 rounded-2xl ">

                                    {/* Profile Image */}
                                    <img
                                        src={profileImage || user?.image || "https://via.placeholder.com/400"}
                                        alt="Profile"
                                        className="w-56 h-56 md:w-72 md:h-72 rounded-2xl  object-cover transition duration-500 hover:scale-105"
                                    />

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section >

            {/* my service section */}
            < section
                id="services"
                className="relative bg-gradient-to-b from-[#0E1117] to-[#10131A] text-[#EFF0F2] py-28 overflow-hidden"
            >

                {/* Background Glow */}
                < div className="absolute top-0 left-0 w-80 h-80 bg-[#2EB2D3]/10 blur-[120px] rounded-full" ></div >
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2EB2D3]/10 blur-[150px] rounded-full"></div>

                <div className="relative max-w-7xl mx-auto px-6">

                    {/* Section Title */}
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-wide">
                            My <span className="text-[#2EB2D3]">Services</span>
                        </h2>
                        <div className="w-28 h-1 bg-[#2EB2D3] mx-auto mt-6 rounded-full"></div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                        {[
                            {
                                title: "Frontend Developer",
                                desc: "Building responsive and interactive user interfaces using modern frameworks.",
                                icon: "💻",
                            },
                            {
                                title: "Backend Developer",
                                desc: "Developing scalable APIs and server-side applications.",
                                icon: "⚙️",
                            },
                            {
                                title: "UI/UX Designer",
                                desc: "Designing intuitive and engaging user experiences.",
                                icon: "🎨",
                            },
                            {
                                title: "Project Management",
                                desc: "Planning, organizing, and managing development workflows.",
                                icon: "📊",
                            },
                        ].map((service, i) => (
                            <div
                                key={i}
                                className="group bg-[#161B22] border border-[#2EB2D3]/20 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_0_30px_#2EB2D3]"
                            >
                                {/* Icon */}
                                <div className="text-4xl mb-6 transition duration-300 group-hover:scale-110">
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold mb-4">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                    {service.desc}
                                </p>

                                {/* Button */}
                                <button className="px-6 py-2 text-sm rounded-lg border border-[#2EB2D3] text-[#2EB2D3] hover:bg-[#2EB2D3] hover:text-[#10131A] transition duration-300">
                                    Read More
                                </button>
                            </div>
                        ))}

                    </div>
                </div>
            </section >

            {/* More about me */}
            < section id="about"
                className="relative bg-gradient-to-b from-[#0E1117] to-[#10131A] text-[#EFF0F2] py-32 overflow-hidden"
            >

                {/* Background Glow */}
                < div className="absolute top-0 left-0 w-80 h-80 bg-[#2EB2D3]/10 blur-[120px] rounded-full" ></div >

                <div className="relative max-w-7xl mx-auto px-6">

                    {/* Section Title */}
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-wide">
                            More About <span className="text-[#2EB2D3]">Me</span>
                        </h2>
                        <div className="w-28 h-1 bg-[#2EB2D3] mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-24">

                        {/* ================= EDUCATION TIMELINE ================= */}
                        <div>
                            <h3 className="text-3xl font-semibold mb-14 text-[#2EB2D3]">
                                My Education
                            </h3>

                            <div className="relative border-l-2 border-[#2EB2D3]/30 pl-10 space-y-14">

                                {[
                                    { title: "Graduation", desc: "B.Tech in Computer Science" },
                                    { title: "Higher Secondary", desc: "Science Stream" },
                                    { title: "High School", desc: "General Education" },
                                ].map((edu, i) => (
                                    <div key={i} className="relative">

                                        {/* Timeline Dot */}
                                        <div className="absolute -left-[13px] top-2 w-6 h-6 bg-[#2EB2D3] rounded-full border-4 border-[#10131A]"></div>

                                        {/* Card */}
                                        <div className="bg-[#161B22] border border-[#2EB2D3]/20 rounded-2xl p-6 transition duration-300 hover:shadow-[0_0_25px_#2EB2D3] hover:-translate-y-2">
                                            <h4 className="text-xl font-semibold">{edu.title}</h4>
                                            <p className="mt-2 text-gray-400">{edu.desc}</p>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* ================= SKILLS & LANGUAGES ================= */}
                        <div>
                            <h3 className="text-3xl font-semibold mb-14 text-[#2EB2D3]">
                                Skills & Languages
                            </h3>

                            {/* ===== Skills ===== */}
                            <div className="mb-16">
                                <h4 className="text-xl font-semibold mb-8">Skills</h4>

                                <div className="flex flex-wrap gap-4">
                                    {skills?.length > 0 ? (
                                        skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-6 py-2 text-sm rounded-full bg-[#161B22] border border-[#2EB2D3]/30 hover:bg-[#2EB2D3] hover:text-[#10131A] transition duration-300 shadow-sm hover:shadow-[0_0_15px_#2EB2D3]"
                                            >
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">No skills added</p>
                                    )}
                                </div>
                            </div>

                            {/* ===== Languages ===== */}
                            <div>
                                <h4 className="text-xl font-semibold mb-8">Languages</h4>

                                <div className="space-y-6">
                                    {languages?.length > 0 ? (
                                        languages.map((lang, i) => {
                                            const name =
                                                typeof lang === "string" ? lang : lang.name;

                                            const proficiency =
                                                typeof lang === "object" && lang.proficiency
                                                    ? lang.proficiency
                                                    : "Fluent";

                                            return (
                                                <div key={i}>
                                                    <div className="flex justify-between mb-2">
                                                        <span className="font-medium">{name}</span>
                                                        <span className="text-sm text-gray-400">
                                                            {proficiency}
                                                        </span>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="w-full h-2 bg-[#161B22] rounded-full overflow-hidden">
                                                        <div className="h-full bg-[#2EB2D3] w-4/5"></div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="text-gray-500 text-sm">No languages added</p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section >

            {/* My Latest Project */}
            < section id='projects' className="relative bg-gradient-to-b from-[#0E1117] to-[#10131A] py-32 px-6 text-[#EFF0F2] overflow-hidden" >

                {/* Background Glow */}
                < div className="absolute top-0 right-0 w-96 h-96 bg-[#2EB2D3]/10 blur-[150px] rounded-full" ></div >

                <div className="relative max-w-7xl mx-auto">

                    {/* Title */}
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-wide">
                            My Latest <span className="text-[#2EB2D3]">Projects</span>
                        </h2>
                        <div className="w-28 h-1 bg-[#2EB2D3] mx-auto mt-6 rounded-full"></div>
                    </div>

                    {/* Grid */}
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">

                        {projects?.length > 0 ? (
                            projects.map((project, i) => (
                                <div
                                    key={i}
                                    className="group relative bg-[#161B22]/80 backdrop-blur-md border border-[#2EB2D3]/20 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_0_35px_#2EB2D3]"
                                >

                                    {/* ===== Image Section ===== */}
                                    <div className="relative overflow-hidden">

                                        <img
                                            src={
                                                project.image && project.image.trim() !== ""
                                                    ? project.image
                                                    : "https://via.placeholder.com/600x400/10131A/2EB2D3?text=Project"
                                            }
                                            alt={project.title}
                                            className="w-full h-60 object-cover transition duration-700 group-hover:scale-110"
                                        />

                                        {/* Dark Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70"></div>

                                        {/* Hover Button Overlay */}
                                        {project.link && (
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="px-6 py-3 rounded-xl bg-[#2EB2D3] text-[#10131A] font-semibold shadow-lg hover:scale-105 transition"
                                                >
                                                    View Project
                                                </a>
                                            </div>
                                        )}

                                    </div>

                                    {/* ===== Content Section ===== */}
                                    <div className="p-7">

                                        <h3 className="text-2xl font-semibold mb-4">
                                            {project.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>

                                    </div>

                                </div>
                            ))
                        ) : (
                            <div className="text-center col-span-full">
                                <p className="text-gray-500 text-lg">
                                    No projects added yet 🚀
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </section >

            {/* Latest article */}
            < section id='blogs' className="bg-gradient-to-b from-[#0E1117] to-[#10131A] py-28 px-6 text-[#EFF0F2]" >
                <div className="max-w-7xl mx-auto">

                    {/* Title */}
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Latest <span className="text-[#2EB2D3]">Articles</span>
                        </h2>
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
                            Insights, tutorials, and thoughts on development, design, and building modern web applications.
                        </p>
                        <div className="w-24 h-1 bg-[#2EB2D3] mx-auto mt-6 rounded-full"></div>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="group bg-[#161B22]/80 backdrop-blur-md border border-[#2EB2D3]/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:border-[#2EB2D3]/40"
                            >

                                {/* Image with Overlay */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={
                                            blog.image && blog.image.trim() !== ""
                                                ? blog.image
                                                : "https://via.placeholder.com/600x400/10131A/2EB2D3?text=Article+Preview"
                                        }
                                        alt={blog.title}
                                        className="w-full h-56 object-cover transition duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#10131A] via-transparent opacity-70"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col justify-between h-[220px]">

                                    <div>
                                        <h3 className="text-xl font-semibold mb-3 group-hover:text-[#2EB2D3] transition-colors duration-300">
                                            {blog.title}
                                        </h3>

                                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                                            {blog.description}
                                        </p>
                                    </div>

                                    {/* Button */}
                                    <a
                                        href={blog.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center mt-6 text-sm font-semibold text-[#2EB2D3] group-hover:translate-x-1 transition-transform duration-300"
                                    >
                                        Read Article →
                                    </a>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section >

            {/* contact section */}
            < section id='contact' className="bg-gradient-to-b from-[#0E1117] to-[#10131A] py-28 px-6 text-[#EFF0F2]" >
                <div className="max-w-7xl mx-auto">

                    {/* Title */}
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Contact <span className="text-[#2EB2D3]">Me</span>
                        </h2>
                        <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
                            Have a project in mind or want to collaborate? Feel free to reach out.
                        </p>
                        <div className="w-24 h-1 bg-[#2EB2D3] mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-14 items-stretch">

                        {/* Contact Form */}
                        <form className="bg-[#161B22]/80 backdrop-blur-md border border-[#2EB2D3]/10 p-10 rounded-2xl space-y-6 shadow-lg">

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 bg-transparent border border-[#2EB2D3]/30 rounded-lg focus:outline-none focus:border-[#2EB2D3] focus:ring-1 focus:ring-[#2EB2D3] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Your Email</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 bg-transparent border border-[#2EB2D3]/30 rounded-lg focus:outline-none focus:border-[#2EB2D3] focus:ring-1 focus:ring-[#2EB2D3] transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="Write your message here..."
                                    className="w-full px-4 py-3 bg-transparent border border-[#2EB2D3]/30 rounded-lg focus:outline-none focus:border-[#2EB2D3] focus:ring-1 focus:ring-[#2EB2D3] transition resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#2EB2D3] text-[#10131A] py-3 rounded-lg font-semibold tracking-wide hover:opacity-90 hover:shadow-[0_0_15px_#2EB2D3] transition-all duration-300"
                            >
                                Send Message
                            </button>

                        </form>

                        {/* Contact Info */}
                        <div className="bg-[#161B22]/80 backdrop-blur-md border border-[#2EB2D3]/10 p-10 rounded-2xl flex flex-col justify-center space-y-8 shadow-lg">

                            {/* Email */}
                            {contact?.email && (
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Email</p>
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="text-lg font-medium hover:text-[#2EB2D3] transition"
                                    >
                                        {contact.email}
                                    </a>
                                </div>
                            )}

                            {/* GitHub */}
                            {contact?.github && (
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">GitHub</p>
                                    <a
                                        href={contact.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-lg font-medium hover:text-[#2EB2D3] transition"
                                    >
                                        {contact.github}
                                    </a>
                                </div>
                            )}

                            {/* LinkedIn */}
                            {contact?.linkedin && (
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">LinkedIn</p>
                                    <a
                                        href={contact.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-lg font-medium hover:text-[#2EB2D3] transition"
                                    >
                                        {contact.linkedin}
                                    </a>
                                </div>
                            )}

                            {/* Address */}
                            {user?.profile?.address && (
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Address</p>
                                    <p className="text-lg font-medium">
                                        {user.profile.address}
                                    </p>
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </section >

            {/* footer section */}
            < footer className="bg-gradient-to-b from-[#0D1117] to-[#0A0D12] border-t border-[#2EB2D3]/20 text-[#EFF0F2] py-12 px-6" >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Left Side */}
                    <p className="text-sm text-gray-400 text-center md:text-left">
                        © {new Date().getFullYear()} <span className="text-white font-medium">Your Name</span>.
                        All Rights Reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-6">

                        <a
                            href={contact?.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-[#2EB2D3] transition"
                        >
                            GitHub
                        </a>

                        <a
                            href={contact?.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-[#2EB2D3] transition"
                        >
                            LinkedIn
                        </a>

                        <a
                            href={`mailto:${contact?.email}`}
                            className="text-gray-400 hover:text-[#2EB2D3] transition"
                        >
                            Email
                        </a>

                    </div>

                    {/* Back to Top */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="text-sm px-4 py-2 border border-[#2EB2D3]/40 rounded-lg hover:bg-[#2EB2D3] hover:text-[#10131A] transition duration-300"
                    >
                        Back to Top ↑
                    </button>

                </div>
            </footer >


        </div >
    )
}

export default TemplateThree
