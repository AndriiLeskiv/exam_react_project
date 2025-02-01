import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {searchItemsApi} from "../../services/api.service.ts";

interface SearchState {
    results: any[];
    selectedRecipe: any | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: SearchState = {
    results: [],
    selectedRecipe: null,
    status: "idle",
    error: null,
};

// Асинхронна дія для пошуку
export const searchItems = createAsyncThunk(
    "search/fetch",
    async ({ query, type }: { query: string; type: "recipes" | "users" }) => {
        const data = await searchItemsApi({ query, type });
        console.log('Results from search:', data);
        return data;
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(searchItems.pending, (state) => {
                state.status = "loading";
            })
            .addCase(searchItems.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.results = action.payload || [];
            })
            .addCase(searchItems.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Помилка пошуку";
            });
    }
});

export default searchSlice.reducer;