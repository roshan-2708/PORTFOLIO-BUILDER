import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserInfo from "./UserInfo";
import {
    fetchSinglePortfolio,
    updatePortfolio,
} from "../../services/operation/portfolioAPI";

const UpdatePortfolio = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    // ✅ parent master state
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
    });

    /* ---------------- FETCH PORTFOLIO ---------------- */
    useEffect(() => {
        const getPortfolio = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetchSinglePortfolio(id, token);

                if (!res) return;

                // 🔥 map backend → frontend structure
                setPortfolioData({
                    title: res.title || "",
                    about: res.about || "",
                    profileImage: res.profileImage || null,
                    skills: res.skills || [],
                    projects: res.projects || [],
                    languages: res.languages || [],
                    contacts: {
                        email: res?.contacts?.email || "",
                        github: res?.contacts?.github || "",
                        linkedin: res?.contacts?.linkedin || "",
                    },
                    experience: res.experience || [],
                    education: res.educations || [],
                    services: res.services || [],
                    blogs: res.blogs || [],
                });
            } catch (err) {
                console.error("Fetch portfolio error", err);
                alert("Failed to load portfolio");
            } finally {
                setLoading(false);
            }
        };

        getPortfolio();
    }, [id]);

    /* ---------------- UPDATE HANDLER ---------------- */
    const handleNext = async (finalData) => {
        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("title", finalData.title);
            formData.append("about", finalData.about);
            formData.append("skills", JSON.stringify(finalData.skills));
            formData.append("projects", JSON.stringify(finalData.projects));
            formData.append("languages", JSON.stringify(finalData.languages));
            formData.append("contacts", JSON.stringify(finalData.contacts));
            formData.append("experience", JSON.stringify(finalData.experience));
            formData.append("education", JSON.stringify(finalData.education));
            formData.append("services", JSON.stringify(finalData.services));
            formData.append("blogs", JSON.stringify(finalData.blogs));

            // image if changed
            if (finalData.profileImage instanceof File) {
                formData.append("profileImage", finalData.profileImage);
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

    /* ---------------- UI ---------------- */
    return (
        <div className="bg-slate-900 min-h-screen">
            <UserInfo
                data={portfolioData}
                setData={setPortfolioData}
                onNext={handleNext}
            />
        </div>
    );
};

export default UpdatePortfolio;