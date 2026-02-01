import React from 'react'

const FeatureCard = ({ title, description, whyItMatters }) => {
    return (
        <div className='bg-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition '>
            <h3 className='text-xl font-semibold text-gray-900 mb-3' >
                {title}
            </h3>

            <p className=' text-gray-600 mb-4 '>
                {description}
            </p>

            <p className='text-sm text-gray-500'>
                <span className='font-medium text-gray-700'>Why is it matters:</span>{" "}
                {whyItMatters}
            </p>
        </div>
    )
}

export default FeatureCard
