import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpGetService, httpPostService } from "../app/httpHandler";

const initialState = {
  value: 0,
  status: false,
  user: [],
};

export const postJeweller = createAsyncThunk("postJeweller", async (data) => {
  const response = await httpPostService("jeweller", data);
  return response;
});

export const getJeweller = createAsyncThunk("getJeweller", async (data) => {
  const response = await httpGetService("jeweller");
  return response;
});

export const getPositionByJeweller = createAsyncThunk(
  "getPositionByJeweller",
  async (data) => {
    const response = await httpGetService("getPositionByJeweller");
    return response;
  }
);

export const addJeweller = createAsyncThunk("addJeweller", async (data) => {
  const response = await httpPostService("addjeweller", data);
  return response;
});

export const jewellerDetails = createSlice({
  name: "jewellerDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postInward.pending, (state) => {
        state.status = false;
      })
      .addCase(postInward.fulfilled, (state, action) => {
        state.status = true;
        state.user = action.payload.user;
        state.auth = true;
      });
  },
});

export const jewellerDetail = (state) => state.jewellerDetails;

export default jewellerDetails.reducer;
