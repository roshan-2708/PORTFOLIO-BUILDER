import { apiConnector } from "../axios";
import { authEndpoints } from "../apis";
const BASE_URL = "https://your-backend-domain.com/api/v1";

const {
    SIGNUP,
    LOGIN,
    GET_USER_PROFILE,
    CHANGE_PASSWORD,
    RESET_PASSWORD,
    RESET_PASSWORD_TOKEN,
    REGISTER_USER,
} = authEndpoints;


// signup
export const signup = async (userData) => {
    try {
        const response = await apiConnector("POST", SIGNUP, userData);
        return response.data;
    } catch (error) {
        console.error('signup error :', error.response?.data || error.message);
        throw error;
    }
}

// login
export const login = async (credentials) => {
    try {
        const response = await apiConnector("POST", LOGIN, credentials);
        return response.data;
    } catch (error) {
        console.error('login error :', error.response?.data || error.message);
        throw error;
    }
}

// get user profile details
export const userProfile = async () => {
    try {
        const response = await apiConnector('GET', GET_USER_PROFILE, null, {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        return response.data;
    } catch (error) {
        console.error('getUserProfile error : ', error.response?.data || error.message);
        throw error;
    }
}

// change password
export const changePassword = async (oldPassword, newPassword) => {
    try {
        const token = localStorage.getItem("token");

        const response = await apiConnector(
            'PUT',
            CHANGE_PASSWORD,
            {
                oldPassword,
                newPassword,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );

        return response.data;
    } catch (error) {
        console.log(
            'change password error : ',
            error.response?.data || error.message
        );
        throw error;
    }
};

// reset password link
export const resetPasswordToken = async (email) => {
    try {
        const res = await apiConnector("POST", RESET_PASSWORD_TOKEN, {
            email,
        });

        if (res.data.success) {
            console.log("Reset link sent to your email");
        }

    } catch (error) {
        console.error(
            "reset password link error:",
            error.response?.data || error.message
        );
        throw error;
    }
};

// reset password
export const resetPassword = async (password, confirmPassword, token, navigate) => {
    try {

        const res = await apiConnector(
            "POST",
            RESET_PASSWORD,
            {
                password,
                confirmPassword,
                token,
            }
        );

        if (res.data.success) {
            console.log("Password reset successfully");
            navigate("/login");
        }

    } catch (error) {
        console.error(
            "reset password failed:",
            error.response?.data || error.message
        );
    }
};

// send verification link
export const registerUser = async (email, password, fullName) => {
    try {
        const response = await apiConnector(
            "POST",
            REGISTER_USER,
            {
                email,
                password,
                fullName,
            },
        );

        if (res?.data?.success) {
            console.log("register successful");
            return response.data;
        }
    } catch (error) {
        console.error(
            "registration failed:",
            error.response?.data || error.message
        );
        throw error;
    }
}   
