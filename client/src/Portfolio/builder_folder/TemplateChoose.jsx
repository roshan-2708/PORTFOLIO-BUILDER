import React, { useState } from 'react';
import { createPortfolio } from '../../services/operation/portfolioAPI';

const TemplateChoose = ({ selected, onSelect, onNext, onBack, portfolioData = {}, setPortfolioData, }) => {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    const templates = [
        { id: 1, name: 'Template 1' },
        { id: 2, name: 'Template 2' },
        { id: 3, name: 'Template 3' },
    ];

    const handleNext = async () => {
        if (!selected) return alert('Please select a template');
        setLoading(true);

        try {
            const formData = new FormData();
            const { userInfo } = portfolioData;

            formData.append('title', userInfo.title);
            formData.append('about', userInfo.about);
            formData.append('template', selected.name);
            formData.append('skills', JSON.stringify(userInfo.skills));
            formData.append('languages', JSON.stringify(userInfo.languages));
            formData.append('contact', JSON.stringify(userInfo.contacts));

            // Remove `image` from projects before sending
            const projectsToSend = userInfo.projects.map(({ image, ...rest }) => rest);
            formData.append('projects', JSON.stringify(projectsToSend));

            // Append profile image if exists
            if (userInfo.profileImage) {
                formData.append('userImage', userInfo.profileImage);
            }

            // Append project images individually
            userInfo.projects.forEach((project) => {
                if (project.image instanceof File) {
                    formData.append('projectImages', project.image);
                }
            });

            const result = await createPortfolio(formData, token);

            if (result?.portfolio) {
                setPortfolioData(prev => ({
                    ...prev,
                    portfolio: result.portfolio, // ✅ STORE FULL PORTFOLIO
                }));
                onNext();
            } else {
                alert("Portfolio creation failed");
            }


        } catch (error) {
            console.error('Error creating portfolio:', error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-white gap-10">

            <h1 className="text-3xl font-bold tracking-wide">
                Choose a template as your choice
            </h1>

            <div className="flex gap-6">
                {templates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => onSelect(template)}
                        className={`px-8 py-4 rounded-lg border transition
                            ${selected?.id === template.id
                                ? 'bg-blue-600 border-blue-500'
                                : 'border-gray-500 hover:border-white'}
                        `}
                    >
                        {template.name}
                    </button>
                ))}
            </div>

            <div className="flex gap-6 mt-10">
                <button
                    onClick={onBack}
                    className="px-8 py-2 rounded-lg border border-gray-500 hover:border-white transition"
                >
                    Prev
                </button>

                <button
                    onClick={handleNext}
                    className={`px-8 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition
                        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default TemplateChoose;
