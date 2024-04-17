import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpGetService, httpPostService } from '../app/httpHandler';

const initialState = {
  value: 0,
  status: false,
  user: [],
  totalOp: 0
};

export const postInward = createAsyncThunk(
  'postinward',
  async (data) => {
    const response = await httpPostService('inward', data)
    return response;
  }
);

export const getInward = createAsyncThunk(
  'getInward',
  async () => {
    const response = await httpGetService('inward/op')
    return response;
  }
);

export const getCumulativePrice = createAsyncThunk(
  'getcumulativeRate',
  async () => {
    const response = await httpGetService('inward/cumulativeRate')
    return response;
  }
);

export const getInwardDetails = createAsyncThunk(
  'getInwardDetails',
  async () => {
    const response = await httpGetService('inward/inward-details')
    return response;
  }
);

export const getInwardByDate = createAsyncThunk(
  'getInwardByDate',
  async (date) => {
    const response = await httpPostService(`inward/getInward`, {date})
    return response;
  }
);

// export const getJewellerInward = createAsyncThunk(
//   'getInward',
//   async (id) => {
//     const response = await httpGetService(`inward/jeweller/${id}/op`)
//     return response;
//   }
// );

export const inwardDetails = createSlice({
  name: 'inwardDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInward.pending, (state) => {
        state.status = false;
      })
      .addCase(getInward.fulfilled, (state, action) => {
        state.status = true;
        state.totalOp = action.payload.data.totalOp
      })
      .addCase(getInwardDetails.pending, (state) => {
        state.status = false;
      })
      .addCase(getInwardDetails.fulfilled, (state, action) => {
        state.status = true;
        state.inwardsDetails = action.payload
      })
      .addCase(getInwardByDate.pending, (state) => {
        state.status = false;
      })
      .addCase(getInwardByDate.fulfilled, (state, action) => {
        state.status = true;
        state.result = action.payload.data
        state.inwardTotal = action.payload.inwardTotal
      })
      .addCase(postInward.pending, (state) => {
        state.status = false;
      })
      .addCase(postInward.fulfilled, (state, action) => {
        state.status = true;
        state.user = action.payload.user;
        state.auth = true;
      })
      .addCase(getCumulativePrice.pending, (state) => {
        state.status = false;
      })
      .addCase(getCumulativePrice.fulfilled, (state, action) => {
        state.status = true;
        state.cumulativePrice = action.payload.result;
      });
  }
});


export const inwardDetail = (state) => state.inwardDetails;

export default inwardDetails.reducer;