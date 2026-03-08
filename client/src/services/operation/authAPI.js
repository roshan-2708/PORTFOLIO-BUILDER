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
    SEND_VERIFICATION_LINK,
    VERIFICATION_LINK,
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
export const sendVerificationEmail = async (email) => {
    try {
        const response = await apiConnector(
            "POST",
            SEND_VERIFICATION_LINK,
            { email }
        );
        return response.data; // Response ka data return karein
    } catch (error) {
        console.error("Send verification email error", error);
        return error.response?.data; // Error response return karein
    }
}

export const verifyToken = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}${authEndpoints.VERIFICATION_LINK}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Verification API error:", data);
            return { success: false, message: data.message };
        }

        return data;

    } catch (error) {
        console.error("Verify token request failed:", error);
        return { success: false };
    }
};