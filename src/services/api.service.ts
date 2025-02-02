import axiosInstance from "./axiosInstance.ts";
import {IUserToken} from "../models/IUserToken.ts";
import {IRecipes} from "../models/recipes/IRecipes.ts";
import {IUser} from "../models/user/IUser.ts";
import {clearAuthData, retrieveLocalStorage} from "./helpers.ts";

// General function for GET requests
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
        throw new Error(`Failed to retrieve data from ${endpoint}`);
    }
};

// login function
export const loginApi = async (username: string, password: string): Promise<IUserToken> => {
    const {data} = await axiosInstance.post("/login", {username, password});
    return data;
};

// Function for exiting
export const logoutApi = async (): Promise<void> => {
    clearAuthData()
};

// Getting users
export const getUsersApi = async (page: number, query: string) => {
    const limit = 30;
    const skip = (page - 1) * limit;
    return fetchData(`/users/search?q=${query}`, {limit, skip});
};

// Get user by ID
export const getUserByIdApi = async (id: number) => {
    return fetchData(`/users/${id}`);
};

// Getting recipes
export const getAllRecipesApi = async (page: number, query: string): Promise<{
    recipes: IRecipes[],
    total: number
}> => {
    const limit = 30;
    const skip = (page - 1) * limit;
    return await fetchData(`/recipes/search?q=${query}`, {limit, skip});
};

// Fetches a recipe by its ID
export const getRecipeByIdApi = async (id: number): Promise<IRecipes> => {
    return fetchData(`/recipes/${id}`);
};

// Fetches recipes by a specific tag
export const getRecipesByTagApi = async (tag: string): Promise<{ recipes: IRecipes[], total: number }> => {
    const data = await fetchData(`/recipes/tag/${tag}`);
    return {recipes: data.recipes, total: data.total};
};

// Get user data
export const fetchUserData = async (accessToken: string): Promise<IUser> => {
    return fetchData("/me", {accessToken});
};