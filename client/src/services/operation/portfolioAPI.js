import { apiConnector } from "../axios";
import { portfolioEndpoints } from "../apis";

const {
    CREATE_PORTFOLIO,
    PUBLISH_PORTFOLIO,
    UPDATE_PORTFOLIO,
    DELETE_PORTFOLIO,
    USERS_PORTFOLIO,
    COUNT_PORTFOLIO,
    GET_BY_ID,
    GET_BY_SLUG,
    TOTAL_VIEW_COUNT
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
    // ❌ Token nikalne ki zaroorat nahi hai public view ke liye
    const res = await apiConnector(
        "GET",
        `${GET_BY_ID}/${id}`,
        null,
        {} // ✅ Headers ko empty rakhein taaki login ki zarurat na pade
    );
    return res.data.portfolio;
};

export const fetchPortfolioBySlug = async (slug) => {
    const res = await apiConnector(
        "GET",
        `${GET_BY_SLUG}/${slug}`,
        null,
        {} // ✅ Yahan bhi empty headers
    );
    return res.data.portfolio;
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

export const updatePortfolio = async (portfolioId, formData, token) => {
    try {
        const response = await apiConnector(
            "PUT",
            portfolioEndpoints.UPDATE_PORTFOLIO(portfolioId),
            formData,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        return response;
    } catch (error) {
        console.error("update portfolio error", error);
        throw error;
    }
};

export const deletePortfolio = async (portfolioId, token) => {
    try {
        const response = await apiConnector(
            "DELETE",
            portfolioEndpoints.DELETE_PORTFOLIO(portfolioId),
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        return response;
    } catch (error) {
        console.error("delete portfolio error", error);
        throw error;
    }
};

export const viewsCount = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await apiConnector(
            'GET',
            TOTAL_VIEW_COUNT,
            null,
            {
                Authorization: `Bearer ${token}`
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching total views:", error);
        throw error;
    }
}