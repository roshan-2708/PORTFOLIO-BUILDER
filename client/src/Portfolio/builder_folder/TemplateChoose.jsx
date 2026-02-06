import React, { useState } from "react";
import { createPortfolio } from "../../services/operation/portfolioAPI";
import PortfolioPreview from "../PortfolioPreview";

const TemplateChoose = ({
    selected,
    onSelect,
    onNext,
    onBack,
    portfolioData = {},
    setPortfolioData,
}) => {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const templates = [
        { id: 1, name: "Template 1" },
        { id: 2, name: "Template 2" },
        { id: 3, name: "Template 3" },
    ];

    const handleNext = async () => {
        if (!selected) {
            alert("Please select a template");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            const { userInfo } = portfolioData;

            // BASIC INFO
            formData.append("title", userInfo.title);
            formData.append("about", userInfo.about);
            formData.append("template", selected.name);

            // ARRAYS
            formData.append("skills", JSON.stringify(userInfo.skills));
            formData.append("languages", JSON.stringify(userInfo.languages));
            formData.append("contact", JSON.stringify(userInfo.contacts));

            // PROJECTS (without images)
            const projectsWithoutImages = userInfo.projects.map(
                ({ image, ...rest }) => rest
            );
            formData.append("projects", JSON.stringify(projectsWithoutImages));

            // PROFILE IMAGE
            if (userInfo.profileImage instanceof File) {
                formData.append("profileImage", userInfo.profileImage);
            }

            // PROJECT IMAGES
            userInfo.projects.forEach((project) => {
                if (project.image instanceof File) {
                    formData.append("projectImages", project.image);
                }
            });

            const result = await createPortfolio(formData, token);

            if (result?.portfolio) {
                setPortfolioData((prev) => ({
                    ...prev,
                    portfolio: result.portfolio,
                }));
                onNext();
            } else {
                alert("Portfolio creation failed");
            }
        } catch (error) {
            console.error("Create portfolio error:", error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] text-white px-6 py-10">
            <h1 className="text-3xl font-bold text-center mb-10">
                Choose Your Portfolio Template
            </h1>

            {/* MAIN GRID */}
            <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">

                {/* LEFT SIDE: TEMPLATE CARDS */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {templates.map((template) => {
                        const isSelected = selected?.id === template.id;

                        return (
                            <div
                                key={template.id}
                                onClick={() => onSelect(template)}
                                className={`
                  cursor-pointer rounded-2xl border transition-all duration-300
                  bg-slate-800 hover:bg-slate-700
                  ${isSelected
                                        ? "border-blue-500 scale-105 shadow-lg shadow-blue-500/20"
                                        : "border-slate-600"}
                `}
                            >
                                {/* PREVIEW PLACEHOLDER */}
                                <div className="h-40 rounded-t-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-slate-400 text-sm">
                                    {template.name} Preview
                                </div>

                                {/* INFO */}
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold">{template.name}</h3>
                                    <p className="text-sm text-slate-400">
                                        Clean & modern layout
                                    </p>
                                </div>

                                {/* SELECTED BADGE */}
                                {isSelected && (
                                    <span className="absolute top-3 right-3 bg-blue-600 text-xs px-3 py-1 rounded-full">
                                        Selected
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* RIGHT SIDE: LIVE PREVIEW */}
                <div className="bg-slate-900 rounded-2xl p-4 h-[520px] overflow-hidden border border-slate-700">
                    <PortfolioPreview
                        template={selected}
                        userInfo={portfolioData.userInfo}
                    />
                </div>
            </div>

            {/* NAV BUTTONS */}
            <div className="flex justify-center gap-6 mt-12">
                <button
                    onClick={onBack}
                    className="px-8 py-2 rounded-lg border border-slate-600 hover:border-white transition"
                >
                    Prev
                </button>

                <button
                    onClick={handleNext}
                    disabled={loading}
                    className={`px-8 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
          `}
                >
                    {loading ? "Creating..." : "Next"}
                </button>
            </div>
        </div>
    );
};

export default TemplateChoose;
