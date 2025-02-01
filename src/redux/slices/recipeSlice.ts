import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {IRecipes} from "../../models/recipes/IRecipes";
import {getAllRecipesApi, getRecipeByIdApi, getRecipesByTagApi} from "../../services/api.service.ts";

interface RecipesState {
    recipes: IRecipes[];
    userRecipes: IRecipes[];
    total: number;
    selectedRecipe: IRecipes | null;
    status: "idle" | "loading" | "failed";
}

const initialState: RecipesState = {
    recipes: [],
    userRecipes: [],
    total: 0,
    selectedRecipe: null,
    status: "idle",
};

export const fetchRecipes = createAsyncThunk(
    "recipes/fetchRecipes",
    async ({page, limit}: { page: number, limit: number }) => {
        return await getAllRecipesApi(page, limit);
    }
);

export const fetchRecipeById = createAsyncThunk(
    "recipes/fetchRecipeById",
    async (id: number) => {
        return await getRecipeByIdApi(id);
    }
);

export const fetchRecipesByUserId = createAsyncThunk(
    "recipes/fetchRecipesByUserId",
    async (userId: number) => {
        const response = await getAllRecipesApi(1, 50);
        return response.recipes.filter(recipe => recipe.userId === userId);
    }
);

export const fetchRecipesByTag = createAsyncThunk(
    "recipes/fetchRecipesByTag",
    async ({tag}: { tag: string }) => {
        return await getRecipesByTagApi(tag);
    }
);

const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        setSelectedRecipe(state, action) {
            state.selectedRecipe = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.status = "idle";
                state.recipes = action.payload.recipes;
                state.total = action.payload.total;
            })
            .addCase(fetchRecipes.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(fetchRecipeById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchRecipeById.fulfilled, (state, action) => {
                state.status = "idle";
                state.selectedRecipe = action.payload;
            })
            .addCase(fetchRecipeById.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(fetchRecipesByUserId.fulfilled, (state, action) => {
                state.status = "idle";
                state.userRecipes = action.payload;
            })
            .addCase(fetchRecipesByTag.fulfilled, (state, action) => {
                state.status = "idle";
                state.recipes = action.payload.recipes;
                state.total = action.payload.total;
            })
    },
});

export const {setSelectedRecipe} = recipeSlice.actions;
export default recipeSlice.reducer;