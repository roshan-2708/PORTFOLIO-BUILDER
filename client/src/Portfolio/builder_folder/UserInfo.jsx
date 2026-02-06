import React, { useEffect, useState } from "react";
import { userProfile } from "../../services/operation/authAPI";

const UserInfo = ({ data, setData, onNext }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        about: "",
        skills: [],
        projects: [],
        languages: [],
        contacts: {
            email: "",
            github: "",
            linkedin: "",
        },
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
                    <img
                        src={user?.image}
                        alt="profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-slate-700"
                    />
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
