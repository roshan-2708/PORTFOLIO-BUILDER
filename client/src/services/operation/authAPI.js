import { apiConnector } from "../axios";
import { authEndpoints } from "../apis";


const {
    SEND_OTP,
    VERIFY_OTP,
    SIGNUP,
    LOGIN,
    GET_USER_PROFILE,
    CHANGE_PASSWORD,
} = authEndpoints;

// send-otp
export const sendOtp = async (email) => {
    try {
        const response = await apiConnector("POST", SEND_OTP, { email });
        return response.data;
    } catch (error) {
        console.error('send otp error :', error.response?.data || error.message);
        throw error;
    }
}

// verify-otp
export const verifyOtp = async (email, otp) => {
    try {
        const response = await apiConnector("POST", VERIFY_OTP, { email, otp });
        return response.data;
    } catch (error) {
        console.error('verify otp error :', error.response?.data || error.message);
        throw error;
    }
}



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
