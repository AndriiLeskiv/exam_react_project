import {IUserToken} from "../models/IUserToken.ts";
import {IRecipes} from "../models/recipes/IRecipes.ts";
import axiosInstance from "./axiosInstance.ts";
import {IUser} from "../models/user/IUser.ts";

// // Створюємо екземпляр axios для запитів
// const axiosInstance = axios.create({
//     baseURL: "https://dummyjson.com/auth",
//     headers: {}
// });
if (!axiosInstance) {
    throw new Error("axiosInstance is not properly imported");
}
// Функція login
export const loginApi = async (username: string, password: string): Promise<IUserToken> => {
    const {data} = await axiosInstance.post("/login", {username, password});
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

export const getAllRecipesApi = async (page: number, limit: number): Promise<{
    recipes: IRecipes[],
    total: number
}> => {
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

export const getRecipeByIdApi = async (id: number): Promise<IRecipes> => {
    try {
        const response = await axiosInstance.get(`/recipes/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Не вдалося отримати рецепт');
    }
};

export const getRecipesByTagApi = async (tag: string): Promise<{ recipes: IRecipes[], total: number }> => {
    try {
        const response = await axiosInstance.get(`/recipes/tag/${tag}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        console.log('getRecipesByTagApi', response.data);
        return {
            recipes: response.data.recipes,
            total: response.data.total,
        };
    } catch (error) {
        console.log(error);
        throw new Error(`Не вдалося отримати рецепти з тегом: ${tag}`);
    }
};

export const fetchUserData = async (accessToken: string): Promise<IUser> => {
    try {
        const response = await axiosInstance.get("/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw new Error("Не вдалося отримати дані користувача");
    }
};

// Асинхронна дія для пошуку
export const searchItemsApi = async ({ query, type }: { query: string, type: "recipes" | "users" }) => {
    try {
        const response = await axiosInstance.get(`${type}/search?q=${query}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        if (type === "recipes") {
            return response.data.recipes;
        } else if (type === "users") {
            return response.data.users;
        }
        return [];
    } catch (error) {
        console.error(error);
        throw new Error("Пошук не дав результату");
    }
};