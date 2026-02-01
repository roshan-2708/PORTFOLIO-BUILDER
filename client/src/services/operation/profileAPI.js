import { apiConnector } from "../axios";
import { profileEndpoints } from "../apis";

const {
    DELETE_ACCOUNT,
} = profileEndpoints;


// delete account
export const deleteAccount = async () => {
    const response = await apiConnector(
        "DELETE",
        DELETE_ACCOUNT,
        null,
        {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    );
    return response.data;
};
