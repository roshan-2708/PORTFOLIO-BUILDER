const BASE_URL = import.meta.env.VITE_API_URL

export const authEndpoints = {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    GET_USER_PROFILE: '/auth/me',
    CHANGE_PASSWORD: '/auth/change-password',
    RESET_PASSWORD_TOKEN: '/auth/reset-password-token',
    RESET_PASSWORD: '/auth/reset-password',
    SEND_VERIFICATION_LINK: '/auth/send-verification',
    VERIFICATION_LINK : '/auth/verify-token',
}

export const profileEndpoints = {
    CREATE_ACCOUNT: '/profile/create',
    DELETE_ACCOUNT: '/profile/delete-account',
    GET_ACCOUNT: '/profile/profile-details',
    UPDATE_ACCOUNT: '/profile/update'
}

export const portfolioEndpoints = {
    CREATE_PORTFOLIO: '/portfolio/create',
    UPDATE_PORTFOLIO: (id) => `/portfolio/updatePortfolio/${id}`,
    DELETE_PORTFOLIO: (id) => `/portfolio/delete/${id}`,
    PUBLISH_PORTFOLIO: '/portfolio/publish/:portfolioId',
    USERS_PORTFOLIO: '/portfolio/my-portfolio',
    COUNT_PORTFOLIO: '/portfolio/stats/me',
    GET_BY_ID: '/portfolio/getThrough/i',
    GET_BY_SLUG: '/portfolio/getThrough/s',
    TOTAL_VIEW_COUNT: '/portfolio/total-views'
}