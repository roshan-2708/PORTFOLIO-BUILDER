import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const UsersPortfolio = () => {
    const navigate = useNavigate();
    return (
        <div className='text-white'>
            <button
                className='text-yellow-500'
                onClick={() => navigate('/dashboard')}
            >
                Back
            </button> <br />
            User's already created portfolios
        </div>
    )
}

export default UsersPortfolio
