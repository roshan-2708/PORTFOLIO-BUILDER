import React, { useState } from "react";

const PublishModal = ({ onPublish, onDraft, onBack }) => {
    const [checked, setChecked] = useState(false);

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 z-50">
            <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-xl p-8 text-white space-y-6">

                {/* HEADER */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">
                        Final Step 🚀
                    </h2>
                    <p className="text-slate-400 text-sm">
                        Choose how you want to save your portfolio
                    </p>
                </div>

                {/* TOGGLE OPTION */}
                <div
                    onClick={() => setChecked(prev => !prev)}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition
                        ${checked
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-slate-700 hover:border-slate-500"}
                    `}
                >
                    <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center border transition
                            ${checked
                                ? "bg-blue-600 border-blue-600"
                                : "border-slate-500"}
                        `}
                    >
                        {checked && <span className="text-sm font-bold">✓</span>}
                    </div>

                    <div>
                        <p className="font-medium">Publish portfolio</p>
                        <p className="text-sm text-slate-400">
                            Make your portfolio public and shareable
                        </p>
                    </div>
                </div>

                {/* INFO NOTE */}
                <div className="text-xs text-slate-400 bg-slate-800 rounded-lg p-3">
                    {checked
                        ? "Your portfolio will be live and accessible to everyone."
                        : "You can publish your portfolio later from the dashboard."}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex justify-between pt-4">
                    <button
                        onClick={onBack}
                        className="px-6 py-2 rounded-lg border border-slate-600 hover:border-white transition"
                    >
                        Previous
                    </button>

                    <button
                        onClick={() => (checked ? onPublish() : onDraft())}
                        className={`px-8 py-2 rounded-lg font-semibold transition
                            ${checked
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-slate-700 hover:bg-slate-600"}
                        `}
                    >
                        {checked ? "Publish" : "Save as Draft"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PublishModal;
