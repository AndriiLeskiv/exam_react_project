import axios from "axios";
import {retrieveLocalStorage, setTokenToStorage} from "./helpers.ts";

const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com/auth"
});

axiosInstance.interceptors.request.use((config) => {
    const token = retrieveLocalStorage<string>("accessToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = retrieveLocalStorage<string>("refreshToken");

            if (!refreshToken) {
                return Promise.reject(error);
            }

            try {
                const response = await axiosInstance.post("/refresh", {
                    refreshToken,
                });

                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

                setTokenToStorage("accessToken", newAccessToken);
                setTokenToStorage("refreshToken", newRefreshToken);

                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                console.error("Не вдалося оновити токен", err);
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;