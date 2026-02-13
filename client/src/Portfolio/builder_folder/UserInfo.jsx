import React, { useEffect, useRef, useState } from "react";
import { userProfile } from "../../services/operation/authAPI";

const UserInfo = ({ data, setData, onNext }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loadingImage, setLoadingImage] = useState(false);
    const fileInputRef = useRef(null);


    const [formData, setFormData] = useState({
        title: "",
        profileImage: null,
        about: "",
        skills: [],
        projects: [],
        languages: [],
        contacts: {
            email: "",
            github: "",
            linkedin: "",
        },
        experience: [],
        education: [],
        services: [],
        blogs: [],
    });

    const [skillInput, setSkillInput] = useState("");

    /* ---------- SYNC FROM PARENT ---------- */
    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            setFormData(data);
        }
    }, [data]);

    // /* ---------- PUSH TO PARENT ---------- */
    // useEffect(() => {
    //     setData((prev) => ({ ...prev, ...formData }));
    // }, [formData]);

    /* ---------- FETCH USER ---------- */
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await userProfile();
                setUser(res.user);
            } catch (err) {
                console.error("Failed to fetch user");
            }
        };
        fetchUser();
    }, []);

    /* ---------- SKILLS ---------- */
    const addSkill = () => {
        if (!skillInput.trim()) return;
        if (formData.skills.includes(skillInput)) return;

        setFormData((prev) => ({
            ...prev,
            skills: [...prev.skills, skillInput],
        }));
        setSkillInput("");
    };

    const removeSkill = (index) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index),
        }));
    };

    /* ---------- PROJECTS ---------- */
    const addProject = () => {
        setFormData((prev) => ({
            ...prev,
            projects: [
                ...prev.projects,
                { title: "", description: "", link: "", image: null },
            ],
        }));
    };

    const updateProject = (index, field, value) => {
        const updated = [...formData.projects];
        updated[index][field] = value;
        setFormData({ ...formData, projects: updated });
    };

    const removeProject = (index) => {
        setFormData((prev) => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index),
        }));
    };

    /* ---------- EDUCATION ---------- */
    const addEducation = () => {
        setFormData((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                { degree: "", fieldOfStudy: "", institution: "", location: "", startDate: "", endDate: "", currentlyStudying: false, grade: "", description: "" },
            ],
        }));
    };

    const updateEducation = (index, field, value) => {
        const updated = [...formData.education];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, education: updated });
    };
    const removeEducation = (index) => {
        setFormData((prev) => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index),
        }));
    };

    /* ---------- BLOGS ---------- */
    const addBlogs = () => {
        setFormData((prev) => ({
            ...prev,
            blogs: [
                ...prev.blogs,
                { title: "", description: "", link: "" },
            ],
        }));
    };
    const updateBlogs = (index, field, value) => {
        const updated = [...formData.blogs];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, blogs: updated });
    }
    const removeBlogs = (index) => {
        setFormData((prev) => ({
            ...prev,
            blogs: prev.blogs.filter((_, i) => i !== index),
        }));
    };
    /* ---------- SERVICES ---------- */
    const addServices = () => {
        setFormData((prev) => ({
            ...prev,
            services: [
                ...prev.services,
                { title: "", description: "", link: "" },
            ],
        }));
    };
    const updateServices = (index, field, value) => {
        const updated = [...formData.services];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, services: updated });
    }
    const removeServices = (index) => {
        setFormData((prev) => ({
            ...prev,
            services: prev.services.filter((_, i) => i !== index),
        }));
    };
    /* ---------- EXPERIENCE ---------- */
    const addExperience = () => {
        setFormData((prev) => ({
            ...prev,
            experience: [
                ...prev.experience,
                {
                    companyName: "", role: '', employmentType: "Full-time",
                    location: "", startDate: "", currentlyWorking: true, description: ""
                },
            ],
        }));
    };

    const updateExperience = (index, field, value) => {
        const updated = [...formData.experience];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, experience: updated });
    };

    const removeExperience = (index) => {
        setFormData((prev) => ({
            ...prev,
            // FIXED: removed the 's' from experiences to match state key
            experience: prev.experience.filter((_, i) => i !== index),
        }));
    };

    /* ---------- LANGUAGES ---------- */
    const addLanguage = () => {
        setFormData((prev) => ({
            ...prev,
            languages: [...prev.languages, { name: "", proficiency: "" }],
        }));
    };

    const updateLanguage = (index, field, value) => {
        const updated = [...formData.languages];
        updated[index][field] = value;
        setFormData({ ...formData, languages: updated });
    };

    const removeLanguage = (index) => {
        setFormData((prev) => ({
            ...prev,
            languages: prev.languages.filter((_, i) => i !== index),
        }));
    };

    /* ---------- VALIDATION ---------- */
    const handleNext = () => {
        setError("");

        if (!formData.title.trim())
            return setError("Portfolio title is required");

        if (!formData.about.trim())
            return setError("About section is required");

        if (formData.skills.length === 0)
            return setError("Add at least one skill");

        onNext(formData);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex justify-center py-10">
            <div className="w-full max-w-4xl bg-slate-800 rounded-2xl shadow-xl p-8 space-y-10">

                {/* HEADER */}
                <div className="flex items-center gap-6">
                    <div>
                        <p>
                            Profile Picture
                        </p>
                        <p>
                            JPG, PNG OR JPEG. Max size 2MB
                        </p>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            disabled={loadingImage}
                            className="px-4 py-1.5 text-sm bg-yellow-500 text-black rounded-md font-medium hover:bg-yellow-400 transition disabled:opacity-50"
                        >
                            {loadingImage ? "Uploading..." : "Upload Image"}
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (!file) return;

                                // Create a temporary URL for display
                                const previewUrl = URL.createObjectURL(file);

                                setFormData(prev => ({
                                    ...prev,
                                    profileImage: file, // Keep the file for the API call
                                    profileImagePreview: previewUrl // Add this for the Preview component
                                }));

                                setPreview(previewUrl);
                            }}
                        />
                    </div>
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-24 h-24 rounded-full object-cover border border-slate-600"
                        />
                    )}

                    <div>
                        <h2 className="text-2xl font-bold">
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <p className="text-slate-400 text-sm">
                            Let’s build your professional portfolio
                        </p>
                    </div>
                </div>

                {/* BASIC INFO */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-slate-700 pb-2">
                        Basic Information
                    </h3>

                    <input
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Portfolio Title (e.g. Full Stack Developer)"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                    />

                    <textarea
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="About you..."
                        value={formData.about}
                        onChange={(e) =>
                            setFormData({ ...formData, about: e.target.value })
                        }
                    />
                </div>

                {/* CONTACTS */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-slate-700 pb-2">
                        Contact Details
                    </h3>

                    <div className="grid md:grid-cols-3 gap-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="input"
                            value={formData.contacts.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contacts: { ...formData.contacts, email: e.target.value },
                                })
                            }
                        />
                        <input
                            placeholder="GitHub"
                            className="input"
                            value={formData.contacts.github}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contacts: { ...formData.contacts, github: e.target.value },
                                })
                            }
                        />
                        <input
                            placeholder="LinkedIn"
                            className="input"
                            value={formData.contacts.linkedin}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contacts: { ...formData.contacts, linkedin: e.target.value },
                                })
                            }
                        />
                    </div>
                </div>

                {/* SKILLS */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-slate-700 pb-2">
                        Skills
                    </h3>

                    <div className="flex gap-2">
                        <input
                            className="flex-1 input"
                            placeholder="Add a skill"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                        />
                        <button
                            onClick={addSkill}
                            className="bg-blue-600 hover:bg-blue-700 px-5 rounded-lg font-medium"
                        >
                            Add
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill, i) => (
                            <span
                                key={i}
                                className="flex items-center gap-2 bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                            >
                                {skill}
                                <button onClick={() => removeSkill(i)}>✕</button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* PROJECTS */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-slate-700 pb-2">
                        Projects
                    </h3>

                    {formData.projects.map((project, index) => (
                        <div key={index} className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-3">
                            <input
                                className="input"
                                placeholder="Project Title"
                                value={project.title}
                                onChange={(e) =>
                                    updateProject(index, "title", e.target.value)
                                }
                            />
                            <textarea
                                className="input min-h-[80px]"
                                placeholder="Project Description"
                                value={project.description}
                                onChange={(e) =>
                                    updateProject(index, "description", e.target.value)
                                }
                            />
                            <input
                                className="input"
                                placeholder="Project Link"
                                value={project.link}
                                onChange={(e) =>
                                    updateProject(index, "link", e.target.value)
                                }
                            />
                            <input
                                type="file"
                                className="text-sm text-slate-400"
                                onChange={(e) =>
                                    updateProject(index, "image", e.target.files[0])
                                }
                            />
                            <button
                                onClick={() => removeProject(index)}
                                className="text-red-400 hover:text-red-500 text-sm"
                            >
                                Remove Project
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={addProject}
                        className="border border-dashed border-slate-600 hover:border-blue-500 rounded-lg py-2 w-full text-slate-400 hover:text-blue-400"
                    >
                        + Add Project
                    </button>
                </div>

                {/* EXPERIENCE */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-slate-700 pb-2">Professional Experience</h3>
                    {formData.experience.map((exp, index) => (
                        <div key={index} className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-3">
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    className="input"
                                    placeholder="Company Name"
                                    value={exp.companyName}
                                    onChange={(e) => updateExperience(index, "companyName", e.target.value)}
                                />
                                <input
                                    className="input"
                                    placeholder="Role (e.g. Frontend Developer)"
                                    value={exp.role}
                                    onChange={(e) => updateExperience(index, "role", e.target.value)}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    className="input"
                                    placeholder="Location (e.g. Remote / NYC)"
                                    value={exp.location}
                                    onChange={(e) => updateExperience(index, "location", e.target.value)}
                                />
                                <select
                                    className="input bg-slate-900"
                                    value={exp.employmentType}
                                    onChange={(e) => updateExperience(index, "employmentType", e.target.value)}
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Freelance">Freelance</option>
                                </select>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs text-slate-500 ml-1">Start Date</label>
                                    <input type="date" className="input" value={exp.startDate} onChange={(e) => updateExperience(index, "startDate", e.target.value)} />
                                </div>
                                {!exp.currentlyWorking && (
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs text-slate-500 ml-1">End Date</label>
                                        <input type="date" className="input" value={exp.endDate} onChange={(e) => updateExperience(index, "endDate", e.target.value)} />
                                    </div>
                                )}
                            </div>
                            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={exp.currentlyWorking}
                                    onChange={(e) => updateExperience(index, "currentlyWorking", e.target.checked)}
                                />
                                I am currently working here
                            </label>
                            <textarea
                                className="input min-h-[80px]"
                                placeholder="Job Description..."
                                value={exp.description}
                                onChange={(e) => updateExperience(index, "description", e.target.value)}
                            />
                            <button onClick={() => removeExperience(index)} className="text-red-400 hover:text-red-500 text-sm">Remove Experience</button>
                        </div>
                    ))}
                    <button onClick={addExperience} className="border border-dashed border-slate-600 hover:border-blue-500 rounded-lg py-2 w-full text-slate-400 hover:text-blue-400">+ Add Experience</button>
                </div>

                {/* EDUCATION */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-slate-700 pb-2">Education</h3>
                    {formData.education.map((edu, index) => (
                        <div key={index} className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-3">
                            <div className="grid md:grid-cols-2 gap-4">
                                <input className="input" placeholder="Institution / University" value={edu.institution} onChange={(e) => updateEducation(index, "institution", e.target.value)} />
                                <input className="input" placeholder="Degree (e.g. B.Tech)" value={edu.degree} onChange={(e) => updateEducation(index, "degree", e.target.value)} />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input className="input" placeholder="Field of Study" value={edu.fieldOfStudy} onChange={(e) => updateEducation(index, "fieldOfStudy", e.target.value)} />
                                <input className="input" placeholder="Grade / GPA" value={edu.grade} onChange={(e) => updateEducation(index, "grade", e.target.value)} />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <input type="date" className="input" value={edu.startDate} onChange={(e) => updateEducation(index, "startDate", e.target.value)} />
                                <input type="date" className="input" value={edu.endDate} disabled={edu.currentlyStudying} onChange={(e) => updateEducation(index, "endDate", e.target.value)} />
                            </div>
                            <button onClick={() => removeEducation(index)} className="text-red-400 hover:text-red-500 text-sm">Remove Education</button>
                        </div>
                    ))}
                    <button onClick={addEducation} className="border border-dashed border-slate-600 hover:border-blue-500 rounded-lg py-2 w-full text-slate-400 hover:text-blue-400">+ Add Education</button>
                </div>

                {/* SERVICES */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-slate-700 pb-2">Services You Offer</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {formData.services.map((service, index) => (
                            <div key={index} className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-3">
                                <input className="input" placeholder="Service Title (e.g. UI/UX Design)" value={service.title} onChange={(e) => updateServices(index, "title", e.target.value)} />
                                <textarea className="input text-sm" placeholder="Brief description..." value={service.description} onChange={(e) => updateServices(index, "description", e.target.value)} />
                                <input className="input text-sm" placeholder="Service Link (Optional)" value={service.link} onChange={(e) => updateServices(index, "link", e.target.value)} />
                                <button onClick={() => removeServices(index)} className="text-red-500 text-xs">Remove</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={addServices} className="text-blue-400 hover:text-blue-500 text-sm">+ Add Service</button>
                </div>

                {/* BLOGS */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-slate-700 pb-2">Recent Blogs</h3>
                    {formData.blogs.map((blog, index) => (
                        <div key={index} className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-3">
                            <input className="input" placeholder="Blog Title" value={blog.title} onChange={(e) => updateBlogs(index, "title", e.target.value)} />
                            <input className="input" placeholder="Blog URL / Link" value={blog.link} onChange={(e) => updateBlogs(index, "link", e.target.value)} />
                            <textarea className="input text-sm" placeholder="Short Summary..." value={blog.description} onChange={(e) => updateBlogs(index, "description", e.target.value)} />
                            <button onClick={() => removeBlogs(index)} className="text-red-500 text-xs">Remove Blog</button>
                        </div>
                    ))}
                    <button onClick={addBlogs} className="text-blue-400 hover:text-blue-500 text-sm">+ Add Blog Post</button>
                </div>

                {/* LANGUAGES */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-slate-700 pb-2">
                        Languages
                    </h3>

                    {formData.languages.map((lang, index) => (
                        <div key={index} className="grid grid-cols-2 gap-3">
                            <input
                                className="input"
                                placeholder="Language"
                                value={lang.name}
                                onChange={(e) =>
                                    updateLanguage(index, "name", e.target.value)
                                }
                            />
                            <input
                                className="input"
                                placeholder="Proficiency"
                                value={lang.proficiency}
                                onChange={(e) =>
                                    updateLanguage(index, "proficiency", e.target.value)
                                }
                            />
                        </div>
                    ))}

                    <button
                        onClick={addLanguage}
                        className="text-blue-400 hover:text-blue-500 text-sm"
                    >
                        + Add Language
                    </button>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                {/* NEXT BUTTON */}
                <div className="flex justify-end">
                    <button
                        onClick={handleNext}
                        className="bg-blue-600 hover:bg-blue-700 px-8 py-2 rounded-lg font-semibold"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );

};

export default UserInfo;
