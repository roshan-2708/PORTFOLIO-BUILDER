import React from "react";

const DeleteModal = ({
    isOpen,
    onClose,
    onConfirm,
    deleting
}) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#111827] border border-gray-700 rounded-2xl p-8 w-[90%] max-w-md shadow-2xl">

                <h2 className="text-xl font-bold text-white mb-4">
                    Delete Portfolio?
                </h2>

                <p className="text-gray-400 text-sm mb-6">
                    If you delete this portfolio, all associated data
                    (projects, experience, education, services, blogs)
                    will be permanently removed.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={deleting}
                        className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
                    >
                        {deleting ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;