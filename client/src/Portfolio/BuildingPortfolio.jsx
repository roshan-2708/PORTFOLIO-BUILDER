import React, { useEffect, useState } from 'react'
import UserInfo from './builder_folder/UserInfo';
import TemplateChoose from './builder_folder/TemplateChoose';
import PublishModal from './builder_folder/PublishModal';
import DeployLink from './builder_folder/DeployLink';
import { publishPortfolio } from '../services/operation/portfolioAPI'


const BuildingPortfolio = () => {
    const [step, setStep] = useState(1);

    const [portfolioData, setPortfolioData] = useState({
        userInfo: {},
        template: null,
        portfolio: null,
        status: "draft",
        deployLink: "",
    });
    useEffect(() => {
        console.log("✅ UPDATED userInfo:", portfolioData.userInfo);
    }, [portfolioData.userInfo]);

    const nextStep = () => {
        console.log('User info data', portfolioData.userInfo);
        setStep((prev) => prev + 1)
    };
    const prevStep = () => setStep((prev) => prev - 1);


    const steps = [
        { id: 1, title: "User Info" },
        { id: 2, title: "template choose" },
        { id: 3, title: "publish" },
        { id: 4, title: "copy link" }
    ];

    return (
        <div className="min-h-screen text-white p-8">
            <h1 className="text-2xl font-bold mb-6">
                Start creating your portfolio 🚀
            </h1>
            <div className='flex gap-6 mb-10'>
                {
                    steps.map((item, index) => {
                        const isActive = step === item.id;
                        const isCompleted = step > item.id;
                        const isLast = index === steps.length - 1;


                        return (
                            <div key={item.id} className='flex items-center gap-3'>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isCompleted ? "bg-green-500" : isActive ? "bg-blue-500" : "bg-gray-700"
                                    } `}>
                                    {
                                        item.id
                                    }
                                </div>
                                <span className={`
                                        text-sm ${isActive ? "font-semibold" : "text-gray-400"}
                                    `}>
                                    {
                                        item.title
                                    }
                                </span>
                                {
                                    !isLast && (
                                        <div className='w-10 h-[2px] bg-yellow-500'></div>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
            {/* steps page */}
            {step === 1 && (
                <UserInfo
                    data={portfolioData.userInfo}
                    onNext={(data) => {
                        console.log("📦 RECEIVED USER INFO:", data);

                        setPortfolioData((prev) => ({
                            ...prev,
                            userInfo: data,
                        }));

                        setStep(2);
                    }}
                />
            )}

            {step === 2 && (
                <TemplateChoose
                    selected={portfolioData.template}
                    onSelect={(template) =>
                        setPortfolioData((prev) => ({
                            ...prev,
                            template,
                        }))
                    }
                    onNext={nextStep}
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

                            if (!portfolioId) {
                                alert("Portfolio ID not found");
                                return;
                            }

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
                            console.error(error);
                            alert("Failed to publish portfolio");
                        }
                    }}

                    onDraft={() => {
                        window.location.href = "/my-portfolios";
                    }}

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
    )
}

export default BuildingPortfolio
