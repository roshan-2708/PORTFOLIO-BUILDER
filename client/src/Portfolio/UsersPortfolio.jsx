import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchMyPortfolio } from '../services/operation/portfolioAPI'

const UsersPortfolio = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [portfolio, setPortfolio] = useState([])
    const { id, slug } = useParams();

    // useEffect(() => {
    //     const loadPortfolio = async () => {
    //         try {
    //             const data = await fetchMyPortfolio()
    //             setPortfolio(data || [])
    //         } catch (err) {
    //             setError("Failed to load portfolio")
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    //     loadPortfolio()
    // }, [])
    useEffect(() => {
        const loadPortfolio = async () => {
            try {
                let res;
                if (id) {
                    // Agar ID hai (Dashboard se aaya hai)
                    res = await fetchSinglePortfolioById(id);
                } else {
                    // Agar Slug hai (Public link hai)
                    res = await fetchSinglePortfolioBySlug(slug);
                }
                setPortfolio(res);
            } catch (error) {
                console.log("Failed to load portfolio.");
            } finally {
                setLoading(false);
            }
        };
        loadPortfolio();
    }, [id, slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="animate-pulse text-lg text-gray-300">
                    Loading your portfolios...
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                {error}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-yellow-400">
                        Your Portfolios
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Click a portfolio to view or edit
                    </p>
                </div>
            </div>

            {/* Empty State */}
            {portfolio.length === 0 ? (
                <div className="text-center mt-24">
                    <p className="text-gray-400 text-lg">
                        You haven’t created any portfolio yet.
                    </p>
                    <button
                        onClick={() => navigate('/create-portfolio')}
                        className="
                            mt-6 px-6 py-3 rounded-xl
                            bg-yellow-400 text-black font-semibold
                            hover:scale-105 transition
                        "
                    >
                        Create Your First Portfolio
                    </button>
                </div>
            ) : (
                /* Portfolio Grid */
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {portfolio.map((item) => (
                        <div
                            key={item._id}
                            // onClick={() => navigate(`/portfolio/${item._id}`)}
                            onClick={() => navigate(`/portfolio/me/${item._id}`)}
                            className="
                                group cursor-pointer
                                rounded-2xl border border-gray-800
                                bg-gray-900 p-6
                                hover:border-yellow-400
                                hover:shadow-[0_0_25px_rgba(250,204,21,0.15)]
                                hover:-translate-y-1
                                transition-all duration-300
                            "
                        >
                            <h3 className="text-xl font-semibold text-yellow-400">
                                {item.title || "My Portfolio"}
                            </h3>

                            <p className="text-sm text-gray-400 mt-2">
                                Template: <span className="text-gray-300">{item.template}</span>
                            </p>

                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-xs text-gray-500">
                                    Created on
                                    <br />
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </p>

                                <span className="
                                    text-sm text-yellow-400
                                    opacity-0 group-hover:opacity-100
                                    transition
                                ">
                                    View →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UsersPortfolio
