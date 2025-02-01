import axiosInstance from "./axiosInstance.ts";
import {IUserToken} from "../models/IUserToken.ts";
import {IRecipes} from "../models/recipes/IRecipes.ts";
import {IUser} from "../models/user/IUser.ts";
import {clearAuthData, retrieveLocalStorage} from "./helpers.ts";

// Загальна функція для GET запитів
const fetchData = async (endpoint: string, params: Record<string, any> = {}): Promise<any> => {
    try {
        const accessToken = retrieveLocalStorage<string>("accessToken");
        const response = await axiosInstance.get(endpoint, {
            params,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(`Не вдалося отримати дані з ${endpoint}`);
    }
};

// Функція login
export const loginApi = async (username: string, password: string): Promise<IUserToken> => {
    const {data} = await axiosInstance.post("/login", {username, password});
    return data;
};

// Функція для виходу
export const logoutApi = async (): Promise<void> => {
    clearAuthData()
};

// Отримання користувачів
export const getUsersApi = async (page: number) => {
    const limit = 30;
    const skip = (page - 1) * limit;
    return fetchData("/users", { limit, skip });
};

// Отримання користувача за ID
export const getUserByIdApi = async (id: number) => {
    return fetchData(`/users/${id}`);
};

// Отримання рецептів
export const getAllRecipesApi = async (page: number, limit: number): Promise<{ recipes: IRecipes[], total: number }> => {
    const skip = (page - 1) * limit;
    const data = await fetchData("/recipes", { limit, skip });
    return { recipes: data.recipes, total: data.total };
};

export const getRecipeByIdApi = async (id: number): Promise<IRecipes> => {
    return fetchData(`/recipes/${id}`);
};

export const getRecipesByTagApi = async (tag: string): Promise<{ recipes: IRecipes[], total: number }> => {
    const data = await fetchData(`/recipes/tag/${tag}`);
    return { recipes: data.recipes, total: data.total };
};

// Отримання даних користувача
export const fetchUserData = async (accessToken: string): Promise<IUser> => {
    return fetchData("/me", { accessToken });
};

// Пошук елементів
export const searchItemsApi = async ({ query, type }: { query: string, type: "recipes" | "users" }) => {
    const data = await fetchData(`${type}/search`, { q: query });
    return type === "recipes" ? data.recipes : data.users;
};