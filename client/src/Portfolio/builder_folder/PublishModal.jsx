import React from "react";

const PublishModal = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center text-white">

            {/* Card */}
            <div className="border-2 border-red-500 rounded-2xl p-10 w-[480px] space-y-10">

                {/* Heading */}
                <h2 className="text-2xl font-semibold text-center">
                    Make it publish or draft
                </h2>

                {/* Checkbox */}
                <div className="flex items-center gap-4 justify-center">
                    <div className="w-7 h-7 border-2 border-red-500 rounded-md" />
                    <span className="text-lg">Checkbox</span>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-10">
                    <button className="px-8 py-2 rounded-lg border border-gray-500 hover:border-white transition">
                        Previous
                    </button>

                    <button className="px-8 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
                        Next
                    </button>
                </div>
            </div>

        </div>
    );
};

export default PublishModal;
