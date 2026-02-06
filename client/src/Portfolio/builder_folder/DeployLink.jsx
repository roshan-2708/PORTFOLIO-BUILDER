import React from "react";
import { useNavigate } from "react-router-dom";

const DeployLink = ({ portfolioData, onBack }) => {
    const navigate = useNavigate();

    if (!portfolioData?.deployLink) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-400">
                Deploy link not available
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 z-50">
            <div className="w-full max-w-lg bg-slate-900 rounded-2xl shadow-xl p-8 text-white space-y-6">

                {/* SUCCESS HEADER */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold">
                        🎉 Portfolio Published!
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Your portfolio is live and ready to share
                    </p>
                </div>

                {/* LINK BOX */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3">
                    <label className="text-xs text-slate-400 uppercase tracking-wide">
                        Live URL
                    </label>

                    <input
                        value={portfolioData.deployLink}
                        readOnly
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none"
                    />
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigator.clipboard.writeText(portfolioData.deployLink)}
                        className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold transition"
                    >
                        Copy Link
                    </button>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full border border-slate-600 hover:border-white py-2 rounded-lg transition"
                    >
                        Go to Dashboard
                    </button>
                </div>

                {/* FOOTER NOTE */}
                <p className="text-center text-xs text-slate-400 pt-2">
                    You can update or redeploy your portfolio anytime from the dashboard.
                </p>
            </div>
        </div>
    );
};

export default DeployLink;
