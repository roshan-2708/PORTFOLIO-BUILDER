import React, { useState } from "react";

const PublishModal = ({ onPublish, onDraft, onBack }) => {
    const [checked, setChecked] = useState(false);

    return (
        <div className="flex flex-col items-center gap-6 text-white">
            <h2 className="text-2xl font-semibold">
                Publish or Save as Draft
            </h2>

            {/* Checkbox */}
            <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setChecked(prev => !prev)}
            >
                <div className="w-6 h-6 border border-white flex items-center justify-center">
                    {checked && <span className="font-bold">✓</span>}
                </div>
                <span className="text-lg">Publish portfolio</span>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-6">
                <button
                    onClick={onBack}
                    className="px-6 py-2 border rounded"
                >
                    Previous
                </button>

                <button
                    onClick={() => (checked ? onPublish() : onDraft())}
                    className="px-6 py-2 bg-blue-600 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PublishModal;
