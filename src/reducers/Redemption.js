import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpPostService } from '../app/httpHandler';

const initialState = {
  value: 0,
  status: false,
};

export const addCoupon = createAsyncThunk(
  'redemption',
  async (data) => {
    const response = await httpPostService('redemption/addCoupon', data)
    return response;
  }
);

export const validateRedeem = createAsyncThunk(
  "redemption/validateRedeem",
  async (data) => {
    const response = await httpPostService("redemption/validateRedeem", data);
    return response;
  }
);

export const redemptionDetails = createSlice({
  name: 'redemption',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCoupon.pending, (state) => {
        state.status = false;
      })
      .addCase(addCoupon.fulfilled, (state, action) => {
        state.status = true;
        state.value = action.payload;
      });
  },
});

export const redemptionInfo = (state) => state.redemptionDetails;

export default redemptionDetails.reducer;