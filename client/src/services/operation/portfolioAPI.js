import { apiConnector } from "../axios";
import { portfolioEndpoints } from "../apis";

const {
    CREATE_PORTFOLIO,
    PUBLISH_PORTFOLIO,
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