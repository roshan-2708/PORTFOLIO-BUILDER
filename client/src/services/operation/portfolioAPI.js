import { apiConnector } from "../axios";
import { portfolioEndpoints } from "../apis";

const {
    CREATE_PORTFOLIO
} = portfolioEndpoints;

exports.createPortfolio = async (formData, token) => {
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            CREATE_PORTFOLIO,
            formData,
            {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        );
        if (!response?.data?.success) {
            throw new Error("Could not create ");
        }

        result = response.data.portfolio;
    } catch (error) {
        console.log("create portfolio api error", error);
    }
    return result;
}