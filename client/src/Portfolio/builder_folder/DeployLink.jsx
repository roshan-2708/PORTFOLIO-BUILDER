import React from "react";
import { useNavigate } from 'react-router-dom'

const DeployLink = ({ portfolioData, onBack }) => {
    const navigate = useNavigate()
    if (!portfolioData?.deployLink) {
        return <p>Deploy link not available</p>;
    }

    return (
        <div className="flex flex-col items-center gap-6 text-white">
            <h2 className="text-2xl font-bold">🎉 Portfolio Published!</h2>

            <input
                value={portfolioData.deployLink}
                readOnly
                className="px-4 py-2 w-[400px] text-black rounded"
            />

            <button
                onClick={() => navigator.clipboard.writeText(portfolioData.deployLink)}
                className="px-6 py-2 bg-green-600 rounded"
            >
                Copy Link
            </button>

            <button
                onClick={() => { navigate('/dashboard') }}
                className="px-6 py-2 border rounded"
            >
                Back
            </button>
        </div>
    );
};

export default DeployLink;
