import axios from "axios";

console.log("Axios baseURL:", import.meta.env.VITE_BASE_URL);

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 30000,
    withCredentials: false,
});

// Auto attach token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const apiConnector = async (
    method,
    endpoint,
    bodyData = null,
    headers = {}
) => {
    const url = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    return axiosInstance({
        method,
        url,
        data: bodyData,
        headers,
    });
};

export default axiosInstance;
