import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpGetService, httpPostService } from '../app/httpHandler';

const initialState = {
  value: 0,
  status: false
};

export const saveGoldRate = createAsyncThunk(
  "saveGoldRate",
  async (data) => {
    const response = await httpPostService("admin/setGoldrate", data);
    return response;
  }
);

export const getGoldRate = createAsyncThunk(
  "getGoldRate",
  async () => {
    const response = await httpGetService("admin/getGoldrate");
    return response;
  }
);
export const goldRateDetails = createSlice({
  name: 'purchaseDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveGoldRate.pending, (state) => {
        state.status = false;
      })
      .addCase(saveGoldRate.fulfilled, (state, action) => {
        state.status = true;
        state.value = action.payload.goldrate
      })
      .addCase(getGoldRate.pending, (state) => {
        state.status = false;
      })
      .addCase(getGoldRate.fulfilled, (state, action) => {
        state.status = true;
        state.value = action.payload.goldrate
      });
  }
});

export const goldRateDetail = (state) => state.goldRateDetail;

export default goldRateDetails.reducer;
