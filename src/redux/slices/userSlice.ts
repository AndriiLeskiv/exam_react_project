import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IUser} from "../../models/user/IUser.ts";
import {getUserByIdApi, getUsersApi} from "../../services/api.service.ts";

interface UserState {
    firstName: string;
    image: string | null;
    loading: boolean;
    error: string | null;
    users: IUser[];
    total: number;
    currentPage: number;
    user: IUser | null;
}

const initialState: UserState = {
    firstName: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).firstName : "",
    image: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).image : null,
    loading: false,
    error: null,
    users: [],
    total: 0,
    currentPage: 1,
    user: null,
};

const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com/auth",
    headers: {}
});

export const fetchUsers = createAsyncThunk<
    { users: IUser[]; total: number },
    { page: number },
    { rejectValue: string }
>(
    "user/fetchUsers",
    async ({ page }, { rejectWithValue }) => {
        try {
            const data = await getUsersApi(page);
            return { users: data.users, total: data.total };
        } catch (error) {
            console.log(error);
            return rejectWithValue("Не вдалося отримати список користувачів");
        }
    }
);

export const fetchUser = createAsyncThunk<IUser, void, { rejectValue: string }>(
    "user/fetchUser",
    async (_, {getState, rejectWithValue}) => {
        try {
            const state = getState() as { auth: { accessToken: string | null } };
            if (!state.auth.accessToken) {
                return rejectWithValue("Користувач не авторизований");
            }
            const response = await axiosInstance.get("/me", {
                headers: {Authorization: `Bearer ${state.auth.accessToken}`},
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue("Не вдалося отримати дані користувача");
        }
    }
);

export const fetchUserById = createAsyncThunk("user/fetchUserById", async (id: number) => {
    return await getUserByIdApi(id);
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.firstName = action.payload.firstName;
                state.image = action.payload.image;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.total = action.payload.total;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Помилка отримання даних";
            });
    },
});

export const {setPage} = userSlice.actions;
export default userSlice.reducer;