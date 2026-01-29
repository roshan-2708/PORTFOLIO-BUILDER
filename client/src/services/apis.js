const BASE_URL = import.meta.env.VITE_API_URL

export const authEndpoints = {
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login'
}