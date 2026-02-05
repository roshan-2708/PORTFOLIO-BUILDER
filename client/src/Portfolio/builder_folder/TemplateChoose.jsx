import React from 'react'

const TemplateChoose = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-white gap-10">

            {/* Heading */}
            <h1 className="text-3xl font-bold tracking-wide">
                Choose a template as your choice
            </h1>

            {/* Navigation Buttons */}
            <div className="flex gap-6">
                <button className="px-8 py-2 rounded-lg border border-gray-500 hover:border-white transition">
                    Prev
                </button>

                <button className="px-8 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
                    Next
                </button>
            </div>

        </div>
    )
}

export default TemplateChoose
