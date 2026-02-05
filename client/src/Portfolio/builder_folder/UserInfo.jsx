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
        <div className="p-6 text-white space-y-6">

            {/* USER IMAGE */}
            <img
                src={user?.image}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover"
            />

            {/* NAME */}
            <input value={user?.firstName || ""} disabled />
            <input value={user?.lastName || ""} disabled />

            {/* TITLE */}
            <input
                placeholder="Portfolio Title"
                value={formData.title}
                onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                }
            />

            {/* ABOUT */}
            <textarea
                placeholder="About You"
                value={formData.about}
                onChange={(e) =>
                    setFormData({ ...formData, about: e.target.value })
                }
            />
            {/* contact */}
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.contacts.email}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            contacts: {
                                ...formData.contacts, // keep other contact fields
                                email: e.target.value, // update only email
                            },
                        })
                    }
                />

                <input
                    type="text"
                    name="github"
                    placeholder="GitHub"
                    value={formData.contacts.github}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            contacts: {
                                ...formData.contacts,
                                github: e.target.value,
                            },
                        })
                    }
                />

                <input
                    type="text"
                    name="linkedin"
                    placeholder="LinkedIn"
                    value={formData.contacts.linkedin}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            contacts: {
                                ...formData.contacts,
                                linkedin: e.target.value,
                            },
                        })
                    }
                />

            </div>



            {/* SKILLS */}
            <div>
                <input
                    placeholder="Skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                />
                <button onClick={addSkill}>Add +</button>

                <div className="flex gap-2 flex-wrap mt-2">
                    {formData.skills.map((skill, i) => (
                        <span
                            key={i}
                            className="bg-gray-700 px-3 py-1 rounded-full"
                        >
                            {skill}
                            <button onClick={() => removeSkill(i)}> ✕</button>
                        </span>
                    ))}
                </div>
            </div>

            {/* PROJECTS */}
            <div className="border p-4 rounded space-y-4">
                <h3 className="font-semibold">Projects</h3>

                {formData.projects.map((project, index) => (
                    <div key={index} className="space-y-2 border p-3 rounded">
                        <input
                            placeholder="Project Title"
                            value={project.title}
                            onChange={(e) =>
                                updateProject(index, "title", e.target.value)
                            }
                        />

                        <textarea
                            placeholder="Description"
                            value={project.description}
                            onChange={(e) =>
                                updateProject(index, "description", e.target.value)
                            }
                        />

                        <input
                            placeholder="Project Link"
                            value={project.link}
                            onChange={(e) =>
                                updateProject(index, "link", e.target.value)
                            }
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                updateProject(index, "image", e.target.files[0])
                            }
                        />

                        <button
                            className="text-red-400"
                            onClick={() => removeProject(index)}
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button onClick={addProject}>Add Project +</button>
            </div>

            {/* LANGUAGES */}
            <div className="border p-4 rounded space-y-4">
                <h3 className="font-semibold">Languages</h3>

                {formData.languages.map((lang, index) => (
                    <div key={index} className="flex gap-3">
                        <input
                            placeholder="Language"
                            value={lang.name}
                            onChange={(e) =>
                                updateLanguage(index, "name", e.target.value)
                            }
                        />

                        <input
                            placeholder="Proficiency"
                            value={lang.proficiency}
                            onChange={(e) =>
                                updateLanguage(index, "proficiency", e.target.value)
                            }
                        />

                        <button
                            className="text-red-400"
                            onClick={() => removeLanguage(index)}
                        >
                            ✕
                        </button>
                    </div>
                ))}

                <button onClick={addLanguage}>Add Language +</button>
            </div>

            {error && <p className="text-red-400">{error}</p>}

            <button
                onClick={handleNext}
                className="bg-blue-600 px-6 py-2 rounded"
            >
                Next →
            </button>
        </div>
    );
};

export default UserInfo;
