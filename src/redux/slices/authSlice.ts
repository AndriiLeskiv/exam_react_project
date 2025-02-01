import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {loginApi, logoutApi} from "../../services/api.service";
import { retrieveLocalStorage } from "../../services/helpers.ts";
import {IUser} from "../../models/user/IUser.ts";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    users: IUser[];
}

const initialState: AuthState = {
    accessToken: retrieveLocalStorage("accessToken") || null,
    refreshToken: retrieveLocalStorage("refreshToken") || null,
    isAuthenticated: !!retrieveLocalStorage("accessToken"),
    loading: false,
    error: null,
    users: [],
};

// AsyncThunk для логіну
export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password }: { username: string, password: string }, { rejectWithValue }) => {
        try {
            const data = await loginApi(username, password);

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            localStorage.setItem("user", JSON.stringify({
                firstName: data.firstName,
                image: data.image,
            }));

            return {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                firstName: data.firstName,
                image: data.image
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message || "Помилка авторизації");
            }
            return rejectWithValue("Помилка авторизації");
        }
    }
);

// AsyncThunk для виходу
export const logout = createAsyncThunk("auth/logout", async () => {
    await logoutApi();
    return null;
});

// Оновлення в slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
            })

    },
});

export default authSlice.reducer;