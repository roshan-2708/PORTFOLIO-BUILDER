import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TemplateRenderer from './TemplateRenderer'
import { fetchSinglePortfolio } from '../services/operation/portfolioAPI'

const ViewPortfolio = () => {
    const { id } = useParams()
    const [portfolio, setPortfolio] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPortfolio = async () => {
            try {
                const res = await fetchSinglePortfolio(id)
                console.log("Fetched portfolio:", res);
                setPortfolio(res);
            } catch (error) {
                console.log("Failed to load portfolio.")
            } finally {
                setLoading(false)
            }
        }
        loadPortfolio()
    }, [id])
    
    if (loading) {
        return <div className="text-center mt-20 text-white">Loading...</div>
    }

    if (!portfolio) {
        return <div className="text-center mt-20 text-red-500">
            Portfolio not found
        </div>
    }

    return (
        <TemplateRenderer
            template={portfolio.template}
            data={portfolio}
        />
    )
}

export default ViewPortfolio
