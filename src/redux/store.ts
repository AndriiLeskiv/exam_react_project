import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice.ts";
import recipeSlice from "./slices/recipeSlice.ts";
import authSlice from "./slices/authSlice.ts";

export const store = configureStore({
    reducer: {
        user: userSlice,
        recipe: recipeSlice,
        auth: authSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;