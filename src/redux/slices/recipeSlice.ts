import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IRecipes } from "../../models/recipes/IRecipes";
import {getAllRecipesApi} from "../../services/api.service.ts";

interface RecipesState {
    recipes: IRecipes[];
    total: number;
    selectedRecipe: IRecipes | null;
    status: "idle" | "loading" | "failed";
}

const initialState: RecipesState = {
    recipes: [],
    total: 0,
    selectedRecipe: null,
    status: "idle",
};

export const fetchRecipes = createAsyncThunk(
    "recipes/fetchRecipes",
    async ({ page, limit }: { page: number, limit: number }) => {
        return await getAllRecipesApi(page, limit);
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
            });
    },
});

export const { setSelectedRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;