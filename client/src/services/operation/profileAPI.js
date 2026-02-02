import { apiConnector } from "../axios";
import { profileEndpoints } from "../apis";

const {
    CREATE_ACCOUNT,
    UPDATE_ACCOUNT,
    GET_ACCOUNT,
    DELETE_ACCOUNT,
} = profileEndpoints;

// create account
export const createAccount = async (formData) => {
    const response = await apiConnector(
        "POST",
        CREATE_ACCOUNT,
        formData,
        {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
        }
    );
    return response.data;
}

// update account
export const updateAccount = async (formData) => {
    const response = await apiConnector(
        "PUT",
        UPDATE_ACCOUNT,
        formData,
        {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    );
    return response.data;
};


// get account
export const getAccount = async () => {
    const response = await apiConnector(
        "GET",
        GET_ACCOUNT,
        null,
        {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    );
    return response.data;
};


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
