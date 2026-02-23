import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TemplateRenderer from './TemplateRenderer'
import { fetchSinglePortfolio, fetchPortfolioBySlug } from '../services/operation/portfolioAPI'

const ViewPortfolio = () => {
    const { id } = useParams()
    const [portfolio, setPortfolio] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPortfolio = async () => {
            setLoading(true);
            try {
                let res;

                // 🔍 CHECK: Is it a MongoDB ID (24 chars hex)?
                const isMongoId = id.length === 24 && /^[0-9a-fA-F]+$/.test(id);

                if (isMongoId) {
                    console.log("Fetching by ID...");
                    res = await fetchSinglePortfolio(id);
                } else {
                    console.log("Fetching by SLUG...");
                    res = await fetchPortfolioBySlug(id);
                }

                console.log("Fetched portfolio:", res);
                setPortfolio(res);
            } catch (error) {
                console.error("Failed to load portfolio:", error);
                setPortfolio(null);
            } finally {
                setLoading(false);
            }
        }
        if (id) loadPortfolio()
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
