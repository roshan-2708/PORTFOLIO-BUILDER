import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UserInfo from "../builder_folder/UserInfo";
import TemplateChoose from "../builder_folder/TemplateChoose";
import PublishModal from "../builder_folder/PublishModal";
import DeployLink from "../builder_folder/DeployLink";

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
        template: null,
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
                    title: res.title || "",
                    about: res.about || "",
                    profileImage: res.profileImage || null,
                    skills: res.skills || [],
                    projects: res.projects || [],
                    languages: res.languages || [],
                    contacts: {
                        email: res?.contact?.email || "",
                        github: res?.contact?.github || "",
                        linkedin: res?.contact?.linkedin || "",
                    },
                    experience: res.experience || [],
                    education: res.educations || [],
                    services: res.services || [],
                    blogs: res.blogs || [],
                    template: res.template || null,
                    status: res.status || "draft",
                    deployLink: res.deployLink || "",
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
            formData.append("title", portfolioData.title);
            formData.append("about", portfolioData.about);
            formData.append("skills", JSON.stringify(portfolioData.skills));
            formData.append("projects", JSON.stringify(portfolioData.projects));
            formData.append("languages", JSON.stringify(portfolioData.languages));
            formData.append("contact", JSON.stringify(portfolioData.contacts));
            formData.append("experience", JSON.stringify(portfolioData.experience));
            formData.append("education", JSON.stringify(portfolioData.education));
            formData.append("services", JSON.stringify(portfolioData.services));
            formData.append("blogs", JSON.stringify(portfolioData.blogs));
            formData.append("template", portfolioData.template);

            if (portfolioData.profileImage instanceof File) {
                formData.append("profileImage", portfolioData.profileImage);
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading portfolio...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0F1A] text-white p-6">

            {/* STEP 1 */}
            {step === 1 && (
                <UserInfo
                    data={portfolioData}
                    setData={setPortfolioData}
                    onNext={nextStep}
                />
            )}

            {/* STEP 2 */}
            {step === 2 && (
                <TemplateChoose
                    selected={portfolioData.template}
                    onSelect={(template) =>
                        setPortfolioData((prev) => ({ ...prev, template }))
                    }
                    onNext={nextStep}
                    onBack={prevStep}
                />
            )}

            {/* STEP 3 */}
            {step === 3 && (
                <PublishModal
                    onPublish={handleUpdate}
                    onDraft={() => navigate("/my-portfolios")}
                    onBack={prevStep}
                />
            )}

            {/* STEP 4 */}
            {step === 4 && (
                <DeployLink
                    portfolioData={portfolioData}
                    onBack={prevStep}
                />
            )}
        </div>
    );
};

export default UpdatePortfolio;