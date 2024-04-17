import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpPostService } from '../app/httpHandler';

const initialState = {
  value: 0,
  status: false,
};

export const profileUpdate = createAsyncThunk(
  'kycupload',
  async (data) => {
    const response = await httpPostService('login', data)
    return response;
  }
);

export const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileUpdate.pending, (state) => {
        state.status = false;
      })
      .addCase(profileUpdate.fulfilled, (state, action) => {
        state.status = true;
        state.value = action.payload;
      });
  },
});

export const profileInfo = (state) => state.profile;

export default profile.reducer;