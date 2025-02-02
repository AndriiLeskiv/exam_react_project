import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {loginApi, logoutApi} from "../../services/api.service";
import {clearAuthData, retrieveLocalStorage, setTokenToStorage} from "../../services/helpers.ts";
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

// AsyncThunk for login
export const login = createAsyncThunk(
    "auth/login",
    async ({username, password}: { username: string, password: string }, {rejectWithValue}) => {
        try {
            const data = await loginApi(username, password);

            setTokenToStorage("accessToken", data.accessToken);
            setTokenToStorage("refreshToken", data.refreshToken);
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
                return rejectWithValue(error.message || "Authorization error");
            }
            return rejectWithValue("Authorization error");
        }
    }
);

// AsyncThunk for exit
export const logout = createAsyncThunk("auth/logout", async () => {
    await logoutApi();
    return null;
});

// Update in slice
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
                clearAuthData();
            })

    },
});

export default authSlice.reducer;