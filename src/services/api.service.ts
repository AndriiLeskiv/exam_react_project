import axios from "axios";
import {IUserToken} from "../models/IUserToken";
import {IRecipes} from "../models/recipes/IRecipes.ts";

// Створюємо екземпляр axios для запитів
const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com/auth",
    headers: {}
});

// Функція login
export const loginApi = async (username: string, password: string): Promise<IUserToken> => {
    const {data} = await axiosInstance.post("/login", {username, password});
    return data;
};

// Функція для оновлення токенів
export const refreshTokenApi = async (refreshToken: string): Promise<IUserToken> => {
    const {data} = await axiosInstance.post("/refresh", {refreshToken});
    return data;
};

// Функція для виходу
export const logoutApi = async (): Promise<void> => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};

export const getUsersApi = async (page: number) => {
    try {
        const limit = 30;
        const skip = (page - 1) * limit;
        const response = await axiosInstance.get(`/users?limit=${limit}&skip=${skip}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        console.log('getUsersApi', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Не вдалося отримати користувачів");
    }
};


export const getUserByIdApi = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Не вдалося отримати користувача");
    }
};

export const getAllRecipesApi = async (page: number, limit: number): Promise<{ recipes: IRecipes[], total: number }> => {
    try {
        const skip = (page - 1) * limit;
        const response = await axiosInstance.get(`/recipes?limit=${limit}&skip=${skip}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        console.log('getAllRecipesApi', response.data);
        return {
            recipes: response.data.recipes,
            total: response.data.total,
        };
    } catch (error) {
        console.log(error);
        throw new Error('Не вдалося отримати рецепти');
    }
};