import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpPostService, httpGetService } from '../app/httpHandler';

const initialState = {
  value: 0,
  status: false,
};

export const fieldUpdate = createAsyncThunk(
  'postmasterdata',
  async (data) => {
    const response = await httpPostService('master', data)
    return response;
  }
);

export const getField = createAsyncThunk(
  'getmasterdata',
  async (id) => {
    const response = await httpGetService(`master/${id}`)
    return response;
  }
);

export const field = createSlice({
  name: 'field',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getField.pending, (state) => {
        state.status = false;
      })
      .addCase(getField.fulfilled, (state, action) => {
        state.status = true
        state.value = action.payload;
      })
      .addCase(fieldUpdate.pending, (state) => {
        state.status = false;
      })
      .addCase(fieldUpdate.fulfilled, (state, action) => {
        state.status = true;
        state.value = action.payload;
      });
  }
});

export const fieldInfo = (state) => state.field;

export default field.reducer;