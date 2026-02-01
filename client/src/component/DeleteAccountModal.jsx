import React from "react";

export default function DeleteAccountModal({
    isOpen,
    onClose,
    onConfirm,
    loading,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-[460px] rounded-2xl shadow-xl p-6 relative">

                {/* Title */}
                <h2 className="text-xl font-semibold text-red-600 mb-6">
                    Delete your Account
                </h2>

                {/* Inner box */}
                <div className="border border-red-500 rounded-xl p-6 text-center">
                    <p className="text-lg font-medium text-gray-800 mb-8">
                        Are you sure?
                    </p>

                    <p className="text-red-600 mb-8">
                        Your all information will be no longer access later.
                    </p>

                    <div className="flex justify-center gap-6">
                        {/* YES */}
                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="px-6 py-3 rounded-xl border border-red-600 text-red-600 font-semibold hover:bg-red-600 hover:text-white transition"
                        >
                            {loading ? "Deleting..." : "Yes"}
                        </button>

                        {/* NO */}
                        <button
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl border border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white transition"
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
