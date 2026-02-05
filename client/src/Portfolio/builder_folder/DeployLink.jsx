import React from "react";

const DeployLink = () => {
    return (
        <div className="min-h-screen flex items-center justify-center text-white">
            {/* Card */}
            <div className="border-2 border-orange-500 rounded-2xl w-[540px] p-8 space-y-8">

                {/* Heading */}
                <h2 className="text-2xl font-semibold text-center">
                    Deploy link
                </h2>

                {/* Link Box */}
                <div className="border-2 border-orange-500 rounded-xl px-6 py-5 text-center text-lg">
                    localhost link
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-10 pt-4">
                    <button className="border-2 border-orange-500 rounded-xl px-8 py-3 text-lg hover:bg-orange-500 hover:text-black transition">
                        Copy
                    </button>

                    <button className="border-2 border-orange-500 rounded-xl px-8 py-3 text-lg hover:bg-orange-500 hover:text-black transition">
                        Preview
                    </button>
                </div>
                <button className="border-2 border-orange-500 rounded-xl px-8 py-3 text-lg hover:bg-orange-500 hover:text-black transition">
                    Done
                </button>
            </div>
        </div>
    );
};

export default DeployLink;
