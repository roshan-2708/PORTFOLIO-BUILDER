import { apiConnector } from "../axios";
import { portfolioEndpoints } from "../apis";

const {
    CREATE_PORTFOLIO,
    PUBLISH_PORTFOLIO,
    USERS_PORTFOLIO,
    COUNT_PORTFOLIO,
} = portfolioEndpoints;

export const createPortfolio = async (formData, token) => {
    try {
        const response = await apiConnector(
            "POST",
            CREATE_PORTFOLIO,
            formData,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        // 🔥 ALWAYS RETURN DATA ONLY
        return response.data;
    } catch (error) {
        console.error("create portfolio error", error);
        throw error;
    }
};


export const publishPortfolio = async (portfolioId, token) => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiConnector(
            'PUT',
            PUBLISH_PORTFOLIO.replace(":portfolioId", portfolioId),
            null, {
            Authorization: `Bearer ${token}`,
        }
        );
        return response.data;
    } catch (error) {
        console.log('publish portfolio error', error);
        throw error;
    }
}

export const fetchMyPortfolio = async (token) => {
    const res = await apiConnector(
        'GET',
        USERS_PORTFOLIO,
        null,
        {
            Authorization: `Bearer ${token}`,
        }
    );

    return res.data.portfolios;
};

export const fetchSinglePortfolio = async (id) => {
    const token = localStorage.getItem('token');

    const res = await apiConnector(
        "GET",
        `/portfolio/${id}`,
        null,
        {
            Authorization: `Bearer ${token}`,
        }
    );

    return res.data.portfolio;
};

exports.getPortfolioBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        // findById nahi, findOne use karein slug ke liye
        const portfolio = await Portfolio.findOne({ slug: slug }); 

        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: "Portfolio not found",
            });
        }

        res.status(200).json({
            success: true,
            data: portfolio,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPortfolioCount = async (token) => {
    const res = await apiConnector(
        'GET',
        COUNT_PORTFOLIO,
        null,
        {
            Authorization: `Bearer ${token}`,
        }
    );
    return res.data;
}