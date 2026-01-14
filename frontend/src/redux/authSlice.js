import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  const res = await axiosClient.post("/auth/login", data);
  return res.data.user;
});

export const registerUser = createAsyncThunk("auth/register", async (data) => {
  const res = await axiosClient.post("/auth/register", data);
  return res.data.user;
});

export const fetchMe = createAsyncThunk("auth/me", async () => {
  const res = await axiosClient.get("/auth/me");
  return res.data.user;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false },
  reducers: {
    logout(state) {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
