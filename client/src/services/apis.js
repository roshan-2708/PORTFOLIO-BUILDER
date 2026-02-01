const BASE_URL = import.meta.env.VITE_API_URL

export const authEndpoints = {
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    GET_USER_PROFILE: '/auth/me',
    CHANGE_PASSWORD: '/auth/change-password',
}

export const profileEndpoints = {
    DELETE_ACCOUNT: '/profile/delete-account'
}