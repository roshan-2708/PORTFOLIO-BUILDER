import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserInfo from "../builder_folder/UserInfo";
import TemplateChoose from "../builder_folder/TemplateChoose";
import { Check, Rocket, Layout, User, Send, Link as LinkIcon } from 'lucide-react'; // Icons use karein


import {
    fetchSinglePortfolio,
    updatePortfolio,
} from "../../services/operation/portfolioAPI";

const UpdatePortfolio = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);

    const [portfolioData, setPortfolioData] = useState({
        userInfo: {
            title: "",
            about: "",
            profileImage: null,
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
        },
        template: null,
        portfolio: null,
        status: "draft",
        deployLink: "",
    });

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    /* ---------------- FETCH DATA ---------------- */
    useEffect(() => {
        const getPortfolio = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetchSinglePortfolio(id, token);

                if (!res) return;

                setPortfolioData({
                    userInfo: {
                        title: res.title || "",
                        about: res.about || "",
                        profileImage: res.profileImage || null,
                        skills: res.skills || [],
                        projects: res.projects || [],
                        languages: res.languages || [],
                        contacts: {
                            email: res?.contact?.email || '',
                            github: res?.contact?.github || '',
                            linkedin: res?.contact?.linkedin || '',
                        },
                        experience: res.experience || [],
                        education: res.education || [],
                        services: res.services || [],
                        blogs: res.blogs || [],
                    },
                    template: res.template || null,
                    portfolio: res,
                    status: res.status || 'draft',
                    deployLink: res.deployLink || '',
                });
            } catch (err) {
                console.error(err);
                alert("Failed to load portfolio");
            } finally {
                setLoading(false);
            }
        };
        getPortfolio();
    }, [id]);

    /* ---------------- FINAL UPDATE ---------------- */
    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();
            const userInfo = portfolioData.userInfo;

            formData.append("title", userInfo.title);
            formData.append("about", userInfo.about);
            formData.append("skills", JSON.stringify(userInfo.skills));
            formData.append("projects", JSON.stringify(userInfo.projects));
            formData.append("languages", JSON.stringify(userInfo.languages));
            formData.append("contact", JSON.stringify(userInfo.contacts));
            formData.append("experience", JSON.stringify(userInfo.experience));
            formData.append("education", JSON.stringify(userInfo.education));
            formData.append("services", JSON.stringify(userInfo.services));
            formData.append("blogs", JSON.stringify(userInfo.blogs));
            formData.append(
                "template",
                typeof portfolioData.template === "object"
                    ? portfolioData.template._id
                    : portfolioData.template
            );

            if (userInfo.profileImage instanceof File) {
                formData.append("profileImage", userInfo.profileImage);
            }

            const response = await updatePortfolio(id, formData, token);

            if (response?.success) {
                alert("✅ Portfolio Updated Successfully");
                navigate("/my-portfolios");
            }
        } catch (error) {
            console.error(error);
            alert("Update failed");
        }
    };
    const steps = [
        { id: 1, title: "User Info", icon: <User size={18} /> },
        { id: 2, title: "Template", icon: <Layout size={18} /> },
    ];
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading portfolio...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0F1A] text-white p-6">

            <div className="max-w-5xl mx-auto mb-12 text-center">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-3">
                    Update Your Portfolio 🚀
                </h1>
                <p className="text-gray-400 text-lg">Follow the steps below to build your professional presence.</p>
            </div>

            {/* Premium Stepper Section */}
            <div className="max-w-4xl mx-auto mb-20 relative">

                {/* Background Line */}
                <div className="absolute top-6 left-0 w-full h-[3px] bg-gray-800 rounded-full"></div>

                {/* Active Gradient Progress Line */}
                <div
                    className="absolute top-6 left-0 h-[3px] rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 transition-all duration-500 ease-in-out shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                    style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                ></div>

                <div className="flex justify-between items-center relative z-10">
                    {steps.map((item) => {
                        const isActive = step === item.id;
                        const isCompleted = step > item.id;

                        return (
                            <div
                                key={item.id}
                                className="flex flex-col items-center relative cursor-pointer transition-all duration-300"
                            >
                                {/* Step Circle */}
                                <div
                                    className={`
              w-14 h-14 flex items-center justify-center rounded-full border-2
              transition-all duration-300
              ${isCompleted
                                            ? "bg-green-500 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.7)] scale-110"
                                            : isActive
                                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.7)] scale-110"
                                                : "bg-gray-900 border-gray-700 hover:border-gray-500"}
            `}
                                >
                                    {isCompleted ? (
                                        <Check size={22} className="text-white" />
                                    ) : (
                                        <span
                                            className={`transition-all ${isActive ? "text-white" : "text-gray-500"
                                                }`}
                                        >
                                            {item.icon}
                                        </span>
                                    )}
                                </div>

                                {/* Step Label */}
                                <span
                                    className={`
              mt-4 text-sm font-semibold tracking-wide transition-all duration-300
              ${isActive
                                            ? "text-yellow-400"
                                            : isCompleted
                                                ? "text-green-400"
                                                : "text-gray-500"
                                        }
            `}
                                >
                                    {item.title}
                                </span>

                                {/* Active Dot Indicator */}
                                {isActive && (
                                    <div className="absolute -bottom-3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            {step === 1 && (
                <UserInfo
                    data={portfolioData.userInfo}
                    onNext={(data) => {
                        setPortfolioData(prev => ({ ...prev, userInfo: data }));
                        setStep(2);
                    }}
                />
            )}

            {step === 2 && (
                <TemplateChoose
                    selected={portfolioData.template}
                    onSelect={(template) =>
                        setPortfolioData(prev => ({ ...prev, template }))
                    }
                    onNext={handleUpdate}
                    onBack={prevStep}
                    portfolioData={portfolioData}
                    setPortfolioData={setPortfolioData}
                />
            )}
        </div>
    );
};

export default UpdatePortfolio;