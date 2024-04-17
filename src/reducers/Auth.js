import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpGetService, httpPostService } from "../app/httpHandler";

const initialState = {
  value: 0,
  status: false,
  user: [],
  menus: [],
};

export const authLogin = createAsyncThunk(
  "authentication/login",
  async (data) => {
    const response = await httpPostService("auth/login", data);
    return response;
  }
);

export const getUserInfo = createAsyncThunk(
  "authentication/user",
  async () => {
    const response = await httpGetService(`user/userInfo`);
    return response;
  }
);

export const getGraphData = createAsyncThunk("dashboard", async (data) => {
  const response = await httpGetService("dashboard", data);
  return response;
});

export const authRegister = createAsyncThunk(
  "authentication/register",
  async (data) => {
    const response = await httpPostService("auth/register", data);
    return response;
  }
);

export const validatePhone = createAsyncThunk(
  "authentication/validatePhone",
  async (data) => {
    const response = await httpPostService("auth/validatePhone", data);
    return response;
  }
);

export const generateOTP = createAsyncThunk(
  "authentication/generateOTP",
  async (data) => {
    const response = await httpPostService("auth/generateOTP", data);
    return response;
  }
);

export const validateOTP = createAsyncThunk(
  "authentication/validateOTP",
  async (data) => {
    const response = await httpPostService("auth/validateOTP", data);
    return response;
  }
);

export const userdetails = createSlice({
  name: "userdetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.status = false;
        state.auth = false;
        state.user = [];
        state.menus = [];
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.status = true;
        state.user = action.payload.user;
        state.menus = action.payload.menus;
        state.auth = action.payload.auth;

        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(getGraphData.pending, (state) => {
        state.status = false;
      })
      .addCase(getGraphData.fulfilled, (state, action) => {
        state.status = true;
        state.graphData = action.payload;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.status = false;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.menus = action.payload.menus;
        state.auth = true;
      });
  },
});

export const userData = (state) => state.userInfo;

export default userdetails.reducer;
