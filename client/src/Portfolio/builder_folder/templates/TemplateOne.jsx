import { useEffect, useState } from "react";
import { userProfile } from "../../../services/operation/authAPI";

const TemplateOne = ({ data }) => {
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
        contact = {},
        languages = [],
    } = data;

    return (
        <div className="min-h-screen bg-white text-gray-800 font-sans">
            {/* HEADER */}
            <header className="flex flex-col md:flex-row items-center gap-6 p-8 border-b">
                {/* PROFILE IMAGE */}
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
                    </div>
                </div>

                {/* NAME & TITLE */}
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold">{title}</h1>
                    <p className="text-gray-600 mt-2 max-w-xl">{about}</p>
                </div>
            </header>

            {/* CONTENT */}
            <main className="p-8 space-y-10 max-w-5xl mx-auto">

                {/* CONTACT */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Contact</h2>
                    <div className="flex flex-wrap gap-4 text-sm">
                        {contact?.email && (
                            <span className="px-3 py-1 bg-gray-100 rounded">
                                📧 {contact.email}
                            </span>
                        )}
                        {contact?.github && (
                            <a
                                href={contact.github}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1 bg-gray-100 rounded hover:underline"
                            >
                                💻 GitHub
                            </a>
                        )}
                        {contact?.linkedin && (
                            <a
                                href={contact.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1 bg-gray-100 rounded hover:underline"
                            >
                                🔗 LinkedIn
                            </a>
                        )}
                    </div>
                </section>

                {/* SKILLS */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.length > 0 ? (
                            skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-1 text-sm bg-gray-200 rounded-full"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No skills added</p>
                        )}
                    </div>
                </section>

                {/* LANGUAGES */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Languages</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {languages.length > 0 ? (
                            languages.map((lang, i) => (
                                <div
                                    key={i}
                                    className="border rounded p-3 flex justify-between"
                                >
                                    <span>{lang.name}</span>
                                    <span className="text-sm text-gray-500">
                                        {lang.proficiency}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No languages added</p>
                        )}
                    </div>
                </section>

                {/* PROJECTS */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">Projects</h2>
                    <div className="space-y-5">
                        {projects.length > 0 ? (
                            projects.map((project, i) => (
                                <div
                                    key={i}
                                    className="border rounded-lg p-5 hover:shadow transition"
                                >
                                    <h3 className="text-lg font-bold">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        {project.description}
                                    </p>

                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-block mt-3 text-blue-600 text-sm hover:underline"
                                        >
                                            View Project →
                                        </a>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No projects added</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default TemplateOne;
