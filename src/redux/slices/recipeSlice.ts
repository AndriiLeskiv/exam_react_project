import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IRecipes} from "../../models/recipes/IRecipes";
import {getAllRecipesApi, getRecipeByIdApi, getRecipesByTagApi} from "../../services/api.service.ts";

interface RecipesState {
    recipes: IRecipes[];
    userRecipes: IRecipes[];
    total: number;
    currentPage: number;
    selectedRecipe: IRecipes | null;
    status: "idle" | "loading" | "failed";
}

const initialState: RecipesState = {
    recipes: [],
    userRecipes: [],
    total: 0,
    currentPage: 1,
    selectedRecipe: null,
    status: "idle",
};

export const fetchRecipes = createAsyncThunk<
    { recipes: IRecipes[]; total: number },
    { query: string, page: number},
    { rejectValue: string }
>(
    "recipes/fetchRecipes",
    async ({ page, query }, { rejectWithValue }) => {
        try {
            return await getAllRecipesApi(page, query);
        } catch (error) {
            console.log(error);
            return rejectWithValue("Не вдалося отримати список рецептів");
        }
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
        // return await getUserByIdApi(userId);
        const response = await getAllRecipesApi(1, '');
        console.log('response1', response);
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
        setPageRecipe: (state, action) => {
            state.currentPage = action.payload;
        },
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

export const {setPageRecipe, setSelectedRecipe} = recipeSlice.actions;
export default recipeSlice.reducer;