import React, { useEffect, useState } from 'react'
import UserInfo from './builder_folder/UserInfo';
import TemplateChoose from './builder_folder/TemplateChoose';
import PublishModal from './builder_folder/PublishModal';
import DeployLink from './builder_folder/DeployLink';
import { createPortfolio, publishPortfolio } from '../services/operation/portfolioAPI'
import { Check, Rocket, Layout, User, Send, Link as LinkIcon } from 'lucide-react'; // Icons use karein

const BuildingPortfolio = () => {
    const [step, setStep] = useState(1);

    const [portfolioData, setPortfolioData] = useState({
        userInfo: {},
        template: null,
        portfolio: null,
        status: "draft",
        deployLink: "",
    });

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const steps = [
        { id: 1, title: "User Info", icon: <User size={18} /> },
        { id: 2, title: "Template", icon: <Layout size={18} /> },
        { id: 3, title: "Publish", icon: <Send size={18} /> },
        { id: 4, title: "Deploy", icon: <Rocket size={18} /> }
    ];

    return (
        <div className="min-h-screen bg-[#0B0F1A] text-white p-4 md:p-8">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto mb-12 text-center">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-3">
                    Launch Your Portfolio 🚀
                </h1>
                <p className="text-gray-400 text-lg">Follow the steps below to build your professional presence.</p>
            </div>

            {/* Modern Stepper Section */}
            <div className='max-w-4xl mx-auto mb-16 relative'>
                {/* Background Line */}
                <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-800 -z-10"></div>

                {/* Active Progress Line */}
                <div
                    className="absolute top-5 left-0 h-[2px] bg-yellow-500 transition-all duration-500 ease-in-out -z-10"
                    style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                ></div>

                <div className="flex justify-between items-center">
                    {steps.map((item) => {
                        const isActive = step === item.id;
                        const isCompleted = step > item.id;

                        return (
                            <div key={item.id} className='flex flex-col items-center group'>
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2
                                    ${isCompleted ? "bg-green-500 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]" :
                                        isActive ? "bg-blue-600 border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.4)]" :
                                            "bg-gray-900 border-gray-700"}
                                `}>
                                    {isCompleted ? <Check size={20} className="text-white font-bold" /> :
                                        <span className={isActive ? "text-white" : "text-gray-500"}>{item.icon}</span>}
                                </div>
                                <span className={`
                                    absolute mt-12 text-xs font-bold uppercase tracking-wider transition-colors duration-300
                                    ${isActive ? "text-yellow-500" : isCompleted ? "text-green-500" : "text-gray-600"}
                                `}>
                                    {item.title}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Content Container with Glassmorphism */}
            <div className="max-w-6xl mx-auto bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl overflow-hidden min-h-[500px] animate-in fade-in zoom-in duration-500">
                <div className="p-2 md:p-6">
                    {step === 1 && (
                        <UserInfo
                            data={portfolioData.userInfo}
                            onNext={(data) => {
                                setPortfolioData((prev) => ({ ...prev, userInfo: data }));
                                setStep(2);
                            }}
                        />
                    )}

                    {step === 2 && (
                        <TemplateChoose
                            selected={portfolioData.template}
                            onSelect={(template) => setPortfolioData((prev) => ({ ...prev, template }))}
                            // onNext={nextStep}
                            onNext={async () => {
                                try {
                                    const token = localStorage.getItem("token");
                                    const formData = new FormData();
                                    const { userInfo, template } = portfolioData;

                                    formData.append("title", userInfo.title);
                                    formData.append("about", userInfo.about);
                                    formData.append("template", template.name);
                                    // formData.append(
                                    //     "template",
                                    //     typeof template === "object" ? template._id : template
                                    // );

                                    formData.append("skills", JSON.stringify(userInfo.skills));
                                    formData.append("languages", JSON.stringify(userInfo.languages));
                                    formData.append("contact", JSON.stringify(userInfo.contacts));
                                    formData.append("experience", JSON.stringify(userInfo.experience));
                                    formData.append("education", JSON.stringify(userInfo.education));
                                    formData.append("services", JSON.stringify(userInfo.services));
                                    formData.append("blogs", JSON.stringify(userInfo.blogs));

                                    const projectsWithoutImages = userInfo.projects.map(
                                        ({ image, ...rest }) => rest
                                    );
                                    formData.append("projects", JSON.stringify(projectsWithoutImages));

                                    if (userInfo.profileImage instanceof File) {
                                        formData.append("profileImage", userInfo.profileImage);
                                    }

                                    userInfo.projects.forEach((project) => {
                                        if (project.image instanceof File) {
                                            formData.append("projectImages", project.image);
                                        }
                                    });

                                    const result = await createPortfolio(formData, token);

                                    if (result?.portfolio) {
                                        setPortfolioData(prev => ({
                                            ...prev,
                                            portfolio: result.portfolio
                                        }));
                                        nextStep();
                                    }
                                } catch (err) {
                                    alert("Creation failed");
                                }
                            }}
                            onBack={prevStep}
                            portfolioData={portfolioData}
                            setPortfolioData={setPortfolioData}
                        />
                    )}

                    {step === 3 && (
                        <PublishModal
                            onPublish={async () => {
                                try {
                                    const token = localStorage.getItem("token");
                                    const portfolioId = portfolioData?.portfolio?._id;
                                    if (!portfolioId) return alert("Portfolio ID not found");

                                    const result = await publishPortfolio(portfolioId, token);
                                    if (result?.deployUrl) {
                                        setPortfolioData(prev => ({
                                            ...prev,
                                            status: "published",
                                            deployLink: result.deployUrl,
                                        }));
                                    }
                                    nextStep();
                                } catch (error) {
                                    alert("Failed to publish portfolio");
                                }
                            }}
                            onDraft={() => { window.location.href = "/my-portfolios"; }}
                            onBack={prevStep}
                        />
                    )}

                    {step === 4 && (
                        <DeployLink
                            portfolioData={portfolioData}
                            onBack={prevStep}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default BuildingPortfolio