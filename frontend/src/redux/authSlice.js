import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

export const loginUser = createAsyncThunk("auth/login", async (data) => {
    const res = await axiosClient.post("/auth/login", data);
    // console.log("Login response:", res.data);
    return res.data.user;
});

export const registerUser = createAsyncThunk("auth/register", async (data) => {
    const res = await axiosClient.post("/auth/register", data);
    return res.data.user;
});

export const fetchMe = createAsyncThunk("auth/me", async () => {
    const res = await axiosClient.get("/auth/me");
    // console.log("FetchMe response:", res.data);
    return res.data.user;
});

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, loading: false, error: null },
    reducers: {
        logout(state) {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch Me
            .addCase(fetchMe.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchMe.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
